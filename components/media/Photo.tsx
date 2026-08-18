import Image, { type ImageProps } from "next/image";
import { BLUR_MAP } from "@/lib/blur-map";

/**
 * next/image with the generated blur placeholder applied automatically.
 *
 * Automatic placeholders only come free with statically imported images, and
 * ours are referenced by path from content data. Use this anywhere a local
 * /images/... path is rendered so nothing pops in cold.
 *
 * Server component by design — see components/media/Duotone.tsx.
 */
export function Photo({ src, ...rest }: Omit<ImageProps, "src"> & { src: string }) {
  const blur = BLUR_MAP[src];
  return (
    <Image
      src={src}
      {...rest}
      {...(blur ? { placeholder: "blur" as const, blurDataURL: blur } : {})}
    />
  );
}
