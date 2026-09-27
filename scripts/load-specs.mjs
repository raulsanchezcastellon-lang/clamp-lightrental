// Carga las fichas técnicas de data/product-specs.json en la base de datos.
// Uso (desde la carpeta del proyecto, con el .env de producción):
//   node scripts/load-specs.mjs          -> muestra lo que cambiaría (no escribe)
//   node scripts/load-specs.mjs --write  -> guarda los cambios
import "dotenv/config";
import { readFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";

const write = process.argv.includes("--write");
const data = JSON.parse(readFileSync(new URL("../data/product-specs.json", import.meta.url), "utf8"));
const prisma = new PrismaClient();

let updated = 0;
let missing = [];

for (const [slug, specs] of Object.entries(data)) {
  if (slug.startsWith("_")) continue;
  const product = await prisma.product.findFirst({ where: { slug }, select: { id: true, name: true } });
  if (!product) {
    missing.push(slug);
    continue;
  }
  console.log(`${write ? "✔ actualizado" : "· cambiaría"}  ${slug}  (${specs.length} datos)`);
  if (write) {
    await prisma.product.update({ where: { id: product.id }, data: { specs } });
  }
  updated += 1;
}

if (missing.length) console.log("\nNo encontrados en la BD:", missing.join(", "));
console.log(`\n${updated} productos ${write ? "actualizados" : "listos (ejecuta con --write para guardar)"}.`);
await prisma.$disconnect();
