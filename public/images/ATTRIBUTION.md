# Image Attribution

All photography sourced from [Unsplash](https://unsplash.com) under the
[Unsplash License](https://unsplash.com/license) — free for commercial use, no
permission required. Attribution is appreciated rather than required; we credit
every photographer anyway.

**House rule: no image is ever used twice.** Every slot on every page gets its
own unique photograph. This table is the enforcement mechanism — before adding
an image, check it isn't already here.

| File | Photographer |
|---|---|
| `hero/horizon-couple.jpg` | Katarzyna Grabowska |
| `services/retirement-planning.jpg` | Florian van Schreven |
| `services/income-strategies.jpg` | Raymond Petrik |
| `services/medicare.jpg` | Armin Lotfi |
| `services/life-insurance.jpg` | Pana K |
| `services/long-term-care.jpg` | Rod Long |
| `services/health-insurance.jpg` | Iryna Studenets |
| `services/business-insurance.jpg` | Clay Banks |
| `services/property-casualty.jpg` | Roger Starnes Sr |
| `services/travel-insurance.jpg` | Kornél Máhl |
| `services/hub.jpg` | Héctor J. Rivas |
| `about/hero.jpg` | Md Ishak Rahman |
| `about/chicago.jpg` | Pedro Lastra |
| `about/community.jpg` | Filip Rankovic Grobgaard |
| `blog/creditor-protection.jpg` | Aleksandar Savic |
| `blog/disability-income.jpg` | Ali Mkumbwa |
| `blog/medicare-mistakes.jpg` | Vitaly Gariev |
| `sections/process.jpg` | Nicolas HIPPERT |
| `sections/cta.jpg` | Shunya Koide |
| `sections/contact.jpg` | Sebastian Herrmann |
| `sections/book.jpg` | Christian Ladewig |
| `sections/testimonial.jpg` | Renaud Confavreux |

**22 photographs, 22 distinct sources, zero repeats.**

## Treatment

Photography that carries people passes through `components/media/Duotone.tsx`:

- navy `#0A1628` multiply @ 25%
- gold `#C9A227` screen on highlights @ 12%
- slight desaturation, plus a 3.5% film grain overlay

This is what makes 22 unrelated photographs read as one art-directed system
rather than a stock library. The treatment is CSS layers, not baked into the
files, so it can be dialled back or removed per-image without re-exporting.

Background and section imagery uses lower opacity plus a gradient scrim instead,
so text contrast is never at the mercy of the photograph underneath it.

## Formats

Source files are stored as JPEG at 2000px wide. `next/image` generates AVIF and
WebP at eight widths on demand and caches them — there is no separate export
pipeline to maintain, and adding an image means dropping in one file.
