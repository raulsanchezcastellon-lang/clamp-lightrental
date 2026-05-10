import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getAdminFromToken } from "@/lib/auth";

function priorityRank(priority: number | null) {
  if (priority === 1) return 0;
  if (priority === -1) return 2;
  return 1;
}

function manualOrderRank(featuredOrder: number | null) {
  return featuredOrder ?? Number.MAX_SAFE_INTEGER;
}

export async function GET(request: NextRequest) {
  try {
    const admin = await getAdminFromToken();
    const listingType = request.nextUrl.searchParams.get("listingType");

    const where: Prisma.ProductWhereInput = admin
      ? { adminId: admin.adminId }
      : { available: true };

    if (listingType === "rental") {
      where.OR = [
        { listingType: "rental" },
        { listingType: null },
        { listingType: { isSet: false } },
      ];
    } else if (listingType === "sale") {
      where.listingType = "sale";
    }

    if (request.nextUrl.searchParams.get("featured") === "true") {
      where.priority = 1;
    }

    const limit = Number(request.nextUrl.searchParams.get("limit"));

    const isFeaturedRequest = request.nextUrl.searchParams.get("featured") === "true";

    const products = await prisma.product.findMany({
      where,
      orderBy: isFeaturedRequest
        ? [{ featuredOrder: "asc" }, { createdAt: "desc" }]
        : [{ priority: "desc" }, { featuredOrder: "asc" }, { createdAt: "desc" }],
    });

    if (isFeaturedRequest) {
      const orderedFeaturedProducts = products
        .sort((a, b) => {
          const aOrder = manualOrderRank(a.featuredOrder);
          const bOrder = manualOrderRank(b.featuredOrder);

          if (aOrder !== bOrder) {
            return aOrder - bOrder;
          }

          return b.createdAt.getTime() - a.createdAt.getTime();
        })
        .slice(0, Number.isFinite(limit) && limit > 0 ? limit : undefined);

      return NextResponse.json(orderedFeaturedProducts);
    }

    const orderedProducts = products
      .sort((a, b) => {
        const priorityDifference = priorityRank(a.priority) - priorityRank(b.priority);

        if (priorityDifference !== 0) {
          return priorityDifference;
        }

        const orderDifference =
          manualOrderRank(a.featuredOrder) - manualOrderRank(b.featuredOrder);

        if (orderDifference !== 0) {
          return orderDifference;
        }

        return b.createdAt.getTime() - a.createdAt.getTime();
      })
      .slice(0, Number.isFinite(limit) && limit > 0 ? limit : undefined);

    return NextResponse.json(orderedProducts);
  } catch (error) {
    console.error("Get products error:", error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getAdminFromToken();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const product = await prisma.product.create({
      data: {
        name: data.name,
        brand: typeof data.brand === "string" && data.brand.trim() ? data.brand.trim() : null,
        description: data.description,
        category: data.category,
        listingType: data.listingType === "sale" ? "sale" : "rental",
        priority:
          data.priority === 1 || data.priority === -1 ? data.priority : 0,
        featuredOrder:
          typeof data.featuredOrder === "number" && Number.isFinite(data.featuredOrder)
            ? data.featuredOrder
            : 0,
        price: data.price,
        stock: data.stock,
        image: data.image || null,
        available: data.available ?? true,
        adminId: admin.adminId,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
