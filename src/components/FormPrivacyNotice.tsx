"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

/**
 * Información básica de protección de datos (primera capa RGPD) bajo los formularios.
 * El detalle completo está en /privacidad.
 */
export default function FormPrivacyNotice({
  purpose,
  tone = "light",
}: {
  purpose: "contact" | "order";
  tone?: "light" | "dark";
}) {
  const { t } = useLanguage();
  const linkClass = tone === "dark" ? "underline hover:text-white" : "underline hover:text-black";

  return (
    <p className={`text-xs leading-relaxed ${tone === "dark" ? "text-gray-500" : "text-black/45"}`}>
      {t("privacy.controller")}{" "}
      {t(purpose === "contact" ? "privacy.purposeContact" : "privacy.purposeOrder")}{" "}
      {t("privacy.rights")}{" "}
      <Link href="/privacidad" className={linkClass}>
        {t("privacy.link")}
      </Link>
      .
    </p>
  );
}
