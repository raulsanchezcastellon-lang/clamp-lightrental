import type { Metadata } from "next";
import { hasEnglishVersion, languageAlternates, localizePath, type Language } from "@/lib/i18n";

export const SITE_URL = "https://www.clamp-lightrental.com";
export const SITE_NAME = "CLAMP Light Rental";
export const DEFAULT_OG_IMAGE = "/og-image.png";
export const DEFAULT_DESCRIPTION =
  "Alquiler de equipos de iluminación profesional para rodajes de cine, publicidad y fotografía en Alicante y la costa mediterránea española.";
export const DEFAULT_DESCRIPTION_EN =
  "Professional film lighting rental in Alicante, Spain. Gear delivered to set, collected after wrap and English-speaking lighting crew for international productions shooting on the Costa Blanca.";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
  /** Idioma de la página. `path` es siempre la ruta ESPAÑOLA de referencia. */
  lang?: Language;
  /** @deprecated usa `lang` */
  locale?: "en_US" | "en_GB" | "es_ES";
};

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  lang = "es",
}: PageMetadataOptions): Metadata {
  const url = localizePath(path, lang);
  const translated = hasEnglishVersion(path);
  const ogLocale = lang === "en" ? "en_GB" : "es_ES";

  return {
    title,
    description,
    alternates: {
      canonical: url,
      ...(translated && !noIndex ? { languages: languageAlternates(path) } : {}),
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: ogLocale,
      ...(translated ? { alternateLocale: lang === "en" ? ["es_ES"] : ["en_GB"] } : {}),
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: image,
          width: 1024,
          height: 1024,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
