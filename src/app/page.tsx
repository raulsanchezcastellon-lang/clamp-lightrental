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
  title: "CLAMP Light Rental | Lighting Equipment Rental in Alicante",
  description:
    "CLAMP Light Rental rents professional lighting, grip and power equipment for photography, video, advertising shoots and production crews in Alicante.",
  path: "/",
});

export default async function Home() {
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
