/**
 * Utilidades compartidas por los formularios públicos (contacto y pedido).
 */

/** Nombre del campo trampa: invisible para personas, los bots suelen rellenarlo. */
export const HONEYPOT_FIELD = "website";

export function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Texto limpio para usar en cabeceras de email (sin saltos de línea ni comillas). */
export function headerSafe(value: string) {
  return value.replace(/[\r\n"<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, 80);
}

export function isFilledHoneypot(data: unknown) {
  if (!data || typeof data !== "object") return false;
  const value = (data as Record<string, unknown>)[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim() !== "";
}
