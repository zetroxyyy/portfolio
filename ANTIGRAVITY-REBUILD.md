# zetroxy.me — visual-first rebuild

**Four phases. Run in order, review between each.** Phase 1 is the foundation everything else
depends on — do not skip ahead.

## Why this rebuild exists

The site was reviewed by designers and developers and scored 5/10. The substance of the
feedback, verified by measurement:

| | Measured | Target |
|---|---|---|
| Words on the homepage | **1,416** (~6 min read) | **under 250** |
| First project image appears at | **1,562px** (1.6 screens down) | **0px — screen one** |
| Type families rendering | **4** | **2** |
| Colour | effectively none | the work's own colour |

The verdicts were "I don't know if it's a portfolio", "too much text", "too many fonts" and
"doesn't show creativity". All four are the same root cause: **this was built as a services
page.** Proof → social proof → capabilities → process → contact is how an agency sells. A
portfolio shows work immediately and says almost nothing.

**It is not a content problem. The writing is good. It is in the wrong place and there is far
too much of it on the homepage.**

---

## The concept: the page takes the colour of the work

Each project already has a real accent derived from its own interface — teal for Dream
Adventure, deep red for Nischal, Marvel red for Nexus, corporate red for Manjushree, near-black
for Didee, warm orange for My Darling Food.

**As the reader scrolls into a project, the whole page adopts that colour.** Background, rules,
type colour, the lot — transitioning over ~700ms. The site is monochrome between projects and
takes on each project's identity as you reach it.

This answers "show creativity" with something motivated by the content rather than decoration,
it uses assets that already exist, and no other developer portfolio does it because most do not
have six real products with distinct identities.

Everything below serves that concept.

---

# PHASE 1 — Design system

## 1.1 Typography: two families, and kill the mono

Four families currently render. The real problem is not the count — it is that **JetBrains Mono
is doing nine different jobs**: eyebrows, stack chips, status lines, badges, domains, labels,
numerals, captions, meta. One family in nine roles is what reads as "too many fonts".

- **Keep Satoshi.** Display, body, UI, everything structural.
- **Keep Instrument Serif Italic.** One job only: the emphasis clause in large headings. It is
  the site's signature and it stays.
- **Remove JetBrains Mono entirely.** Delete the `next/font` import and the `--font-mono` token.
  Everywhere it was used, substitute **Satoshi at 500 weight, uppercase, `0.08em` tracking,
  small size**. That reads as a label without introducing a face.
- Keep the Japanese and Devanagari stacks — they are only for the client quotes and only on the
  page those move to.

Rebuild the scale around a **portfolio**, not a document. Far bigger at the top, far less in the
middle:

```css
--t-hero:    clamp(3.5rem, 11vw, 11rem);   /* project names, hero */
--t-display: clamp(2.5rem, 6vw, 5rem);     /* section statements */
--t-lead:    clamp(1.125rem, 1.6vw, 1.5rem);
--t-body:    1rem;
--t-label:   0.75rem;                       /* uppercase Satoshi 500 */
```

## 1.2 Colour

```css
/* neutral ground — unchanged, it works */
--paper, --paper-2, --ink, --graphite, --mist, --fog, --hairline

/* NEW: the active project's colour, set on <html> and animated */
--accent:        #12110F;   /* defaults to ink */
--accent-contrast: #F6F5F2; /* text that sits on the accent */
--accent-wash:   transparent;
```

`--accent` is updated in JS as the reader scrolls between projects, and every accent-aware rule
reads from it. Transition it with
`transition: background-color 700ms cubic-bezier(0.16,1,0.3,1), color 700ms ...` on the elements
that use it — never on `*`.

Each project in `content/projects.ts` already has an `accent`. Add a matching
`accentContrast` to each (the readable text colour on that accent) rather than computing it.

**Both themes still work.** The accent sits on top of the existing neutral system, it does not
replace it. Verify every accent reaches 4.5:1 against `--accent-contrast`, and darken the accent
rather than lightening the text where it fails.

## 1.3 What to delete

- `--font-mono` and the JetBrains import
- `.section-eyebrow`, `.section-subhead` and every usage — subheads under every heading are
  where most of the 1,416 words live
- `MidContact.tsx` — it exists because contact was buried at 96%; after this rebuild it is not

---

# PHASE 2 — The homepage

Target: **under 250 words, work visible at 0px.**

New `page.tsx`:

```
<Hero />        full viewport, work imagery
<Work />        six projects, large
<Statement />   one sentence
<Contact />     big, simple
```

Four blocks. No Capabilities, no Process, no testimonial list — those move in Phase 3.

## 2.1 Hero — the work is the hero

**No headline hero. No claim. No buttons.** A full-viewport asymmetric grid of all six project
covers, edge to edge, no page padding.

