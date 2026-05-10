import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.clamp-lightrental.com"),
  title: {
    default: "CLAMP Light Rental",
    template: "%s | CLAMP Light Rental",
  },
  description:
    "Professional lighting equipment rental for photo, video, advertising shoots and production crews in Alicante and across the Spanish Mediterranean coast.",
  keywords: [
    "lighting rental",
    "light rental",
    "film lighting rental",
    "photo lighting rental",
    "video production equipment",
    "Alicante lighting rental",
    "CLAMP Light Rental",
  ],
  authors: [{ name: "CLAMP Light Rental" }],
  creator: "CLAMP Light Rental",
  publisher: "CLAMP Light Rental",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "CLAMP Light Rental",
    title: "CLAMP Light Rental",
    description:
      "Professional lighting equipment rental for photo, video, advertising shoots and production crews in Alicante and across the Spanish Mediterranean coast.",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 1024,
        alt: "CLAMP Light Rental",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CLAMP Light Rental",
    description:
      "Professional lighting equipment rental for photo, video, advertising shoots and production crews in Alicante and across the Spanish Mediterranean coast.",
    images: ["/og-image.png"],
  },
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
        <LanguageProvider>
          <CartProvider>
            {children}
            <WhatsAppButton />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
