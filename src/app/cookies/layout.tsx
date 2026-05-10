import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Cookie Policy",
  description:
    "Cookie policy for CLAMP Light Rental, including cookie types, purposes and browser management options.",
  path: "/cookies",
});

export default function CookiesLayout({ children }: { children: ReactNode }) {
  return children;
}
