import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;

    const { id } = await context.params;
    const data = await request.json();

    const name = data.name?.trim();

    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const duplicate = await prisma.category.findFirst({
      where: { name: { equals: name, mode: "insensitive" }, NOT: { id } },
    });
    if (duplicate) {
      return NextResponse.json({ error: "Ya existe una categoría con ese nombre." }, { status: 409 });
    }

    const updated = await prisma.category.update({
      where: { id },
      data: { name },
    });

    // Los productos guardan el nombre de la categoría: al renombrarla, se mueven con ella.
    let productsUpdated = 0;
    if (existing.name !== name) {
      const result = await prisma.product.updateMany({
        where: { category: existing.name },
        data: { category: name },
      });
      productsUpdated = result.count;
    }

    return NextResponse.json({ ...updated, productsUpdated });
  } catch (error) {
    console.error("Update category error:", error);
    return NextResponse.json({ error: "Error updating category" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;

    const { id } = await context.params;
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete category error:", error);
    return NextResponse.json({ error: "Error deleting category" }, { status: 500 });
  }
}
