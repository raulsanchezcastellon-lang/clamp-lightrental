import LandingView, { type LandingContent } from "@/components/LandingView";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Lighting Rental in Alicante for International Productions",
  description:
    "Shooting in Alicante or on the Costa Blanca? Rent film lighting, grip and power locally: delivered to your set, collected after wrap, with English-speaking gaffers, electricians and photo assistants on request.",
  path: "/alquiler-iluminacion-alicante",
  lang: "en",
});

const CONTENT: LandingContent = {
  hero: {
    kicker: "Alicante · Costa Blanca · Murcia · Valencia",
    title: "Lighting rental in Alicante for visiting productions",
    text: "Flying in to shoot on the Costa Blanca? Leave the lighting truck at home. We supply LED lights, grip and power locally, deliver them to your set, collect them after wrap and can add English-speaking crew.",
    catalogCta: "View catalog",
    quoteCta: "Request a quote",
  },
  intro: {
    title: "Your local lighting department",
    paragraphs: [
      "CLAMP is a lighting rental house based in Alicante with more than 10 years on set. Most of the productions we work with come from abroad: commercial, film, TV and photo crews who travel light and need reliable gear waiting for them on location.",
      "Send us your shooting dates, locations and gear list in English. We confirm availability, plan delivery and collection around your call times and, if you need extra hands, add local gaffers, electricians and photo assistants who know our kit.",
    ],
  },
  useCases: {
    title: "What we light",
    moreLabel: "Read more",
    items: [
      {
        title: "Commercials",
        text: "Fast set-ups, accurate colour and spare units on hand for tight shooting schedules and agency deadlines.",
      },
      {
        title: "Film & TV",
        text: "High-output LED fixtures, fresnels and grip for long shooting days, from feature films to series and documentaries.",
        href: "/alquiler-iluminacion-rodajes-cine",
      },
      {
        title: "Photo shoots",
        text: "Continuous light and modifiers for fashion, catalogue and editorial shoots in studios, villas and beaches along the coast.",
      },
      {
        title: "Music videos & branded content",
        text: "RGB tubes, compact panels and haze for creative looks, sized for small crews and quick location moves.",
      },
    ],
  },
  gear: {
    eyebrow: "Equipment",
    title: "Brands you already work with",
    text: "Professional LED lighting, grip and portable power from the brands international crews use every day. Browse the full catalog with daily rates.",
    brands: ["Aputure", "Amaran", "Nanlite", "Astera", "Godox", "Dedolight", "Manfrotto", "Avenger", "Kupo", "EcoFlow"],
    cta: "View full catalog",
  },
  coverage: {
    title: "Delivered to set, collected after wrap",
    text: "From our base in San Juan de Alicante we deliver across the province, including Alicante city, Benidorm, Calpe, Altea, Dénia and Jávea, and regularly work in Murcia and the Valencia region. Tell us where you are shooting and we will plan drop-off and pick-up around your schedule.",
    image: { src: "/warehouse2.png", alt: "CLAMP lighting rental warehouse in Alicante, Spain" },
  },
  faq: {
    title: "FAQ for international productions",
    items: [
      {
        q: "Can we deal with you in English?",
        a: "Yes. Quotes, emails, calls and on-set communication can all be in English. Most of our clients are foreign productions.",
      },
      {
        q: "Do you deliver the gear to our location?",
        a: "Yes. We deliver to your set, hotel or studio anywhere on the Costa Blanca, Murcia and the Valencia region, and collect everything after wrap. Send us the address and call times when you request a quote.",
      },
      {
        q: "Can you provide gaffers, electricians or photo assistants?",
        a: "Yes. We can add English-speaking gaffers, electricians and photo assistants who know our equipment, so a travelling DoP can work with a small local lighting team.",
      },
      {
        q: "We are not sure what gear we need. Can you help?",
        a: "Of course. Share the format, locations and look you are after, or your DoP's list, and we will propose a lighting package before you confirm.",
      },
      {
        q: "Are the prices final?",
        a: "Catalog prices are daily rates excluding VAT. Multi-day shoots, delivery and crew are quoted to your schedule. Include your company details with your request and we will prepare the quote and invoice for your company.",
      },
    ],
  },
};

export default function LightingRentalAlicanteEn() {
  return <LandingView content={CONTENT} lang="en" />;
}
