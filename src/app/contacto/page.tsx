"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import { CONTACT_ADDRESS, CONTACT_HOURS } from "@/lib/contactInfo";
import { HONEYPOT_FIELD } from "@/lib/formSecurity";

function ContactContent() {
  const searchParams = useSearchParams();
  const product = searchParams.get("product");
  const isSale = searchParams.get("type") === "sale";
  const { t, language } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [honeypot, setHoneypot] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: product
      ? language === "en"
        ? `Hi, I'm interested in ${isSale ? "buying" : "renting"} the ${product}.`
        : `Hola, me interesa ${isSale ? "comprar" : "alquilar"} ${product}.`
      : "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, [HONEYPOT_FIELD]: honeypot }),
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-black px-4 py-28 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <section>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-gray-400">
              {t("contact.eyebrow")}
            </p>
            <h1 className="mb-6 text-4xl font-bold uppercase tracking-wide sm:text-5xl">
              {t("contact.title")}
            </h1>
            <p className="max-w-xl text-lg text-gray-300">
              {t("contact.text")}
            </p>

            <div className="mt-10 space-y-6 text-gray-300">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Email</p>
                <a href="mailto:raul@clamp-lightrental.com" className="mt-2 inline-block hover:text-white">
                  raul@clamp-lightrental.com
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">WhatsApp</p>
                <a
                  href="https://wa.me/34681878782"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block hover:text-white"
                >
                  +34 681 878 782
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">{t("contact.location")}</p>
                <p className="mt-2">{CONTACT_ADDRESS[language]}</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">{t("contact.hours")}</p>
                <div className="mt-2 space-y-1">
                  {CONTACT_HOURS[language].map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-[#0f0f0f] p-6 shadow-2xl sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-gray-300">{t("cart.name")}</label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  maxLength={120}
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-[#111111] px-4 py-3 text-white outline-none focus:border-white/50"
                  required
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-gray-300">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    autoComplete="email"
                    maxLength={200}
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-[#111111] px-4 py-3 text-white outline-none focus:border-white/50"
                    required
                  />
                </div>

                <div>
                    <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium text-gray-300">{t("cart.phone")}</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    autoComplete="tel"
                    maxLength={40}
                    type="tel"
                    value={form.phone}
                    onChange={(event) => setForm({ ...form, phone: event.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-[#111111] px-4 py-3 text-white outline-none focus:border-white/50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-gray-300">{t("contact.message")}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  maxLength={5000}
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  className="min-h-40 w-full rounded-lg border border-white/10 bg-[#111111] px-4 py-3 text-white outline-none focus:border-white/50"
                  required
                />
              </div>

              {/* Campo trampa para bots: oculto a personas y lectores de pantalla. */}
              <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                />
              </div>

              {status === "sent" && (
                <p className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-emerald-200">
                  {t("contact.sent")}
                </p>
              )}
              {status === "error" && (
                <p className="rounded-lg border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-rose-200">
                  {t("contact.error")}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-lg border border-white px-6 py-3 font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black disabled:opacity-60"
              >
                {status === "sending" ? t("contact.sending") : t("contact.send")}
              </button>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense>
      <ContactContent />
    </Suspense>
  );
}
