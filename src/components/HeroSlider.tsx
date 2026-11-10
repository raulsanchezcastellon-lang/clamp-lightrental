"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type React from "react";
import { useLanguage } from "@/components/LanguageProvider";

type Slide = {
  image: string;
  /** Optional portrait version used on phones, so the subject stays visible. */
  mobileImage?: string;
  /** Focal point used when cropping on phones if there is no mobile image (CSS background-position). */
  mobilePosition?: string;
};

const SLIDES: Slide[] = [
  { image: "/CS32_Lifesytle.jpg", mobileImage: "/CS32_mobile.jpg", mobilePosition: "center top" },
  { image: "/about2.webp", mobilePosition: "25% center" },
  { image: "/main1.webp", mobilePosition: "50% center" },
  { image: "/main3.webp", mobilePosition: "68% center" },
];
const SLIDE_DURATION_MS = 6000;

const pad = (value: number) => String(value).padStart(2, "0");

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t, href } = useLanguage();
  const kickerParts = t("hero.kicker")
    .split("•")
    .map((part) => part.trim())
    .filter(Boolean);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, SLIDE_DURATION_MS);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <section className="relative overflow-hidden bg-black text-white md:min-h-screen md:supports-[height:100svh]:min-h-[100svh]">
      {/* Phones: picture in its own band under the header, text below it. Tablet/desktop: full-bleed picture behind the text. */}
      <div className="absolute inset-x-0 top-16 h-[50svh] md:inset-0 md:h-auto">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.image}
            className={`hero-slide absolute inset-0 bg-cover transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={
              {
                "--slide-desktop": `url(${slide.image})`,
                "--slide-mobile": `url(${slide.mobileImage ?? slide.image})`,
                "--slide-mobile-position": slide.mobilePosition ?? "center",
              } as React.CSSProperties
            }
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent md:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-black via-black/55 to-black/25 md:block" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-black/70 via-black/20 to-transparent md:block" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1580px] flex-col justify-end px-4 pb-10 pt-[calc(4rem+50svh-1.5rem)] sm:px-6 md:min-h-screen md:pb-14 md:pt-32 md:supports-[height:100svh]:min-h-[100svh] lg:px-8 lg:pb-16">
        <ul className="mb-6 hidden flex-wrap items-center gap-x-4 gap-y-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/70 sm:text-xs md:flex">
          {kickerParts.map((part, index) => (
            <li key={part} className="flex items-center gap-4">
              {index > 0 && <span aria-hidden="true" className="h-1 w-1 bg-[#FFED00] sm:h-px sm:w-6" />}
              {part}
            </li>
          ))}
        </ul>

        <h1 className="max-w-5xl text-[2.6rem] leading-[0.92] tracking-[-0.005em] sm:text-7xl lg:text-[6.75rem]">
          {t("hero.title")}
        </h1>

        <div className="mt-6 grid gap-8 border-t border-white/20 pt-6 md:mt-8 md:gap-10 md:pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="max-w-xl text-[0.95rem] leading-relaxed text-white/75 sm:text-lg">
              {t("hero.subtitle")}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-8">
              <Link
                href={href("/catalogo")}
                className="group inline-flex items-center justify-between gap-6 bg-[#FFED00] px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-white"
              >
                {t("hero.catalog")}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href={href("/contacto")}
                className="hidden items-center justify-center border border-white/60 px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:border-white hover:bg-white hover:text-black md:inline-flex"
              >
                {t("hero.quote")}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-5" aria-label="Slides">
            <span className="font-[family-name:var(--font-heading)] text-sm tabular-nums tracking-[0.12em] text-white">
              {pad(activeIndex + 1)}
              <span className="text-white/40"> / {pad(SLIDES.length)}</span>
            </span>
            <div className="flex gap-2">
              {SLIDES.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="group relative h-6 w-10 sm:w-14"
                  aria-label={`Slide ${index + 1}`}
                  aria-current={index === activeIndex}
                >
                  <span className="absolute inset-x-0 top-1/2 h-px bg-white/30 transition group-hover:bg-white/60" />
                  {index === activeIndex && (
                    <span
                      key={`progress-${activeIndex}`}
                      className="animate-slide-progress absolute left-0 top-1/2 h-px w-full origin-left bg-[#FFED00]"
                      style={{ animationDuration: `${SLIDE_DURATION_MS}ms` }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
