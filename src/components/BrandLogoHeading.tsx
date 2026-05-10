"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function BrandLogoHeading() {
  const { t } = useLanguage();

  return (
    <h2 className="mb-10 text-center text-2xl font-black uppercase tracking-[0.06em] text-white">
      {t("brands.title")}
    </h2>
  );
}
