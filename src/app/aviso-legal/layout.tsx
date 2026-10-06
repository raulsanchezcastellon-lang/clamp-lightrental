import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = createPageMetadata({
  title: "Aviso Legal",
  description:
    "Aviso legal e información de titularidad del sitio web de CLAMP Light Rental.",
  path: "/aviso-legal",
});

export default function AvisoLegalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
