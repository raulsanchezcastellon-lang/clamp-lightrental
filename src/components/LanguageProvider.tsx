"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  getLanguageFromPath,
  localizePath,
  switchLanguagePath,
  type Language,
} from "@/lib/i18n";

type TranslationKey =
  | "nav.equipment"
  | "nav.store"
  | "nav.about"
  | "nav.contact"
  | "nav.call"
  | "nav.cart"
  | "hero.kicker"
  | "hero.title"
  | "hero.subtitle"
  | "hero.catalog"
  | "hero.quote"
  | "homeIntro.eyebrow"
  | "homeIntro.title"
  | "homeIntro.p1"
  | "homeIntro.p2"
  | "homeIntro.p3"
  | "homeIntro.alicanteLink"
  | "featured.loading"
  | "featured.noImage"
  | "featured.priceOnRequest"
  | "featured.catalog"
  | "catalog.search"
  | "catalog.loading"
  | "catalog.productsDisplayed"
  | "catalog.noImage"
  | "catalog.priceOnRequest"
  | "catalog.add"
  | "price.day"
  | "price.exTax"
  | "catalog.equipmentTitle"
  | "catalog.storeTitle"
  | "catalog.emptyRental"
  | "catalog.emptyStore"
  | "cta.eyebrow"
  | "cta.title"
  | "cta.button"
  | "cart.eyebrow"
  | "cart.title"
  | "cart.addMore"
  | "cart.sentTitle"
  | "cart.sentText"
  | "cart.emptyTitle"
  | "cart.emptyText"
  | "cart.item"
  | "cart.items"
  | "cart.noImage"
  | "cart.remove"
  | "cart.detailsTitle"
  | "cart.detailsText"
  | "cart.name"
  | "cart.email"
  | "cart.required"
  | "cart.phone"
  | "cart.pickup"
  | "cart.return"
  | "cart.delivery"
  | "cart.no"
  | "cart.yes"
  | "cart.comments"
  | "cart.commentsPlaceholder"
  | "cart.estimatedTotal"
  | "cart.sending"
  | "cart.send"
  | "contact.eyebrow"
  | "contact.title"
  | "contact.text"
  | "contact.location"
  | "contact.hours"
  | "contact.message"
  | "contact.sent"
  | "contact.error"
  | "contact.send"
  | "contact.sending"
  | "homeFeatures.title"
  | "homeFeatures.modernTitle"
  | "homeFeatures.modernText"
  | "homeFeatures.deliveryTitle"
  | "homeFeatures.deliveryText"
  | "homeFeatures.supportTitle"
  | "homeFeatures.supportText"
  | "homeSocial.eyebrow"
  | "homeSocial.title"
  | "homeCta.title"
  | "homeCta.text"
  | "homeCta.button"
  | "brands.title"
  | "about.eyebrow"
  | "about.title"
  | "about.text"
  | "about.p1"
  | "about.p2"
  | "about.p3"
  | "about.button"
  | "about.workTitle"
  | "about.intro"
  | "about.intro2"
  | "about.service1Title"
  | "about.service1Text"
  | "about.service2Title"
  | "about.service2Text"
  | "about.service3Title"
  | "about.service3Text"
  | "about.service4Title"
  | "about.service4Text"
  | "footer.contact"
  | "footer.locationHours"
  | "footer.openingHours"
  | "footer.legal"
  | "footer.legalNotice"
  | "footer.privacy"
  | "footer.cookies"
  | "footer.rights"
  | "cookies.bannerTitle"
  | "cookies.bannerText"
  | "cookies.accept"
  | "cookies.reject"
  | "cookies.policy"
  | "catalog.all"
  | "product.add"
  | "product.quote"
  | "product.decrease"
  | "product.increase"
  | "whatsapp.message"
  | "whatsapp.label"
  | "langSuggest.text"
  | "langSuggest.button"
  | "langSuggest.dismiss";

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    "nav.equipment": "Equipment",
    "nav.store": "Store",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.call": "Call CLAMP",
    "nav.cart": "Open order cart",
    "hero.kicker": "Lighting rental • Delivery to set • Crew",
    "hero.title": "Film Lighting Rental in Alicante",
    "hero.subtitle":
      "Film lighting rental in Alicante for international productions. Delivered to set, collected at wrap, with English-speaking crew on request.",
    "hero.catalog": "View Catalog",
    "hero.quote": "Request Quote",
    "homeIntro.eyebrow": "Who we are",
    "homeIntro.title": "Your lighting partner when you shoot in Alicante.",
    "homeIntro.p1":
      "CLAMP is a lighting rental house based in Alicante, Spain, working with international film, commercial and photo productions that come to shoot on the Costa Blanca.",
    "homeIntro.p2":
      "With more than 10 years on set, we supply the lights, grip and power, deliver them to your location and collect them after wrap, and can add English-speaking gaffers and technicians so your crew can travel light. We cover Alicante, Benidorm, Calpe, Dénia, Jávea, Murcia and Valencia.",
    "homeIntro.p3":
      "",
    "homeIntro.alicanteLink": "Lighting rental in Alicante for visiting productions",
    "featured.loading": "Loading featured products...",
    "featured.noImage": "No image",
    "featured.priceOnRequest": "Price on request",
    "featured.catalog": "View complete catalog",
    "catalog.search": "Search products",
    "catalog.loading": "Loading products...",
    "catalog.productsDisplayed": "products displayed",
    "catalog.noImage": "No image",
    "catalog.priceOnRequest": "Price on request",
    "catalog.add": "Add",
    "price.day": "/day",
    "price.exTax": "ex. VAT",
    "catalog.equipmentTitle": "Equipment Catalog",
    "catalog.storeTitle": "Store",
    "catalog.emptyRental": "No rental equipment found.",
    "catalog.emptyStore": "No store products found.",
    "cta.eyebrow": "Need a lighting plan?",
    "cta.title": "Send us your dates and equipment list.",
    "cta.button": "Contact",
    "cart.eyebrow": "Order",
    "cart.title": "Request cart",
    "cart.addMore": "Add more products",
    "cart.sentTitle": "Request sent",
    "cart.sentText":
      "We have received your request. We will reply by email with availability and confirmation.",
    "cart.emptyTitle": "Your cart is empty",
    "cart.emptyText": "Add products from the catalog to prepare a request.",
    "cart.item": "item",
    "cart.items": "items",
    "cart.noImage": "No image",
    "cart.remove": "Remove",
    "cart.detailsTitle": "Request details",
    "cart.detailsText":
      "No payment is taken here. We will confirm availability by email.",
    "cart.name": "Name",
    "cart.email": "Email",
    "cart.required": "Fields marked with * are required.",
    "cart.phone": "Phone",
    "cart.pickup": "Pickup date",
    "cart.return": "Return date",
    "cart.delivery": "Delivery to set & collection",
    "cart.no": "No",
    "cart.yes": "Yes",
    "cart.comments": "Comments",
    "cart.commentsPlaceholder": "Project, shooting location, call times, crew needed...",
    "cart.estimatedTotal": "Estimated total",
    "cart.sending": "Sending...",
    "cart.send": "Send request",
    "contact.eyebrow": "Contact",
    "contact.title": "Tell us what you need",
    "contact.text":
      "Send your request and we will get back to you with availability, pricing and the best setup for your project.",
    "contact.location": "Location",
    "contact.hours": "Hours",
    "contact.message": "Message",
    "contact.sent": "Message sent. We will contact you shortly.",
    "contact.error": "The message could not be sent. Please try again.",
    "contact.send": "Send Inquiry",
    "contact.sending": "Sending...",
    "homeFeatures.title": "Why choose CLAMP?",
    "homeFeatures.modernTitle": "Modern Equipment",
    "homeFeatures.modernText":
      "State-of-the-art lighting solutions designed for outstanding cinematic results",
    "homeFeatures.deliveryTitle": "Delivered to set",
    "homeFeatures.deliveryText":
      "We drop the gear at your location and collect it after wrap, anywhere on the Costa Blanca, Murcia and Valencia",
    "homeFeatures.supportTitle": "English-speaking crew",
    "homeFeatures.supportText":
      "Local gaffers and lighting technicians who know the gear and work in English",
    "homeSocial.eyebrow": "On set",
    "homeSocial.title": "Real gear, real shoots, real crews.",
    "homeCta.title": "Need lighting for your project?",
    "homeCta.text": "Contact us today for a tailored lighting solution.",
    "homeCta.button": "Send Inquiry",
    "brands.title": "Brands we trust",
    "about.eyebrow": "About us and our services",
    "about.title": "Lighting rental shaped around your production",
    "about.text":
      "CLAMP Light Rental provides professional lighting equipment and technical support for film, photo, commercial and event productions. We combine carefully maintained gear with a practical, flexible service so each project can move smoothly from prep to wrap.",
    "about.p1":
      "CLAMP is a lighting equipment rental company for photography and video productions, specialised in advertising shoots, commercials, and high-demand sets.",
    "about.p2":
      "Based in Alicante and backed by more than 10 years of experience, we provide the technical equipment and skilled professionals needed to cover your on-set requirements - from single-day shoots to large-scale productions across the Spanish Mediterranean coast.",
    "about.p3":
      "Our rental catalogue includes professional studio lighting, portable LED systems, grip equipment, and power distribution solutions, all maintained to broadcast and advertising standards. Whether you need a full lighting package or specific units to complement your existing setup, we adapt to the scale and rhythm of your production.",
    "about.button": "View equipment",
    "about.workTitle": "How we work",
    "about.intro":
      "We work alongside directors of photography, gaffers, producers and production companies who need a rental partner they can count on - reliable kit, honest communication, and fast turnaround from quote to delivery.",
    "about.intro2":
      "Our job is to make your lighting department run smoothly: clear availability, straightforward pricing, and on-set support when you need it.",
    "about.service1Title": "Lighting rental",
    "about.service1Text":
      "We offer a focused catalog of modern lighting equipment for cinema, photography, advertising and live projects. Our inventory is selected for dependable performance, clean output and practical use on set.",
    "about.service2Title": "Technical crew",
    "about.service2Text":
      "Alongside the equipment, we can provide experienced technical crew for your shoot. Our gaffers, lighting technicians and assistants help prepare, rig and operate the setup so the lighting department runs smoothly on set.",
    "about.service3Title": "Transport and delivery",
    "about.service3Text":
      "We can organize pickup, return and delivery services depending on availability and production requirements. Tell us your dates, location and schedule and we will propose the most efficient option.",
    "about.service4Title": "Technical support",
    "about.service4Text":
      "We support productions during preparation, equipment checks and technical decisions. Our service is built to reduce friction and help the crew arrive on set with confidence.",
    "footer.contact": "Contact",
    "footer.locationHours": "Location & Hours",
    "footer.openingHours": "Opening Hours",
    "footer.legal": "Legal",
    "footer.legalNotice": "Legal Notice",
    "footer.privacy": "Privacy Policy",
    "footer.cookies": "Cookie Policy",
    "footer.rights": "All rights reserved.",
    "cookies.bannerTitle": "Cookie preferences",
    "cookies.bannerText":
      "We use essential cookies to make the website work. With your permission, we may also use non-essential cookies to improve the experience and understand how the site is used.",
    "cookies.accept": "Accept",
    "cookies.reject": "Reject",
        "cookies.policy": "Cookie policy",
    "catalog.all": "All",
    "product.add": "Add to request",
    "product.quote": "Request a quote",
    "product.decrease": "Decrease quantity",
    "product.increase": "Increase quantity",
    "whatsapp.message": "Hi, I'd like some information about renting lighting from CLAMP.",
    "whatsapp.label": "Chat with us on WhatsApp",
    "langSuggest.text": "This page is also available in Spanish.",
    "langSuggest.button": "Ver en español",
    "langSuggest.dismiss": "Dismiss",
  },
  es: {
    "nav.equipment": "Equipo",
    "nav.store": "Tienda",
    "nav.about": "Nosotros",
    "nav.contact": "Contacto",
    "nav.call": "Llamar a CLAMP",
    "nav.cart": "Abrir carrito de pedido",
    "hero.kicker": "Alquiler de iluminación • Cinematografía • Producción",
    "hero.title": "Alquiler profesional de iluminación",
    "hero.subtitle":
      "Alquiler de iluminación de alta gama para rodajes y producciones.",
    "hero.catalog": "Ver catálogo",
    "hero.quote": "Pedir presupuesto",
    "homeIntro.eyebrow": "Quiénes somos",
    "homeIntro.title": "Alquiler de iluminación para foto y vídeo.",
    "homeIntro.p1":
      "CLAMP es una empresa dedicada al alquiler de material de iluminación para fotografía y vídeo, especializada en rodajes y shootings de publicidad.",
    "homeIntro.p2":
      "Localizada en Alicante y con más de 10 años de experiencia, contamos con el material técnico y los profesionales necesarios para producciones en Alicante, Benidorm, Calpe, Dénia, Jávea y Murcia.",
    "homeIntro.p3":
      "",
    "homeIntro.alicanteLink": "Más sobre el alquiler de iluminación en Alicante",
    "featured.loading": "Cargando productos destacados...",
    "featured.noImage": "Sin imagen",
    "featured.priceOnRequest": "Precio bajo consulta",
    "featured.catalog": "Ver catálogo completo",
    "catalog.search": "Buscar productos",
    "catalog.loading": "Cargando productos...",
    "catalog.productsDisplayed": "productos mostrados",
    "catalog.noImage": "Sin imagen",
    "catalog.priceOnRequest": "Precio bajo consulta",
    "catalog.add": "Añadir",
    "price.day": "/día",
    "price.exTax": "ex. IVA",
    "catalog.equipmentTitle": "Catálogo de equipo",
    "catalog.storeTitle": "Tienda",
    "catalog.emptyRental": "No se ha encontrado equipo de alquiler.",
    "catalog.emptyStore": "No se han encontrado productos de tienda.",
    "cta.eyebrow": "¿Necesitas un plan de iluminación?",
    "cta.title": "Envíanos tus fechas y lista de material.",
    "cta.button": "Contacto",
    "cart.eyebrow": "Pedido",
    "cart.title": "Carrito de pedido",
    "cart.addMore": "Añadir más productos",
    "cart.sentTitle": "Pedido enviado",
    "cart.sentText":
      "Hemos recibido tu solicitud. Te responderemos por email con disponibilidad y confirmación.",
    "cart.emptyTitle": "Tu carrito está vacío",
    "cart.emptyText": "Añade productos desde el catálogo para preparar una solicitud.",
    "cart.item": "artículo",
    "cart.items": "artículos",
    "cart.noImage": "Sin imagen",
    "cart.remove": "Eliminar",
    "cart.detailsTitle": "Detalles del pedido",
    "cart.detailsText":
      "No se realiza ningún pago aquí. Confirmaremos disponibilidad por email.",
    "cart.name": "Nombre",
    "cart.email": "Email",
    "cart.required": "Los campos marcados con * son obligatorios.",
    "cart.phone": "Teléfono",
    "cart.pickup": "Fecha de recogida",
    "cart.return": "Fecha de devolución",
    "cart.delivery": "Servicio de delivery",
    "cart.no": "No",
    "cart.yes": "Sí",
    "cart.comments": "Comentarios",
    "cart.commentsPlaceholder": "Notas del proyecto, dirección, horario...",
    "cart.estimatedTotal": "Total estimado",
    "cart.sending": "Enviando...",
    "cart.send": "Enviar pedido",
    "contact.eyebrow": "Contacto",
    "contact.title": "Cuéntanos qué necesitas",
    "contact.text":
      "Envíanos tu solicitud y te responderemos con disponibilidad, precio y la mejor configuración para tu proyecto.",
    "contact.location": "Ubicación",
    "contact.hours": "Horario",
    "contact.message": "Mensaje",
    "contact.sent": "Mensaje enviado. Te contactaremos pronto.",
    "contact.error": "No se ha podido enviar el mensaje. Inténtalo de nuevo.",
    "contact.send": "Enviar consulta",
    "contact.sending": "Enviando...",
    "homeFeatures.title": "¿Por qué elegir CLAMP?",
    "homeFeatures.modernTitle": "Equipo moderno",
    "homeFeatures.modernText":
      "Soluciones de iluminación actuales pensadas para resultados cinematográficos de alto nivel",
    "homeFeatures.deliveryTitle": "Entrega rápida",
    "homeFeatures.deliveryText":
      "Disponibilidad inmediata y entregas puntuales en la zona",
    "homeFeatures.supportTitle": "Soporte técnico",
    "homeFeatures.supportText":
      "Asistencia experta para cada producción y necesidad de alquiler",
    "homeSocial.eyebrow": "En set",
    "homeSocial.title": "Material real, rodajes reales, equipos reales.",
    "homeCta.title": "¿Necesitas iluminación para tu proyecto?",
    "homeCta.text": "Contáctanos y prepararemos una solución a medida.",
    "homeCta.button": "Enviar consulta",
    "brands.title": "Marcas con las que trabajamos",
    "about.eyebrow": "Sobre nosotros y nuestros servicios",
    "about.title": "Alquiler de iluminación adaptado a tu producción",
    "about.text":
      "CLAMP Light Rental ofrece material profesional de iluminación y soporte técnico para producciones de cine, fotografía, publicidad y eventos. Combinamos equipo cuidado con un servicio práctico y flexible para que cada proyecto avance con fluidez.",
    "about.p1":
      "CLAMP es una empresa de alquiler de material de iluminación para producciones de fotografía y vídeo, especializada en shootings publicitarios, comerciales y sets de alta exigencia.",
    "about.p2":
      "Localizada en Alicante y con más de 10 años de experiencia, contamos con el material técnico y los profesionales necesarios para cubrir tus necesidades en set, desde rodajes de un solo día hasta producciones de mayor escala en la costa mediterránea española.",
    "about.p3":
      "Nuestro catálogo de alquiler incluye iluminación profesional de estudio, sistemas LED portátiles, material de grip y soluciones de distribución eléctrica, todo mantenido bajo estándares de broadcast y publicidad. Tanto si necesitas un paquete completo de iluminación como unidades concretas para complementar tu setup, nos adaptamos a la escala y ritmo de tu producción.",
    "about.button": "Ver equipo",
    "about.workTitle": "Cómo trabajamos",
    "about.intro":
      "Trabajamos junto a directores de fotografía, gaffers, productores y productoras que necesitan un partner de alquiler en el que poder confiar: material fiable, comunicación honesta y respuesta rápida desde el presupuesto hasta la entrega.",
    "about.intro2":
      "Nuestro trabajo es hacer que el departamento de iluminación funcione con fluidez: disponibilidad clara, precios directos y soporte en set cuando lo necesites.",
    "about.service1Title": "Alquiler de iluminación",
    "about.service1Text":
      "Ofrecemos un catálogo seleccionado de equipo moderno de iluminación para cine, fotografía, publicidad y directos. Nuestro inventario está escogido por su rendimiento, calidad de luz y uso práctico en set.",
    "about.service2Title": "Crew técnico",
    "about.service2Text":
      "Además del material, podemos aportar equipo técnico con experiencia para tu rodaje. Gaffers, técnicos de iluminación y asistentes pueden ayudarte a preparar, montar y operar el setup para que el departamento de luz funcione con fluidez en set.",
    "about.service3Title": "Transporte y delivery",
    "about.service3Text":
      "Podemos organizar recogidas, devoluciones y servicios de delivery según disponibilidad y necesidades de producción. Envíanos fechas, localización y horario y te propondremos la opción más eficiente.",
    "about.service4Title": "Soporte técnico",
    "about.service4Text":
      "Damos soporte durante la preparación, revisión de equipo y decisiones técnicas. Nuestro servicio está pensado para reducir fricción y ayudar al equipo a llegar al set con confianza.",
    "footer.contact": "Contacto",
    "footer.locationHours": "Ubicación y horario",
    "footer.openingHours": "Horario",
    "footer.legal": "Legal",
    "footer.legalNotice": "Aviso legal",
    "footer.privacy": "Política de privacidad",
    "footer.cookies": "Política de cookies",
    "footer.rights": "Todos los derechos reservados.",
    "cookies.bannerTitle": "Preferencias de cookies",
    "cookies.bannerText":
      "Usamos cookies esenciales para que la web funcione. Con tu permiso, también podríamos usar cookies no esenciales para mejorar la experiencia y entender cómo se utiliza la web.",
    "cookies.accept": "Aceptar",
    "cookies.reject": "Rechazar",
        "cookies.policy": "Política de cookies",
    "catalog.all": "Todo",
    "product.add": "Añadir al pedido",
    "product.quote": "Pedir presupuesto",
    "product.decrease": "Reducir cantidad",
    "product.increase": "Aumentar cantidad",
    "whatsapp.message": "Hola, me gustaría recibir información de CLAMP Light Rental.",
    "whatsapp.label": "Escríbenos por WhatsApp",
    "langSuggest.text": "This website is available in English.",
    "langSuggest.button": "View in English",
    "langSuggest.dismiss": "Cerrar",
  },
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
  /** Convierte una ruta española a la del idioma actual. */
  href: (esPath: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // El idioma lo decide la URL: /en/... es inglés y el resto español.
  // Así servidor y cliente coinciden y Google indexa cada idioma en su URL.
  const pathname = usePathname();
  const router = useRouter();
  const language = getLanguageFromPath(pathname);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback(
    (nextLanguage: Language) => {
      if (nextLanguage === language) return;
      const search = typeof window !== "undefined" ? window.location.search : "";
      router.push(`${switchLanguagePath(pathname || "/", nextLanguage)}${search}`);
    },
    [language, pathname, router]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(language === "en" ? "es" : "en"),
      t: (key: TranslationKey) => translations[language][key],
      href: (esPath: string) => localizePath(esPath, language),
    }),
    [language, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
