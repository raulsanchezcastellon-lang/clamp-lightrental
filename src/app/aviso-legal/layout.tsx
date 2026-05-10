import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Legal Notice",
  description:
    "Legal notice and website ownership information for CLAMP Light Rental.",
  path: "/aviso-legal",
});

export default function AvisoLegalLayout({ children }: { children: ReactNode }) {
  return children;
}
