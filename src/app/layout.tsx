import type { Metadata } from "next";
import { headers } from "next/headers";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { LanguageProvider } from "@/components/LanguageProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
import LanguageSuggestion from "@/components/LanguageSuggestion";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_DESCRIPTION_EN,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CLAMP Light Rental | Alquiler de Iluminación en Alicante",
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "lighting rental",
    "light rental",
    "film lighting rental",
    "photo lighting rental",
    "video production equipment",
    "Alicante lighting rental",
    "alquiler material iluminación rodajes Alicante",
    "alquiler iluminación cine Alicante",
    "alquiler focos rodaje Costa Blanca",
    "alquiler iluminación Benidorm",
    "alquiler iluminación Murcia",
    "alquiler material cine Dénia",
    "alquiler focos Jávea",
    SITE_NAME,
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: "Lighting equipment rental",
  verification: {
    google: "26sDH8y85x0GwmQ-NaSEwU338H7a3VPdhmYFToWCips",
  },
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: SITE_NAME,
    title: "CLAMP Light Rental | Alquiler de Iluminación en Alicante",
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1024,
        height: 1024,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CLAMP Light Rental | Alquiler de Iluminación en Alicante",
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  description: DEFAULT_DESCRIPTION_EN,
  email: "raul@clamp-lightrental.com",
  knowsLanguage: ["en", "es"],
  telephone: "+34681878782",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Tomas Capelo, 42",
    postalCode: "03550",
    addressLocality: "San Juan d'Alacant",
    addressRegion: "Alicante",
    addressCountry: "ES",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    "Alicante",
    "Benidorm",
    "Calpe",
    "Dénia",
    "Jávea",
    "Murcia",
    "Costa Blanca",
    "Comunidad Valenciana",
    "Spanish Mediterranean coast",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Film and photo lighting equipment rental",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "English-speaking lighting crew (gaffers and technicians)",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Equipment delivery to set and collection",
      },
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const lang = requestHeaders.get("x-clamp-lang") === "en" ? "en" : "es";

  return (
    <html
      lang={lang}
      className={`${barlow.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <LanguageProvider>
          <CartProvider>
            {children}
            <LanguageSuggestion />
            <CookieConsentBanner />
            <WhatsAppButton />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
