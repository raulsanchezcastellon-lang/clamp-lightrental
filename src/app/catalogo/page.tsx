import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCatalog from "@/components/ProductCatalog";
import ContactCta from "@/components/ContactCta";
import { createPageMetadata } from "@/lib/seo";
import { getPublicProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Catálogo de Equipos",
  description:
    "Consulta el catálogo de CLAMP Light Rental: iluminación profesional LED, grip, alimentación y accesorios en alquiler para producciones de foto y vídeo.",
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
