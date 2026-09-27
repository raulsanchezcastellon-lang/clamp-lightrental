import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Quote Request",
  description:
    "Send your equipment list, shoot dates and production details to CLAMP Light Rental to confirm availability.",
  path: "/pedido",
  noIndex: true,
  lang: "en",
});

export default function OrderLayoutEn({ children }: { children: ReactNode }) {
  return children;
}
