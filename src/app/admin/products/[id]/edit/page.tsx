"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
}

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [listingType, setListingType] = useState<"rental" | "sale">("rental");
  const [priority, setPriority] = useState<-1 | 0 | 1>(0);
  const [featuredOrder, setFeaturedOrder] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProductData = async () => {
      try {
        const [categoriesResponse, productResponse] = await Promise.all([
          fetch("/api/categories"),
          fetch(`/api/products/${params.id}`),
        ]);
        const categoriesData = await categoriesResponse.json();
        const productData = await productResponse.json();

        setCategories(categoriesData || []);
        setName(productData.name || "");
        setBrand(productData.brand || "");
        setCategory(productData.category || "");
        setListingType(productData.listingType === "sale" ? "sale" : "rental");
        setPriority(
          productData.priority === 1 || productData.priority === -1
            ? productData.priority
            : 0
        );
        setFeaturedOrder(productData.featuredOrder || 0);
        setPrice(productData.price || 0);
        setStock(productData.stock || 0);
        setImageUrl(productData.image || "");
      } catch (err) {
        console.error("Unable to load product data:", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadProductData();
  }, [params.id]);

  const handleUploadImage = async (file: File) => {
    setUploadingImage(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/products/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setImageUrl(data.url);
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/products/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          brand: brand.trim(),
          category,
          listingType,
          priority,
          featuredOrder,
          price,
          stock,
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to save product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      setError("Unable to save product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060606] p-10 text-white">
      <div className="max-w-3xl mx-auto bg-[#0f0f0f] p-8 rounded-3xl shadow-2xl border border-white/10">
        <h1 className="text-3xl font-semibold mb-8">Edit Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-rose-200">
              {error}
            </div>
          )}

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Brand</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Aputure, Astera, Godox..."
              className="w-full border border-white/10 bg-[#111111] rounded-lg px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full border border-white/10 bg-[#111111] rounded-lg px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Product Type</label>
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
            <label className="block mb-2 text-sm font-medium text-gray-300">Catalog Preference</label>
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
            <label className="block mb-2 text-sm font-medium text-gray-300">Home featured order</label>
            <input
              type="number"
              value={featuredOrder}
              onChange={(e) => setFeaturedOrder(Number(e.target.value))}
              min="0"
              className="w-full border border-white/10 bg-[#111111] rounded-lg px-4 py-3 text-white"
            />
            <p className="mt-2 text-sm text-gray-500">
              Only applies to Featured products. Lower numbers appear first on the home grid.
            </p>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Category</label>
            <select
              value={category}
              onChange={(e) => {
                const selected = e.target.value;
                setCategory(selected);
              }}
              className="w-full border border-white/10 bg-[#111111] rounded-lg px-4 py-3 text-white"
              disabled={loadingCategories || categories.length === 0}
            >
              {categories.map((categoryOption) => (
                <option key={categoryOption.id} value={categoryOption.name}>
                  {categoryOption.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Image</label>
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
              <p className="mt-2 text-sm text-gray-400">Uploading image...</p>
            )}
            {imageUrl && (
              <div className="mt-4">
                <img src={imageUrl} alt="Preview" className="w-full rounded-lg border border-white/10" />
              </div>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Price"
              className="w-full border border-white/10 bg-[#111111] rounded-lg px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              placeholder="Stock"
              className="w-full border border-white/10 bg-[#111111] rounded-lg px-4 py-3 text-white"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
