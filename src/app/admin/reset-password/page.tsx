"use client";

import { Suspense } from "react";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo cambiar la contraseña.");
      }

      setPassword("");
      setConfirmPassword("");
      setMessage("Contraseña cambiada. Ya puedes iniciar sesión.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo cambiar la contraseña.");
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
          Nueva clave
        </h1>
        <p className="mb-7 mt-2 text-center text-sm text-white/45">
          Elige una contraseña segura.
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
              Nueva contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
              required
              className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-[#FFED00]"
              placeholder="Mínimo 8 caracteres"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-white/45">
              Repetir contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              minLength={8}
              required
              className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-[#FFED00]"
              placeholder="Repite la contraseña"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !token}
            className="w-full rounded-full bg-[#FFED00] py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Cambiar contraseña"}
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

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black p-4 text-white">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#080808] p-7 text-center shadow-2xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#FFED00]">
              CLAMP
            </p>
            <p className="mt-4 text-sm text-white/45">Cargando...</p>
          </div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
