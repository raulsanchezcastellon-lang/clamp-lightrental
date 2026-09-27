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
  "compatible with": "Compatible con",
  "gobo size": "Tamaño de gobo",
  length: "Longitud",
  screen: "Pantalla",
  brightness: "Brillo",
  inputs: "Entradas",
  protocols: "Protocolos",
  range: "Alcance",
  output: "Caudal",
  "fluid tank": "Depósito",
  "warm-up": "Calentamiento",
  control: "Control",
  recharge: "Recarga",
  wheels: "Ruedas",
  shelves: "Baldas",
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
  [/receivers/gi, "receptores"],
  [/receiver/gi, "receptor"],
  [/Yoke with/g, "Horquilla con"],
  [/ max\.$/g, " máx."],
  [/pixel control/gi, "control por píxeles"],
  [/\bpixels\b/gi, "píxeles"],
  [/Up to/g, "Hasta"],
  [/at (\d+ cm)/gi, "a $1"],
  [/male stand attachment/gi, "macho"],
  [/Grip head with/gi, "Rótula con"],
  [/counterweight/gi, "contrapeso"],
  [/pneumatic/gi, "neumáticas"],
  [/swivel with brakes/gi, "giratorias con freno"],
  [/Adjustable upper shelf \((\d+) positions\)/gi, "Balda superior regulable ($1 posiciones)"],
  [/Non-slip rubber/gi, "Goma antideslizante"],
  [/maleta de carga with/gi, "maleta de carga con"],
  [/\bBag\b/g, "Bolsa"],
  [/12 V car/gi, "12 V mechero"],
  [/A \/ B size/gi, "tamaño A / B"],
  [/\bB size\b/gi, "tamaño B"],
  [/18-leaf iris slot/gi, "ranura para iris de 18 hojas"],
  [/\bCase\b/g, "Maleta"],
  [/Sun hood/gi, "Visera"],
  [/Mounting hardware/gi, "Accesorios de montaje"],
  [/from spot to wide spread/gi, "de concentrado a abierto"],
  [/\bYoke\b/g, "Horquilla"],
  [/Gobo holder/gi, "Portagobos"],
  [/Auto programs/gi, "Programas automáticos"],
  [/Standalone/gi, "Autónomo"],
  [/Silver \/ White reflector/gi, "Reflector plata / blanco"],
  [/\breflectors\b/gi, "reflectores"],
  [/1 fabric of your choice \(ask us for the available fabrics\)/gi, "1 tela a elegir (consúltanos las disponibles)"],
  [/(\d+) fabrics of your choice \(ask us for the available fabrics\)/gi, "$1 telas a elegir (consúltanos las disponibles)"],
  [/opens to/gi, "se abre a"],
  [/\(open\)/gi, "(abierto)"],
  [/\(folded\)/gi, "(plegado)"],
  [/\(filled\)/gi, "(lleno)"],
  [/\btravel\b/gi, "de recorrido"],
  [/reducer ring/gi, "aro reductor"],
  [/Adjustable foot/gi, "Pie regulable"],
  [/Tripod head/gi, "Cabeza de trípode"],
  [/Solid flag/gi, "Bandera opaca"],
  [/Single net \(green\)/gi, "Net simple (verde)"],
  [/Double net \(red\)/gi, "Net doble (roja)"],
  [/Modular frame/gi, "Marco modular"],
  [/\bPneumatic\b/g, "Neumáticas"],
  [/\(counterweight with sandbag\)/gi, "(contrapeso con saco de arena)"],
  [/\bwith sandbag\b/gi, "con saco de arena"],
  [/\(price per bulb\)/gi, "(precio por bombilla)"],
  [/wireless control, included/gi, "control inalámbrico, incluido"],
  [/charging case/gi, "maleta de carga"],
  [/Carrying bag/gi, "Bolsa de transporte"],
  [/Carrying case/gi, "Maleta de transporte"],
  [/Rigid case/gi, "Maleta rígida"],
  [/Rolling hard case/gi, "Maleta rígida con ruedas"],
  [/Padded bag/gi, "Bolsa acolchada"],
  [/in flight case/gi, "en flight case"],
  [/\bcontinuous\b/gi, "continua"],
  [/\bsurge\b/gi, "de pico"],
  [/pure sine wave/gi, "onda sinusoidal pura"],
  [/from AC/gi, "desde red"],
  [/at full extension/gi, "a máxima extensión"],
  [/at minimum/gi, "al mínimo"],
  [/max\. extension/gi, "de extensión máx."],
  [/\(assembled\)/gi, "(montado)"],
  [/high folded/gi, "de alto plegado"],
  [/\(collapsed\)/gi, "(recogido)"],
  [/deep extended/gi, "de fondo extendido"],
  [/\bdeep\b/gi, "de fondo"],
  [/with included grid/gi, "con rejilla incluida"],
  [/\bdiffusion\b/gi, "difusión"],
  [/with (\d+°) lens/gi, "con lente de $1"],
  [/(\d+°) lens/gi, "lente de $1"],
  [/Bowens-mount fixtures/gi, "focos con montura Bowens"],
  [/\bup to\b/gi, "hasta"],
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
