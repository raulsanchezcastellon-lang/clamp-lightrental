"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useLanguage } from "@/components/LanguageProvider";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-sm shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-4">
            <div className="relative w-72 h-12 sm:w-80 sm:h-12 lg:w-96 lg:h-12">
              <Image
                src="/CLAMP_Logos-20.svg"
                alt="CLAMP Light Rental"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-10 text-[0.78rem] uppercase tracking-[0.18em] text-gray-300 font-semibold" style={{ fontStretch: "condensed" }}>
            <Link href="/catalogo" className="hover:text-white transition">
              {t("nav.equipment")}
            </Link>
            <Link href="/store" className="hover:text-white transition">
              {t("nav.store")}
            </Link>
            <Link href="/about" className="hover:text-white transition">
              {t("nav.about")}
            </Link>
            <Link href="/contacto" className="hover:text-white transition">
              {t("nav.contact")}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={language === "en" ? "Cambiar a español" : "Switch to English"}
              className="hidden h-10 min-w-10 items-center justify-center rounded-full border border-white px-3 text-xs font-black uppercase tracking-[0.08em] text-white transition hover:bg-white hover:text-black sm:inline-flex"
            >
              {language === "en" ? "ES" : "EN"}
            </button>

            <a
              href="tel:+34681878782"
              aria-label={t("nav.call")}
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-white text-white transition hover:bg-white hover:text-black sm:inline-flex"
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.25 6.75c0 8.28 6.72 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.37c0-.52-.35-.97-.85-1.09l-4.42-1.1c-.44-.11-.9.05-1.18.4l-.97 1.21a1.13 1.13 0 0 1-1.21.36 12.04 12.04 0 0 1-7.03-7.03 1.13 1.13 0 0 1 .36-1.21l1.21-.97c.35-.28.51-.74.4-1.18L6.96 3.1a1.13 1.13 0 0 0-1.09-.85H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
            </a>

            <Link
              href="/pedido"
              aria-label={t("nav.cart")}
              className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-white text-white transition hover:bg-white hover:text-black sm:inline-flex"
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.25 3h1.39c.5 0 .94.34 1.06.82l.36 1.43m0 0L6.9 13.1a2.25 2.25 0 0 0 2.2 1.72h7.76a2.25 2.25 0 0 0 2.17-1.67l1.2-4.5A1.13 1.13 0 0 0 19.14 7.25H5.06Zm4.69 16.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm9 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FFED00] px-1 text-[0.65rem] font-black text-black">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              className="inline-flex items-center justify-center rounded-full border border-white p-2 text-white hover:bg-white hover:text-black transition lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open navigation"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="lg:hidden mt-4 flex flex-col gap-4 border-t border-white/10 pt-4 text-sm uppercase tracking-[0.14em] text-gray-300">
            <Link href="/catalogo" className="hover:text-white transition">
              {t("nav.equipment")}
            </Link>
            <Link href="/store" className="hover:text-white transition">
              {t("nav.store")}
            </Link>
            <Link href="/about" className="hover:text-white transition">
              {t("nav.about")}
            </Link>
            <Link href="/contacto" className="hover:text-white transition">
              {t("nav.contact")}
            </Link>
            <button
              type="button"
              onClick={toggleLanguage}
              className="rounded-full border border-white px-4 py-2 text-center text-white hover:bg-white hover:text-black transition"
            >
              {language === "en" ? "Español" : "English"}
            </button>
            <a
              href="tel:+34681878782"
              className="rounded-full border border-white px-4 py-2 text-center text-white hover:bg-white hover:text-black transition"
            >
              {t("nav.call")} +34 681 878 782
            </a>
            <Link
              href="/pedido"
              className="rounded-full border border-white px-4 py-2 text-center text-white hover:bg-white hover:text-black transition"
            >
              {t("nav.cart")} {totalItems > 0 ? `(${totalItems})` : ""}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
