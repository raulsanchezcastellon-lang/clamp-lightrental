import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

export const dynamic = "force-dynamic";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();
    const resetToken = typeof token === "string" ? token.trim() : "";
    const newPassword = typeof password === "string" ? password : "";

    if (!resetToken || newPassword.length < 8) {
      return NextResponse.json(
        { error: "El enlace no es válido o la contraseña es demasiado corta." },
        { status: 400 }
      );
    }

    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: {
        tokenHash: hashToken(resetToken),
        usedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      select: {
        id: true,
        adminId: true,
      },
    });

    if (!passwordResetToken) {
      return NextResponse.json(
        { error: "Este enlace ha caducado o ya se ha utilizado." },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.admin.update({
      where: { id: passwordResetToken.adminId },
      data: { password: hashedPassword },
    });
    await prisma.passwordResetToken.update({
      where: { id: passwordResetToken.id },
      data: { usedAt: new Date() },
    });
    await prisma.passwordResetToken.deleteMany({
      where: {
        adminId: passwordResetToken.adminId,
        id: { not: passwordResetToken.id },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "No se pudo cambiar la contraseña." },
      { status: 500 }
    );
  }
}
