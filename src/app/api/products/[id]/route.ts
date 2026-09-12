import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { buildProductSlugBase, generateUniqueProductSlug } from "@/lib/products";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Error obteniendo producto" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const brand =
      typeof body.brand === "string" && body.brand.trim() ? body.brand.trim() : null;

    const existingProduct = await prisma.product.findUnique({
      where: { id },
      select: { slug: true },
    });

    const slug =
      existingProduct?.slug ||
      (await generateUniqueProductSlug(
        buildProductSlugBase({ brand, name: body.name }),
        id
      ));

    const data = {
      name: body.name,
      slug,
      brand,
      description: body.description,
      category: body.category,
      listingType: body.listingType === "sale" ? "sale" : "rental",
      priority: body.priority === 1 || body.priority === -1 ? body.priority : 0,
      featuredOrder:
        typeof body.featuredOrder === "number" && Number.isFinite(body.featuredOrder)
          ? body.featuredOrder
          : 0,
      price: body.price,
      stock: body.stock,
      image: body.image || null,
      available: body.available ?? true,
    };

    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data,
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: "Error actualizando producto" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const data: {
      featuredOrder?: number;
      priority?: number;
    } = {};

    if (typeof body.featuredOrder === "number" && Number.isFinite(body.featuredOrder)) {
      data.featuredOrder = body.featuredOrder;
    }

    if (body.priority === 1 || body.priority === 0 || body.priority === -1) {
      data.priority = body.priority;
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data,
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: "Error actualizando producto" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await prisma.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error eliminando producto" },
      { status: 500 }
    );
  }
}
