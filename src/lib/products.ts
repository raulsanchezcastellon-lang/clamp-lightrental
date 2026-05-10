import type { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export type PublicProduct = {
  id: string;
  name: string;
  brand?: string;
  category: string;
  price: number;
  image?: string;
  description?: string;
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
  brand: string | null;
  category: string;
  price: number;
  image: string | null;
  description: string | null;
  listingType: string | null;
}): PublicProduct {
  return {
    id: product.id,
    name: product.name,
    brand: product.brand || undefined,
    category: product.category,
    price: product.price,
    image: product.image || undefined,
    description: product.description || undefined,
    listingType: product.listingType === "sale" ? "sale" : "rental",
  };
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
