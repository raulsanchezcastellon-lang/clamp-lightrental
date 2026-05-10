"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

type FeaturedProduct = {
  id: string;
  name: string;
  brand?: string;
  category: string;
  price: number;
  image?: string;
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(
          "/api/products?listingType=rental&featured=true&limit=8"
        );
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Unable to load featured products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (!loading && products.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#f7f7f4] px-4 py-8 text-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1580px]">
        {loading ? (
          <p className="text-sm font-medium text-black/45">{t("featured.loading")}</p>
        ) : (
          <div className="grid grid-cols-2 gap-px bg-black/12 md:grid-cols-4">
            {products.map((product) => (
              <article key={product.id} className="bg-white p-3 sm:p-4">
                <div className="flex aspect-square items-center justify-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center border border-black/10 text-xs font-medium uppercase tracking-[0.08em] text-black/30">
                      {t("featured.noImage")}
                    </div>
                  )}
                </div>
                <div className="mt-4 border-t border-black/10 pt-3">
                  {product.brand && (
                    <p className="mb-1 text-[0.7rem] font-black uppercase tracking-[0.12em] text-[#00000075]">
                      {product.brand}
                    </p>
                  )}
                  <h3 className="text-xs font-black leading-tight sm:text-sm">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-black/45">
                    {product.category}
                  </p>
                  <p className="mt-2 text-xs font-medium text-black/45">
                    {product.price ? `${product.price}€ ${t("price.day")}` : t("featured.priceOnRequest")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            href="/catalogo"
            className="rounded-full bg-black px-7 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#FFED00] hover:text-black"
          >
            {t("featured.catalog")}
          </Link>
        </div>
      </div>
    </section>
  );
}
