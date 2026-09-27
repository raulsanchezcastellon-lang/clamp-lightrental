import LandingView, { type LandingContent } from "@/components/LandingView";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Alquiler de Iluminación para Rodajes y Cine en Alicante",
  description:
    "Alquiler de paneles LED, fresnels y grip para rodajes, cortometrajes, publicidad y producciones de cine y TV en Alicante, Murcia y Valencia. Equipo profesional con entrega y soporte técnico.",
  path: "/alquiler-iluminacion-rodajes-cine",
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

const CONTENT: LandingContent = {
  hero: {
    kicker: "Rodajes · Cortometrajes · Cine y TV",
    title: "Alquiler de iluminación para rodajes y cine",
    text: "Paneles LED, fresnels y material de grip para cortometrajes, publicidad y producciones de cine y TV, con la potencia y el control que exige cada plano. Entrega y soporte técnico en Alicante, Murcia y Valencia.",
    catalogCta: "Ver catálogo",
    quoteCta: "Pedir presupuesto",
  },
  intro: {
    title: "Luz que aguanta el rodaje",
    paragraphs: [
      "Rodar exige luz que no dé sorpresas durante toda la jornada: control preciso de temperatura de color, potencia suficiente para exteriores y montajes rápidos entre planos. Por eso trabajamos con paneles LED continuos de marcas como Aputure, Nanlite, Godox y Astera, pensados para plató.",
      "Además del material, si lo necesitas te conectamos con gaffers y asistentes digitales que ya conocen el equipo, para que el montaje en plató no reste tiempo de rodaje.",
    ],
  },
  useCases: { title: "Adaptado a cada tipo de rodaje", items: USE_CASES },
  gear: {
    eyebrow: "Equipamiento",
    title: "Lo que normalmente llevamos a un rodaje",
    items: GEAR_CATEGORIES,
    cta: "Ver catálogo completo",
  },
  coverage: {
    title: "Zona de rodaje que cubrimos",
    text: "Damos servicio desde nuestra base en San Juan de Alicante a toda la provincia — incluyendo Benidorm, Calpe, Dénia y Jávea — y trabajamos habitualmente en Murcia y el resto de la Comunidad Valenciana. Para rodajes fuera de esta zona, cuéntanos la localización y lo valoramos contigo.",
  },
  faq: { title: "Preguntas frecuentes", items: FAQS },
  footerNote: {
    text: "¿Buscas algo más general?",
    linkText: "Consulta el alquiler de iluminación en Alicante",
    href: "/alquiler-iluminacion-alicante",
  },
};

export default function AlquilerIluminacionRodajesCine() {
  return <LandingView content={CONTENT} lang="es" />;
}
