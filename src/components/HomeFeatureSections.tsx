"use client";

import Image from "next/image";
import Link from "next/link";
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

export default function HomeFeatureSections() {
  const { t } = useLanguage();
  const features = [
    {
      icon: "⚡",
      title: t("homeFeatures.modernTitle"),
      desc: t("homeFeatures.modernText"),
    },
    {
      icon: "🚚",
      title: t("homeFeatures.deliveryTitle"),
      desc: t("homeFeatures.deliveryText"),
    },
    {
      icon: "👥",
      title: t("homeFeatures.supportTitle"),
      desc: t("homeFeatures.supportText"),
    },
  ];

  return (
    <>
      <section id="about" className="bg-black py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-4xl font-bold uppercase tracking-wide text-white">
            {t("homeFeatures.title")}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border border-gray-800 bg-gray-900 p-8 shadow-2xl transition-all duration-300 hover:shadow-3xl"
              >
                <div className="mb-4 text-4xl text-white">{feature.icon}</div>
                <h3 className="mb-3 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#0f1726] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-[#FFED00]">
              {t("homeSocial.eyebrow")}
            </p>
            <h2 className="text-3xl font-black uppercase leading-tight tracking-[0.02em] sm:text-4xl">
              {t("homeSocial.title")}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {SOCIAL_PROOF_IMAGES.map((image) => (
              <figure
                key={image.src}
                className={`relative aspect-[4/5] overflow-hidden rounded-lg bg-black shadow-[0_18px_50px_rgba(0,0,0,0.35)] ${image.className}`}
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

      <section className="bg-gray-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold uppercase tracking-wide text-white">
            {t("homeCta.title")}
          </h2>
          <p className="mb-8 text-lg text-gray-300">{t("homeCta.text")}</p>
          <Link
            href="/contacto"
            className="inline-block rounded-lg border border-white px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            {t("homeCta.button")}
          </Link>
        </div>
      </section>
    </>
  );
}
