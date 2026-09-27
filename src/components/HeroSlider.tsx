"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const SLIDES = [{ image: "about2.webp" }, { image: "main1.webp" }, { image: "main3.webp" }];
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
    <section className="relative min-h-screen overflow-hidden bg-black text-white supports-[height:100svh]:min-h-[100svh]">
      <div className="absolute inset-0">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1580px] flex-col justify-end px-4 pb-14 pt-32 supports-[height:100svh]:min-h-[100svh] sm:px-6 lg:px-8 lg:pb-16">
        <ul className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/70 sm:text-xs">
          {kickerParts.map((part, index) => (
            <li key={part} className="flex items-center gap-4">
              {index > 0 && <span aria-hidden="true" className="h-1 w-1 bg-[#FFED00] sm:h-px sm:w-6" />}
              {part}
            </li>
          ))}
        </ul>

        <h1 className="max-w-5xl text-5xl leading-[0.92] tracking-[-0.005em] sm:text-7xl lg:text-[6.75rem]">
          {t("hero.title")}
        </h1>

        <div className="mt-8 grid gap-10 border-t border-white/20 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
                className="inline-flex items-center justify-center border border-white/60 px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:border-white hover:bg-white hover:text-black"
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
