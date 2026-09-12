import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCatalog from "@/components/ProductCatalog";
import ContactCta from "@/components/ContactCta";
import { createPageMetadata } from "@/lib/seo";
import { getPublicProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Tienda",
  description:
    "Compra equipo de iluminación y accesorios de producción seleccionados en la tienda de CLAMP Light Rental.",
  path: "/store",
});

export default async function StorePage() {
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
