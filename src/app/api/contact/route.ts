import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { sendMailWithRetry } from "@/lib/email";
import { escapeHtml, headerSafe, isFilledHoneypot } from "@/lib/formSecurity";
import { getClientIp, isRateLimited } from "@/lib/rateLimit";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().max(200).pipe(z.email()),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(5000),
});

export async function POST(request: NextRequest) {
  try {
    if (isRateLimited(`contact:${getClientIp(request)}`, 5, 10 * 60 * 1000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await request.json().catch(() => null);

    // Bot que ha rellenado el campo trampa: respondemos OK sin guardar ni enviar nada.
    if (isFilledHoneypot(body)) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const data = parsed.data;

    // Guardamos primero, para que el mensaje no se pierda si falla el email.
    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
      },
    });

    try {
      await sendMailWithRetry({
        from: `"${headerSafe(data.name)} (formulario web)" <web@mail.clamp-lightrental.com>`,
        replyTo: data.email,
        to: "raul@clamp-lightrental.com",
        subject: `Nuevo mensaje de contacto de ${headerSafe(data.name)}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #000;">Nuevo mensaje de contacto</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
              <p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
              <p><strong>Teléfono:</strong> ${escapeHtml(data.phone || "No proporcionado")}</p>
              <p><strong>Mensaje:</strong></p>
              <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
            </div>
            <p style="color: #666; font-size: 12px; margin-top: 20px;">
              Este mensaje fue enviado desde el formulario de contacto de CLAMP Light Rental.
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Error sending email after retries:", emailError);
      // No fallamos la petición si el email falla tras los reintentos: el mensaje ya está guardado en la base de datos.
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
