import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Política de Cookies",
  description:
    "Política de cookies de CLAMP Light Rental: tipos de cookies, finalidades y opciones de gestión en el navegador.",
  path: "/cookies",
});

export default function CookiesLayout({ children }: { children: ReactNode }) {
  return children;
}
