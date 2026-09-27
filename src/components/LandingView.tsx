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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main className="bg-black text-white">
        {/* Hero */}
        <section className="border-b border-white/10 px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-40">
          <div className="mx-auto max-w-5xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[#FFED00]">
              {hero.kicker}
            </p>
            <h1 className="max-w-4xl text-4xl font-black uppercase leading-tight tracking-[0.01em] sm:text-5xl lg:text-6xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/70">
              {hero.text}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={href("/catalogo")}
                className="inline-flex items-center rounded-full bg-[#FFED00] px-8 py-3 text-sm font-black uppercase tracking-[0.1em] text-black transition hover:bg-white"
              >
                {hero.catalogCta}
              </Link>
              <Link
                href={href("/contacto")}
                className="inline-flex items-center rounded-full border border-white px-8 py-3 text-sm font-black uppercase tracking-[0.1em] text-white transition hover:bg-white hover:text-black"
              >
                {hero.quoteCta}
              </Link>
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

        {/* Casos de uso */}
        <section className="bg-black py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-16 text-center text-4xl font-black uppercase tracking-wide text-white">
              {useCases.title}
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {useCases.items.map((useCase) => {
                const cardClasses =
                  "rounded-lg border border-gray-800 bg-gray-900 p-8 shadow-2xl transition-all duration-300 hover:shadow-3xl";
                const inner = (
                  <>
                    <h3 className="mb-3 text-xl font-semibold text-white">{useCase.title}</h3>
                    <p className="text-gray-400">{useCase.text}</p>
                    {useCase.href && useCases.moreLabel && (
                      <span className="mt-3 inline-block text-sm font-black uppercase tracking-[0.08em] text-[#FFED00]">
                        {useCases.moreLabel} →
                      </span>
                    )}
                  </>
                );

                return useCase.href ? (
                  <Link
                    key={useCase.title}
                    href={href(useCase.href)}
                    className={`${cardClasses} block hover:border-gray-600`}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div key={useCase.title} className={cardClasses}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Equipamiento */}
        <section className="overflow-hidden bg-[#0f1726] px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-[#FFED00]">
                {gear.eyebrow}
              </p>
              <h2 className="text-3xl font-black uppercase leading-tight tracking-[0.02em] sm:text-4xl">
                {gear.title}
              </h2>
              {gear.text && <p className="mt-4 max-w-2xl text-white/60">{gear.text}</p>}
            </div>
            {gear.items && (
              <ul className="grid gap-4 sm:grid-cols-2">
                {gear.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4 text-white/80"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFED00]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {gear.brands && (
              <div className="flex flex-wrap gap-3">
                {gear.brands.map((brand) => (
                  <span
                    key={brand}
                    className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-white/80"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            )}
            <Link
              href={href("/catalogo")}
              className="mt-8 inline-flex w-fit items-center rounded-full border border-white px-8 py-3 text-sm font-black uppercase tracking-[0.1em] text-white transition hover:bg-white hover:text-black"
            >
              {gear.cta}
            </Link>
          </div>
        </section>

        {/* Zona de servicio */}
        <section className="bg-[#f7f7f4] px-4 py-16 text-black sm:px-6 lg:px-8">
          <div
            className={
              coverage.image
                ? "mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center"
                : "mx-auto max-w-3xl"
            }
          >
            <div>
              <h2 className="text-3xl font-black uppercase leading-tight tracking-[0.02em] sm:text-4xl">
                {coverage.title}
              </h2>
              <p className="mt-4 max-w-xl text-lg font-medium leading-relaxed text-black/60">
                {coverage.text}
              </p>
            </div>
            {coverage.image && (
              <div className="relative min-h-[280px] overflow-hidden rounded-lg bg-black lg:min-h-[360px]">
                <Image src={coverage.image.src} alt={coverage.image.alt} fill className="object-cover" />
              </div>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-black px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-10 text-center text-4xl font-black uppercase tracking-wide text-white">
              {faq.title}
            </h2>
            <div className="space-y-4">
              {faq.items.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-lg border border-gray-800 bg-gray-900 p-6 open:bg-gray-900/80"
                >
                  <summary className="cursor-pointer list-none text-lg font-semibold text-white marker:content-none">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-gray-400">{item.a}</p>
                </details>
              ))}
            </div>
            {footerNote && (
              <p className="mt-10 text-center text-white/50">
                {footerNote.text}{" "}
                <Link href={href(footerNote.href)} className="underline underline-offset-4 hover:no-underline">
                  {footerNote.linkText}
                </Link>
                .
              </p>
            )}
          </div>
        </section>
      </main>
      <ContactCta />
      <Footer />
    </>
  );
}
