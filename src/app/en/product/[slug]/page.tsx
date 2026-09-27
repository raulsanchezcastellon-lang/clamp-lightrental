import type { Metadata } from "next";
import ProductPageView, { generateProductMetadata } from "@/components/ProductPageView";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return generateProductMetadata(slug, "en");
}

export default async function ProductPageEn({ params }: PageProps) {
  const { slug } = await params;
  return <ProductPageView slug={slug} lang="en" />;
}
