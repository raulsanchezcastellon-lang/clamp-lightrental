/**
 * Convierte un texto libre en un slug URL-safe: minúsculas, sin acentos,
 * espacios y símbolos convertidos en guiones.
 * "Aputure 600D" -> "aputure-600d"
 */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos (á, é, ñ -> n, etc.)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Construye la base del slug de un producto a partir de marca + nombre,
 * evitando duplicar la marca si el nombre ya la incluye
 * (p.ej. name: "Aputure 600D" con brand: "Aputure").
 */
export function buildProductSlugBase({
  brand,
  name,
}: {
  brand?: string | null;
  name: string;
}): string {
  const normalizedName = name.trim();
  const normalizedBrand = brand?.trim();

  if (
    normalizedBrand &&
    !normalizedName.toLowerCase().startsWith(normalizedBrand.toLowerCase())
  ) {
    return slugify(`${normalizedBrand} ${normalizedName}`);
  }

  return slugify(normalizedName);
}
