"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

const SOCIAL_PROOF_IMAGES = [
  {
    src: "/social-proof/01.webp",
    alt: "CLAMP lighting warehouse",
    className: "lg:translate-y-8",
  },
  {
    src: "/social-proof/02.jpg",
    alt: "Lighting equipment on set",
    className: "lg:-translate-y-2",
  },
  {
    src: "/social-proof/03.webp",
    alt: "CLAMP lighting setup",
    className: "lg:translate-y-12",
  },
  {
    src: "/social-proof/04.jpg",
    alt: "Professional lighting cases and equipment",
    className: "lg:translate-y-2",
  },
  {
    src: "/social-proof/05.webp",
    alt: "Lighting rental equipment in use",
    className: "lg:-translate-y-6",
  },
];

const pad = (value: number) => String(value).padStart(2, "0");

export default function HomeFeatureSections() {
  const { t } = useLanguage();
  const features = [
    {
      title: t("homeFeatures.modernTitle"),
      desc: t("homeFeatures.modernText"),
    },
    {
      title: t("homeFeatures.deliveryTitle"),
      desc: t("homeFeatures.deliveryText"),
    },
    {
      title: t("homeFeatures.supportTitle"),
      desc: t("homeFeatures.supportText"),
    },
  ];

  return (
    <>
      {/* Why CLAMP — editorial numbered columns, no cards */}
      <section id="about" className="bg-black text-white">
        <div className="mx-auto max-w-[1580px] px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">
          <h2 className="mb-12 max-w-3xl text-4xl leading-[0.95] sm:text-5xl lg:mb-16 lg:text-6xl">
            {t("homeFeatures.title")}
          </h2>

          <ol className="grid border-t border-white/15 md:grid-cols-3">
            {features.map((feature, index) => (
              <li
                key={feature.title}
                className="border-b border-white/15 py-8 md:border-b-0 md:border-l md:px-8 md:py-10 md:first:border-l-0 md:first:pl-0"
              >
                <span className="font-[family-name:var(--font-heading)] text-sm font-extrabold tracking-[0.12em] text-[#FFED00]">
                  {pad(index + 1)}
                </span>
                <h3 className="mt-10 text-2xl leading-none sm:text-3xl md:mt-16">
                  {feature.title}
                </h3>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-white/60">
                  {feature.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="overflow-hidden bg-[#0f1726] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-10 text-xs font-black uppercase tracking-[0.2em] text-[#FFED00]">
            {t("homeSocial.eyebrow")}
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {SOCIAL_PROOF_IMAGES.map((image) => (
              <figure
                key={image.src}
                className={`relative aspect-[4/5] overflow-hidden bg-black shadow-[0_18px_50px_rgba(0,0,0,0.35)] ${image.className}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
