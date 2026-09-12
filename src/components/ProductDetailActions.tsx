"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import type { PublicProduct } from "@/lib/products";

export default function ProductDetailActions({
  product,
  listingType,
}: {
  product: PublicProduct;
  listingType: "rental" | "sale";
}) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

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
  };

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="grid w-32 grid-cols-3 rounded-full border border-black/15 bg-white">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="h-11 text-lg font-medium text-black/55 transition hover:text-black"
          aria-label="Reducir cantidad"
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
          aria-label="Aumentar cantidad"
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="h-11 rounded-full bg-[#FFED00] px-6 text-sm font-black text-black transition hover:bg-black hover:text-white"
      >
        Añadir al pedido
      </button>
      <Link
        href={`/contacto?product=${encodeURIComponent(product.name)}`}
        className="inline-flex h-11 items-center justify-center rounded-full border border-black px-6 text-sm font-black text-black transition hover:bg-black hover:text-white"
      >
        Pedir presupuesto
      </Link>
    </div>
  );
}
