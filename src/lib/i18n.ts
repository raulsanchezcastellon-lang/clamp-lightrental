export type Language = "es" | "en";

export const LANGUAGES: Language[] = ["es", "en"];
export const DEFAULT_LANGUAGE: Language = "es";

/**
 * Rutas en español (raíz del sitio) y su equivalente en inglés (/en/...).
 * El español vive en la raíz; el inglés, que es el idioma de la mayoría de
 * clientes (productoras extranjeras), vive bajo /en con URLs en inglés.
 */
const ROUTE_PAIRS: Array<[es: string, en: string]> = [
  ["/", "/en"],
  ["/catalogo", "/en/catalog"],
  ["/store", "/en/store"],
  ["/about", "/en/about"],
  ["/contacto", "/en/contact"],
  ["/pedido", "/en/order"],
  ["/alquiler-iluminacion-alicante", "/en/lighting-rental-alicante"],
  ["/alquiler-iluminacion-rodajes-cine", "/en/film-lighting-rental"],
];

/** Prefijos de rutas dinámicas: /producto/[slug] <-> /en/product/[slug]. */
const PREFIX_PAIRS: Array<[es: string, en: string]> = [["/producto/", "/en/product/"]];

/** Páginas que solo existen en español (legales). */
const SPANISH_ONLY = ["/aviso-legal", "/privacidad", "/cookies"];

function stripTrailingSlash(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

export function getLanguageFromPath(pathname: string | null | undefined): Language {
  if (!pathname) return DEFAULT_LANGUAGE;
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

/** Convierte una ruta española a su versión en el idioma pedido. */
export function localizePath(esPath: string, language: Language): string {
  const [pathOnly, query = ""] = esPath.split("?");
  const suffix = query ? `?${query}` : "";
  const path = stripTrailingSlash(pathOnly);

  if (language === "es") return `${path}${suffix}`;

  const pair = ROUTE_PAIRS.find(([es]) => es === path);
  if (pair) return `${pair[1]}${suffix}`;

  const prefix = PREFIX_PAIRS.find(([es]) => path.startsWith(es));
  if (prefix) return `${prefix[1]}${path.slice(prefix[0].length)}${suffix}`;

  // Sin traducción (p. ej. páginas legales): se mantiene la española.
  return `${path}${suffix}`;
}

/** Devuelve la ruta equivalente de la página actual en el otro idioma. */
export function switchLanguagePath(pathname: string, target: Language): string {
  const path = stripTrailingSlash(pathname || "/");
  const current = getLanguageFromPath(path);
  if (current === target) return path;

  if (target === "en") {
    if (SPANISH_ONLY.includes(path)) return "/en";
    return localizePath(path, "en");
  }

  const pair = ROUTE_PAIRS.find(([, en]) => en === path);
  if (pair) return pair[0];

  const prefix = PREFIX_PAIRS.find(([, en]) => path.startsWith(en));
  if (prefix) return `${prefix[0]}${path.slice(prefix[1].length)}`;

  return "/";
}

export function hasEnglishVersion(esPath: string) {
  const path = stripTrailingSlash(esPath);
  return (
    ROUTE_PAIRS.some(([es]) => es === path) ||
    PREFIX_PAIRS.some(([es]) => path.startsWith(es))
  );
}

/**
 * Alternates para hreflang. x-default apunta al inglés porque la mayoría de
 * visitantes internacionales no hablan español.
 */
export function languageAlternates(esPath: string) {
  const es = localizePath(esPath, "es");
  const en = localizePath(esPath, "en");
  return {
    es,
    en,
    "x-default": en,
  };
}

/**
 * Las categorías se guardan en inglés en la base de datos. Para mostrarlas en
 * español se traducen aquí; si aparece una nueva sin traducción, se muestra tal cual.
 */
const CATEGORY_LABELS_ES: Record<string, string> = {
  Lights: "Focos",
  Modifiers: "Modificadores",
  Accessories: "Accesorios",
  Power: "Energía",
  Grip: "Grip",
  Camera: "Cámara",
  Consumables: "Consumibles",
  Others: "Otros",
};

export function categoryLabel(category: string | null | undefined, language: Language) {
  if (!category) return "";
  return language === "es" ? CATEGORY_LABELS_ES[category] ?? category : category;
}
