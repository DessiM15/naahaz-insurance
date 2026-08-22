import type { Tone } from "@/components/ui/tone";

/**
 * The brand photographic treatment, as pure presentation.
 *
 * Split out from Duotone so the client-side hero can share the exact same
 * layers without pulling the (server-only) blur map into the client bundle.
 *
 * Two surfaces, because the treatment cannot be the same on both. The navy
 * multiply that unifies photographs against a dark page turns them muddy on
 * paper — on a light surface the image has to stay light, so the multiply is
 * dropped and a warm wash carries the cohesion instead.
 */
export function DuotoneOverlays({
  intensity = 1,
  surface = "dark",
}: {
  intensity?: number;
  surface?: Tone;
}) {
  if (surface === "paper") {
    return (
      <>
        {/* Warm paper wash — ties the photograph to the surface it sits on. */}
        <div
          className="absolute inset-0 bg-paper-50 mix-blend-lighten"
          style={{ opacity: 0.14 * intensity }}
          aria-hidden
        />
        {/* A trace of gold in the highlights, far lighter than on navy. */}
        <div
          className="absolute inset-0 bg-gold-400 mix-blend-overlay"
          style={{ opacity: 0.1 * intensity }}
          aria-hidden
        />
        {/* Pull the saturation back so no photo shouts over the copy. */}
        <div
          className="absolute inset-0 backdrop-saturate-[0.88] backdrop-brightness-[1.04]"
          style={{ opacity: intensity }}
          aria-hidden
        />
        <div className="grain-layer" style={{ opacity: 0.02 }} aria-hidden />
      </>
    );
  }

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
      <div
        className="absolute inset-0 backdrop-saturate-[0.82]"
        style={{ opacity: intensity }}
        aria-hidden
      />
      <div className="grain-layer" aria-hidden />
    </>
  );
}
