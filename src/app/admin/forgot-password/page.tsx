"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo enviar el email.");
      }

      setMessage("Si el email existe, recibirás un enlace para cambiar la contraseña.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo enviar el email.");
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
          Recuperar
        </h1>
        <p className="mb-7 mt-2 text-center text-sm text-white/45">
          Te enviaremos un enlace temporal.
        </p>

        {error && (
          <div className="mb-5 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-5 rounded-lg border border-[#FFED00]/30 bg-[#FFED00]/10 px-4 py-3 text-sm text-[#FFF7A0]">
            {message}
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
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-[#FFED00]"
              placeholder="tu@email.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#FFED00] py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar enlace"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/45">
          <Link href="/admin" className="font-semibold text-white hover:text-[#FFED00]">
            Volver al login
          </Link>
        </p>
      </div>
    </div>
  );
}
