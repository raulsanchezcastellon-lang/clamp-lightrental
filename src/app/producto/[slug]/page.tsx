import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCta from "@/components/ContactCta";
import ProductDetailActions from "@/components/ProductDetailActions";
import { createPageMetadata, SITE_URL } from "@/lib/seo";
import { getPublicProductBySlug } from "@/lib/products";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);

  if (!product) {
    return createPageMetadata({
      title: "Producto no encontrado",
      description: "Este producto ya no está disponible en nuestro catálogo.",
      path: `/producto/${slug}`,
      noIndex: true,
      locale: "es_ES",
    });
  }

  const brandPart = product.brand ? `${product.brand} ` : "";
  const title = `Alquiler de ${brandPart}${product.name} en Alicante`;
  const description = product.description
    ? `${product.description} Alquiler en Alicante, Murcia y Valencia, con entrega y soporte técnico.`.slice(
        0,
        300
      )
    : `Alquila ${brandPart}${product.name} en Alicante. Material profesional de iluminación con entrega y soporte técnico en Alicante, Murcia y Valencia.`;

  return createPageMetadata({
    title,
    description,
    path: `/producto/${product.slug}`,
    image: product.image,
    locale: "es_ES",
  });
}

export default async function ProductoPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    category: product.category,
    description:
      product.description ||
      `Alquiler de ${product.name} en Alicante, Murcia y Valencia.`,
    image: product.image ? `${SITE_URL}${product.image}` : undefined,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/producto/${product.slug}`,
      priceCurrency: "EUR",
      price: product.price || undefined,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-[#f7f7f4] text-black">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.08em] text-black/45"
          >
            <Link href="/catalogo" className="hover:text-black hover:underline">
              Catálogo
            </Link>
            <span aria-hidden="true">/</span>
            <span>{product.category}</span>
            <span aria-hidden="true">/</span>
            <span className="text-black/70">{product.name}</span>
          </nav>

          {/* Hero */}
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div className="flex aspect-square items-center justify-center rounded-lg border border-black/10 bg-white p-8">
              {product.image ? (
                <img
                  src={product.image}
                  alt={[product.brand, product.name, product.category]
                    .filter(Boolean)
                    .join(" - ")}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-medium uppercase tracking-[0.08em] text-black/35">
                  Sin imagen
                </div>
              )}
            </div>

            <div>
              {product.brand && (
                <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-black/50">
                  {product.brand}
                </p>
              )}
              <h1 className="text-3xl font-black uppercase leading-tight tracking-[0.01em] sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.08em] text-black/50">
                {product.category}
              </p>

              <p className="mt-4 text-lg font-black text-black">
                {product.price ? (
                  <>
                    {product.price}€{" "}
                    <span className="text-sm font-medium text-black/45">/ día</span>
                  </>
                ) : (
                  "Precio bajo consulta"
                )}
              </p>

              {product.description && (
                <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-black/65">
                  {product.description}
                </p>
              )}

              <ProductDetailActions product={product} listingType="rental" />
            </div>
          </div>

          {/* Especificaciones */}
          {product.specs && product.specs.length > 0 && (
            <div className="mt-16 max-w-2xl border-t border-black/10 pt-10">
              <h2 className="text-2xl font-black uppercase tracking-wide">
                Especificaciones
              </h2>
              <ul className="mt-4 space-y-2">
                {product.specs.map((spec) => (
                  <li
                    key={spec}
                    className="flex items-start gap-2 text-base text-black/65"
                  >
                    <span aria-hidden="true" className="mt-2 h-1 w-1 rounded-full bg-black/40" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Confianza / enlace a la flagship */}
          <div className="mt-16 max-w-2xl border-t border-black/10 pt-10">
            <h2 className="text-2xl font-black uppercase tracking-wide">
              Alquiler con soporte técnico incluido
            </h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-black/65">
              Entregamos y recogemos el material en Alicante, Murcia y la Comunidad
              Valenciana, y si lo necesitas te conectamos con un gaffer o asistente
              digital que conoce el equipo. Consulta más detalles sobre{" "}
              <Link
                href="/alquiler-iluminacion-alicante"
                className="underline underline-offset-4 hover:no-underline"
              >
                nuestro servicio de alquiler de iluminación en Alicante
              </Link>{" "}
              o revisa{" "}
              <Link
                href="/catalogo"
                className="underline underline-offset-4 hover:no-underline"
              >
                el resto del catálogo
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <ContactCta />
      <Footer />
    </>
  );
}
