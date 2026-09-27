import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Pasa el idioma de la ruta al layout raíz (cabecera x-clamp-lang) para que el
 * <html lang="..."> salga correcto desde el servidor: "en" bajo /en, "es" en el resto.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const language = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-clamp-lang", language);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|uploads|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|svg|gif|ico|txt|xml)$).*)"],
};
