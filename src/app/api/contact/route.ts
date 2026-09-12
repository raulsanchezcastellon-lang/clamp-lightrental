import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendMailWithRetry } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Save to database
    const message = await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
      },
    });

    // Send email
    try {
      await sendMailWithRetry({
        from: `"${data.name} (formulario web)" <web@mail.clamp-lightrental.com>`,
        replyTo: data.email,
        to: "raul@clamp-lightrental.com",
        subject: `Nuevo mensaje de contacto de ${data.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #000;">Nuevo mensaje de contacto</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
              <p><strong>Nombre:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Teléfono:</strong> ${data.phone || "No proporcionado"}</p>
              <p><strong>Mensaje:</strong></p>
              <p style="white-space: pre-wrap;">${data.message}</p>
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

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
export const dynamic = 'force-dynamic';
