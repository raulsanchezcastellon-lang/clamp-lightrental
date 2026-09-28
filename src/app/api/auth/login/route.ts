import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/password";
import { createToken } from "@/lib/auth";
import { getClientIp, isRateLimited } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  try {
    if (isRateLimited(`login:${getClientIp(request)}`, 10, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Demasiados intentos. Espera unos minutos." },
        { status: 429 }
      );
    }

    const { email, password } = await request.json();

    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Email o contraseña incorrectos" }, { status: 401 });
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Email o contraseña incorrectos" },
        { status: 401 }
      );
    }

    const validPassword = await verifyPassword(password, admin.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Email o contraseña incorrectos" },
        { status: 401 }
      );
    }

    const token = createToken(admin.id);

    const response = NextResponse.json({ success: true });
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
