import { randomBytes, createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getSmtpTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("SMTP_USER and SMTP_PASS are required for password recovery.");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
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

    const resetUrl = new URL("/admin/reset-password", request.nextUrl.origin);
    resetUrl.searchParams.set("token", token);

    const transporter = getSmtpTransporter();
    await transporter.sendMail({
      from: `"CLAMP Admin" <${process.env.SMTP_USER}>`,
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
