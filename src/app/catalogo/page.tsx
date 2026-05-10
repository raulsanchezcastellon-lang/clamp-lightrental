import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCatalog from "@/components/ProductCatalog";
import ContactCta from "@/components/ContactCta";
import { createPageMetadata } from "@/lib/seo";
import { getPublicProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Equipment Catalog",
  description:
    "Browse CLAMP Light Rental's professional lighting, grip, LED, power and accessories catalog for photo and video productions.",
  path: "/catalogo",
});

export default async function Catalogo() {
  const products = await getPublicProducts({ listingType: "rental" }).catch(
    () => []
  );

  return (
    <>
      <Header />
      <ProductCatalog
        listingType="rental"
        title="Equipment Catalog"
        emptyText="No rental equipment found."
        initialProducts={products}
      />
      <ContactCta />
      <Footer />
    </>
  );
}
