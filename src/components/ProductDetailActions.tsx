"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useLanguage } from "@/components/LanguageProvider";
import type { PublicProduct } from "@/lib/products";

export default function ProductDetailActions({
  product,
  listingType,
}: {
  product: PublicProduct;
  listingType: "rental" | "sale";
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { t, href } = useLanguage();

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      image: product.image,
      listingType,
      quantity,
    });
    setAdded(true);
  };

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="grid w-32 grid-cols-3 rounded-full border border-black/15 bg-white">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="h-11 text-lg font-medium text-black/55 transition hover:text-black"
          aria-label={t("product.decrease")}
        >
          -
        </button>
        <span className="flex h-11 items-center justify-center text-sm font-black">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => setQuantity((q) => q + 1)}
          className="h-11 text-lg font-medium text-black/55 transition hover:text-black"
          aria-label={t("product.increase")}
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="h-11 rounded-full bg-[#FFED00] px-6 text-sm font-black text-black transition hover:bg-black hover:text-white"
      >
        {t("product.add")}
      </button>
      <Link
        href={href(`/contacto?product=${encodeURIComponent(product.name)}${listingType === "sale" ? "&type=sale" : ""}`)}
        className="inline-flex h-11 items-center justify-center rounded-full border border-black px-6 text-sm font-black text-black transition hover:bg-black hover:text-white"
      >
        {t("product.quote")}
      </Link>
      {added && (
        <p
          role="status"
          className="flex w-full items-center gap-3 rounded-lg bg-black px-4 py-3 text-sm font-bold text-white"
        >
          <span aria-hidden="true" className="text-[#FFED00]">✓</span>
          <span>{t("product.added")}</span>
          <Link
            href={href("/pedido")}
            className="ml-auto whitespace-nowrap text-[#FFED00] underline underline-offset-4 hover:no-underline"
          >
            {t("product.viewCart")} →
          </Link>
        </p>
      )}
    </div>
  );
}
