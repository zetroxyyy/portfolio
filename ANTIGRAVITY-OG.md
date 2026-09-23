# zetroxy.me — Open Graph image, and the last scroll-spy bug

**Two items. A first — it affects every link anyone shares.**

Do not touch `Process.tsx`, `process-anim/`, `Capabilities.tsx`, `Testimonials.tsx`,
`ProjectBand.tsx`, `ThemeToggle.tsx`, `MidContact.tsx`, or `public/images/projects/`.

Files in scope:
- new: `src/app/opengraph-image.tsx`
- new: `src/app/twitter-image.tsx` (or re-export the above)
- `src/app/layout.tsx` (remove the manual image entries)
- `public/og-image.png` (delete)
- `src/components/layout/Nav.tsx`

Rules: no new dependencies, tokens only where CSS is involved. When done: `npx tsc --noEmit`,
`npm run lint`, `npm run build` clean.

---

# A — The share image is from a brand that no longer exists

## What is live right now

`https://zetroxy.me/og-image.png` returns a card reading **"zetroxy.me — DESIGN. BUILD. EDIT."**
on a light ground with a blue accent and a large `Z` mark.

That tagline was removed in the very first repositioning pass. The visual language — light card,
blue accent — matches nothing on the current site. And this is the image that appears every time
the URL is pasted into WhatsApp, LinkedIn, Slack, iMessage, Discord or X.

It is also mis-declared:

| | Declared in `layout.tsx` | Actual file |
|---|---|---|
| Width | 1200 | **1731** |
| Height | 630 | **909** |
| Size | — | **855 KB** |

Some platforms refuse to render an OG image that large, and a wrong declaration can cause
cropping.

## The fix — generate it, do not maintain a PNG

Use Next.js's `ImageResponse` so the card is built from the site's own content and can never
drift out of date again.

Create **`src/app/opengraph-image.tsx`**:

```tsx
import { ImageResponse } from 'next/og';
import { site } from '../../content/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${site.name} — Full-Stack Developer`;
```

Default-export an async function returning an `ImageResponse`. Next generates the file at build
time, serves it at the right dimensions, and wires the metadata automatically.

### What the card should contain

Match the site, dark-first, since that is the site's default appearance:

- Background `#0E0E0D` (the dark `--paper`), full bleed.
- Top-left, small mono, letter-spaced, `#85837B`: **`FULL-STACK DEVELOPMENT · NEPAL`**
- The headline, large, weight 700, `#EDEDEA`, roughly 76px, tight leading:
  **`The website is the easy half.`**
- The second line in italic serif, `#EDEDEA`, same size:
  **`I build what's underneath.`**
- Bottom-left, mono, `#85837B`: **`zetroxy.me`**
- Bottom-right, mono, `#85837B`: **`WEB · MOBILE · AI`**
- A 1px rule in `rgba(237,237,234,0.12)` above the bottom row.
- Generous padding — 72px on all sides. Nothing within 48px of any edge, because several
  platforms crop the outer band.

**Fonts.** `ImageResponse` cannot use CSS custom properties or a webfont link — fonts must be
loaded as `ArrayBuffer`s and passed in the `fonts` array. Read the Satoshi and Instrument Serif
files at build time and pass them. **If loading a font is not straightforward, use the system
sans stack and skip the serif italic rather than shipping a broken render** — a plain card that
works beats a styled card that fails to generate.

Do not attempt to reuse `globals.css`; `ImageResponse` supports only a subset of inline styles
and flexbox. Every value above is a literal on purpose.

### Then clean up

- Add **`src/app/twitter-image.tsx`** re-exporting the same component, so X gets the right card.
- **Remove the `openGraph.images` and `twitter.images` arrays from `layout.tsx`.** Next wires the
  generated images automatically, and leaving the manual entries will override them with the
  stale PNG.
- **Delete `public/og-image.png`.**
- Case study pages already set `openGraph.images` to the project cover — leave those, they are
  correct and specific.

### Verify

After deploying, check with a live debugger — `opengraph.xyz` or LinkedIn's Post Inspector —
and confirm the card shows the current headline at 1200×630. Note that WhatsApp and LinkedIn
cache aggressively; a previously-shared link may keep showing the old card for a while.

---

# B — The Contact nav item cannot activate at some viewports

## Measured

At a 988px-tall viewport:

- `#contact` top: `13524`, height: `404` → its centre sits at `13726`
- To place that centre at the viewport centre needs `scrollY = 13232`
- `maxScroll` is `12940`

**The required scroll position is 292px beyond the end of the page.** With
`rootMargin: '-45% 0px -45% 0px'` the detection band is the middle ~10% of the viewport, and the
footer never reaches it. The highlight stays stuck on `Process` at the very bottom of the page.

At 1440×900 the footer is tall enough relative to the band that it does intersect, so this looks
fine on a wide desktop and fails on taller, narrower viewports — which includes most phones.

## The fix

In the observer callback in `Nav.tsx`, before the nearest-to-centre calculation, short-circuit
on being at the bottom of the page:

```ts
const atBottom =
  window.innerHeight + Math.ceil(window.scrollY) >=
  document.documentElement.scrollHeight - 2;

if (atBottom) {
  setActiveSection(sectionIds[sectionIds.length - 1]);
  return;
}
```

The 2px tolerance covers sub-pixel rounding and browser zoom, where an exact equality check
silently never fires.

The observer alone will not re-run at the exact moment the reader reaches the bottom, so also
evaluate this in the existing scroll listener — the one already setting `scrolled`. It is
passive and already running, so this costs nothing extra.

## Done when

- Scrolling to the very bottom highlights `Contact`, at 375px, 768px, 1280px and 1440px.
- The highlight still behaves correctly everywhere else — no regression on the sticky behaviour.
- Zooming the browser to 110% does not break it.
