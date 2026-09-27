import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllProductSlugs } from "@/lib/products";
import { hasEnglishVersion, localizePath } from "@/lib/i18n";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

// Rutas en español (referencia). Las que tienen versión inglesa se publican
// también en /en/... con sus hreflang.
const publicRoutes: Array<{ path: string; changeFrequency: ChangeFrequency; priority: number }> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/alquiler-iluminacion-alicante", changeFrequency: "monthly", priority: 0.95 },
  { path: "/alquiler-iluminacion-rodajes-cine", changeFrequency: "monthly", priority: 0.9 },
  { path: "/catalogo", changeFrequency: "weekly", priority: 0.95 },
  { path: "/store", changeFrequency: "weekly", priority: 0.75 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contacto", changeFrequency: "monthly", priority: 0.8 },
  { path: "/aviso-legal", changeFrequency: "yearly", priority: 0.2 },
  { path: "/privacidad", changeFrequency: "yearly", priority: 0.2 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.2 },
];

const absolute = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

function entriesFor(
  esPath: string,
  lastModified: Date,
  changeFrequency: ChangeFrequency,
  priority: number
): MetadataRoute.Sitemap {
  if (!hasEnglishVersion(esPath)) {
    return [{ url: absolute(esPath), lastModified, changeFrequency, priority }];
  }

  const es = absolute(localizePath(esPath, "es"));
  const en = absolute(localizePath(esPath, "en"));
  const alternates = { languages: { es, en, "x-default": en } };

  return [
    { url: en, lastModified, changeFrequency, priority, alternates },
    { url: es, lastModified, changeFrequency, priority, alternates },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries = publicRoutes.flatMap((route) =>
    entriesFor(route.path, lastModified, route.changeFrequency, route.priority)
  );

  // Si falla la consulta a la base de datos, no rompemos el sitemap entero:
  // devolvemos al menos las rutas estáticas.
  const productSlugs = await getAllProductSlugs().catch(() => []);

  const productEntries = productSlugs.flatMap((slug) =>
    entriesFor(`/producto/${slug}`, lastModified, "weekly", 0.6)
  );

  return [...staticEntries, ...productEntries];
}
