"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
}

export default function NewProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("");
  const [listingType, setListingType] = useState<"rental" | "sale">("rental");
  const [priority, setPriority] = useState<-1 | 0 | 1>(0);
  const [featuredOrder, setFeaturedOrder] = useState("0");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();

        const categoryItems = Array.isArray(data) ? data : [];
        setCategories(categoryItems);

        if (categoryItems.length > 0) {
          setCategory(categoryItems[0].name);
        }
      } catch (err) {
        setError("Unable to load categories.");
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  const handleUploadImage = async (file: File) => {
    setUploadingImage(true);
    setError("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/products/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Upload failed");
      }

      const data = await response.json();
      setImageUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error uploading image. Try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          brand,
          category,
          listingType,
          priority,
          featuredOrder: Number(featuredOrder),
          image: imageUrl,
          price: Number(price),
          stock: Number(stock),
        }),
      });

      if (response.ok) {
        router.push("/admin/products");
      } else {
        alert("Error creating product");
      }
    } catch (error) {
      alert("Error de conexión");
    }
  };

  return (
    <div className="min-h-screen bg-[#060606] p-10 text-white">
      <div className="max-w-2xl mx-auto bg-[#0f0f0f] p-8 rounded-3xl shadow-2xl border border-white/10">

        <div className="mb-8">
          <h1 className="text-3xl font-semibold">New Product</h1>
          <p className="text-gray-400">
            Add a product to your rental catalog.
          </p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-400/20 text-rose-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Brand
            </label>

            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full border border-white/10 bg-[#111111] rounded-lg px-4 py-3 text-white"
              placeholder="Aputure, Astera, Godox..."
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-white/10 bg-[#111111] rounded-lg px-4 py-3 text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-300">
              Product Type
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setListingType("rental")}
                className={`rounded-lg border px-4 py-3 transition ${
                  listingType === "rental"
                    ? "border-white bg-white text-black"
                    : "border-white/10 bg-[#111111] text-white hover:border-white/40"
                }`}
              >
                Equipment
              </button>
              <button
                type="button"
                onClick={() => setListingType("sale")}
                className={`rounded-lg border px-4 py-3 transition ${
                  listingType === "sale"
                    ? "border-white bg-white text-black"
                    : "border-white/10 bg-[#111111] text-white hover:border-white/40"
                }`}
              >
                Store
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-300">
              Catalog Preference
            </label>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Less preferred", value: -1 },
                { label: "Normal", value: 0 },
                { label: "Featured", value: 1 },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPriority(option.value as -1 | 0 | 1)}
                  className={`rounded-lg border px-3 py-3 text-sm transition ${
                    priority === option.value
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-[#111111] text-white hover:border-white/40"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Home featured order
            </label>

            <input
              type="number"
              value={featuredOrder}
              onChange={(e) => setFeaturedOrder(e.target.value)}
              className="w-full border border-white/10 bg-[#111111] rounded-lg px-4 py-3 text-white"
              min="0"
            />
            <p className="mt-2 text-sm text-gray-500">
              Only applies to Featured products. Lower numbers appear first on the home grid.
            </p>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-300">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 bg-[#0f0f0f] text-white"
              required
              disabled={loadingCategories}
            >
              {categories.map((categoryOption) => (
                <option key={categoryOption.id} value={categoryOption.name}>
                  {categoryOption.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUploadImage(file);
              }}
              className="w-full text-white"
            />

            {uploadingImage && (
              <p className="mt-2 text-sm text-gray-400">
                Uploading image...
              </p>
            )}

            {imageUrl && (
              <div className="mt-4">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full rounded-lg border border-white/10"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Price
            </label>

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-white/10 bg-[#111111] rounded-lg px-4 py-3 text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Stock
            </label>

            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full border border-white/10 bg-[#111111] rounded-lg px-4 py-3 text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Crear Producto
          </button>

        </form>
      </div>
    </div>
  );
}
