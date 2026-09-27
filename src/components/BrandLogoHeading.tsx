"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function BrandLogoHeading() {
  const { t } = useLanguage();

  return (
    <h2 className="mb-8 border-b border-white/15 pb-5 text-sm font-semibold uppercase tracking-[0.22em] text-white/50" style={{ fontFamily: "var(--font-body)" }}>
      {t("brands.title")}
    </h2>
  );
}
