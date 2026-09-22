# zetroxy.me — UI/UX pass, round two

**Three phases plus one small fix. Run them one at a time, in order.**
Paste one phase into Antigravity, review the site, commit, then move on.

The four phases from `ANTIGRAVITY-UIUX.md` are already merged. This builds on them.

---

## Ground rules (unchanged, still binding)

1. **Do not touch:** `Hero.tsx` and `.hero*`, `ProjectBand.tsx` and `.project-band*` layout,
   `Footer.tsx`, anything under `public/images/projects/`.
   `BrowserFrame.tsx` **is** in scope this round, but only where a phase says so.
2. **No new dependencies.** Keep framer-motion and lenis; add nothing.
3. **`images.unoptimized: true` stays in `next.config.ts`.** The Vercel image quota is spent;
   re-enabling the optimizer returns HTTP 402 and every screenshot disappears.
4. **No raw hex in components.** Tokens in `globals.css`; per-project accent passed as
   `--project-accent`.
5. **Every colour defined for all three theme states** — bare `:root`, the
   `prefers-color-scheme: dark` media query guarded with `:root:not([data-theme="light"])`,
   and `:root[data-theme="dark"]`.
6. **`prefers-reduced-motion` honoured** — keep colour and border feedback, drop movement and
   height transitions.
7. **After every phase:** `npx tsc --noEmit`, `npm run lint`, `npm run build` clean, and no
   horizontal scroll at 375px.

---

# PHASE 0 — Nav bleed, the rest of it

Small. Do it first, it takes a minute.

Phase 1 last round raised `.nav--scrolled` to 96% opacity with a 20px blur. That fixed small
body text. **It did not fix large display type.** Scrolling past the Process statement, the
words *"Most agencies deliver a static"* are clearly readable through the nav — 4% of a 64px
serif is far more visible than 4% of 13px body copy.

Take `.nav--scrolled` to a fully opaque background once scrolled:

```css
.nav--scrolled {
  background-color: var(--paper);
  backdrop-filter: blur(20px) saturate(140%);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  border-bottom-color: var(--hairline);
}
```

The blur still does work during the transition and on the border edge, but nothing reads
through. If losing the glass entirely feels too flat, 98% is the lowest that holds up against
display type — do not go back below that.

**Done when:** scroll the full page and the full `/work/dream-adventure` page. No text of any
size is legible through the nav at any scroll position, in both themes.

---

# PHASE 5 — Fix the "Full Public Experience" scroll trap

## The problem

`.browser-frame--scrollable` gives the tall `*-full.webp` captures a fixed `68vh` height with
`overflow-y: auto`. That is a **nested scroll container**, and it makes the case study pages
genuinely unpleasant:

- With the cursor over the frame, the page stops scrolling and the frame scrolls instead. The
  reader has to traverse up to 9,000px of image before the page continues.
- On a trackpad it is easy to get stuck inside it without understanding why.
- On touch it is worse — the inner scroll swallows the swipe.
- The inner scroll position persists, so the frame is often showing the middle of a page with
  no context.

The scroll hint reading "Scroll to view full page ↓" is a sign that the interaction needed
explaining, which is the tell that it was the wrong interaction.

## The fix — collapse and expand, never nested scroll

Replace the inner scroll entirely. The frame shows the **top** of the full-page capture,
cropped, with a fade at the bottom edge. A button expands it inline to full natural height, and
the **page** scrolls — never an inner container.

### Mechanics

In `src/components/ui/BrowserFrame.tsx`, the `scrollable` variant becomes an
**expandable** variant:

- Collapsed (default): the screen area is `max-height: 460px`, `overflow: hidden`. The image
  sits at natural width and top-aligned, so the reader sees the top of the page design.
- A gradient overlay across the bottom ~140px, fading from transparent to the section
  background, so the crop reads as deliberate rather than cut off.
- A button centred over the fade: **"See the full page ↓"**.
- Expanded: `max-height: none`. The image renders at its true natural height. The page scrolls
  normally past it. The button becomes **"Collapse ↑"** and sits below the image.
