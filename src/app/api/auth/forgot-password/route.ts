import { randomBytes, createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getClientIp, isRateLimited } from "@/lib/rateLimit";
import { sendMailWithRetry } from "@/lib/email";
import { escapeHtml } from "@/lib/formSecurity";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    if (isRateLimited(`forgot:${getClientIp(request)}`, 3, 60 * 60 * 1000)) {
      return NextResponse.json({ success: true });
    }

    const { email } = await request.json();
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!normalizedEmail) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({
      where: { email: normalizedEmail },
      select: { id: true, email: true, name: true },
    });

    if (!admin) {
      return NextResponse.json({ success: true });
    }

    await prisma.passwordResetToken.deleteMany({
      where: {
        adminId: admin.id,
        usedAt: null,
      },
    });

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.passwordResetToken.create({
      data: {
        adminId: admin.id,
        tokenHash: hashToken(token),
        expiresAt,
      },
    });

    // Dominio fijo: el enlace nunca depende de la cabecera Host de la petición.
    const resetUrl = new URL("/admin/reset-password", SITE_URL);
    resetUrl.searchParams.set("token", token);

    await sendMailWithRetry({
      from: "CLAMP Admin <web@mail.clamp-lightrental.com>",
      to: admin.email,
      subject: "Recuperar contraseña del panel CLAMP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <h1>Recuperar contraseña</h1>
          <p>Hola ${escapeHtml(admin.name)},</p>
          <p>Hemos recibido una solicitud para cambiar la contraseña del panel de administración de CLAMP.</p>
          <p>
            <a href="${escapeHtml(resetUrl.toString())}" style="display: inline-block; background: #ffed00; color: #000; padding: 12px 18px; border-radius: 999px; font-weight: bold; text-decoration: none;">
              Cambiar contraseña
            </a>
          </p>
          <p>Este enlace caduca en 1 hora. Si no has pedido este cambio, puedes ignorar este email.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "No se pudo enviar el email de recuperación." },
      { status: 500 }
    );
  }
}
