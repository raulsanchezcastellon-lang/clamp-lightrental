import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contacto",
  description:
    "Contacta con CLAMP Light Rental para presupuestos de alquiler de iluminación, disponibilidad, entrega y soporte técnico para tu producción.",
  path: "/contacto",
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
