import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCta from "@/components/ContactCta";
import { localizePath, type Language } from "@/lib/i18n";

export type LandingContent = {
  hero: { kicker: string; title: string; text: string; catalogCta: string; quoteCta: string };
  intro: { title: string; paragraphs: string[] };
  useCases: {
    title: string;
    moreLabel?: string;
    items: Array<{ title: string; text: string; href?: string }>;
  };
  gear: {
    eyebrow: string;
    title: string;
    text?: string;
    /** Lista de categorías de material (formato viñetas). */
    items?: string[];
    /** Marcas (formato etiquetas). */
    brands?: string[];
    cta: string;
  };
  coverage: { title: string; text: string; image?: { src: string; alt: string } };
  faq: { title: string; items: Array<{ q: string; a: string }> };
  footerNote?: { text: string; linkText: string; href: string };
};

export default function LandingView({ content, lang }: { content: LandingContent; lang: Language }) {
  const { hero, intro, useCases, gear, coverage, faq, footerNote } = content;
  const href = (esPath: string) => localizePath(esPath, lang);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main className="bg-black text-white">
        {/* Hero */}
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-[1580px] px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-20 lg:pt-40">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#FFED00]">
              {hero.kicker}
            </p>
            <h1 className="max-w-5xl text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">
              {hero.title}
            </h1>
            <div className="mt-8 grid gap-8 border-t border-white/20 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <p className="max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">{hero.text}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={href("/catalogo")}
                  className="group inline-flex items-center justify-between gap-6 bg-[#FFED00] px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-white"
                >
                  {hero.catalogCta}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <Link
                  href={href("/contacto")}
                  className="inline-flex items-center justify-center border border-white/60 px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:border-white hover:bg-white hover:text-black"
                >
                  {hero.quoteCta}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="bg-[#f7f7f4] px-4 py-14 text-black sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[280px_1px_1fr] lg:items-start lg:gap-12">
            <div className="lg:text-right">
              <h2 className="text-3xl font-black uppercase leading-tight tracking-[0.02em] sm:text-4xl">
                {intro.title}
              </h2>
            </div>
            <div className="hidden h-full min-h-28 bg-black/15 lg:block" aria-hidden="true" />
            <div className="max-w-4xl space-y-4 text-lg font-medium leading-relaxed text-black/60">
              {intro.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Casos de uso — columnas numeradas con líneas finas, como la portada */}
        <section className="bg-black text-white">
          <div className="mx-auto max-w-[1580px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <h2 className="mb-12 max-w-3xl text-4xl leading-[0.95] sm:text-5xl lg:mb-16 lg:text-6xl">
              {useCases.title}
            </h2>
            <ol className="grid border-t border-white/15 md:grid-cols-2 lg:grid-cols-4">
              {useCases.items.map((useCase, index) => {
                const inner = (
                  <>
                    <span className="font-[family-name:var(--font-heading)] text-sm font-extrabold tracking-[0.12em] text-[#FFED00]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-10 text-2xl leading-none sm:text-3xl lg:mt-16">{useCase.title}</h3>
                    <p className="mt-4 max-w-sm text-base leading-relaxed text-white/60">{useCase.text}</p>
                    {useCase.href && useCases.moreLabel && (
                      <span className="mt-6 inline-block text-sm font-semibold uppercase tracking-[0.14em] text-white underline decoration-white/40 underline-offset-8 transition group-hover:decoration-[#FFED00]">
                        {useCases.moreLabel} →
                      </span>
                    )}
                  </>
                );
                const cellClasses =
                  "border-b border-white/15 py-8 md:px-8 md:py-10 md:odd:pl-0 lg:border-b-0 lg:border-l lg:odd:pl-8 lg:first:border-l-0 lg:first:pl-0";

                return (
                  <li key={useCase.title} className={cellClasses}>
                    {useCase.href ? (
                      <Link href={href(useCase.href)} className="group block">
                        {inner}
                      </Link>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Equipamiento */}
        <section className="border-t border-white/10 bg-black text-white">
          <div className="mx-auto max-w-[1580px] px-4 py-20 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#FFED00]">
                {gear.eyebrow}
              </p>
              <h2 className="text-4xl leading-[0.95] sm:text-5xl">{gear.title}</h2>
              {gear.text && <p className="mt-6 max-w-2xl leading-relaxed text-white/60">{gear.text}</p>}
            </div>
            {gear.items && (
              <ul className="grid border-t border-white/15 sm:grid-cols-2">
                {gear.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 border-b border-white/15 py-4 text-white/80 sm:odd:pr-8 sm:even:border-l sm:even:pl-8"
                  >
                    <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-[#FFED00]" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {gear.brands && (
              <ul className="flex w-fit max-w-full flex-wrap gap-px border border-white/15 bg-white/15">
                {gear.brands.map((brand) => (
                  <li
                    key={brand}
                    className="bg-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/80"
                  >
                    {brand}
                  </li>
                ))}
              </ul>
            )}
            <Link
              href={href("/catalogo")}
              className="group mt-10 inline-flex w-fit items-center gap-8 border border-white/60 px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:border-white hover:bg-white hover:text-black"
            >
              {gear.cta}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </section>

        {/* Zona de servicio */}
        <section className="bg-[#f7f7f4] px-4 py-16 text-black sm:px-6 lg:px-8 lg:py-24">
          <div
            className={
              coverage.image
                ? "mx-auto grid max-w-[1580px] gap-10 lg:grid-cols-[1fr_1fr] lg:items-center"
                : "mx-auto max-w-3xl"
            }
          >
            <div>
              <h2 className="text-4xl leading-[0.95] sm:text-5xl">{coverage.title}</h2>
              <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-black/60">
                {coverage.text}
              </p>
            </div>
            {coverage.image && (
              <div className="relative min-h-[280px] overflow-hidden bg-black lg:min-h-[420px]">
                <Image src={coverage.image.src} alt={coverage.image.alt} fill className="object-cover" />
              </div>
            )}
          </div>
        </section>

        {/* FAQ — lista con líneas finas, sin tarjetas */}
        <section className="bg-black px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-[1580px] gap-10 lg:grid-cols-[1fr_2fr]">
            <h2 className="text-4xl leading-[0.95] sm:text-5xl">{faq.title}</h2>
            <div>
              <div className="border-t border-white/15">
                {faq.items.map((item) => (
                  <details key={item.q} className="group border-b border-white/15">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-lg font-medium text-white marker:content-none [&::-webkit-details-marker]:hidden">
                      <span>{item.q}</span>
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-white/25 text-base leading-none text-[#FFED00] transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="max-w-2xl pb-6 leading-relaxed text-white/60">{item.a}</p>
                  </details>
                ))}
              </div>
              {footerNote && (
                <p className="mt-10 text-white/50">
                  {footerNote.text}{" "}
                  <Link href={href(footerNote.href)} className="underline underline-offset-4 hover:no-underline">
                    {footerNote.linkText}
                  </Link>
                  .
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
      <ContactCta />
      <Footer />
    </>
  );
}
