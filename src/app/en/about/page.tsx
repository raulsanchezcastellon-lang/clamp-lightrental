import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutContent from "@/components/AboutContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Us",
  description:
    "CLAMP Light Rental: lighting rental house in Alicante, Spain, supplying gear, delivery to set and English-speaking lighting crew to international productions.",
  path: "/about",
  lang: "en",
});

export default function AboutEn() {
  return (
    <>
      <Header />
      <AboutContent />
      <Footer />
    </>
  );
}
