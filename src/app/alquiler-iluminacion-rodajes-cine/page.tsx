import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCta from "@/components/ContactCta";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Alquiler de Iluminación para Rodajes y Cine en Alicante | CLAMP Light Rental",
  description:
    "Alquiler de paneles LED, fresnels y grip para rodajes, cortometrajes, publicidad y producciones de cine y TV en Alicante, Murcia y Valencia. Equipo profesional con entrega y soporte técnico.",
  path: "/alquiler-iluminacion-rodajes-cine",
  locale: "es_ES",
});

const USE_CASES = [
  {
    title: "Cortometrajes y proyectos independientes",
    text: "Equipo flexible y ligero para equipos de rodaje reducidos, con el material justo para no complicar la logística en plató.",
  },
  {
    title: "Series y producciones para cine y TV",
    text: "Paneles de mayor potencia y accesorios pensados para jornadas de rodaje largas, con material de repuesto disponible si la producción lo requiere.",
  },
  {
    title: "Publicidad y contenido de marca",
    text: "Control preciso de temperatura de color y montajes rápidos entre planos, pensado para shootings con calendarios ajustados.",
  },
  {
    title: "Rodajes de exterior",
    text: "Equipos con protección IP65 para localizaciones al aire libre, sin depender de que el tiempo acompañe.",
  },
];

const GEAR_CATEGORIES = [
  "Paneles COB de alta potencia (serie Aputure Storm y 600)",
  "Fresnels y modificadores (F10, CF12, softboxes)",
  "Tubos LED (Astera Titan Tube, Nanlite Pavotube)",
  "Grip y soportes (C-stands, sacos de arena, frames de difusión)",
  "Baterías y alimentación V-mount",
];

const FAQS = [
  {
    q: "¿Tenéis equipo con protección IP65 para rodajes en exterior?",
    a: "Sí, contamos con paneles preparados para exterior dentro de nuestro catálogo. Indícanos la localización y las condiciones al pedir presupuesto y te proponemos el equipo adecuado.",
  },
  {
    q: "¿Podéis cubrir un rodaje de varios días fuera de Alicante?",
    a: "Sí, trabajamos habitualmente en Murcia y la Comunidad Valenciana. Cuéntanos las fechas, los días de rodaje y la localización y lo coordinamos contigo.",
  },
  {
    q: "¿Me ayudáis a elegir el equipo según el tipo de rodaje?",
    a: "Claro. Cuéntanos si es un corto, una serie, un anuncio u otro formato, y te proponemos un listado de equipo adaptado antes de confirmar el pedido.",
  },
  {
    q: "¿Podéis enviar un gaffer o asistente digital con el material?",
    a: "Sí. Podemos conectarte con gaffers y asistentes digitales que conocen nuestro equipo, para no perder tiempo de rodaje enseñando un sistema nuevo en plató.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function AlquilerIluminacionRodajesCine() {
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
              Rodajes · Cortometrajes · Cine y TV
            </p>
            <h1 className="max-w-4xl text-4xl font-black uppercase leading-tight tracking-[0.01em] sm:text-5xl lg:text-6xl">
              Alquiler de iluminación para rodajes y cine
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/70">
              Paneles LED, fresnels y material de grip para cortometrajes,
              publicidad y producciones de cine y TV, con la potencia y el
              control que exige cada plano. Entrega y soporte técnico en
              Alicante, Murcia y Valencia.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/catalogo"
                className="inline-flex items-center rounded-full bg-[#FFED00] px-8 py-3 text-sm font-black uppercase tracking-[0.1em] text-black transition hover:bg-white"
              >
                Ver catálogo
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center rounded-full border border-white px-8 py-3 text-sm font-black uppercase tracking-[0.1em] text-white transition hover:bg-white hover:text-black"
              >
                Pedir presupuesto
              </Link>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="bg-[#f7f7f4] px-4 py-14 text-black sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[280px_1px_1fr] lg:items-start lg:gap-12">
            <div className="lg:text-right">
              <h2 className="text-3xl font-black uppercase leading-tight tracking-[0.02em] sm:text-4xl">
                Luz que aguanta el rodaje
              </h2>
            </div>
            <div className="hidden h-full min-h-28 bg-black/15 lg:block" aria-hidden="true" />
            <div className="max-w-4xl space-y-4 text-lg font-medium leading-relaxed text-black/60">
              <p>
                Rodar exige luz que no dé sorpresas durante toda la jornada:
                control preciso de temperatura de color, potencia suficiente
                para exteriores y montajes rápidos entre planos. Por eso
                trabajamos con paneles LED continuos de marcas como Aputure,
                Nanlite, Godox y Astera, pensados para plató.
              </p>
              <p>
                Además del material, si lo necesitas te conectamos con
                gaffers y asistentes digitales que ya conocen el equipo, para
                que el montaje en plató no reste tiempo de rodaje.
              </p>
            </div>
          </div>
        </section>

        {/* Casos de uso */}
        <section className="bg-black py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-16 text-center text-4xl font-black uppercase tracking-wide text-white">
              Adaptado a cada tipo de rodaje
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {USE_CASES.map((useCase) => (
                <div
                  key={useCase.title}
                  className="rounded-lg border border-gray-800 bg-gray-900 p-8 shadow-2xl transition-all duration-300 hover:shadow-3xl"
                >
                  <h3 className="mb-3 text-xl font-semibold text-white">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-400">{useCase.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Equipamiento */}
        <section className="overflow-hidden bg-[#0f1726] px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-[#FFED00]">
                Equipamiento
              </p>
              <h2 className="text-3xl font-black uppercase leading-tight tracking-[0.02em] sm:text-4xl">
                Lo que normalmente llevamos a un rodaje
              </h2>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {GEAR_CATEGORIES.map((item) => (
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
            <Link
              href="/catalogo"
              className="mt-8 inline-flex w-fit items-center rounded-full border border-white px-8 py-3 text-sm font-black uppercase tracking-[0.1em] text-white transition hover:bg-white hover:text-black"
            >
              Ver catálogo completo
            </Link>
          </div>
        </section>

        {/* Zona de servicio */}
        <section className="bg-[#f7f7f4] px-4 py-16 text-black sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-black uppercase leading-tight tracking-[0.02em] sm:text-4xl">
              Zona de rodaje que cubrimos
            </h2>
            <p className="mt-4 text-lg font-medium leading-relaxed text-black/60">
              Damos servicio desde nuestra base en San Juan de Alicante a
              toda la provincia — incluyendo Benidorm, Calpe, Dénia y Jávea —
              y trabajamos habitualmente en Murcia y el resto de la Comunidad
              Valenciana. Para rodajes fuera de esta zona, cuéntanos la
              localización y lo valoramos contigo.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-black px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-10 text-center text-4xl font-black uppercase tracking-wide text-white">
              Preguntas frecuentes
            </h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-lg border border-gray-800 bg-gray-900 p-6 open:bg-gray-900/80"
                >
                  <summary className="cursor-pointer list-none text-lg font-semibold text-white marker:content-none">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-gray-400">{faq.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-10 text-center text-white/50">
              ¿Buscas algo más general?{" "}
              <Link
                href="/alquiler-iluminacion-alicante"
                className="underline underline-offset-4 hover:no-underline"
              >
                Consulta el alquiler de iluminación en Alicante
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <ContactCta />
      <Footer />
    </>
  );
}
