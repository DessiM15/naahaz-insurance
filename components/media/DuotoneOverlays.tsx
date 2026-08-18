/**
 * The brand photographic treatment, as pure presentation.
 *
 * Split out from Duotone so the client-side hero can share the exact same
 * layers without pulling the (server-only) blur map into the client bundle.
 * Whatever changes here changes everywhere — there is one treatment.
 */
export function DuotoneOverlays({ intensity = 1 }: { intensity?: number }) {
  return (
    <>
      {/* Navy multiply — pulls the image into the brand's base hue. */}
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
    </>
  );
}