- Six cells, deliberately uneven — two large, four smaller — so it reads as composed rather than
  as a CMS grid. Fill the viewport exactly: `height: 100svh`, no scroll inside it.
- Each cell is the project's `cover.webp`, `object-fit: cover`, at rest in **greyscale with the
  project's accent at 15% multiplied over it**. On hover it goes full colour, scales 1.03, and
  the project name fades in over it at `--t-hero`.
- Fixed over the top-left: `zetroxy` and, one line below, `Full-stack developer · Nepal` at
  `--t-label`. That is the only text in the hero.
- Top-right: the availability dot and `hello@zetroxy.me`.
- Bottom-right: a small `Scroll` cue.
- On load, the six cells reveal in a 700ms stagger from a clip-path wipe — that is the one
  showpiece moment of the page.
- **Below 820px:** two columns, three rows, `100svh` still. Names always visible rather than on
  hover, since there is no hover on touch.

Every cell links to its case study.

## 2.2 Work — one project per screen

Six full-viewport sections, one per project, in the existing order.

Per project:
- The page background becomes that project's `--accent-wash` (the accent at 6–8%) as the
  section crosses the viewport centre. Use one `IntersectionObserver` setting `--accent` on
  `document.documentElement`.
- The project name at `--t-hero`, enormous, possibly overflowing the viewport edge.
- Beneath it, **one line only** — the existing `summary` cut to under 15 words.
- A single meta line in `--t-label`: `2026 · Next.js, Postgres · Live`
- The cover screenshot in the existing `BrowserFrame`, large, offset so it overlaps the
  oversized name. **Keep BrowserFrame exactly as it is** — the dark chrome with the real URL is
  the best component on the site.
- Two links: the live site and the case study. Text links with an underline, not buttons.

**That is the entire content per project.** No stack chip rows, no paragraph, no "Read the case
study" button block. The stack goes on the meta line; everything else is on the case study page.

The three side projects become a single compact strip after the six — a row of three names with
one line each and a repo link. No cards.

## 2.3 Statement

One sentence at `--t-display`, centred, on its own screen, with a lot of space:

> **Most sites just sit there.** *Mine run the business.*

Roman then serif italic. Nothing else on that screen.

## 2.4 Contact

Full viewport. `hello@zetroxy.me` at `--t-hero` as the only real element, with the availability
line and GitHub beneath at `--t-label`. Keep the existing footer legal line small below it.

---

# PHASE 3 — Move the services content, do not delete it

Create **`/approach`** and move there, intact:

- the Process section with all four animations
- the Capabilities toolkit
- all three client testimonials, full length, in their original languages

Those took a long time to get right and they are what convinces a paying client. They are simply
not what a visitor wants in the first six minutes.

- Link to it from the contact screen and the footer as **`How I work →`**. Not in the main nav.
- Nav becomes just: **Work · Approach · Contact**.
- Move the Japanese and Devanagari font stacks to apply only on this route.
- Keep one short pull quote on the homepage contact screen — a single sentence from the Nexus
  testimonial, attributed. One quote, not three.

---

# PHASE 4 — Motion

It is a creative portfolio now, so motion is expected. It still has to be disciplined.

- **Hero reveal:** the six-cell clip-path stagger on load. The showpiece.
- **Accent transition:** 700ms, the thing people will notice and remember.
- **Project names:** rise 40px with a clip-path mask as each section enters.
- **Images:** a slow parallax inside the browser frame, maximum 30px of travel.
- **Hover:** greyscale → colour, 1.03 scale, 400ms.
- **No scroll-jacking, no cursor followers, no magnetic buttons, no page-transition curtains.**
- `prefers-reduced-motion`: no parallax, no stagger, no accent transition — accents apply
  instantly and everything renders in place.

---

# Constraints — unchanged and still binding

- No new dependencies. Existing framer-motion and lenis only.
- `images.unoptimized: true` stays in `next.config.ts` — the Vercel image quota is spent and
  re-enabling the optimizer returns HTTP 402.
- Keep `BrowserFrame.tsx` and the generated `opengraph-image.tsx` as they are.
- Case study pages at `/work/[slug]` keep their current structure and content.
- Every colour defined for bare `:root`, the `prefers-color-scheme: dark` query guarded with
  `:root:not([data-theme="light"])`, **and** `:root[data-theme="dark"]`.
- Keep the theme toggle — it works correctly now and the criticism of it was mistaken.
- `npx tsc --noEmit`, `npm run lint`, `npm run build` clean. No horizontal scroll at 375px.

# Done when

- The homepage is **under 250 words**. Count it.
- Project imagery is visible at **0px scroll**, before any interaction.
- **Two type families** render on the homepage. No mono anywhere.
- The background visibly changes colour as you scroll between projects.
- Process, Capabilities and the full testimonials exist at `/approach`, not deleted.
- A first-time visitor can tell it is a portfolio within one second and without reading.
