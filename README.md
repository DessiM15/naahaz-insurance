# NAAHAZ INSURANCE

Website rebuild for NAAHAZ Inc. — Rolling Meadows, IL.
Tagline: **Protecting What Matters**.

Next.js 16 (App Router) · TypeScript · Tailwind v4 · Motion · deployed on Vercel.

---

## Phase 1 — Foundation (this branch)

- [x] Project scaffold, typecheck and production build green
- [x] Design system — navy + warm gold tokens, fluid type scale, motion primitives
- [x] **Four logo concepts** as real SVGs → [`/logo-concepts`](/logo-concepts)
- [x] Loading screen — path-draw → wordmark stagger → curtain split, ~1.6s
- [x] Scroll behaviour — refresh always lands at top
- [x] Sticky header with persistent booking CTA
- [x] Homepage hero — three parallax layers, mesh gradient, duotone photography

Phase 2 (after the logo and direction are signed off): remaining 11 pages,
3-step lead wizard, the Ava chatbot, and the booking flow.

---

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open <http://localhost:3000>. The logo review page is at
<http://localhost:3000/logo-concepts>.

---

## Decisions worth knowing before you edit

**Picking the logo.** Change `ACTIVE_CONCEPT` in
`components/logo/Logo.tsx`. The header, loading screen and favicon all read
from it.

**Scroll behaviour** lives in `components/ScrollManager.tsx`. The browser's
native restoration is switched off in `LOADER_BOOT_SCRIPT` because it fires on
refresh — which is the exact behaviour we were asked to remove. We then
re-implement only the half worth keeping:

| Action | Result |
|---|---|
| Refresh / hard load | Top of page, always |
| Forward navigation | Top of page |
| Back / forward | Restores previous position |
| `#anchor` link | Jumps to the element |

**The loading screen** shows once per browser session. Returning visitors are
handled by an inline script that runs before first paint, so the panel never
mounts and flashes. Under `prefers-reduced-motion` the whole sequence
collapses to a 200ms fade.

**Photography.** Every image is self-hosted under `public/images/` and passes
through `components/media/Duotone.tsx`. House rule: **no image is ever reused**.
Credits live in `public/images/ATTRIBUTION.md`.

**The domain is not hardcoded.** `NEXT_PUBLIC_SITE_URL` drives metadata,
canonical tags, sitemap and OG URLs, so moving off
`yourhealthinsurance.net` later is a one-line change.

---

## Pending client input

Everything below is stubbed with a clearly-marked placeholder. Nothing is
invented and nothing fake ships.

- **Real email address** — `AZIZALI@INSURANCE.COM` on the legacy site is
  almost certainly a placeholder. Nothing outbound is wired until it's confirmed.
- Headshots of Naureen & Aziz — the About page portrait slots are designed and waiting
- Years in business, NPN and state license numbers
- Which of the two phone numbers is primary
- Real testimonials, carrier list, existing Calendly/Acuity link
- Confirmation that NAAHAZ = **Na**ureen + **Az**iz

## Compliance

The TCPA consent checkbox and the Medicare CMS disclaimer ship with
placeholder wording and are marked in-code. **Both need the client's attorney
to review before launch.**
