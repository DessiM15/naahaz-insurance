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
| `detail/retirement-planning.jpg` | Ged Mullen-Buick |
| `detail/income-strategies.jpg` | Pedro Miranda |
| `detail/medicare.jpg` | Vitaly Gariev |
| `detail/life-insurance.jpg` | Hollie Santos |
| `detail/long-term-care.jpg` | Age Cymru |
| `detail/business-insurance.jpg` | Barn Images |
| `detail/health-insurance.jpg` | Nappy |
| `detail/property-casualty.jpg` | Marc Pell |
| `detail/travel-insurance.jpg` | CardMapr.nl |
| `sections/mission.jpg` | Janosch Lino |
| `sections/hub-band.jpg` | David Schultz |
| `sections/not-found.jpg` | Trude Jonsson Stangel |
| `about/office.jpg` | Nastuh Abootalebi |
| `about/generations.jpg` | Vidar Nordli-Mathisen |
| `blog/index-hero.jpg` | Marissa Grootes |

**37 photographs, 37 distinct sources, zero repeats.**

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
pipeline to maintain.

## Adding an image

1. Drop the JPEG into the right folder under `public/images/`
2. Add a row to the table above — that table is how the no-repeats rule is
   actually enforced, so check it before sourcing
3. Run `./scripts/build-blur.sh` to regenerate the placeholder map
4. Render it with `<Photo>` or `<Duotone>`, never a bare `next/image`, or it
   will load without a placeholder

## Placeholders

`next/image` only generates blur placeholders automatically for *statically
imported* images. Ours are referenced by path from content data, so
`scripts/build-blur.sh` generates `lib/blur-map.ts` — a 5×4 PNG per image,
around 230 bytes each, inlined into the HTML and blurred up by the browser.

A JPEG at that size is roughly 1.6KB because the header dominates, which is
seven times the cost for the same visual result. The map is server-only and is
deliberately kept out of the client bundle: `Duotone` reads it, and the
client-side hero composes `DuotoneOverlays` instead.

## Still frames from stock footage

Two slots needed a photograph that free stock libraries did not have, so the
frames were pulled from video instead. Source: [Mixkit](https://mixkit.co),
under the [Mixkit Free Licence](https://mixkit.co/license/), which permits
commercial use without attribution. Credited here anyway.

| File | Source clip |
|---|---|
| `sections/illinois-rule.jpg` | mixkit 22510, senior couple walking at sunset |
| `sections/kitchen-table.jpg` | mixkit 35976, grandparents with their grandchildren |
| `services/medicare.jpg` | mixkit 36147, grandparents with their grandchildren |
| `services/income-strategies.jpg` | mixkit 23524, separating money for different budgets |
| `video/hero-generations.mp4` | mixkit 6472, three generations walking at sunset |
| `video/hero-montage.mp4` | mixkit 6472, 4661, 27372 and 33968, cut together |

**These are 1280px wide, which is the ceiling of the free source.** Fine at the
sizes they run at here, not fine for a full width desktop hero. Replacing them
with licensed stills, or with real photography of the Alis and their office, is
the single biggest available upgrade to how this site looks.
