import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type OrderItem = {
  id: string;
  name: string;
  brand?: string;
  category?: string;
  price: number;
  listingType?: string;
  quantity: number;
};

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const customer = data.customer || {};
    const items: OrderItem[] = Array.isArray(data.items) ? data.items : [];

    if (!customer.name || !customer.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    if (items.length === 0) {
      return NextResponse.json(
        { error: "The request cart is empty" },
        { status: 400 }
      );
    }

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

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${escapeHtml(customer.name)}" <${process.env.SMTP_USER}>`,
      replyTo: customer.email,
      to: "raul@clamp-lightrental.com",
      subject: `Nuevo pedido web de ${customer.name}`,
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

          <p><strong>Total estimado:</strong> ${escapeHtml(data.estimatedTotal)}€ ex. IVA</p>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
            <h2 style="margin-top: 0;">Comentarios</h2>
            <p style="white-space: pre-wrap;">${escapeHtml(customer.comments || "Sin comentarios")}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Order email error:", error);
    return NextResponse.json(
      { error: "Error sending order" },
      { status: 500 }
    );
  }
}
export const dynamic = 'force-dynamic';
