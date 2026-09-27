import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function createToken(adminId: string): string {
  return jwt.sign({ adminId }, JWT_SECRET, { expiresIn: "7d" });
}

export async function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { adminId: string; iat: number; exp: number };
  } catch (error) {
    return null;
  }
}

export async function getAdminFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) return null;

  return verifyToken(token);
}

/**
 * Para rutas de API que modifican datos: devuelve una respuesta 401 si no hay
 * sesión de administrador válida, o null si se puede continuar.
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const admin = await getAdminFromToken();
  return admin ? null : NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

/** Normaliza el campo specs: lista de textos no vacíos ("Etiqueta: valor"). */
export function normalizeSpecs(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 40);
}
