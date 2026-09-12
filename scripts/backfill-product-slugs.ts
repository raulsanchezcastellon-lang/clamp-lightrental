import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { buildProductSlugBase, slugify } from "../src/lib/slug";

const prisma = new PrismaClient();

async function generateUniqueSlug(base: string, taken: Set<string>): Promise<string> {
  const safeBase = base || "producto";
  let candidate = safeBase;
  let suffix = 2;

  while (taken.has(candidate)) {
    candidate = `${safeBase}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

async function main() {
  const products = await prisma.product.findMany({
    select: { id: true, name: true, brand: true, slug: true },
  });

  const taken: Set<string> = new Set(
    products.map((p) => p.slug).filter((s): s is string => Boolean(s))
  );

  let updated = 0;

  for (const product of products) {
    if (product.slug) continue;

    const base = buildProductSlugBase({ brand: product.brand, name: product.name });
    const slug = await generateUniqueSlug(slugify(base), taken);
    taken.add(slug);

    await prisma.product.update({
      where: { id: product.id },
      data: { slug },
    });

    console.log(`✓ ${product.name} -> /${slug}`);
    updated += 1;
  }

  console.log(`\nListo. ${updated} producto(s) actualizado(s) de ${products.length} totales.`);
}

main()
  .catch((error) => {
    console.error("Error rellenando slugs:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
