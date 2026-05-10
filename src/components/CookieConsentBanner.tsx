"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import {
  COOKIE_CONSENT_STORAGE_KEY,
  CookieConsentValue,
  getCookieConsent,
} from "@/lib/cookieConsent";

export default function CookieConsentBanner() {
  const { t } = useLanguage();
  const consent = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      window.addEventListener("cookie-consent-change", onStoreChange);

      return () => {
        window.removeEventListener("storage", onStoreChange);
        window.removeEventListener("cookie-consent-change", onStoreChange);
      };
    },
    getCookieConsent,
    () => "rejected"
  );

  const saveConsent = (choice: CookieConsentValue) => {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, choice);
    window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: choice }));
  };

  if (consent !== null) {
    return null;
  }

  return (
    <section
      aria-label={t("cookies.bannerTitle")}
      className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-4xl rounded-lg border border-white/10 bg-black p-4 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:p-5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-[#FFED00]">
            {t("cookies.bannerTitle")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/75">
            {t("cookies.bannerText")}{" "}
            <Link href="/cookies" className="font-bold text-white underline underline-offset-4">
              {t("cookies.policy")}
            </Link>
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row lg:shrink-0">
          <button
            type="button"
            onClick={() => saveConsent("rejected")}
            className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-black uppercase tracking-[0.1em] text-white transition hover:border-white hover:bg-white hover:text-black"
          >
            {t("cookies.reject")}
          </button>
          <button
            type="button"
            onClick={() => saveConsent("accepted")}
            className="rounded-full bg-[#FFED00] px-5 py-2.5 text-sm font-black uppercase tracking-[0.1em] text-black transition hover:bg-white"
          >
            {t("cookies.accept")}
          </button>
        </div>
      </div>
    </section>
  );
}
