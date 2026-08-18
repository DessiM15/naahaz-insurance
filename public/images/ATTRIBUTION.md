# Image Attribution

All photography sourced from [Unsplash](https://unsplash.com) under the
[Unsplash License](https://unsplash.com/license) (free for commercial use,
no permission needed, attribution appreciated but not required).

**House rule for this project: no image is ever used twice.** Every slot on
every page gets its own unique photograph.

| File | Photographer | Source |
|---|---|---|
| `hero/horizon-couple.jpg` | Katarzyna Grabowska | https://unsplash.com/photos/sRAWQyoUiVQ |

## Treatment

Every photograph is run through the shared duotone in
`components/media/Duotone.tsx`:

- navy `#0A1628` multiply @ 25%
- gold `#C9A227` screen on highlights @ 12%
- 3.5% film grain overlay

This is what makes 30+ unrelated photographs read as one art-directed system
rather than a stock library. The treatment is a CSS layer, not baked into the
files, so it can be dialled back or removed per-image without re-exporting.
