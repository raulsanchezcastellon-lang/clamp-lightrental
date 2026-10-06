import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = createPageMetadata({
  title: "Política de Privacidad",
  description:
    "Política de privacidad de CLAMP Light Rental: finalidades del tratamiento de datos, derechos y contacto.",
  path: "/privacidad",
});

export default function PrivacidadLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
