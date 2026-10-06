"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { categoryLabel } from "@/lib/i18n";

interface Category {
  id: string;
  name: string;
}

interface ProductSummary {
  category?: string;
}

const pillPrimary =
  "inline-flex items-center justify-center rounded-full bg-[#FFED00] px-5 py-2 text-xs font-black uppercase tracking-[0.1em] text-black transition hover:bg-white disabled:opacity-50";
const pillSecondary =
  "inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:border-white hover:bg-white hover:text-black";
const pillSmall =
  "inline-flex items-center justify-center rounded-full border border-white/15 px-3.5 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.1em] transition";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const loadData = async () => {
    try {
      const [categoriesResponse, productsResponse] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/products"),
      ]);
      const categoriesData = await categoriesResponse.json();
      const productsData = await productsResponse.json().catch(() => []);

      setCategories(Array.isArray(categoriesData) ? categoriesData : []);

      const counts: Record<string, number> = {};
      if (Array.isArray(productsData)) {
        for (const product of productsData as ProductSummary[]) {
          if (product.category) counts[product.category] = (counts[product.category] || 0) + 1;
        }
      }
      setProductCounts(counts);
    } catch {
      setError("No se han podido cargar las categorías.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load
    loadData();
  }, []);

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" })),
    [categories]
  );

  const resetForm = () => {
    setName("");
    setEditingCategory(null);
    setError("");
  };

  const startNew = () => {
    resetForm();
    setNotice("");
    inputRef.current?.focus();
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    setError("");
    setNotice("");
    inputRef.current?.focus();
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleDelete = async (category: Category) => {
    const inUse = productCounts[category.name] || 0;
    const message = inUse
      ? `"${category.name}" tiene ${inUse} producto${inUse === 1 ? "" : "s"}. Si la borras, esos productos se quedarán con una categoría que ya no existe en la lista. ¿Borrarla igualmente?`
      : `¿Borrar la categoría "${category.name}"?`;
    if (!confirm(message)) return;

    setError("");
    setNotice("");
    try {
      const response = await fetch(`/api/categories/${category.id}`, { method: "DELETE" });
      if (response.ok) {
        setCategories((current) => current.filter((item) => item.id !== category.id));
        if (editingCategory?.id === category.id) resetForm();
        setNotice(`Categoría "${category.name}" borrada.`);
      } else {
        setError("No se ha podido borrar la categoría.");
      }
    } catch {
      setError("No se ha podido borrar la categoría.");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setNotice("");

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Escribe un nombre para la categoría.");
      return;
    }

    setSaving(true);
    try {
      const endpoint = editingCategory ? `/api/categories/${editingCategory.id}` : "/api/categories";
      const response = await fetch(endpoint, {
        method: editingCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName }),
      });
      const body = await response.json().catch(() => null);

      if (!response.ok) {
        setError(body?.error || "No se ha podido guardar la categoría.");
        return;
      }

      const moved = typeof body?.productsUpdated === "number" ? body.productsUpdated : 0;
      setNotice(
        editingCategory
          ? `Categoría renombrada a "${trimmedName}".${moved ? ` ${moved} producto${moved === 1 ? "" : "s"} actualizado${moved === 1 ? "" : "s"}.` : ""}`
          : `Categoría "${trimmedName}" creada.`
      );
      resetForm();
      await loadData();
    } catch {
      setError("No se ha podido guardar la categoría.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-3 px-4 py-3 sm:flex-row sm:items-center sm:px-5">
          <div>
            <p className="text-[0.62rem] font-black uppercase tracking-[0.24em] text-[#FFED00]">
              CLAMP
            </p>
            <h1 className="mt-1 text-2xl font-black uppercase tracking-[0.02em]">Categorías</h1>
            <p className="mt-1 text-xs font-medium text-white/45">
              Las categorías que usan los productos y los filtros del catálogo.
            </p>
          </div>
          <Link
            href="/admin/products"
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-[#FFED00] hover:bg-[#FFED00] hover:text-black"
          >
            ← Productos
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-4 py-5 sm:px-5">
        {(error || notice) && (
          <div
            role="status"
            className={`mb-5 rounded-lg border px-4 py-3 text-sm ${
              error
                ? "border-red-400/30 bg-red-500/10 text-red-100"
                : "border-[#FFED00]/30 bg-[#FFED00]/10 text-[#FFED00]"
            }`}
          >
            {error || notice}
          </div>
        )}

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          {/* Formulario: primero en móvil, a la derecha en escritorio */}
          <section className="rounded-xl border border-white/10 bg-[#080808] p-4 sm:p-5 lg:sticky lg:top-5 lg:order-2">
            <h2 className="text-sm font-black uppercase tracking-[0.12em]">
              {editingCategory ? "Editar categoría" : "Nueva categoría"}
            </h2>
            {editingCategory && (
              <p className="mt-1 text-xs text-white/45">
                Los productos de &quot;{editingCategory.name}&quot; pasarán al nuevo nombre.
              </p>
            )}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="category-name"
                  className="mb-2 block text-[0.62rem] font-black uppercase tracking-[0.12em] text-white/45"
                >
                  Nombre
                </label>
                <input
                  id="category-name"
                  ref={inputRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-base text-white outline-none transition placeholder:text-white/25 focus:border-[#FFED00] lg:text-sm"
                  placeholder="p. ej. Lights"
                />
                {name.trim() && categoryLabel(name.trim(), "es") !== name.trim() && (
                  <p className="mt-2 text-xs text-white/45">
                    En la web en español se verá como &quot;{categoryLabel(name.trim(), "es")}&quot;.
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <button type="submit" disabled={saving} className={pillPrimary}>
                  {saving ? "Guardando…" : editingCategory ? "Guardar cambios" : "Crear categoría"}
                </button>
                {editingCategory && (
                  <button type="button" onClick={startNew} className={pillSecondary}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* Listado */}
          <section className="lg:order-1">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-medium text-white/40">
                {loading ? "Cargando…" : `${categories.length} categorías`}
              </p>
              {editingCategory && (
                <button type="button" onClick={startNew} className={pillSecondary}>
                  + Nueva
                </button>
              )}
            </div>

            {loading ? (
              <div className="space-y-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-16 animate-pulse rounded-xl border border-white/10 bg-[#080808]" />
                ))}
              </div>
            ) : sortedCategories.length === 0 ? (
              <p className="rounded-xl border border-white/10 bg-[#080808] p-8 text-center text-white/50">
                Todavía no hay categorías.
              </p>
            ) : (
              <ul className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-[#080808]">
                {sortedCategories.map((category) => {
                  const count = productCounts[category.name] || 0;
                  const label = categoryLabel(category.name, "es");
                  const isEditing = editingCategory?.id === category.id;
                  return (
                    <li
                      key={category.id}
                      className={`flex items-center justify-between gap-3 px-4 py-3 ${
                        isEditing ? "bg-[#FFED00]/10" : ""
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="break-words font-black">{category.name}</p>
                        <p className="mt-0.5 text-xs text-white/40">
                          {count === 0 ? "Sin productos" : `${count} producto${count === 1 ? "" : "s"}`}
                          {label !== category.name && <> · En la web: {label}</>}
                        </p>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(category)}
                          className={`${pillSmall} text-white hover:border-white hover:bg-white hover:text-black`}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(category)}
                          className={`${pillSmall} text-red-200 hover:border-red-400 hover:bg-red-500 hover:text-white`}
                        >
                          Borrar
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
