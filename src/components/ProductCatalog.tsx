"use client";

import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useLanguage } from "@/components/LanguageProvider";

type ListingType = "rental" | "sale";

interface Product {
  id: string;
  name: string;
  brand?: string;
  category: string;
  price: number;
  image?: string;
  description?: string;
  listingType?: ListingType;
}

interface ProductCatalogProps {
  listingType: ListingType;
  title: string;
  emptyText: string;
}

export default function ProductCatalog({ listingType }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(`/api/products?listingType=${listingType}`);
        const data = await response.json();

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [listingType]);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category).filter(Boolean))],
    [products]
  );

  const filteredProducts =
    products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const normalizedQuery = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !normalizedQuery ||
        [product.brand, product.name, product.category, product.description]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(normalizedQuery));

      return matchesCategory && matchesSearch;
    });

  const priceSuffix = listingType === "rental" ? t("price.day") : "";
  const actionLabel = t("catalog.add");
  const title =
    listingType === "rental" ? t("catalog.equipmentTitle") : t("catalog.storeTitle");
  const emptyText =
    listingType === "rental" ? t("catalog.emptyRental") : t("catalog.emptyStore");

  const setProductQuantity = (productId: string, quantity: number) => {
    setQuantities((currentQuantities) => ({
      ...currentQuantities,
      [productId]: Math.max(1, quantity),
    }));
  };

  const handleAddProduct = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      image: product.image,
      listingType,
      quantity: quantities[product.id] || 1,
    });
  };

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-black">
      <div className="border-b border-black/15 bg-[#f7f7f4]">
        <div className="mx-auto flex max-w-[1580px] flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <h1 className="text-xl font-black uppercase tracking-[0.02em] sm:text-2xl">
                {title}
              </h1>

              <div className="relative w-full lg:w-[360px]">
                <svg
                  aria-hidden="true"
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m21 21-4.35-4.35m1.35-5.4a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z"
                  />
                </svg>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={t("catalog.search")}
                  className="h-10 w-full rounded-full border border-black/15 bg-white py-2 pl-10 pr-4 text-sm font-medium outline-none transition placeholder:text-black/35 focus:border-black/45"
                />
              </div>
            </div>

            <p className="text-xs font-medium uppercase tracking-[0.08em] text-black/50">
              {loading ? "Loading" : `${filteredProducts.length} ${t("catalog.productsDisplayed")}`}
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-black transition ${
                  selectedCategory === category
                    ? "border-black bg-black text-white"
                    : "border-black/15 bg-white text-black/60 hover:border-black/35 hover:text-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1580px] px-4 py-6 sm:px-6 lg:px-8">
        <section>
          {loading ? (
            <div className="px-6 py-16 text-sm font-medium uppercase tracking-[0.08em] text-black/45">
              {t("catalog.loading")}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="px-6 py-16 text-sm font-medium text-black/55">{emptyText}</div>
          ) : (
            <div className="grid grid-cols-2 gap-px bg-black/12 md:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="group flex min-h-[300px] flex-col bg-white p-3 transition hover:bg-[#fbfbf8] sm:min-h-[330px] xl:min-h-[360px] xl:p-4"
                >
                  <div className="flex flex-1 items-center justify-center">
                    {product.image ? (
                      <div className="flex aspect-square w-full max-w-[150px] items-center justify-center sm:max-w-[200px] xl:max-w-[240px]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.025]"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-square w-full max-w-[150px] items-center justify-center border border-black/15 text-xs font-medium uppercase tracking-[0.08em] text-black/35 sm:max-w-[190px]">
                        {t("catalog.noImage")}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 border-t border-black/10 pt-3">
                    <div>
                      {product.brand && (
                        <p className="mb-1.5 text-[0.7rem] font-black uppercase tracking-[0.12em] text-[#00000075]">
                          {product.brand}
                        </p>
                      )}
                      <h3 className="text-xs font-black leading-tight tracking-[0.01em] sm:text-sm">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs font-medium text-black/45">
                        {product.category}
                      </p>
                      <p className="mt-2 text-xs font-medium text-black/45">
                        {product.price ? (
                          <>
                            {product.price}€ {priceSuffix}
                            <span className="ml-1 text-[0.62rem] font-black uppercase tracking-[0.08em] text-black/25">
                              {t("price.exTax")}
                            </span>
                          </>
                        ) : (
                          t("catalog.priceOnRequest")
                        )}
                      </p>
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-[96px_minmax(0,1fr)]">
                      <div className="grid grid-cols-3 rounded-full border border-black/10 bg-[#f7f7f4]">
                        <button
                          type="button"
                          onClick={() =>
                            setProductQuantity(product.id, (quantities[product.id] || 1) - 1)
                          }
                          className="h-9 text-lg font-medium text-black/55 transition hover:text-black"
                          aria-label={`Reduce ${product.name} quantity`}
                        >
                          -
                        </button>
                        <span className="flex h-9 items-center justify-center text-sm font-black">
                          {quantities[product.id] || 1}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setProductQuantity(product.id, (quantities[product.id] || 1) + 1)
                          }
                          className="h-9 text-lg font-medium text-black/55 transition hover:text-black"
                          aria-label={`Increase ${product.name} quantity`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddProduct(product)}
                        className="h-9 rounded-full bg-[#FFED00] px-3 text-sm font-black text-black transition hover:bg-black hover:text-white"
                      >
                        {actionLabel}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
