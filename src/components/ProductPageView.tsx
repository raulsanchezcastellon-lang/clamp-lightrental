import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCta from "@/components/ContactCta";
import ProductDetailActions from "@/components/ProductDetailActions";
import { createPageMetadata, SITE_URL } from "@/lib/seo";
import { getPublicProductBySlug } from "@/lib/products";
import { categoryLabel, localizePath, type Language } from "@/lib/i18n";
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
    store: "Tienda",
    saleTitle: (name: string) => `Comprar ${name} en Alicante`,
    saleDescription: (name: string) =>
      `Compra ${name} en CLAMP Lighting Rental, Alicante. Material para rodajes con entrega en set junto a tu pedido de alquiler.`,
    noImage: "Sin imagen",
    perDay: "/ día",
    exTax: "ex. IVA",
    priceOnRequest: "Precio bajo consulta",
    specs: "Especificaciones",
    serviceTitle: "Alquiler con soporte técnico incluido",
    serviceText:
      "Entregamos y recogemos el material en Alicante, Murcia y la Comunidad Valenciana, y si lo necesitas te conectamos con gaffers, eléctricos o asistentes de foto que conocen el equipo. Consulta más detalles sobre",
    serviceLink: "nuestro servicio de alquiler de iluminación en Alicante",
    serviceOr: "o revisa",
    catalogLink: "el resto del catálogo",
  },
  en: {
    notFoundTitle: "Product not found",
    notFoundDescription: "This item is no longer available in our catalog.",
    // Con nombres largos se quita ", Spain" para que Google no corte el título (~70 caracteres con la marca).
    title: (name: string) =>
      name.length > 24 ? `${name} Rental in Alicante` : `${name} Rental in Alicante, Spain`,
    description: (name: string) =>
      `Rent the ${name} in Alicante, Spain. Delivered to your set, collected after wrap, with English-speaking lighting crew available for international productions on the Costa Blanca.`,
    descriptionSuffix:
      " Rental in Alicante, Spain — delivered to set and collected after wrap, with English-speaking crew available.",
    jsonLdFallback: (name: string) => `${name} rental in Alicante, Spain, delivered to set.`,
    catalog: "Catalog",
    store: "Store",
    saleTitle: (name: string) => `Buy ${name} in Alicante, Spain`,
    saleDescription: (name: string) =>
      `Buy the ${name} from CLAMP Lighting Rental in Alicante, Spain, delivered to set together with your rental order.`,
    noImage: "No image",
    perDay: "/ day",
    exTax: "ex. VAT",
    priceOnRequest: "Price on request",
    specs: "Specifications",
    serviceTitle: "Delivered to set, with crew if you need it",
    serviceText:
      "We deliver the gear to your location and collect it after wrap anywhere on the Costa Blanca, Murcia and Valencia. If your crew is travelling light, we can add English-speaking gaffers, electricians or photo assistants who know the kit. Read more about",
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
  const isSale = product.listingType === "sale";
  const description = isSale
    ? product.description
      ? `${product.description}`.slice(0, 300)
      : c.saleDescription(fullName)
    : product.description
      ? `${product.description}${c.descriptionSuffix}`.slice(0, 300)
      : c.description(fullName);

  return createPageMetadata({
    title: isSale ? c.saleTitle(fullName) : c.title(fullName),
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

  const isSale = product.listingType === "sale";
  const specRows = parseSpecs(product.specs, lang);

  const productUrl = `${SITE_URL}${localizePath(`/producto/${product.slug}`, lang)}`;
  const productItem = {
    "@type": "Product",
    name: product.name,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    category: product.category,
    description: product.description || c.jsonLdFallback(product.name),
    image: product.image ? `${SITE_URL}${product.image}` : undefined,
  };

  // Rental gear is described as a lease offer (price per day) made by the business,
  // not as a product for sale, so Google doesn't treat it as a merchant listing.
  // Only items listed for sale (consumables) keep the Product + Offer markup.
  const productJsonLd =
    product.listingType === "sale"
      ? {
          "@context": "https://schema.org",
          ...productItem,
          offers: {
            "@type": "Offer",
            url: productUrl,
            priceCurrency: "EUR",
            price: product.price || undefined,
            availability: "https://schema.org/InStock",
            seller: { "@id": `${SITE_URL}/#business` },
          },
        }
      : {
          "@context": "https://schema.org",
          "@type": "Offer",
          url: productUrl,
          businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
          availability: "https://schema.org/InStock",
          offeredBy: { "@id": `${SITE_URL}/#business` },
          areaServed: ["Alicante", "Murcia", "Comunidad Valenciana"],
          priceSpecification: product.price
            ? {
                "@type": "UnitPriceSpecification",
                price: product.price,
                priceCurrency: "EUR",
                unitCode: "DAY",
                unitText: lang === "es" ? "día" : "day",
              }
            : undefined,
          itemOffered: productItem,
        };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-[#f7f7f4] text-black">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.08em] text-black/45"
          >
            <Link
              href={localizePath(isSale ? "/store" : "/catalogo", lang)}
              className="hover:text-black hover:underline"
            >
              {isSale ? c.store : c.catalog}
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={localizePath(
                `${isSale ? "/store" : "/catalogo"}?category=${encodeURIComponent(product.category)}`,
                lang
              )}
              className="hover:text-black hover:underline"
            >
              {categoryLabel(product.category, lang)}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-black/70">{product.name}</span>
          </nav>

          {/* Hero */}
          <div className="grid gap-10 lg:grid-cols-[5fr_6fr] lg:items-start lg:gap-14">
            <div className="mx-auto flex aspect-[4/3] w-full max-w-md items-center justify-center rounded-lg border border-black/10 bg-white p-4 sm:aspect-square sm:p-8 lg:sticky lg:top-28 lg:max-w-none">
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
                {categoryLabel(product.category, lang)}
              </p>

              <p className="mt-4 text-lg font-black text-black">
                {product.price ? (
                  <>
                    {product.price}€{" "}
                    {!isSale && <span className="text-sm font-medium text-black/45">{c.perDay}</span>}
                    <span className="ml-1.5 align-middle text-[0.62rem] font-black uppercase tracking-[0.08em] text-black/30">
                      {c.exTax}
                    </span>
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

              <ProductDetailActions product={product} listingType={isSale ? "sale" : "rental"} />

              {/* Especificaciones */}
              {specRows.length > 0 && (
                <div className="mt-10 border-t border-black/10 pt-6">
                  <h2 className="text-xs font-black uppercase tracking-[0.18em] text-black/50">
                    {c.specs}
                  </h2>
                  <dl className="mt-3 divide-y divide-black/10 border-b border-black/10">
                    {specRows.map((row, index) =>
                      row.label ? (
                        <div
                          key={`${row.label}-${index}`}
                          className="grid gap-1 py-2.5 sm:grid-cols-[175px_1fr] sm:gap-5"
                        >
                          <dt className="pt-0.5 text-[11px] font-black uppercase tracking-[0.12em] text-black/45">
                            {row.label}
                          </dt>
                          <dd className="text-sm font-medium text-black/80">{row.value}</dd>
                        </div>
                      ) : (
                        <div key={`spec-${index}`} className="py-2.5 text-sm font-medium text-black/80">
                          {row.value}
                        </div>
                      )
                    )}
                  </dl>
                </div>
              )}
            </div>
          </div>

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
