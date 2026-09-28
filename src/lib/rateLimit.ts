import type { NextRequest } from "next/server";

/**
 * Límite de peticiones en memoria por IP. En Vercel cada instancia tiene su propia
 * memoria, así que no es un límite global exacto, pero frena ráfagas de un mismo
 * origen (bots de spam, pruebas de contraseñas) sin depender de servicios externos.
 */
const buckets = new Map<string, number[]>();

export function getClientIp(request: NextRequest | Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export function isRateLimited(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((time) => now - time < windowMs);

  if (recent.length >= limit) {
    buckets.set(key, recent);
    return true;
  }

  recent.push(now);
  buckets.set(key, recent);

  if (buckets.size > 5000) {
    for (const [bucketKey, times] of buckets) {
      if (times.every((time) => now - time >= windowMs)) buckets.delete(bucketKey);
    }
  }

  return false;
}
