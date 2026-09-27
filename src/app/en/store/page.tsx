import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCatalog from "@/components/ProductCatalog";
import ContactCta from "@/components/ContactCta";
import { createPageMetadata } from "@/lib/seo";
import { getPublicProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Store",
  description:
    "Buy production consumables and lighting accessories from CLAMP Light Rental in Alicante, Spain.",
  path: "/store",
  lang: "en",
});

export default async function StoreEn() {
  const products = await getPublicProducts({ listingType: "sale" }).catch(() => []);

  return (
    <>
      <Header />
      <ProductCatalog
        listingType="sale"
        title="Store"
        emptyText="No store products found."
        initialProducts={products}
      />
      <ContactCta />
      <Footer />
    </>
  );
}
