import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Get a lighting rental quote in Alicante, Spain. Send your shoot dates, location and gear list and we reply in English with availability, delivery and crew options.",
  path: "/contacto",
  lang: "en",
});

export default function ContactLayoutEn({ children }: { children: ReactNode }) {
  return children;
}
