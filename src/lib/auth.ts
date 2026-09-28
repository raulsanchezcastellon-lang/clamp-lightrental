import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Sin JWT_SECRET no hay sesiones: nunca se usa un valor por defecto, porque
 * cualquiera que lo conociera podría fabricarse una sesión de administrador.
 */
function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("JWT_SECRET is missing or too short (min. 16 characters).");
  }
  return secret;
}

export function createToken(adminId: string): string {
  return jwt.sign({ adminId }, getJwtSecret(), { expiresIn: "7d" });
}

export async function verifyToken(token: string) {
  try {
    return jwt.verify(token, getJwtSecret()) as { adminId: string; iat: number; exp: number };
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
