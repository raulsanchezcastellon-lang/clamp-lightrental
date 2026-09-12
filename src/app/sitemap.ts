import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllProductSlugs } from "@/lib/products";

const publicRoutes = [
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
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = publicRoutes.map((route) => ({
    url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Si falla la consulta a la base de datos, no rompemos el sitemap entero:
  // devolvemos al menos las rutas estáticas.
  const productSlugs = await getAllProductSlugs().catch(() => []);

  const productEntries: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${SITE_URL}/producto/${slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticEntries, ...productEntries];
}
