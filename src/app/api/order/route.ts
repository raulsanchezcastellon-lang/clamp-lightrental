import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { sendMailWithRetry } from "@/lib/email";
import { escapeHtml, headerSafe, isFilledHoneypot } from "@/lib/formSecurity";
import { getClientIp, isRateLimited } from "@/lib/rateLimit";
import { rentalDays } from "@/lib/rental";

type OrderItem = {
  id: string;
  name: string;
  brand?: string;
  category?: string;
  price: number;
  listingType?: string;
  quantity: number;
};

const dateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .optional()
  .or(z.literal(""));

const orderSchema = z.object({
  customer: z.object({
    name: z.string().trim().min(1).max(120),
    email: z.string().trim().max(200).pipe(z.email()),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    pickupDate: dateString,
    returnDate: dateString,
    delivery: z.enum(["yes", "no"]).optional(),
    comments: z.string().trim().max(5000).optional().or(z.literal("")),
  }),
  items: z
    .array(
      z.object({
        id: z.string().regex(/^[a-f0-9]{24}$/),
        quantity: z.number().int().min(1).max(99),
      })
    )
    .min(1)
    .max(100),
});

export async function POST(request: NextRequest) {
  try {
    if (isRateLimited(`order:${getClientIp(request)}`, 5, 10 * 60 * 1000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await request.json().catch(() => null);

    if (isFilledHoneypot(body?.customer)) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const parsed = orderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const customer = parsed.data.customer;

    if (
      customer.pickupDate &&
      customer.returnDate &&
      customer.returnDate < customer.pickupDate
    ) {
      return NextResponse.json({ error: "Invalid dates" }, { status: 400 });
    }

    // Precios y datos de producto salen de la base de datos, no del navegador.
    const products = await prisma.product.findMany({
      where: { id: { in: parsed.data.items.map((item) => item.id) }, available: true },
      select: { id: true, name: true, brand: true, category: true, price: true, listingType: true },
    });
    const productsById = new Map(products.map((product) => [product.id, product]));

    const items: OrderItem[] = parsed.data.items.flatMap((item) => {
      const product = productsById.get(item.id);
      if (!product) return [];
      return [
        {
          id: product.id,
          name: product.name,
          brand: product.brand ?? undefined,
          category: product.category,
          price: product.price,
          listingType: product.listingType ?? "rental",
          quantity: item.quantity,
        },
      ];
    });

    if (items.length === 0) {
      return NextResponse.json({ error: "The request cart is empty" }, { status: 400 });
    }

    const days = rentalDays(customer.pickupDate, customer.returnDate);
    const estimatedTotal = items.reduce(
      (total, item) =>
        total + item.price * item.quantity * (item.listingType === "sale" ? 1 : days ?? 1),
      0
    );

    const itemsRows = items
      .map(
        (item) => `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${escapeHtml(item.brand || "-")}</td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${escapeHtml(item.name)}</td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${escapeHtml(item.category || "-")}</td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${escapeHtml(item.quantity)}</td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">${escapeHtml(item.price)}€ ex. IVA</td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${escapeHtml(item.listingType || "rental")}</td>
          </tr>
        `
      )
      .join("");

    // Save to database first, so the order is never lost if the email fails.
    const order = await prisma.order.create({
      data: {
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone || null,
        pickupDate: customer.pickupDate || null,
        returnDate: customer.returnDate || null,
        delivery: customer.delivery === "yes",
        comments: customer.comments || null,
        items,
        estimatedTotal,
      },
    });

    try {
      await sendMailWithRetry({
        from: `"${headerSafe(customer.name)} (pedido web)" <web@mail.clamp-lightrental.com>`,
        replyTo: customer.email,
        to: "raul@clamp-lightrental.com",
        subject: `Nuevo pedido web de ${headerSafe(customer.name)}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 760px; margin: 0 auto; color: #111;">
            <h1>Nuevo pedido web</h1>

            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
              <h2 style="margin-top: 0;">Cliente</h2>
              <p><strong>Nombre:</strong> ${escapeHtml(customer.name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(customer.email)}</p>
              <p><strong>Telefono:</strong> ${escapeHtml(customer.phone || "No proporcionado")}</p>
              <p><strong>Recogida:</strong> ${escapeHtml(customer.pickupDate || "No indicada")}</p>
              <p><strong>Devolucion:</strong> ${escapeHtml(customer.returnDate || "No indicada")}</p>
              <p><strong>Delivery:</strong> ${customer.delivery === "yes" ? "Si" : "No"}</p>
            </div>

            <h2>Productos solicitados</h2>
            <table style="border-collapse: collapse; width: 100%; margin-bottom: 24px;">
              <thead>
                <tr>
                  <th style="padding: 10px; border-bottom: 2px solid #111; text-align: left;">Marca</th>
                  <th style="padding: 10px; border-bottom: 2px solid #111; text-align: left;">Producto</th>
                  <th style="padding: 10px; border-bottom: 2px solid #111; text-align: left;">Categoria</th>
                  <th style="padding: 10px; border-bottom: 2px solid #111; text-align: center;">Cantidad</th>
                  <th style="padding: 10px; border-bottom: 2px solid #111; text-align: right;">Precio</th>
                  <th style="padding: 10px; border-bottom: 2px solid #111; text-align: left;">Tipo</th>
                </tr>
              </thead>
              <tbody>${itemsRows}</tbody>
            </table>

            <p><strong>Días de alquiler:</strong> ${days ?? "Sin fechas (total calculado por 1 día)"}</p>
            <p><strong>Total estimado:</strong> ${escapeHtml(estimatedTotal)}€ ex. IVA</p>

            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
              <h2 style="margin-top: 0;">Comentarios</h2>
              <p style="white-space: pre-wrap;">${escapeHtml(customer.comments || "Sin comentarios")}</p>
            </div>
          </div>
        `,
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { emailSent: true },
      });
    } catch (emailError) {
      console.error("Error sending order email after retries:", emailError);
      // No fallamos la petición si el email falla tras los reintentos: el pedido ya está guardado en la base de datos.
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json(
      { error: "Error sending order" },
      { status: 500 }
    );
  }
}
export const dynamic = 'force-dynamic';
