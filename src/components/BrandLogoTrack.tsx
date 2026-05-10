"use client";

type BrandLogo = {
  src: string;
  alt: string;
};

export default function BrandLogoTrack({ logos }: { logos: BrandLogo[] }) {
  const trackLogos = [...logos, ...logos, ...logos];

  return (
    <div className="overflow-hidden">
      <div className="flex min-w-full items-center gap-4 animate-marquee">
        {trackLogos.map((logo, index) => (
          <div
            key={`${logo.src}-${index}`}
            className="flex h-32 w-45 flex-shrink-0 items-center justify-center"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="max-h-24 max-w-52 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
