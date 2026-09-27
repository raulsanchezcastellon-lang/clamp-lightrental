import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import BrandLogoSlider from "@/components/BrandLogoSlider";
import FeaturedProducts from "@/components/FeaturedProducts";
import HomeIntro from "@/components/HomeIntro";
import HomeFeatureSections from "@/components/HomeFeatureSections";
import { createPageMetadata } from "@/lib/seo";
import { getPublicProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Film Lighting Rental in Alicante, Spain",
  description:
    "Film and photo lighting rental in Alicante for international productions shooting on the Costa Blanca. Gear delivered to set and collected after wrap, English-speaking crew on request.",
  path: "/",
  lang: "en",
});

export default async function HomeEn() {
  const featuredProducts = await getPublicProducts({
    listingType: "rental",
    featured: true,
    limit: 8,
  }).catch(() => []);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSlider />
        <HomeIntro />
        <FeaturedProducts initialProducts={featuredProducts} />
        <HomeFeatureSections />
      </main>
      <BrandLogoSlider />
      <Footer />
    </>
  );
}
