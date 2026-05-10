"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data || []);
    } catch (err) {
      setError("Unable to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data || []);
      } catch (err) {
        setError("Unable to load categories.");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const resetForm = () => {
    setName("");
    setEditingCategory(null);
    setError("");
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    setError("");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;

    try {
      const response = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (response.ok) {
        setCategories(categories.filter((category) => category.id !== id));
        if (editingCategory?.id === id) resetForm();
      } else {
        setError("Failed to delete category.");
      }
    } catch (err) {
      setError("Failed to delete category.");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Category name is required.");
      setSaving(false);
      return;
    }

    try {
      const endpoint = editingCategory ? `/api/categories/${editingCategory.id}` : "/api/categories";
      const method = editingCategory ? "PUT" : "POST";
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName }),
      });

      if (!response.ok) {
        const body = await response.json();
        setError(body?.error || "Unable to save category.");
      } else {
        await fetchCategories();
        resetForm();
      }
    } catch (err) {
      setError("Unable to save category.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060606] text-white">
      <header className="bg-[#090909] border-b border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-wide">Category Manager</h1>
            <p className="text-gray-400 mt-1">Create, edit and remove product categories.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/products" className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition">
              Back to Products
            </Link>
            <button
              type="button"
              onClick={resetForm}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              New Category
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="bg-[#0d0d0d] rounded-3xl border border-white/10 shadow-xl p-6">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Categories</h2>
                <p className="text-gray-400">Manage the category list used in products and filters.</p>
              </div>
              <span className="text-sm text-gray-500">{categories.length} items</span>
            </div>

            {loading ? (
              <p className="text-gray-400">Loading categories...</p>
            ) : categories.length === 0 ? (
              <p className="text-gray-400">No categories created yet.</p>
            ) : (
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="rounded-3xl border border-white/10 bg-[#111111] p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                      </div>
                      <div className="flex gap-3 flex-wrap">
                        <button
                          type="button"
                          onClick={() => handleEdit(category)}
                          className="bg-slate-600 px-4 py-2 rounded-lg hover:bg-slate-500 transition"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(category.id)}
                          className="bg-rose-600 px-4 py-2 rounded-lg hover:bg-rose-500 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="bg-[#0d0d0d] rounded-3xl border border-white/10 shadow-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">{editingCategory ? "Edit Category" : "New Category"}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#111111] px-4 py-3 text-white"
                  placeholder="e.g. Lights"
                />
              </div>

              {error && <p className="text-rose-400">{error}</p>}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingCategory ? "Update Category" : "Create Category"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-white/5 text-white px-5 py-3 rounded-lg hover:bg-white/10 transition"
                >
                  Reset
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
