"use client";

import Image from "next/image";
import { CONTACT_HOURS } from "@/lib/contactInfo";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-[#FFED00] text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="flex flex-col items-start gap-4">
            <div className="relative w-40 h-16">
              <Image
                src="/CLAMP_Logos-01.svg"
                alt="CLAMP Lighting Rental"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-3 text-black/80 text-sm">
              <li>
                <span className="block font-semibold">Email</span>
                <a href="mailto:raul@clamp-lightrental.com" className="hover:underline">
                  raul@clamp-lightrental.com
                </a>
              </li>
              <li>
                <span className="block font-semibold">{t("cart.phone")}</span>
                <a href="tel:+34681878782" className="hover:underline">
                  +34 681 878 782
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t("footer.locationHours")}</h4>
            <div className="space-y-3 text-black/80 text-sm">
              <div>
                <span className="block font-semibold">{t("contact.location")}</span>
                <a
                  href="https://www.google.com/maps/place/Calle+Tom%C3%A1s+Capelo+42,+03550+San+Juan+d%27Alacant,+España"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  Calle Tomás Capelo, 42, 03550 San Juan d&apos;Alacant, Spain
                </a>
              </div>
              <div>
                <span className="block font-semibold">{t("footer.openingHours")}</span>
                <div className="space-y-1 text-sm text-black/80">
                  {CONTACT_HOURS.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t("footer.legal")}</h4>
            <ul className="space-y-3 text-black/80 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  {t("footer.legalNotice")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  {t("footer.privacy")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  {t("footer.cookies")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-black/20 pt-6">
          <p className="text-center text-black/70 text-sm">
            © {currentYear} CLAMP Light Rental. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