- **Remove `overflow-y: auto` and the `-webkit-scrollbar` rules entirely.** There must be no
  nested scroll container left anywhere in this component.
- Remove the `.browser-frame__scroll-hint` element and its styles.

### Details that matter

- **Collapsing must not strand the reader.** When collapsing, scroll the frame's top edge back
  into view (`scrollIntoView({ block: 'start' })`, or Lenis if present) — otherwise the reader
  is left hanging in whitespace where 6,000px of image used to be.
- Animate `max-height` with a ~500ms `var(--ease-expo)` transition. Under
  `prefers-reduced-motion`, snap with no transition.
- The button is a real `<button>` with `aria-expanded` reflecting state, and
  `aria-controls` pointing at the screen element's id.
- Keep the browser chrome — the dark title bar, the dots, the URL pill. That treatment stays
  exactly as it is.
- `next/image` keeps its true `width`/`height` from `content/imageDimensions.ts` so nothing
  shifts on expand.

### While you are in this component

The tall captures range from 2,464px to 9,000px. At full width on a wide screen an expanded
9,000px image is absurd. **Cap the expanded frame's rendered width at 900px and centre it** —
a full-page screenshot is a document, not a hero, and reads better in a column.

## Done when

- No `overflow-y: auto` remains in `BrowserFrame.tsx` or its styles.
- Scrolling a case study top to bottom never stops or stutters over an image.
- Collapsed frames all show the top of their page and are the same height.
- Expanding then collapsing leaves the reader looking at the frame, not at blank space.
- Works with keyboard: tab to the button, Enter expands, `aria-expanded` updates.

---

# PHASE 6 — Capabilities, properly redesigned

## Where it stands

Round one turned 28 bullets into four proof rows. That was the right direction and it is a real
improvement — but it is still **four rows of prose**, and it sits directly after the Work
section pointing at projects the reader just scrolled past. It reads as a recap.

## The idea

Stop describing the capability. **Show it.**

The most persuasive images on this entire site are the admin panel screenshots, and right now
they are buried inside case studies most visitors never open. Capabilities is where they should
live: a two-column panel where the reader picks a capability on the left and the actual screen
that proves it appears on the right.

Claim → evidence, in one interaction, with assets already on disk.

## What to build

Rewrite `src/components/sections/Capabilities.tsx` as a **selector + viewer**.

**Left column** — four capability entries as a vertical list. Each is a `<button>` carrying:
- index numeral in the cited project's accent
- capability name (`--h-sub`)
- one short line of description
- the selected one is marked with `aria-pressed="true"`, an accent left border, and full-contrast
  text; unselected ones sit at `--graphite`

**Right column** — a `<BrowserFrame>` showing the screenshot for the selected capability, with
a caption beneath naming the project and linking to its case study.

**The four entries** — every screenshot listed already exists:

| # | Capability | Screenshot | Caption / link | Accent |
|---|---|---|---|---|
| 01 | Booking and availability | `/images/projects/dream-adventure/admin-availability.webp` | Availability calendar — per-slot capacity and blackout dates. *Dream Adventure* → `/work/dream-adventure` | `#0D9488` |
| 02 | Admin panels clients run | `/images/projects/nischal-legal/admin-services.webp` | Service editor, in Nepali, used by the office staff. *Nischal Legal Service* → `/work/nischal-legal` | `#B3222C` |
| 03 | Catalogue and pricing | `/images/projects/didee/admin-prices.webp` | Bulk price entry across the whole catalogue in one pass. *Didee* → `/work/didee` | `#1A1A18` |
| 04 | Operations and documents | `/images/projects/dream-adventure/admin-manifest.webp` | Daily manifest, grouped by departure, exports to PDF. *Dream Adventure* → `/work/dream-adventure` | `#0D9488` |

Rewrite the descriptions in your own words if they read better. Keep them to one line and keep
them concrete — no adjectives about quality, just what the screen does.

### Requirements

