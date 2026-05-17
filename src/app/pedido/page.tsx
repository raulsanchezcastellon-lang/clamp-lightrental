"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/components/CartProvider";
import { useLanguage } from "@/components/LanguageProvider";

export default function PedidoPage() {
  const { items, totalItems, updateQuantity, removeItem, clearCart } = useCart();
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    pickupDate: "",
    returnDate: "",
    delivery: "no",
    comments: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const estimatedTotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items,
          estimatedTotal,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || "Unable to send order");
      }

      setStatus("sent");
      clearCart();
      setForm({
        name: "",
        email: "",
        phone: "",
        pickupDate: "",
        returnDate: "",
        delivery: "no",
        comments: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Unable to send order");
    }
  };

  return (
    <>
      <Header />

      <div className="sticky top-[65px] z-40 mt-[65px] border-b border-black/10 bg-white px-4 py-3 text-black shadow-sm sm:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <span className="text-xs font-black uppercase tracking-[0.12em] text-black/45">
            {totalItems} {t(totalItems === 1 ? "cart.item" : "cart.items")}
          </span>
          <span className="text-right text-sm font-black">
            {t("cart.estimatedTotal")}: {estimatedTotal}€
            <span className="ml-1 align-middle text-[0.56rem] font-black uppercase tracking-[0.08em] text-black/25">
              {t("price.exTax")}
            </span>
          </span>
        </div>
      </div>

      <main className="min-h-screen bg-[#f7f7f4] px-4 pb-10 pt-6 text-black sm:px-6 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-black/35">
                {t("cart.eyebrow")}
              </p>
              <h1 className="mt-2 text-3xl font-black uppercase tracking-[0.02em]">
                {t("cart.title")}
              </h1>
            </div>
            <Link
              href="/catalogo"
              className="inline-flex rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-black text-black/60 transition hover:border-black hover:text-black"
            >
              {t("cart.addMore")}
            </Link>
          </div>

          {status === "sent" && (
            <div className="mb-8 rounded-lg border border-emerald-500/20 bg-emerald-50 px-5 py-4">
              <h2 className="text-lg font-black">{t("cart.sentTitle")}</h2>
              <p className="mt-1 max-w-2xl text-sm font-medium text-black/60">
                {t("cart.sentText")}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <section className="order-2 space-y-3 sm:order-1 sm:space-y-4">
                {items.length === 0 ? (
                  <div className="rounded-lg border border-black/10 bg-white p-8">
                    <h2 className="text-xl font-black">{t("cart.emptyTitle")}</h2>
                    <p className="mt-2 text-black/55">
                      {t("cart.emptyText")}
                    </p>
                  </div>
                ) : (
                  items.map((item) => (
                    <article
                      key={item.id}
                      className="grid grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-black/10 bg-white p-3 sm:grid-cols-[96px_1fr_auto] sm:gap-4 sm:p-4"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#f7f7f4] sm:aspect-square sm:h-auto sm:w-auto">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={[item.brand, item.name, item.category].filter(Boolean).join(" - ")}
                            className="h-full w-full object-contain p-2"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-xs font-medium uppercase text-black/30">
                            {t("cart.noImage")}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        {item.brand && (
                          <p className="mb-0.5 truncate text-[0.62rem] font-black uppercase tracking-[0.1em] text-[#00000075] sm:mb-1 sm:text-xs sm:tracking-[0.12em]">
                            {item.brand}
                          </p>
                        )}
                        <h2 className="truncate text-sm font-black sm:text-base">{item.name}</h2>
                        {item.category && (
                          <p className="mt-1 hidden text-sm font-medium text-black/45 sm:block">
                            {item.category}
                          </p>
                        )}
                        <p className="mt-0.5 text-xs font-medium text-black/45 sm:mt-1 sm:text-sm">
                          {item.price}€ {item.listingType === "rental" ? t("price.day") : ""}
                          <span className="ml-1 hidden text-[0.62rem] font-black uppercase tracking-[0.08em] text-black/25 sm:inline">
                            {t("price.exTax")}
                          </span>
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2 sm:gap-3 sm:justify-center">
                        <div className="grid grid-cols-3 rounded-full border border-black/10 bg-[#f7f7f4]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 text-base font-medium text-black/55 transition hover:text-black sm:h-10 sm:w-12 sm:text-lg"
                            aria-label={`Reduce ${item.name} quantity`}
                          >
                            -
                          </button>
                          <span
                            className="flex h-8 w-8 items-center justify-center text-xs font-black sm:h-10 sm:w-12 sm:text-sm"
                            aria-label={`${item.name} quantity`}
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 text-base font-medium text-black/55 transition hover:text-black sm:h-10 sm:w-12 sm:text-lg"
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-[0.62rem] font-black uppercase tracking-[0.08em] text-black/35 transition hover:text-black sm:text-xs sm:tracking-[0.1em]"
                        >
                          {t("cart.remove")}
                        </button>
                      </div>
                    </article>
                  ))
                )}
              </section>

              <section className="order-1 rounded-lg border border-black/10 bg-white p-5 sm:order-2 lg:sticky lg:top-24 lg:self-start">
                <div className="border-b border-black/10 pb-4">
                  <h2 className="text-xl font-black uppercase tracking-[0.02em]">
                    {t("cart.detailsTitle")}
                  </h2>
                  <p className="mt-2 text-sm text-black/50">
                    {t("cart.detailsText")}
                  </p>
                </div>

                <div className="mt-5 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-black">
                      {t("cart.name")} <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(event) => setForm({ ...form, name: event.target.value })}
                      className="w-full rounded-md border border-black/10 bg-[#f7f7f4] px-4 py-3 outline-none focus:border-black/40"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-black">
                      {t("cart.email")} <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm({ ...form, email: event.target.value })}
                      className="w-full rounded-md border border-black/10 bg-[#f7f7f4] px-4 py-3 outline-none focus:border-black/40"
                      required
                    />
                  </div>

                  <p className="-mt-2 text-xs font-medium text-black/45">
                    {t("cart.required")}
                  </p>

                  <div>
                    <label className="mb-2 block text-sm font-black">{t("cart.phone")}</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(event) => setForm({ ...form, phone: event.target.value })}
                      className="w-full rounded-md border border-black/10 bg-[#f7f7f4] px-4 py-3 outline-none focus:border-black/40"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-black">{t("cart.pickup")}</label>
                      <input
                        type="date"
                        value={form.pickupDate}
                        onChange={(event) =>
                          setForm({ ...form, pickupDate: event.target.value })
                        }
                        className="w-full rounded-md border border-black/10 bg-[#f7f7f4] px-4 py-3 outline-none focus:border-black/40"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-black">{t("cart.return")}</label>
                      <input
                        type="date"
                        value={form.returnDate}
                        onChange={(event) =>
                          setForm({ ...form, returnDate: event.target.value })
                        }
                        className="w-full rounded-md border border-black/10 bg-[#f7f7f4] px-4 py-3 outline-none focus:border-black/40"
                        required
                      />
                    </div>
                  </div>

                  <fieldset>
                    <legend className="mb-2 block text-sm font-black">{t("cart.delivery")}</legend>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: t("cart.no"), value: "no" },
                        { label: t("cart.yes"), value: "yes" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setForm({ ...form, delivery: option.value })}
                          className={`rounded-md border px-4 py-3 text-sm font-black transition ${
                            form.delivery === option.value
                              ? "border-black bg-black text-white"
                              : "border-black/10 bg-[#f7f7f4] text-black/55 hover:border-black/35"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <label className="mb-2 block text-sm font-black">{t("cart.comments")}</label>
                    <textarea
                      value={form.comments}
                      onChange={(event) => setForm({ ...form, comments: event.target.value })}
                      className="min-h-32 w-full rounded-md border border-black/10 bg-[#f7f7f4] px-4 py-3 outline-none focus:border-black/40"
                      placeholder={t("cart.commentsPlaceholder")}
                    />
                  </div>

                  <div className="rounded-md bg-[#f7f7f4] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black uppercase tracking-[0.08em] text-black/45">
                        {t("cart.estimatedTotal")}
                      </span>
                      <span className="text-right text-xl font-black">
                        {estimatedTotal}€
                        <span className="ml-1 align-middle text-[0.62rem] font-black uppercase tracking-[0.08em] text-black/25">
                          {t("price.exTax")}
                        </span>
                      </span>
                    </div>
                  </div>

                  {status === "error" && (
                    <p className="rounded-md border border-rose-400/30 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={items.length === 0 || status === "sending"}
                    className="w-full rounded-full bg-[#FFED00] px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {status === "sending" ? t("cart.sending") : t("cart.send")}
                  </button>
                </div>
              </section>
            </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
