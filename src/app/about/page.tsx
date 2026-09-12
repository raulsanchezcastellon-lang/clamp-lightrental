import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutContent from "@/components/AboutContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Sobre Nosotros",
  description:
    "Conoce CLAMP Light Rental: alquiler de equipos de iluminación, equipo técnico, entrega y soporte para producciones de foto y vídeo.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutContent />
      <Footer />
    </>
  );
}
