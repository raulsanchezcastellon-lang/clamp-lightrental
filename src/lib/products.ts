import type { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { buildProductSlugBase } from "@/lib/slug";

export type PublicProduct = {
  id: string;
  name: string;
  slug?: string;
  brand?: string;
  category: string;
  price: number;
  image?: string;
  description?: string;
  specs?: string[];
  listingType?: "rental" | "sale";
};

type ListingType = "rental" | "sale";

function priorityRank(priority: number | null) {
  if (priority === 1) return 0;
  if (priority === -1) return 2;
  return 1;
}

function manualOrderRank(featuredOrder: number | null) {
  return featuredOrder ?? Number.MAX_SAFE_INTEGER;
}

function toPublicProduct(product: {
  id: string;
  name: string;
  slug?: string | null;
  brand: string | null;
  category: string;
  price: number;
  image: string | null;
  description: string | null;
  specs?: string[] | null;
  listingType: string | null;
}): PublicProduct {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug || undefined,
    brand: product.brand || undefined,
    category: product.category,
    price: product.price,
    image: product.image || undefined,
    description: product.description || undefined,
    specs: product.specs && product.specs.length > 0 ? product.specs : undefined,
    listingType: product.listingType === "sale" ? "sale" : "rental",
  };
}

/**
 * Genera un slug único para un producto, añadiendo -2, -3... si ya existe.
 * excludeId se usa al editar, para no chocar con el propio slug del producto.
 */
export async function generateUniqueProductSlug(
  base: string,
  excludeId?: string
): Promise<string> {
  const safeBase = base || "producto";
  let candidate = safeBase;
  let suffix = 2;

  while (true) {
    const existing = await prisma.product.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
      select: { id: true },
    });

    if (!existing) return candidate;

    candidate = `${safeBase}-${suffix}`;
    suffix += 1;
  }
}

export { buildProductSlugBase };

export async function getPublicProductBySlug(
  slug: string
): Promise<PublicProduct | null> {
  if (!slug) return null;

  const product = await prisma.product.findFirst({
    where: { slug, available: true },
    select: {
      id: true,
      name: true,
      slug: true,
      brand: true,
      category: true,
      price: true,
      image: true,
      description: true,
      specs: true,
      listingType: true,
    },
  });

  if (!product) return null;

  return toPublicProduct(product);
}

export async function getAllProductSlugs(): Promise<string[]> {
  const products = await prisma.product.findMany({
    where: { available: true, NOT: { slug: null } },
    select: { slug: true },
  });

  return products
    .map((product) => product.slug)
    .filter((slug): slug is string => Boolean(slug));
}

export async function getPublicProducts({
  listingType,
  featured = false,
  limit,
}: {
  listingType: ListingType;
  featured?: boolean;
  limit?: number;
}) {
  const where: Prisma.ProductWhereInput = { available: true };

  if (listingType === "rental") {
    where.OR = [
      { listingType: "rental" },
      { listingType: null },
      { listingType: { isSet: false } },
    ];
  } else {
    where.listingType = "sale";
  }

  if (featured) {
    where.priority = 1;
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: featured
      ? [{ featuredOrder: "asc" }, { createdAt: "desc" }]
      : [{ priority: "desc" }, { featuredOrder: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      name: true,
      slug: true,
      brand: true,
      category: true,
      price: true,
      image: true,
      description: true,
      listingType: true,
      priority: true,
      featuredOrder: true,
      createdAt: true,
    },
  });

  const orderedProducts = products.sort((a, b) => {
    if (!featured) {
      const priorityDifference = priorityRank(a.priority) - priorityRank(b.priority);

      if (priorityDifference !== 0) {
        return priorityDifference;
      }
    }

    const orderDifference =
      manualOrderRank(a.featuredOrder) - manualOrderRank(b.featuredOrder);

    if (orderDifference !== 0) {
      return orderDifference;
    }

    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  return orderedProducts
    .slice(0, Number.isFinite(limit) && limit ? limit : undefined)
    .map(toPublicProduct);
}
