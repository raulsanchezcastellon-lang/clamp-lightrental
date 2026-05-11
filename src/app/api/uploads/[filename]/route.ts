import { NextResponse } from "next/server";
import { findUploadByName, gridFsStreamToWebStream } from "@/lib/uploads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await context.params;
    const upload = await findUploadByName(filename);

    if (!upload) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const contentType =
      typeof upload.file.metadata?.contentType === "string"
        ? upload.file.metadata.contentType
        : "application/octet-stream";

    return new Response(gridFsStreamToWebStream(upload.stream), {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    console.error("Image download error:", error);
    return NextResponse.json({ error: "Error loading image" }, { status: 500 });
  }
}
