import LandingView, { type LandingContent } from "@/components/LandingView";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Alquiler de Iluminación en Alicante",
  description:
    "Alquiler de equipos de iluminación LED y material de grip en Alicante, Murcia y Valencia. Material para rodajes de cine, publicidad y fotografía, con entrega en set y técnicos.",
  path: "/alquiler-iluminacion-alicante",
});

const USE_CASES = [
  {
    title: "Publicidad",
    text: "Montajes rápidos, color preciso y unidades de reserva para rodajes con horarios ajustados y entregas de agencia.",
  },
  {
    title: "Cine y series",
    text: "Focos LED de alta potencia, fresnels y grip para jornadas largas, desde largometrajes hasta series y documentales.",
    href: "/alquiler-iluminacion-rodajes-cine",
  },
  {
    title: "Fotografía",
    text: "Luz continua y modificadores para shootings de moda, catálogo y editorial, en estudio o en localización.",
  },
  {
    title: "Videoclips y contenido de marca",
    text: "Tubos RGB, paneles compactos y humo para looks creativos, pensados para equipos pequeños y cambios rápidos de localización.",
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
    a: "Claro. Cuéntanos el tipo de rodaje (publicidad, ficción, foto, videoclip) y las localizaciones donde vas a trabajar, y te proponemos un listado de equipo adaptado antes de confirmar el pedido.",
  },
  {
    q: "¿Adaptáis el alquiler a la duración de mi producción?",
    a: "Sí, ajustamos la duración del alquiler a tu calendario. Indícanos las fechas al pedir presupuesto y te lo confirmamos.",
  },
];

const CONTENT: LandingContent = {
  hero: {
    kicker: "Alicante · Murcia · Comunidad Valenciana",
    title: "Alquiler de iluminación en Alicante",
    text: "Equipos LED, grip y energía para rodajes de cine, publicidad y fotografía, con entrega en set y soporte técnico en Alicante, Murcia y Valencia.",
    catalogCta: "Ver catálogo",
    quoteCta: "Pedir presupuesto",
  },
  intro: {
    title: "Quiénes somos",
    paragraphs: [
      "Con más de 10 años de experiencia, en CLAMP alquilamos equipos de iluminación LED y material de grip para rodajes de cine, series, publicidad y fotografía. Trabajamos con marcas como Aputure, Nanlite, Arri, Manfrotto y Astera, elegidas por su fiabilidad en plató y su control preciso de temperatura de color e intensidad.",
      "No nos limitamos a poner el material en tus manos: si lo necesitas, te conectamos con gaffers y asistentes digitales que conocen el equipo y saben resolver cualquier imprevisto en plató. El objetivo es que la iluminación nunca sea el problema de tu producción.",
    ],
  },
  useCases: { title: "¿Para qué proyecto necesitas luz?", moreLabel: "Saber más", items: USE_CASES },
  gear: {
    eyebrow: "Equipamiento",
    title: "Marcas en las que confía la industria",
    text: "Desde paneles LED continuos hasta soportes y accesorios de grip. Consulta el catálogo completo y filtra por marca, categoría o tipo de proyecto.",
    brands: BRANDS,
    cta: "Ver catálogo completo",
  },
  coverage: {
    title: "Servicio técnico y zona de cobertura",
    text: "Damos servicio desde nuestra base en San Juan de Alicante a toda la provincia — incluyendo Benidorm, Calpe, Dénia y Jávea — y trabajamos habitualmente en Murcia y el resto de la Comunidad Valenciana. Coordina con nosotros la entrega, la recogida o el apoyo de un técnico en plató.",
    image: { src: "/warehouse2.png", alt: "Almacén de equipos de iluminación CLAMP en Alicante" },
  },
  faq: { title: "Preguntas frecuentes", items: FAQS },
};

export default function AlquilerIluminacionAlicante() {
  return <LandingView content={CONTENT} lang="es" />;
}
