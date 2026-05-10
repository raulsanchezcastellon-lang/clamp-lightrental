import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "API",
  description: "CLAMP Light Rental API routes.",
  path: "/api",
  noIndex: true,
});

export default function ApiLayout({ children }: { children: ReactNode }) {
  return children;
}
