"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

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
