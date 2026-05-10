import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact CLAMP Light Rental for lighting equipment rental quotes, availability, delivery options and technical support for your production.",
  path: "/contacto",
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
