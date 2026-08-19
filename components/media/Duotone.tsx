import Image, { type StaticImageData } from "next/image";
import { DuotoneOverlays } from "./DuotoneOverlays";
import type { Tone } from "@/components/ui/tone";
import { BLUR_MAP } from "@/lib/blur-map";

/**
 * A treated photograph, filling its positioned parent.
 *
 * Server component — it reads the generated blur map, which must not end up
 * in the client bundle. Anything client-side that needs the treatment should
 * compose <DuotoneOverlays /> itself.
 */
export function Duotone({
  src,
  alt,
  priority = false,
  className = "",
  intensity = 1,
  sizes = "100vw",
  surface = "dark",
}: {
  src: StaticImageData | string;
  alt: string;
  priority?: boolean;
  className?: string;
  /** 0 = untreated photograph, 1 = full brand duotone. */
  intensity?: number;
  sizes?: string;
  /** Which surface the image sits on — the treatment differs. */
  surface?: Tone;
}) {
  // Static imports carry their own placeholder; path-based ones need the map.
  const blur = typeof src === "string" ? BLUR_MAP[src] : undefined;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
        {...(typeof src !== "string"
          ? { placeholder: "blur" as const }
          : blur
            ? { placeholder: "blur" as const, blurDataURL: blur }
            : {})}
      />
      <DuotoneOverlays intensity={intensity} surface={surface} />
    </div>
  );
}
