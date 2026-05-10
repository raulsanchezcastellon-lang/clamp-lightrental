import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutContent from "@/components/AboutContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About CLAMP Light Rental",
  description:
    "Meet CLAMP Light Rental: professional lighting equipment rental, technical crew, delivery and production support for photo and video shoots.",
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
