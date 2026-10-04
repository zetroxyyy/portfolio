# zetroxy.me — minimal rebuild, part 1 of 2

**Start from the `minimal` branch, which is branched from commit `2c4abf3`.**

That commit already did the teardown: the old 3,118-line stylesheet is gone, the old section
components are gone, `Process.tsx` and `Capabilities.tsx` were rescued into
`src/components/approach/`, and the theme toggle was removed. `src/components/desk/` does not
exist on this branch and must not be recreated — that work is abandoned.

Part 1 builds the homepage. Part 2 handles the case study pages and `/approach`.

---

## The design, in one paragraph

A light, minimal, single-column portfolio. White page, near-black text, one green accent, one
typeface, six type sizes, eight spacing values. The homepage is a header, one sentence, six
projects stacked one per row with a large screenshot each, three side-project links, and an
email address. There is no hero, no concept, no device, no scroll effect. **The screenshots are
the design.** Everything else exists to stay out of their way.

This has been designed and approved already. Build it as specified. Do not add ideas.

---

## 1 — `src/app/globals.css`, rewritten

Phase 1's file is dark. Replace it. Keep `@import "tailwindcss";` and change the Satoshi import
to load the two weights actually used:

```css
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500&display=swap');
@import "tailwindcss";
```

Delete the JetBrains Mono `@font-face` block. **The site uses one typeface.** Leave
`public/fonts/JetBrainsMono-Regular.ttf` on disk — `opengraph-image.tsx` still reads it.

```css
:root {
  --font-sans: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* five colours, five jobs */
  --paper:  #FFFFFF;   /* page */
  --ink:    #111111;   /* headings, body            18.9:1 */
  --ink-2:  #737373;   /* secondary text             4.7:1 */
  --ink-3:  #A3A3A3;   /* 13px and 11px meta only    2.8:1 */
  --rule:   #E5E5E5;   /* hairlines, image borders */
  --rule-2: #D4D4D4;   /* image border on hover */

  --accent: #0E6E4E;   /* links and the availability dot. Nowhere else. */

  /* six sizes. Nothing outside this list may appear anywhere on the site. */
  --t-1: clamp(30px, 3.4vw, 44px);   /* the email on the contact block */
  --t-2: clamp(27px, 3.2vw, 40px);   /* the one intro sentence */
  --t-3: clamp(19px, 1.7vw, 24px);   /* project name */
  --t-4: 16px;                        /* the one line under a project */
  --t-5: 13px;                        /* meta: year, stack, links */
  --t-6: 11px;                        /* uppercase section label */

  /* eight spacing values. Every margin, padding and gap is one of these. */
  --s-1: 8px;   --s-2: 16px;  --s-3: 24px;  --s-4: 40px;
  --s-5: 64px;  --s-6: 96px;  --s-7: 112px; --s-8: 144px;

  --wrap: 1120px;      /* content column */
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}
```

Base layer: reset, `body` takes `--paper`, `--ink`, `--font-sans`, antialiasing. `::selection`.
A `.wrap` class — `max-width: var(--wrap); margin: 0 auto; padding-inline: var(--s-3)` and
`20px` below 640px.

**Hard rules:**

- **Light only.** No dark mode, no `prefers-color-scheme`, no `data-theme`. One theme.
- **No `filter: grayscale()` anywhere.** Screenshots are full colour at rest, always.
- **No sizes outside the six.** If something needs a seventh size, it is wrong — use an
  existing one.
- **No gaps outside the eight.** Same rule.
- Line heights: `1.18` on `--t-2` and `--t-1`, `1.6` on `--t-4` and body, `1.3` elsewhere.
- Letter spacing: `-0.025em` on `--t-1`, `-0.02em` on `--t-2`, `-0.015em` on `--t-3`,
  `+0.14em` on `--t-6`. Nothing else gets letter spacing.

## 2 — Content changes in `content/projects.ts`

**Add one field** to the `Project` interface: `homeImage: string`. The case study pages keep
using `cover`; the homepage uses `homeImage`. Do not repoint `cover`.

