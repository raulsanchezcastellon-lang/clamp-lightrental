"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/admin/products");
      } else {
        setError(data.error || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("Error de conexión. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4 text-white">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#080808] p-7 shadow-2xl">
        <p className="text-center text-xs font-black uppercase tracking-[0.24em] text-[#FFED00]">
          CLAMP
        </p>
        <h1 className="mt-2 text-center text-3xl font-black uppercase tracking-[0.02em]">
          Admin
        </h1>
        <p className="mb-7 mt-2 text-center text-sm text-white/45">
          Panel de Administración
        </p>

        {error && (
          <div className="mb-5 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-white/45">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-[#FFED00]"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-white/45">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-[#FFED00]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#FFED00] py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white disabled:opacity-50"
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/45">
          <Link href="/" className="font-semibold text-white hover:text-[#FFED00]">
            Volver al sitio
          </Link>
        </p>
      </div>
    </div>
  );
}
