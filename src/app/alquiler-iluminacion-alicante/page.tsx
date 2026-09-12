import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCta from "@/components/ContactCta";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Alquiler de Iluminación en Alicante | CLAMP Light Rental",
  description:
    "Alquiler de equipos de iluminación LED y material de grip en Alicante, Murcia y Valencia. Material profesional para eventos, rodajes y producción audiovisual, con técnico y entrega.",
  path: "/alquiler-iluminacion-alicante",
  locale: "es_ES",
});

const USE_CASES = [
  {
    title: "Eventos y espectáculos",
    text: "Iluminación de escenario, ambiente y espectáculo para eventos en directo, ferias y celebraciones — desde una boda hasta el lanzamiento de un producto.",
  },
  {
    title: "Rodajes y producción audiovisual",
    text: "Paneles LED, fresnels y accesorios de grip para cortometrajes, publicidad y rodajes de cine, con la potencia y el control que exige cada escena.",
    href: "/alquiler-iluminacion-rodajes-cine",
  },
  {
    title: "Publicidad y contenido de marca",
    text: "Equipos pensados para shootings de foto y vídeo publicitario, con temperatura de color estable y montajes rápidos entre planos.",
  },
  {
    title: "Obra e instalaciones",
    text: "Iluminación temporal para interiores y exteriores en obra, ferias y montajes técnicos que necesitan luz fiable fuera del contexto audiovisual.",
  },
];

const BRANDS = ["Aputure", "Nanlite", "Godox", "Arri", "Manfrotto", "Astera"];

const FAQS = [
  {
    q: "¿Qué zona cubrís además de Alicante capital?",
    a: "Damos servicio en toda la provincia de Alicante y trabajamos habitualmente en Murcia y la Comunidad Valenciana. Cuéntanos tu ubicación al pedir presupuesto y coordinamos la entrega.",
  },
  {
    q: "¿Podéis enviar un técnico o gaffer con el material?",
    a: "Sí. Podemos conectarte con gaffers y asistentes digitales que conocen nuestro equipo, para que el montaje en plató no dependa de que tu equipo aprenda un sistema nuevo el mismo día del rodaje.",
  },
  {
    q: "No sé exactamente qué equipo necesito, ¿me podéis ayudar a elegir?",
    a: "Claro. Cuéntanos el tipo de proyecto (evento, rodaje, foto, obra) y el espacio donde vas a trabajar, y te proponemos un listado de equipo adaptado antes de confirmar el pedido.",
  },
  {
    q: "¿Adaptáis el alquiler a la duración de mi producción?",
    a: "Sí, ajustamos la duración del alquiler a tu calendario. Indícanos las fechas al pedir presupuesto y te lo confirmamos.",
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

export default function AlquilerIluminacionAlicante() {
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
              Alicante · Murcia · Comunidad Valenciana
            </p>
            <h1 className="max-w-4xl text-4xl font-black uppercase leading-tight tracking-[0.01em] sm:text-5xl lg:text-6xl">
              Alquiler de iluminación en Alicante
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/70">
              Equipos LED y material de grip profesionales para eventos, rodajes y
              producción audiovisual, con entrega y soporte técnico en Alicante,
              Murcia y Valencia.
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
                Quiénes somos
              </h2>
            </div>
            <div className="hidden h-full min-h-28 bg-black/15 lg:block" aria-hidden="true" />
            <div className="max-w-4xl space-y-4 text-lg font-medium leading-relaxed text-black/60">
              <p>
                Con más de 10 años de experiencia, en CLAMP alquilamos equipos de
                iluminación LED y material de grip para producciones fotográficas,
                audiovisuales y eventos en directo. Trabajamos con marcas como
                Aputure, Nanlite, Arri, Manfrotto y Astera, elegidas por su
                fiabilidad en plató y su control preciso de temperatura de color e
                intensidad.
              </p>
              <p>
                No nos limitamos a poner el material en tus manos: si lo necesitas,
                te conectamos con gaffers y asistentes digitales que conocen el
                equipo y saben resolver cualquier imprevisto en plató. El objetivo
                es que la iluminación nunca sea el problema de tu producción.
              </p>
            </div>
          </div>
        </section>

        {/* Casos de uso */}
        <section className="bg-black py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-16 text-center text-4xl font-black uppercase tracking-wide text-white">
              ¿Para qué proyecto necesitas luz?
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {USE_CASES.map((useCase) => {
                const cardClasses =
                  "rounded-lg border border-gray-800 bg-gray-900 p-8 shadow-2xl transition-all duration-300 hover:shadow-3xl";

                const content = (
                  <>
                    <h3 className="mb-3 text-xl font-semibold text-white">
                      {useCase.title}
                    </h3>
                    <p className="text-gray-400">{useCase.text}</p>
                    {useCase.href && (
                      <span className="mt-3 inline-block text-sm font-black uppercase tracking-[0.08em] text-[#FFED00]">
                        Saber más →
                      </span>
                    )}
                  </>
                );

                return useCase.href ? (
                  <Link
                    key={useCase.title}
                    href={useCase.href}
                    className={`${cardClasses} block hover:border-gray-600`}
                  >
                    {content}
                  </Link>
                ) : (
                  <div key={useCase.title} className={cardClasses}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Marcas */}
        <section className="overflow-hidden bg-[#0f1726] px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-[#FFED00]">
                Equipamiento
              </p>
              <h2 className="text-3xl font-black uppercase leading-tight tracking-[0.02em] sm:text-4xl">
                Marcas en las que confía la industria
              </h2>
              <p className="mt-4 max-w-2xl text-white/60">
                Desde paneles LED continuos hasta soportes y accesorios de grip.
                Consulta el catálogo completo y filtra por marca, categoría o tipo
                de proyecto.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {BRANDS.map((brand) => (
                <span
                  key={brand}
                  className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-white/80"
                >
                  {brand}
                </span>
              ))}
            </div>
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
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-black uppercase leading-tight tracking-[0.02em] sm:text-4xl">
                Servicio técnico y zona de cobertura
              </h2>
              <p className="mt-4 max-w-xl text-lg font-medium leading-relaxed text-black/60">
                Damos servicio desde nuestra base en San Juan de Alicante a toda la
                provincia — incluyendo Benidorm, Calpe, Dénia y Jávea — y
                trabajamos habitualmente en Murcia y el resto de la Comunidad
                Valenciana. Coordina con nosotros la entrega, la recogida o el
                apoyo de un técnico en plató.
              </p>
            </div>
            <div className="relative min-h-[280px] overflow-hidden rounded-lg bg-black lg:min-h-[360px]">
              <Image
                src="/warehouse2.png"
                alt="Almacén de equipos de iluminación CLAMP en Alicante"
                fill
                className="object-cover"
              />
            </div>
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
          </div>
        </section>
      </main>
      <ContactCta />
      <Footer />
    </>
  );
}