| slug | `homeImage` | alt text |
|---|---|---|
| dream-adventure | `/images/projects/dream-adventure/booking.webp` | Dream Adventure booking wizard, step one of six |
| nischal-legal | `/images/projects/nischal-legal/admin-dashboard.webp` | Nischal Legal Service admin dashboard |
| nexus-mcu | `/images/projects/nexus-mcu/timeline.webp` | Nexus MCU timeline catalogue |
| didee | `/images/projects/didee/admin-prices.webp` | Didee admin price and variant table |
| mydarlingfood | `/images/projects/mydarlingfood/products.webp` | My Darling Food product catalogue |
| manjushree | `/images/projects/manjushree/services.webp` | Manjushree recruitment services page |

These lead with application interfaces rather than marketing homepages, so six distinct builds
stop reading as one job repeated. Add a matching `homeImageAlt` field for the alt column.

**Replace every `shortSummary` with these exact strings.** Nine words maximum each:

| slug | shortSummary |
|---|---|
| dream-adventure | Booking and operations platform for a Japanese rafting operator. |
| nischal-legal | Bilingual legal practice site with a custom Nepali CMS. |
| nexus-mcu | Marvel catalogue and timeline, with its own CMS. |
| didee | Fashion storefront with a full product and price admin. |
| mydarlingfood | Food storefront with ordering and a product catalogue. |
| manjushree | Recruitment agency site for overseas Nepali hiring. |

Leave `summary`, `problem`, `built`, `decisions` and `outcome` untouched — the case study pages
still use them.

**Homepage order:** dream-adventure, nischal-legal, nexus-mcu, didee, mydarlingfood, manjushree.

## 3 — Components

Create `src/components/site/` with exactly four files. Nothing else.

```
Header.tsx        name left, three links right
ProjectRow.tsx    one project
SideProjects.tsx  the three-row strip
Contact.tsx       the email block and the footer line
```

**Delete** `src/components/layout/Nav.tsx` and `src/components/layout/Footer.tsx` — `Header`
and `Contact` replace them. Also delete `src/components/ui/ScrollProgress.tsx`,
`BackToTop.tsx`, `SectionMeta.tsx`, `StatusReadout.tsx`, `HeadingReveal.tsx`,
`src/components/layout/PageTransition.tsx` and `src/hooks/useScrollProgress.ts`. Remove every
reference to them from `layout.tsx`.

**Keep** `LenisProvider` (smooth scroll, already working) and `BrowserFrame.tsx` (used by the
case study pages in part 2 — do not modify it, and do not use it on the homepage).

## 4 — The homepage

`src/app/page.tsx`:

```
<Header />
<section>  the intro
<section>  six <ProjectRow /> in order
<SideProjects />
<Contact />
```

**Header** — `padding: var(--s-3) 0`. Left: `zetroxy`, `--t-5`, weight 700. Right: `Work`,
`About`, `Email`, `--t-5`, `--ink-2`, `gap: 28px`. Not sticky. It scrolls away.

**Intro** — `padding: var(--s-7) 0 var(--s-6)`.

```
h1   --t-2, weight 500, max-width 720px
     Full-stack developer in Kathmandu, building web products end to end.

row  7px green dot + "Available for work · hello@zetroxy.me"  --t-5, --ink-2
     margin-top: var(--s-3)
```

**ProjectRow** — `var(--s-7)` between rows.

```
<Image>  width 100%, aspect-ratio 16/9, object-fit cover, object-position top,
         1px solid var(--rule), border-radius 4px, display block
         next/image with width and height from content/imageDimensions.ts
         priority only on index 0

row      margin-top: var(--s-3); flex, space-between, align-items flex-start, gap var(--s-4)

  left   h2  --t-3, weight 500            {title}
         p   --t-4, --ink-2, margin-top var(--s-1), max-width 520px   {shortSummary}

  right  p   --t-5, --ink-3     2026 · Next.js, PostgreSQL
         p   --t-5, margin-top 10px
             <a>Live site ↗</a> · <a>Case study →</a>   both in --accent
```

