import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCatalog from "@/components/ProductCatalog";
import ContactCta from "@/components/ContactCta";
import { createPageMetadata } from "@/lib/seo";
import { getPublicProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Lighting Equipment Catalog",
  description:
    "Rent LED lights, grip and power in Alicante, Spain: Aputure, Nanlite, Astera, Amaran, Godox and more. Daily rates, delivered to your set on the Costa Blanca.",
  path: "/catalogo",
  lang: "en",
});

export default async function CatalogEn() {
  const products = await getPublicProducts({ listingType: "rental" }).catch(() => []);

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
