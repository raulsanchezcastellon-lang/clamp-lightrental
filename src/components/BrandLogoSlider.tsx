import fs from "fs";
import path from "path";
import BrandLogoHeading from "@/components/BrandLogoHeading";
import BrandLogoTrack from "@/components/BrandLogoTrack";

const BRAND_LOGOS_DIRECTORY = path.join(process.cwd(), "public", "brand-logos");
const VALID_IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".svg"]);

function getBrandLogos() {
  if (!fs.existsSync(BRAND_LOGOS_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(BRAND_LOGOS_DIRECTORY)
    .filter((fileName) => VALID_IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map((fileName) => ({
      src: `/brand-logos/${fileName}`,
      alt: path.basename(fileName, path.extname(fileName)).replace(/[-_]/g, " "),
    }));
}

export default function BrandLogoSlider() {
  const logos = getBrandLogos();

  if (logos.length === 0) {
    return null;
  }

  return (
    <section className="bg-black py-14 text-white">
      <div className="mx-auto max-w-[1580px] px-4 sm:px-6 lg:px-8">
        <BrandLogoHeading />
        <BrandLogoTrack logos={logos} />
      </div>
    </section>
  );
}
