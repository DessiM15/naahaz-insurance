import Image, { type StaticImageData } from "next/image";

/**
 * The shared photographic treatment.
 *
 * Every photograph on the site passes through this so that 30+ unrelated
 * Unsplash images read as one art-directed system instead of a stock library.
 * The treatment is CSS layers, not baked into the files — it can be dialled
 * back or removed per-image without re-exporting anything.
 */
export function Duotone({
  src,
  alt,
  priority = false,
  className = "",
  intensity = 1,
  sizes = "100vw",
}: {
  src: StaticImageData | string;
  alt: string;
  priority?: boolean;
  className?: string;
  /** 0 = untreated photograph, 1 = full brand duotone. */
  intensity?: number;
  sizes?: string;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        placeholder={typeof src === "string" ? undefined : "blur"}
        className="object-cover"
      />

      {/* Navy multiply — pulls the whole image into the brand's base hue. */}
      <div
        className="absolute inset-0 bg-navy-900 mix-blend-multiply"
        style={{ opacity: 0.25 * intensity }}
        aria-hidden
      />

      {/* Gold screen on the highlights — puts warmth back into the light. */}
      <div
        className="absolute inset-0 bg-gold-500 mix-blend-screen"
        style={{ opacity: 0.12 * intensity }}
        aria-hidden
      />

      {/* Desaturate slightly so no single photo shouts louder than the rest. */}
      <div
        className="absolute inset-0 backdrop-saturate-[0.82]"
        style={{ opacity: intensity }}
        aria-hidden
      />

      <div className="grain-layer" aria-hidden />
    </div>
  );
}
