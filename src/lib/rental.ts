/**
 * Días de alquiler entre recogida y devolución (fechas "AAAA-MM-DD").
 * Recoger el lunes y devolver el martes cuenta como 1 día; mismo día, también 1.
 * Devuelve null si falta alguna fecha o no son válidas.
 */
export function rentalDays(pickupDate?: string, returnDate?: string): number | null {
  if (!pickupDate || !returnDate) return null;

  const pickup = Date.parse(`${pickupDate}T00:00:00Z`);
  const back = Date.parse(`${returnDate}T00:00:00Z`);
  if (Number.isNaN(pickup) || Number.isNaN(back) || back < pickup) return null;

  return Math.max(1, Math.round((back - pickup) / 86_400_000));
}

/** Fecha de hoy en formato "AAAA-MM-DD" según la hora local del navegador. */
export function todayIsoDate() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}
