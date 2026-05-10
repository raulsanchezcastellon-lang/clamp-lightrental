"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const SLIDES = [
  {
    image: "about2.webp",
  },
  {
    image: "main1.webp"
    },
  {
    image: "main3.webp"  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden supports-[height:100svh]:min-h-[100svh]">
      <div className="absolute inset-0">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center supports-[height:100svh]:min-h-[100svh]">
        <p className="text-sm uppercase tracking-[0.4em] mb-4 text-gray-300">
          {t("hero.kicker")}
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-[0.16em] text-white max-w-4xl">
          {t("hero.title")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-300">
          {t("hero.subtitle")}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/catalogo"
            className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300"
          >
            {t("hero.catalog")}
          </Link>
          <Link
            href="/contacto"
            className="bg-gray-800/90 border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            {t("hero.quote")}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex items-center gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-white" : "bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
