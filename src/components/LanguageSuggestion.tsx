"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { switchLanguagePath } from "@/lib/i18n";

const DISMISS_KEY = "clamp-lang-suggestion-dismissed";

/**
 * Aviso discreto cuando el idioma del navegador no coincide con el de la página
 * (p. ej. un visitante extranjero que llega a la versión española). No redirige
 * automáticamente: así Google y los enlaces compartidos ven siempre la misma URL.
 */
export default function LanguageSuggestion() {
  const { language, t } = useLanguage();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      dismissed = false;
    }
    if (dismissed) return;

    const browserLanguage = (
      window.navigator.languages?.[0] ||
      window.navigator.language ||
      ""
    ).toLowerCase();
    const browserIsSpanish = browserLanguage.startsWith("es");
    const mismatch = language === "es" ? !browserIsSpanish : browserIsSpanish;

    // Sincronización puntual con el navegador tras el montaje.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(Boolean(browserLanguage) && mismatch);
  }, [language, pathname]);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Sin almacenamiento disponible: se oculta solo en esta vista.
    }
  };

  const target = language === "es" ? "en" : "es";

  return (
    <div className="fixed inset-x-0 top-16 z-40 flex justify-center px-4">
      <div className="flex items-center gap-3 rounded-full bg-[#FFED00] px-4 py-2 text-sm font-semibold text-black shadow-lg">
        <span>{t("langSuggest.text")}</span>
        <Link
          href={switchLanguagePath(pathname || "/", target)}
          hrefLang={target}
          onClick={dismiss}
          className="rounded-full bg-black px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-white"
        >
          {t("langSuggest.button")}
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label={t("langSuggest.dismiss")}
          className="px-1 text-lg leading-none text-black/60 hover:text-black"
        >
          ×
        </button>
      </div>
    </div>
  );
}
