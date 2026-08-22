"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  /** Describes the footage for anyone who cannot see it. */
  alt: string;
  className?: string;
  /** Sits above the video, below the content. Concept-specific tinting. */
  overlayClassName?: string;
};

/**
 * Hero video that cannot hurt Core Web Vitals.
 *
 * A hero video is the single easiest way to wreck mobile LCP, so the poster
 * is a real, priority next/image and it is what Largest Contentful Paint
 * measures. The video is only created after first paint, and only when the
 * connection and the visitor's own settings say it is welcome:
 *
 *   - prefers-reduced-motion  the poster is the whole hero, no video at all
 *   - Save-Data              same
 *   - 2g / slow-2g / 3g      same
 *   - tab hidden             paused, so a backgrounded tab costs nothing
 *
 * preload="none" means not a byte is fetched until we attach the source, so
 * the decision above genuinely saves the download rather than just hiding it.
 */
export function HeroVideo({ src, poster, alt, className = "", overlayClassName = "" }: Props) {
  const [play, setPlay] = useState(false);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Not in every browser, hence the loose typing.
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /(^|-)2g$|^3g$/.test(conn.effectiveType)) return;

    // Wait for the browser to go idle so the video never competes with the
    // poster, the fonts or hydration for bandwidth.
    const idle =
      window.requestIdleCallback?.(() => setPlay(true), { timeout: 2500 }) ??
      window.setTimeout(() => setPlay(true), 1200);

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
    };
  }, []);

  useEffect(() => {
    if (!play) return;
    const el = videoRef.current;
    if (!el) return;
    const onVisibility = () => {
      if (document.hidden) el.pause();
      else void el.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [play]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <Image
        src={poster}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {play && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Scrim. Text never sits on bare footage. */}
      <div className={`absolute inset-0 ${overlayClassName}`} aria-hidden="true" />
    </div>
  );
}
