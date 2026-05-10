import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCatalog from "@/components/ProductCatalog";
import ContactCta from "@/components/ContactCta";

export default function Catalogo() {
  return (
    <>
      <Header />
      <ProductCatalog
        listingType="rental"
        title="Equipment Catalog"
        emptyText="No rental equipment found."
      />
      <ContactCta />
      <Footer />
    </>
  );
}
