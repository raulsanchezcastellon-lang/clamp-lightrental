import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // /api/uploads sirve fotos de producto: Google debe poder verlas.
      allow: ["/", "/api/uploads/"],
      disallow: ["/admin", "/api", "/pedido", "/en/order"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