The stack line takes the **first and fourth** entries of `project.stack`, joined with a comma.
Below 640px the row becomes a single column and the right side sits under the left.

**SideProjects** — `padding-top: var(--s-8)`. Label `SIDE PROJECTS` at `--t-6`, uppercase,
`--ink-3`, `margin-bottom: var(--s-3)`. Then three rows read from `content/sideProjects.ts`,
each `padding: 20px 0` with `border-top: 1px solid var(--rule)` and a bottom border on the
last: name at `--t-4` weight 500 in a 220px fixed column, `summary` at `15px` in `--ink-2`
filling the space, `GitHub ↗` at `--t-5` in `--accent` on the right. Use the existing
`summary` strings — they are already short enough. No cards, no borders, no images.

`SideProjectCard.tsx` is **not** used here. Leave it alone for part 2.

**Contact** — `padding-top: var(--s-8)`. The email at `--t-1`, weight 500, as a `mailto:` link.
Beneath it at `--t-5` in `--ink-2`: `Available for work · Kathmandu, Nepal · GitHub`. Then the
existing small legal line at `--t-5` in `--ink-3`, `margin-top: var(--s-6)`,
`padding-bottom: var(--s-5)`. No contact form — the Resend quota is spent on another project.

## 5 — Motion, and how little of it there is

- Each `ProjectRow` fades in from `opacity: 0, y: 16px` when it enters the viewport. 500ms,
  `--ease`, once, never replayed. Use framer-motion's `whileInView` with `viewport={{ once: true }}`.
- Image hover: border goes `--rule` → `--rule-2`, 200ms. Nothing else moves.
- Project name hover: colour goes to `--accent`, 200ms.
- **That is the complete list.** No parallax, no stagger, no scroll-driven anything, no cursor
  effects, no page transitions, no reveal masks, no counters.
- `prefers-reduced-motion`: no fade at all, everything renders in place.

## 6 — Verify and report the real numbers

```bash
npx tsc --noEmit
npm run lint
npm run build
npm start &
sleep 4
curl -s localhost:3000 | sed 's/<[^>]*>/ /g' | tr -s ' \n' ' ' | wc -w
curl -s localhost:3000 | grep -c "booking.webp"
grep -rn "grayscale\|data-theme\|prefers-color-scheme" src/
```

Report:

1. Each command's output.
2. **The homepage word count. It must be under 250.** The design accounts for about 182.
3. The pixel position where the first screenshot starts, at 1440px wide and at 375px wide. It
   must be visible without scrolling on both.
4. How many distinct font families resolve. It must be one.
5. How many distinct font sizes render on the homepage. It must be six or fewer.
6. Whether any horizontal scrollbar appears at 375px.

---

## Do not

- No new npm dependencies.
- Do not touch `next.config.ts`. `images.unoptimized: true` must stay — the Vercel optimizer
  quota is spent, `/_next/image` returns HTTP 402, and every image would vanish.
- Do not modify `BrowserFrame.tsx` or `opengraph-image.tsx`.
- Do not use `BrowserFrame` on the homepage.
- Do not recreate `src/components/desk/`.
- Do not restyle `/work/[slug]` or `/approach` yet. They will look unstyled. That is part 2.
- Do not add a hero, a tagline above the intro, a statement section, a testimonials section, a
  capabilities list, a skills row, a stats row, a process section, or a "what I do" block.
- Do not add an idea of your own. If something seems missing, it was removed deliberately.
- No placeholders, no `// TODO`. Write complete files.

**Commit to the `minimal` branch. Do not push to `main`.**

**Stop when step 6 is reported, and wait for review.**

---

## Part 2, for context only — do not build it yet

Restyle `/work/[slug]` on the light system, keeping `BrowserFrame` and the existing case study
content. Move each client testimonial onto its own project's case study page. Rebuild
`/approach` with the rescued `Process` and `Capabilities`. Update `sitemap.ts` and `robots.ts`.
