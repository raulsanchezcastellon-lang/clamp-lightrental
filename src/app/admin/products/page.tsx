"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  brand?: string;
  category: string;
  listingType?: string;
  priority?: number;
  featuredOrder?: number | null;
  price: number;
  stock: number;
  image?: string;
  available: boolean;
  createdAt: string;
}

type SortKey =
  | "name"
  | "brand"
  | "category"
  | "listingType"
  | "priority"
  | "featuredOrder"
  | "price"
  | "stock"
  | "createdAt";

type SortDirection = "asc" | "desc";

const preferenceLabel = (priority?: number) => {
  if (priority === 1) return "Featured";
  if (priority === -1) return "Less preferred";
  return "Normal";
};

function SortHeader({
  label,
  column,
  sortKey,
  sortDirection,
  onSort,
}: {
  label: string;
  column: SortKey;
  sortKey: SortKey;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSort(column)}
      className="inline-flex items-center gap-1.5 text-left text-[0.62rem] font-black uppercase tracking-[0.08em] text-white/45 transition hover:text-[#FFED00]"
    >
      {label}
      <span className="text-[0.55rem] text-white/25">
        {sortKey === column ? (sortDirection === "asc" ? "ASC" : "DESC") : "SORT"}
      </span>
    </button>
  );
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [featuredOrderDrafts, setFeaturedOrderDrafts] = useState<Record<string, string>>({});
  const [savingOrderIds, setSavingOrderIds] = useState<Set<string>>(new Set());
  const [savedOrderIds, setSavedOrderIds] = useState<Set<string>>(new Set());
  const router = useRouter();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro?")) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (err) {
      setError("Error al eliminar producto");
    }
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      return;
    }

    setSortKey(key);
    setSortDirection(key === "name" || key === "brand" || key === "category" ? "asc" : "desc");
  };

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter((product) => {
      const searchableText = [
        product.name,
        product.brand,
        product.category,
        product.listingType === "sale" ? "Store" : "Equipment",
        preferenceLabel(product.priority),
        product.price,
        product.stock,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [products, searchQuery]);

  const sortedProducts = useMemo(() => {
    const getValue = (product: Product) => {
      if (sortKey === "brand") return product.brand || "";
      if (sortKey === "listingType") return product.listingType === "sale" ? "Store" : "Equipment";
      if (sortKey === "priority") return product.priority || 0;
      if (sortKey === "featuredOrder") return product.featuredOrder ?? 0;
      if (sortKey === "createdAt") return new Date(product.createdAt).getTime();
      return product[sortKey];
    };

    return [...filteredProducts].sort((a, b) => {
      const aValue = getValue(a);
      const bValue = getValue(b);

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      const comparison = String(aValue).localeCompare(String(bValue), undefined, {
        numeric: true,
        sensitivity: "base",
      });

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredProducts, sortDirection, sortKey]);

  const updateFeaturedOrder = async (id: string) => {
    const draft = featuredOrderDrafts[id];
    const featuredOrder = Number(draft);

    if (!Number.isFinite(featuredOrder) || featuredOrder < 0) {
      setError("El orden de la home debe ser un número igual o superior a 0");
      return;
    }

    const previousProducts = products;
    setError("");
    setSavingOrderIds((currentIds) => new Set(currentIds).add(id));

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ featuredOrder }),
      });

      if (!response.ok) {
        throw new Error("Unable to save home order");
      }

      const updatedProduct = await response.json();

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === id
            ? { ...product, featuredOrder: updatedProduct.featuredOrder ?? featuredOrder }
            : product
        )
      );
      setFeaturedOrderDrafts((currentDrafts) => ({
        ...currentDrafts,
        [id]: String(updatedProduct.featuredOrder ?? featuredOrder),
      }));
      setSavedOrderIds((currentIds) => new Set(currentIds).add(id));
      window.setTimeout(() => {
        setSavedOrderIds((currentIds) => {
          const nextIds = new Set(currentIds);
          nextIds.delete(id);
          return nextIds;
        });
      }, 1600);
    } catch (err) {
      setProducts(previousProducts);
      setError("Error al guardar el orden de la home");
    } finally {
      setSavingOrderIds((currentIds) => {
        const nextIds = new Set(currentIds);
        nextIds.delete(id);
        return nextIds;
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-3 px-4 py-3 sm:px-5 lg:flex-row lg:items-center">
          <div>
            <p className="text-[0.62rem] font-black uppercase tracking-[0.24em] text-[#FFED00]">
              CLAMP
            </p>
            <h1 className="mt-1 text-2xl font-black uppercase tracking-[0.02em]">
              Admin Panel
            </h1>
            <p className="mt-1 text-xs font-medium text-white/45">
              Manage products, images and categories.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-[#FFED00] hover:bg-[#FFED00] hover:text-black"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 py-5 sm:px-5 lg:px-6">
        {/* Actions */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <Link
            href="/admin/products/new"
            className="inline-flex rounded-full bg-[#FFED00] px-5 py-2 text-xs font-black uppercase tracking-[0.1em] text-black transition hover:bg-white"
          >
            + Agregar Producto
          </Link>
          <Link
            href="/admin/categories"
            className="inline-flex rounded-full border border-white/15 px-5 py-2 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:border-white hover:bg-white hover:text-black"
          >
            Manage Categories
          </Link>
        </div>

        <div className="mb-5 flex flex-col gap-2 rounded-xl border border-white/10 bg-[#080808] p-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-white/35">
              Search
            </span>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Name, brand, category, type..."
              className="h-10 w-full rounded-lg border border-white/10 bg-black pl-20 pr-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#FFED00]"
            />
          </label>
          <p className="text-xs font-medium text-white/40">
            {sortedProducts.length} of {products.length} products
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        )}

        {/* Tabla de productos */}
        {loading ? (
          <p className="text-center text-gray-600">Cargando...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600">
            No hay productos. ¡Crea uno para empezar!
          </p>
        ) : sortedProducts.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-[#080808] px-4 py-10 text-center">
            <p className="text-sm font-semibold text-white">No products found.</p>
            <p className="mt-2 text-sm text-white/45">
              Try searching by another name, brand or category.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#080808] shadow-2xl">
            <div className="overflow-x-auto">
            <table className="min-w-[1180px] w-full table-fixed text-sm">
              <thead className="border-b border-white/10 bg-[#111111]">
                <tr>
                  <th className="w-[23%] px-3 py-2 text-left">
                    <SortHeader label="Name" column="name" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
                  </th>
                  <th className="w-[10%] px-3 py-2 text-left">
                    <SortHeader label="Brand" column="brand" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
                  </th>
                  <th className="w-[10%] px-3 py-2 text-left">
                    <SortHeader label="Category" column="category" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
                  </th>
                  <th className="w-[9%] px-3 py-2 text-left">
                    <SortHeader label="Type" column="listingType" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
                  </th>
                  <th className="w-[11%] px-3 py-2 text-left">
                    <SortHeader label="Preference" column="priority" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
                  </th>
                  <th className="w-[17%] px-3 py-2 text-left">
                    <SortHeader label="Home order" column="featuredOrder" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
                  </th>
                  <th className="w-[7%] px-3 py-2 text-left">
                    <SortHeader label="Price" column="price" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
                  </th>
                  <th className="w-[6%] px-3 py-2 text-left">
                    <SortHeader label="Stock" column="stock" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
                  </th>
                  <th className="w-[7%] px-3 py-2 text-left text-[0.62rem] font-black uppercase tracking-[0.08em] text-white/45">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {sortedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-3 py-2">
                      <div className="flex min-w-0 items-center gap-2">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-9 w-12 flex-shrink-0 rounded-md border border-white/10 object-cover"
                          />
                        ) : (
                          <div className="flex h-9 w-12 flex-shrink-0 items-center justify-center rounded-md bg-white/5 text-[0.6rem] text-white/30">
                            No img
                          </div>
                        )}
                        <span className="truncate font-semibold text-white">{product.name}</span>
                      </div>
                    </td>
                    <td className="truncate px-3 py-2 text-white/70">{product.brand || "—"}</td>
                    <td className="truncate px-3 py-2 text-white/70">{product.category}</td>
                    <td className="px-3 py-2 text-white/70">
                      {product.listingType === "sale" ? "Store" : "Equipment"}
                    </td>
                    <td className="px-3 py-2 text-white/70">
                      <span
                        className={`rounded-full px-2 py-1 text-[0.65rem] font-bold ${
                          product.priority === 1
                            ? "bg-[#FFED00] text-black"
                            : product.priority === -1
                              ? "bg-white/10 text-white/45"
                              : "bg-white/5 text-white/65"
                        }`}
                      >
                        {preferenceLabel(product.priority)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-white/70">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min="0"
                          value={
                            featuredOrderDrafts[product.id] ??
                            String(product.featuredOrder ?? 0)
                          }
                          onChange={(event) => {
                            setFeaturedOrderDrafts((currentDrafts) => ({
                              ...currentDrafts,
                              [product.id]: event.target.value,
                            }));
                            setSavedOrderIds((currentIds) => {
                              const nextIds = new Set(currentIds);
                              nextIds.delete(product.id);
                              return nextIds;
                            });
                          }}
                          className="h-8 w-14 rounded-md border border-white/10 bg-black px-2 text-xs font-semibold text-white outline-none focus:border-[#FFED00]"
                          aria-label={`Home order for ${product.name}`}
                        />
                        <button
                          type="button"
                          onClick={() => updateFeaturedOrder(product.id)}
                          disabled={savingOrderIds.has(product.id)}
                          className="h-8 rounded-md bg-white px-2.5 text-[0.65rem] font-black uppercase text-black transition hover:bg-[#FFED00] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {savingOrderIds.has(product.id) ? "Saving" : "Save"}
                        </button>
                        {savedOrderIds.has(product.id) && (
                          <span className="text-[0.65rem] font-bold text-[#FFED00]">
                            Saved
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2 font-semibold text-white/70">€{product.price}</td>
                    <td className="px-3 py-2 text-white/70">{product.stock}</td>
                    <td className="px-3 py-2">
                      <div className="flex flex-col gap-1">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-xs font-bold text-[#FFED00] hover:text-white"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-left text-xs font-bold text-white/45 hover:text-red-300"
                      >
                        Delete
                      </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
