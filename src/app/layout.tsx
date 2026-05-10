import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { LanguageProvider } from "@/components/LanguageProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CLAMP Light Rental | Lighting Equipment Rental in Alicante",
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
    SITE_NAME,
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: "Lighting equipment rental",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: "CLAMP Light Rental | Lighting Equipment Rental in Alicante",
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
    title: "CLAMP Light Rental | Lighting Equipment Rental in Alicante",
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
  description: DEFAULT_DESCRIPTION,
  email: "raul@clamp-lightrental.com",
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
    "Valencian Community",
    "Spanish Mediterranean coast",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Professional lighting equipment rental",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Technical lighting crew and on-set support",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
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
            <CookieConsentBanner />
            <WhatsAppButton />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
