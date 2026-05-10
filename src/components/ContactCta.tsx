"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function ContactCta() {
  const { t } = useLanguage();

  return (
    <section className="border-b-[10px] border-[#FFED00] bg-black px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">
            {t("cta.eyebrow")}
          </p>
          <h2 className="mt-4 max-w-5xl text-3xl font-black uppercase leading-tight tracking-[0.02em] sm:text-4xl lg:text-5xl">
            {t("cta.title")}
          </h2>
        </div>
        <Link
          href="/contacto"
          className="inline-flex w-fit rounded-full border border-white px-8 py-4 text-sm font-black uppercase tracking-[0.12em] transition hover:bg-white hover:text-black"
        >
          {t("cta.button")}
        </Link>
      </div>
    </section>
  );
}
