import type { NextConfig } from "next";

// Cabeceras de seguridad básicas para todas las páginas.
const securityHeaders = [
  // Impide que otra web cargue la nuestra dentro de un iframe (clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  // El navegador no "adivina" el tipo de archivo: una imagen se trata como imagen.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Al salir hacia otra web solo se envía el dominio, no la URL completa.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // La web no usa cámara, micrófono ni ubicación.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
