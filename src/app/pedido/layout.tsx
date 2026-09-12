import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Solicitud de Presupuesto",
  description:
    "Envía tu listado de equipo, fechas y detalles de producción a CLAMP Light Rental para confirmar disponibilidad.",
  path: "/pedido",
  noIndex: true,
});

export default function PedidoLayout({ children }: { children: ReactNode }) {
  return children;
}
