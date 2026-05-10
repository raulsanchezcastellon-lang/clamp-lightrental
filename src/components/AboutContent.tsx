"use client";

import Image from "next/image";
import ContactCta from "@/components/ContactCta";
import { useLanguage } from "@/components/LanguageProvider";

const SERVICE_IMAGES = [
  "/aputure_family.jpg",
  "/about4.webp",
  "/about1.webp",
  "/1200x_3.jpg",
];

export default function AboutContent() {
  const { t } = useLanguage();
  const services = [
    {
      title: t("about.service1Title"),
      image: SERVICE_IMAGES[0],
      text: t("about.service1Text"),
    },
    {
      title: t("about.service2Title"),
      image: SERVICE_IMAGES[1],
      text: t("about.service2Text"),
    },
    {
      title: t("about.service3Title"),
      image: SERVICE_IMAGES[2],
      text: t("about.service3Text"),
    },
    {
      title: t("about.service4Title"),
      image: SERVICE_IMAGES[3],
      text: t("about.service4Text"),
    },
  ];

  return (
    <main className="bg-[#f7f7f4] text-black">
      <section className="border-b border-black/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-24 sm:px-6 sm:pt-28 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-20 lg:pt-32">
          <div className="flex flex-col justify-center">
            <h1 className="max-w-3xl text-3xl font-black uppercase leading-tight tracking-[0.01em] sm:text-4xl lg:text-5xl">
              {t("homeIntro.eyebrow")}
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-lg font-medium leading-relaxed text-black/60">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-lg bg-black lg:min-h-[560px]">
            <Image
              src="/warehouse2.png"
              alt="CLAMP lighting equipment"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-black/35">
            {t("about.workTitle")}
          </h2>
          <div className="max-w-4xl space-y-5 text-2xl font-black leading-snug tracking-[0.01em] sm:text-3xl">
            <p>{t("about.intro")}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-px overflow-hidden rounded-lg bg-black/10">
          {services.map((service, index) => (
            <article key={service.title} className="grid bg-white lg:grid-cols-2">
              <div
                className={`relative min-h-[280px] bg-white sm:min-h-[360px] ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                <h3 className="text-3xl font-black uppercase tracking-[0.02em]">
                  {service.title}
                </h3>
                <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-black/60">
                  {service.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
