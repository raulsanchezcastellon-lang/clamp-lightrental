import type { Metadata } from "next";

export const SITE_URL = "https://www.clamp-lightrental.com";
export const SITE_NAME = "CLAMP Light Rental";
export const DEFAULT_OG_IMAGE = "/og-image.png";
export const DEFAULT_DESCRIPTION =
  "Alquiler de equipos de iluminación profesional para producciones de foto, vídeo, publicidad y eventos en Alicante y la costa mediterránea española.";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
  locale?: "en_US" | "es_ES";
};

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  locale = "es_ES",
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
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
      locale,
      url: path,
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
