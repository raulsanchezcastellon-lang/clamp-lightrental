import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCta from "@/components/ContactCta";
import ProductDetailActions from "@/components/ProductDetailActions";
import { createPageMetadata, SITE_URL } from "@/lib/seo";
import { getPublicProductBySlug } from "@/lib/products";
import { localizePath, type Language } from "@/lib/i18n";
import { parseSpecs } from "@/lib/specs";

const COPY = {
  es: {
    notFoundTitle: "Producto no encontrado",
    notFoundDescription: "Este producto ya no está disponible en nuestro catálogo.",
    title: (name: string) => `Alquiler de ${name} en Alicante`,
    description: (name: string) =>
      `Alquila ${name} en Alicante. Material profesional de iluminación con entrega en set, recogida y soporte técnico en Alicante, Murcia y Valencia.`,
    descriptionSuffix: " Alquiler en Alicante, Murcia y Valencia, con entrega y soporte técnico.",
    jsonLdFallback: (name: string) => `Alquiler de ${name} en Alicante, Murcia y Valencia.`,
    catalog: "Catálogo",
    noImage: "Sin imagen",
    perDay: "/ día",
    priceOnRequest: "Precio bajo consulta",
    specs: "Especificaciones",
    serviceTitle: "Alquiler con soporte técnico incluido",
    serviceText:
      "Entregamos y recogemos el material en Alicante, Murcia y la Comunidad Valenciana, y si lo necesitas te conectamos con un gaffer o asistente digital que conoce el equipo. Consulta más detalles sobre",
    serviceLink: "nuestro servicio de alquiler de iluminación en Alicante",
    serviceOr: "o revisa",
    catalogLink: "el resto del catálogo",
  },
  en: {
    notFoundTitle: "Product not found",
    notFoundDescription: "This item is no longer available in our catalog.",
    title: (name: string) => `${name} Rental in Alicante, Spain`,
    description: (name: string) =>
      `Rent the ${name} in Alicante, Spain. Delivered to your set, collected after wrap, with English-speaking lighting crew available for international productions on the Costa Blanca.`,
    descriptionSuffix:
      " Rental in Alicante, Spain — delivered to set and collected after wrap, with English-speaking crew available.",
    jsonLdFallback: (name: string) => `${name} rental in Alicante, Spain, delivered to set.`,
    catalog: "Catalog",
    noImage: "No image",
    perDay: "/ day",
    priceOnRequest: "Price on request",
    specs: "Specifications",
    serviceTitle: "Delivered to set, with crew if you need it",
    serviceText:
      "We deliver the gear to your location and collect it after wrap anywhere on the Costa Blanca, Murcia and Valencia. If your crew is travelling light, we can add an English-speaking gaffer or lighting technician who knows the kit. Read more about",
    serviceLink: "lighting rental in Alicante for visiting productions",
    serviceOr: "or browse",
    catalogLink: "the full catalog",
  },
} as const;

export async function generateProductMetadata(slug: string, lang: Language): Promise<Metadata> {
  const c = COPY[lang];
  const product = await getPublicProductBySlug(slug);

  if (!product) {
    return createPageMetadata({
      title: c.notFoundTitle,
      description: c.notFoundDescription,
      path: `/producto/${slug}`,
      noIndex: true,
      lang,
    });
  }

  const fullName = `${product.brand ? `${product.brand} ` : ""}${product.name}`;
  const description = product.description
    ? `${product.description}${c.descriptionSuffix}`.slice(0, 300)
    : c.description(fullName);

  return createPageMetadata({
    title: c.title(fullName),
    description,
    path: `/producto/${product.slug}`,
    image: product.image,
    lang,
  });
}

export default async function ProductPageView({ slug, lang }: { slug: string; lang: Language }) {
  const c = COPY[lang];
  const product = await getPublicProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const specRows = parseSpecs(product.specs, lang);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    category: product.category,
    description:
      product.description ||
      c.jsonLdFallback(product.name),
    image: product.image ? `${SITE_URL}${product.image}` : undefined,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}${localizePath(`/producto/${product.slug}`, lang)}`,
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
            <Link href={localizePath("/catalogo", lang)} className="hover:text-black hover:underline">
              {c.catalog}
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
                  {c.noImage}
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
                    <span className="text-sm font-medium text-black/45">{c.perDay}</span>
                  </>
                ) : (
                  c.priceOnRequest
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
          {specRows.length > 0 && (
            <div className="mt-16 max-w-3xl border-t border-black/10 pt-10">
              <h2 className="text-2xl font-black uppercase tracking-wide">
                {c.specs}
              </h2>
              <dl className="mt-6 divide-y divide-black/10 border-y border-black/10">
                {specRows.map((row, index) =>
                  row.label ? (
                    <div
                      key={`${row.label}-${index}`}
                      className="grid gap-1 py-3 sm:grid-cols-[200px_1fr] sm:gap-6"
                    >
                      <dt className="text-xs font-black uppercase tracking-[0.12em] text-black/45">
                        {row.label}
                      </dt>
                      <dd className="text-base font-medium text-black/80">{row.value}</dd>
                    </div>
                  ) : (
                    <div key={`spec-${index}`} className="py-3 text-base font-medium text-black/80">
                      {row.value}
                    </div>
                  )
                )}
              </dl>
            </div>
          )}

          {/* Confianza / servicio */}
          <div className="mt-16 max-w-2xl border-t border-black/10 pt-10">
            <h2 className="text-2xl font-black uppercase tracking-wide">
              {c.serviceTitle}
            </h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-black/65">
              {c.serviceText}{" "}
              <Link
                href={localizePath("/alquiler-iluminacion-alicante", lang)}
                className="underline underline-offset-4 hover:no-underline"
              >
                {c.serviceLink}
              </Link>{" "}
              {c.serviceOr}{" "}
              <Link
                href={localizePath("/catalogo", lang)}
                className="underline underline-offset-4 hover:no-underline"
              >
                {c.catalogLink}
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
