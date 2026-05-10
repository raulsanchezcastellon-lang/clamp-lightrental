import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const publicRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/catalogo", changeFrequency: "weekly", priority: 0.95 },
  { path: "/store", changeFrequency: "weekly", priority: 0.75 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contacto", changeFrequency: "monthly", priority: 0.8 },
  { path: "/aviso-legal", changeFrequency: "yearly", priority: 0.2 },
  { path: "/privacidad", changeFrequency: "yearly", priority: 0.2 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.2 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.map((route) => ({
    url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
