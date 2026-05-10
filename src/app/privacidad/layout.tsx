import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for CLAMP Light Rental, including data processing purposes, rights and contact information.",
  path: "/privacidad",
});

export default function PrivacidadLayout({ children }: { children: ReactNode }) {
  return children;
}
