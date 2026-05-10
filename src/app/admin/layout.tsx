import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Admin",
  description: "CLAMP Light Rental administration area.",
  path: "/admin",
  noIndex: true,
});

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