- **First entry selected on initial render**, server-rendered — the section must not appear
  empty before hydration.
- Switching is instant. Cross-fade the image over ~250ms, nothing more elaborate.
- **Keyboard:** each entry is a button in normal tab order. Up/Down arrows move between them
  when focus is inside the list.
- **Mobile (≤ 820px):** the selector does not work as two columns. Collapse to a stacked
  accordion — tapping a capability expands its screenshot directly beneath it. First one open
  by default.
- Preload only the first image; the rest lazy.
- Reuse the existing `.capability-row` styles where they still apply, and delete whatever no
  longer does. Do not leave dead CSS behind.

## Done when

- The section is visual first. A reader who reads nothing still sees four real admin screens.
- Every screenshot path resolves and every case study link is a real route.
- No layout shift when switching entries — the frame holds its box.
- Works at 375px as an accordion, no horizontal scroll.
- Reads correctly with a screen reader: the buttons announce pressed state, the image has real
  alt text describing the screen.

---

# PHASE 7 — Process, properly redesigned

## Where it stands

Still four cards: **Scope / Build / Ship / Maintain**, each with a paragraph. This is the single
most generic section pattern on the internet — every agency site has this exact block. The
heading and the statement below it were fixed last round and are good. The middle is not.

It is also written from the wrong side. "Clarify data models, user flows, and the exact admin
tooling" is what *you* do. A client wants to know what *they* get, and when.

## The idea

**Reframe from what you do to what they receive, on a timeline.**

Each stage carries a real duration and a concrete deliverable — a thing that arrives in their
inbox or their browser. That is the difference between a process diagram and a promise.

## What to build

Replace the four cards in `src/components/sections/Process.tsx` with a **horizontal timeline**
(vertical below 900px). Four stages, each with:

- a **duration badge** in mono — the honest range, not the optimistic one
- the stage name
- a **"You get:"** line — the deliverable, set apart with an accent left border
- one sentence of plain description

**Content:**

**Week 1 · Scope**
You get: a written scope, a fixed timeline, and a price.
A conversation about what the business does and what the system has to handle. Nothing starts
until you have that in writing and agree to it.

**Weeks 2–N · Build**
You get: a live preview link, from the first week.
The public side and the back office are built together. You watch it grow on a real URL and
comment as it goes, rather than waiting for a reveal.

**Launch week · Ship**
You get: your domain, live, with SSL and search metadata.
The database moves across and everything is checked on a phone before anything goes public.

**Handover · Yours**
You get: admin credentials, a walkthrough, and two weeks of fixes.
After that the system is yours to run. No retainer required, no licence that expires.

The `N` in "Weeks 2–N" is deliberate — the build is the variable part and pretending otherwise
would be a lie. If it reads awkwardly, use "Weeks 2 onward".

### Visual treatment

- A **connecting rule** running behind the four stages on desktop, with a small marker at each
  stage sitting on the line. It should read as a sequence, not four unrelated boxes.
- **Progressive reveal on scroll**: as the section enters view, the connecting rule draws left
  to right and the stages fade in in order, ~120ms apart. `scaleX` on the rule from a left
  origin. Under `prefers-reduced-motion`, everything renders complete immediately.
- **No card backgrounds or borders.** Cards are why it currently looks generic. Use the rule,
  the numerals and whitespace to do the structuring — the same move that fixed the project
  bands last round.
- The "You get:" line is the emphasis of each stage. It should be the second thing the eye
  lands on after the stage name.

### Keep

- The heading — *"From first message to running it yourself."* — as is.
- The `.statement` block with *"Most agencies deliver a static brochure."* as is.
- The desktop content indent added in round one.

## Done when

- Nothing in the section is a bordered card.
- Every stage answers "what do I get" before "what happens".
- The connecting rule reads as one continuous sequence on desktop and disappears cleanly on
  mobile where the layout is vertical.
- Reduced-motion renders the whole timeline drawn and visible with no animation.
- Reads sensibly as a list with CSS disabled.
