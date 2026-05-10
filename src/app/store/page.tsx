import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCatalog from "@/components/ProductCatalog";
import ContactCta from "@/components/ContactCta";

export default function StorePage() {
  return (
    <>
      <Header />
      <ProductCatalog
        listingType="sale"
        title="Store"
        emptyText="No store products found."
      />
      <ContactCta />
      <Footer />
    </>
  );
}
