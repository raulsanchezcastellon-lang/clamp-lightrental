import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Request Cart",
  description:
    "Send your selected CLAMP Light Rental equipment list, dates and production details for availability confirmation.",
  path: "/pedido",
  noIndex: true,
});

export default function PedidoLayout({ children }: { children: ReactNode }) {
  return children;
}
