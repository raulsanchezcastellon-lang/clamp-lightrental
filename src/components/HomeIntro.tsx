"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function HomeIntro() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#f7f7f4] px-4 py-14 text-black sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[280px_1px_1fr] lg:items-start lg:gap-12">
        <div className="lg:text-right">
          <h2 className="text-3xl font-black uppercase leading-tight tracking-[0.02em] sm:text-4xl">
            {t("homeIntro.eyebrow")}
          </h2>
        </div>
        <div className="hidden h-full min-h-28 bg-black/15 lg:block" aria-hidden="true" />
        <div className="max-w-5xl">
          <div className="max-w-4xl space-y-4 text-lg font-medium leading-relaxed text-black/60">
            <p>{t("homeIntro.p1")}</p>
            <p>{t("homeIntro.p2")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
