import type { Language } from "@/lib/i18n";

/**
 * Fichas técnicas con el esquema estandarizado (referencia: Rec Distrikt).
 * Cada spec se guarda en la BD como "Etiqueta: valor" (etiqueta en inglés).
 * Aquí se separa y se traduce la etiqueta para la versión española.
 */
const LABELS_ES: Record<string, string> = {
  weight: "Peso",
  dimensions: "Dimensiones",
  "white light": "Luz blanca",
  "colored light": "Luz de color",
  "color rendition": "Reproducción de color",
  "beam angle": "Ángulo de haz",
  power: "Potencia",
  "ip rating": "Protección IP",
  mount: "Montura",
  "built-in battery": "Batería integrada",
  "in the box": "Incluye",
  capacity: "Capacidad",
  "max. load": "Carga máx.",
  height: "Altura",
  size: "Tamaño",
  outputs: "Salidas",
};

/** Traducción de las coletillas habituales de los valores (los datos técnicos no cambian). */
const VALUE_PHRASES_ES: Array<[RegExp, string]> = [
  [/head with yoke/gi, "cabeza con horquilla"],
  [/head without yoke/gi, "cabeza sin horquilla"],
  [/\(head\)/gi, "(cabeza)"],
  [/max\. draw/gi, "consumo máx."],
  [/with included reflector/gi, "con reflector incluido"],
  [/with included grid/gi, "con rejilla incluida"],
  [/with Hyper Reflectors/gi, "con Hyper Reflectors"],
  [/\bnative\b/gi, "nativo"],
  [/at full output/gi, "a máxima potencia"],
  [/at minimum/gi, "al mínimo"],
  [/(\d+ ?h(?: \d+ min)?) charge/gi, "$1 de carga"],
  [/on control box/gi, "en la caja de control"],
  [/control box/gi, "caja de control"],
  [/Full color/g, "Color completo"],
  [/tunable white/gi, "blanco regulable"],
  [/bi-color/gi, "bicolor"],
  [/emitting surface/gi, "superficie emisora"],
  [/with charging-port covers/gi, "con tapas del puerto de carga"],
  [/\(average\)/gi, "(media)"],
  [/receiver/gi, "receptor"],
  [/Yoke with/g, "Horquilla con"],
  [/ max\.$/g, " máx."],
  [/pixel control/gi, "control por píxeles"],
  [/\bpixels\b/gi, "píxeles"],
  [/Up to/g, "Hasta"],
  [/\beach\b/gi, "c/u"],
];

function translateValueEs(value: string) {
  return VALUE_PHRASES_ES.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value);
}

export type SpecRow = { label: string | null; value: string };

export function parseSpecs(specs: string[] | undefined, lang: Language): SpecRow[] {
  if (!specs) return [];
  return specs
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((raw) => {
      const index = raw.indexOf(":");
      if (index <= 0 || index > 40) return { label: null, value: raw };
      const label = raw.slice(0, index).trim();
      const value = raw.slice(index + 1).trim();
      const translated = lang === "es" ? LABELS_ES[label.toLowerCase()] ?? label : label;
      return { label: translated, value: lang === "es" ? translateValueEs(value) : value };
    });
}
