import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getAdminFromToken } from "@/lib/auth";
import { sanitizeImageName, saveUploadToGridFs } from "@/lib/uploads";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const admin = await getAdminFromToken();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const image = formData.get("image");

    if (!image || !(image instanceof File)) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    if (!image.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
    }

    if (image.size > MAX_IMAGE_SIZE) {
      return NextResponse.json({ error: "Image must be smaller than 8 MB" }, { status: 400 });
    }

    const safeName = sanitizeImageName(image.name) || "image";
    const fileName = `${Date.now()}-${randomUUID()}-${safeName}`;
    const buffer = Buffer.from(await image.arrayBuffer());

    await saveUploadToGridFs(fileName, buffer, image.type);

    return NextResponse.json({ url: `/api/uploads/${fileName}` }, { status: 201 });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json({ error: "Error uploading image" }, { status: 500 });
  }
}
