import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import BrandLogoSlider from "@/components/BrandLogoSlider";
import FeaturedProducts from "@/components/FeaturedProducts";
import HomeIntro from "@/components/HomeIntro";
import HomeFeatureSections from "@/components/HomeFeatureSections";

export const metadata = {
  title: "CLAMP Light Rental - Professional Lighting Rental",
  description:
    "High-end lighting rental for events, productions, and premium projects. Professional equipment and expert support.",
  keywords: "lighting, rental, events, production, professional",
  openGraph: {
    title: "CLAMP Light Rental",
    description: "Professional lighting rental for film, photo, and event production",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSlider />
        <HomeIntro />
        <FeaturedProducts />
        <HomeFeatureSections />
      </main>
      <BrandLogoSlider />
      <Footer />
    </>
  );
}
