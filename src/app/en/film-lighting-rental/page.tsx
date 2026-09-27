import LandingView, { type LandingContent } from "@/components/LandingView";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Film Lighting Rental in Alicante, Spain",
  description:
    "Film and TV lighting rental in Alicante, Spain: Aputure Storm, LS 600 and 1200, Astera and Nanlite tubes, fresnels, grip and power. Delivered to set with English-speaking crew available.",
  path: "/alquiler-iluminacion-rodajes-cine",
  lang: "en",
});

const CONTENT: LandingContent = {
  hero: {
    kicker: "Feature films · Series · Commercials",
    title: "Film lighting rental in Alicante",
    text: "High-output LED fixtures, fresnels, tubes and grip for film, TV and commercial shoots on the Costa Blanca. Delivered to set and collected after wrap, with English-speaking crew available.",
    catalogCta: "View catalog",
    quoteCta: "Request a quote",
  },
  intro: {
    title: "Light that lasts the shooting day",
    paragraphs: [
      "A shooting day needs lighting without surprises: accurate colour temperature, enough output for Mediterranean daylight exteriors and quick changes between set-ups. That is why we work with continuous LED fixtures from Aputure, Nanlite, Godox and Astera, built for set.",
      "If your crew is travelling light, we can add local gaffers and lighting technicians who already know the kit and work in English, so rigging never eats into shooting time.",
    ],
  },
  useCases: {
    title: "Built for every kind of shoot",
    items: [
      {
        title: "Short films & independent projects",
        text: "Flexible, lightweight packages for small crews, with just the gear you need to keep location logistics simple.",
      },
      {
        title: "Feature films & series",
        text: "Higher-output fixtures and accessories for long shooting days, with spare units available when the production needs them.",
      },
      {
        title: "Commercials & branded content",
        text: "Precise colour control and fast set-ups between shots for tight schedules.",
      },
      {
        title: "Exterior shoots",
        text: "IP65-rated fixtures for outdoor locations, so the weather does not decide your schedule.",
      },
    ],
  },
  gear: {
    eyebrow: "Equipment",
    title: "What we usually bring to a shoot",
    items: [
      "High-output point-source LEDs (Aputure Storm and LS series)",
      "Fresnels and modifiers (F10, CF12, Light Domes)",
      "LED tubes (Astera Titan Tubes, Nanlite PavoTubes)",
      "Grip (C-stands, sandbags, butterfly frames and fabrics)",
      "Portable power (EcoFlow)",
    ],
    cta: "View full catalog",
  },
  coverage: {
    title: "Where we work",
    text: "From our base in San Juan de Alicante we cover the whole province, including Benidorm, Calpe, Altea, Dénia and Jávea, and regularly work in Murcia and the Valencia region. Shooting somewhere else in Spain? Tell us the location and dates and we will look at it with you.",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "Do you have weather-sealed fixtures for exterior shoots?",
        a: "Yes, our catalog includes IP65-rated fixtures for outdoor work. Tell us the location and conditions when you request a quote and we will suggest the right units.",
      },
      {
        q: "Can you cover a multi-day shoot outside Alicante?",
        a: "Yes, we regularly work in Murcia and the Valencia region. Send us the dates, shooting days and locations and we will coordinate delivery and collection with you.",
      },
      {
        q: "Can you send a gaffer or technician with the gear?",
        a: "Yes. We can provide English-speaking gaffers and lighting technicians who know our equipment, so no time is lost learning new kit on set.",
      },
      {
        q: "Can you help us build the lighting package?",
        a: "Of course. Tell us the format and look, or send your DoP's list, and we will propose a package before you confirm.",
      },
    ],
  },
  footerNote: {
    text: "Looking for a general overview?",
    linkText: "See lighting rental in Alicante for visiting productions",
    href: "/alquiler-iluminacion-alicante",
  },
};

export default function FilmLightingRentalEn() {
  return <LandingView content={CONTENT} lang="en" />;
}
