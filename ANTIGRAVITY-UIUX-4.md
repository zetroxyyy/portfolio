# zetroxy.me — UI/UX pass, round four

**Three parts. Run in order: A, then B, then C.** A is copy only and ships in minutes. B is the
big one. C is a bug fix.

Builds on rounds one to three, all merged.

## Ground rules (unchanged)

Do not touch `Hero.tsx` **layout** (copy changes in Part A are fine), `ProjectBand.tsx`
layout, `Footer.tsx`, or `public/images/projects/`. **No new dependencies** — animations use
inline SVG and the framer-motion already installed. `images.unoptimized: true` stays in
`next.config.ts`. No raw hex in components. Every colour defined for bare `:root`, the
`prefers-color-scheme: dark` query guarded with `:root:not([data-theme="light"])`, **and**
`:root[data-theme="dark"]`. `prefers-reduced-motion` honoured. After each part:
`npx tsc --noEmit`, `npm run lint`, `npm run build` clean, no horizontal scroll at 375px.

---

# PART A — Stop the site from under-selling what he does

## The problem

Every positioning surface narrows this developer to "Next.js web developer who builds booking
systems." That is not what he does. He has also shipped a Flutter Android app with on-device
voice input and LLM-backed generation, and a self-hosted RAG pipeline running Whisper, Ollama
and pgvector. His own GitHub bio reads *"AI Engineer & Full-Stack Developer."* The site mentions
AI zero times and mobile zero times.

**This is a copy problem, not a design problem. Change no layout in this part.**

## What to change

### `src/components/sections/Hero.tsx`

- Eyebrow: `FULL-STACK WEB DEVELOPMENT · NEPAL` → **`FULL-STACK DEVELOPMENT · NEPAL`**
  (drop "WEB" — one word doing a lot of damage)
- Proof strip: the third item is `NEXT.JS + POSTGRES`. **Remove it.** It takes an
  implementation detail and presents it as an identity, next to two items that are actually
  about outcomes. Replace with **`WEB · MOBILE · AI`**.

  Final strip: `6 PRODUCTS SHIPPED · 3 CLIENT DOMAINS · WEB · MOBILE · AI`
  If five separators reads as cluttered at 1280px, compress the last to `WEB, MOBILE & AI`.
  Update the strip's `aria-label` to match whatever you land on.

### `content/site.ts`

- `title`: `zetroxy — Full-Stack Web Developer` → **`zetroxy — Full-Stack Developer`**
- `tagline`: currently "Full-stack web developer building complete web platforms and the systems
  that run them." → rewrite to cover web, mobile and AI without listing technologies. Something
  in the register of: *"Full-stack developer building web and mobile applications, and the
  systems that run them."*
- `bio[0]`: currently "I build complete web platforms and the admin back offices that run them."
  → widen to include mobile and AI-backed features. Keep it one sentence.
- `bio[1]`: keep the proof numbers, they are the strongest sentence on the site.
- `ogDescription`: currently ends "public sites, booking engines, custom CMSs, and admin
  dashboards" → widen the same way.

### `src/app/layout.tsx`

All seven `keywords` are web/Next.js/CMS/booking. Replace roughly half with the work that is
genuinely unrepresented — Flutter, Android, mobile app development, LLM integration, RAG.
Keep "Full-stack developer" and the Nepal geo term. Update the `Person` JSON-LD `knowsAbout`
array the same way: it currently lists only web technologies.

### `src/components/sections/Work.tsx` — the side projects group

The heading is `Side Projects` with the qualifier *"Things built to solve my own problems.
Source is public — clone the repo and run them yourself."*

That sentence tells every visitor the mobile app and the AI pipeline do not count. They are the
only evidence for two thirds of the new positioning.

- Heading: `Side Projects` → **`Tools & Apps`**
- Eyebrow: `03 / TOOLS` → **`03 / BUILT INDEPENDENTLY`**
- Qualifier → name what they actually are, so the breadth is visible before anyone clicks:
  *"A Flutter Android app, a self-hosted AI pipeline, and a streaming file tool. Source is
  public — clone any of them and run it yourself."*

Keep the cards, the layout and the repo links exactly as they are. Heading and qualifier only.

## Do not

- Do not add "I can build anything" or any variation. Broad claims with no proof read as junior.
  The widening works **only** because there is a real Flutter app and a real RAG pipeline behind
  it. Keep every claim anchored to something on the page.
- Do not put "AI Engineer" in the h1. Two AI projects supports a capability claim, not a job
  title in 100px type.

## Done when

- The word "web" no longer appears in the page title, the hero eyebrow, or the tagline as the
  *only* category.
- Nothing in the hero names a framework.
- A visitor who reads only the hero and the section headings knows mobile and AI are on offer.

---

# PART B — Capabilities: replace screenshots with explanatory animations

## Why

The screenshots do not work here. Admin interfaces captured at 2400px are dense; at any size
that fits a page section they are unreadable, so they prove nothing. And four booking/CMS
screenshots reinforce exactly the narrow positioning Part A just fixed.

**Replace them with small animated diagrams that explain the mechanic.** A diagram can show what
a screenshot cannot: the thing moving.

This section is now where the breadth lives. The four tabs become the four capability areas.

## Structure — keep what works

Keep the round-three arrangement: **horizontal tab row across the top, one large stage below.**
Keep `aria-pressed`, Left/Right arrow-key navigation, first tab selected on server render, the
250ms cross-fade, and the ≤820px accordion.

**Two changes to the stage:**
- **Drop the `BrowserFrame` chrome.** These are diagrams, not screenshots — presenting a drawing
  inside browser chrome with a real URL in the address bar would imply it is a screen capture of
  that site. Use a plain stage: full content width, `aspect-ratio: 16 / 9`, 1px hairline border,
  `--radius-lg`, background `--paper`.
- Beneath the stage keep a caption line and, where one applies, a link to the project that
  proves it.

## The four tabs

### 01 · Web applications
**Caption:** The public side and the back office, wired to the same database.
**Proof link:** Dream Adventure → `/work/dream-adventure` · accent `#0D9488`

**Animation:** Two rounded panels side by side, labelled in mono — `CUSTOMER` on the left,
`ADMIN` on the right — with a database cylinder centred between and slightly below, connected by
two thin paths. A dot leaves the customer panel, travels the left path into the cylinder, the
cylinder pulses once, then a dot continues up the right path into the admin panel, where a new
row slides in. Pause 900ms, repeat.

### 02 · Mobile applications
**Caption:** Native Android apps — voice input, on-device flows, real file output.
**Proof link:** Resumiq → its GitHub repo · accent `#2563EB`

**Animation:** A phone outline, centred. Three form rows fill in sequence (a bar wipes left to
right in each). A small microphone glyph pulses beside the second row as it fills. Then a
document sheet slides up and out of the phone's top edge and settles beside it, with `PDF` in
mono on it. Pause, repeat.
This is literally what Resumiq does — form, voice, generated document.

### 03 · AI & retrieval
**Caption:** Language models wired into products — transcription, summarisation, semantic search.
**Proof link:** Reels Second Brain → its GitHub repo · accent `#D97A2B`

**Animation:** A row of four document rectangles at the top. Each collapses down into a small dot
that drops into a loose grid of ~16 dots below — the embedding space. Then a query pulse enters
from the left, ripples outward as an expanding ring, and the three dots nearest the ring light
up in the accent and rise slightly. Pause, repeat.
This is a genuine picture of what RAG does, and almost nobody draws it.

### 04 · Ship & hand over
**Caption:** Deployed on your domain, with the keys handed to you.
**Proof link:** `#work` · accent `#16A34A`

**Animation:** Three stacked rows, each a thin progress bar with a mono label — `BUILD`,
`DOMAIN + SSL`, `HANDOVER`. Each fills left to right in sequence; as each completes a small
check mark appears at its right end. On the third, a key glyph slides from the bar to a small
person-outline at the right. Pause, repeat.

## Technical spec

- One component per animation in `src/components/ui/capability-anim/`, e.g. `WebAppAnim.tsx`.
- **Inline SVG with a fixed `viewBox`** and `preserveAspectRatio`. No raster images, no canvas,
  no new packages.
- Colours come from tokens and `currentColor`. Each stage sets `--project-accent` from the tab's
  accent; the animation uses `var(--project-accent)` for the moving/highlighted elements and
  `--fog` / `--graphite` for the static structure. **Both themes must work** — test on light and
  dark; do not rely on a colour that only reads on one.
- Animate with framer-motion. Loop the sequence with `repeat: Infinity` and a `repeatDelay`.
- **Run only when the tab is selected and the section is in view** (`useInView`). An off-screen
  loop burning frames is a battery cost for nothing.
- **`prefers-reduced-motion`: render the final frame, statically.** The dot arrived, the rows are
  filled, the three nearest dots are lit. The diagram must still explain itself with nothing
  moving — this is the test of whether it is a diagram or a decoration.
- Keep each animation under roughly 6 seconds per cycle. Slower reads as calmer and more
  expensive; faster reads as a loading spinner.
- Any text inside the SVG is `aria-hidden`. Each stage carries a real `role="img"` with an
  `aria-label` describing what the diagram shows, plus the visible caption.

## Motion discipline

Restrained. These are explanatory diagrams on a developer's portfolio, not a product launch
page. No bounce, no spring overshoot, no particles, no gradients that move. Linear or
`cubic-bezier(0.16, 1, 0.3, 1)`, opacity and transform only. If a frame looks like it belongs in
a crypto advert, it is wrong.

## Done when

- All four animations run, loop, and stop when off-screen or deselected.
- With reduced motion on, all four still explain their capability as static diagrams.
- No layout shift when switching tabs — the stage box is fixed by `aspect-ratio`.
- Nothing in the section is a screenshot, and no diagram sits inside browser chrome.
- Works at 375px in the accordion; the SVGs scale without clipping.

---

# PART C — Process: the rule is striking through the badges

## The bug

The connecting rule now runs straight through the duration badges. `WEEK 1`, `WEEKS 2–N`,
`LAUNCH WEEK` and `HANDOVER` all render with a green line through the middle of the text — they
look struck through, like they have been cancelled.

Round three asked for the markers to be ringed so the rule passes behind them. The markers were
handled; the **badges** sit on the same horizontal line and were not.

## The fix

Restructure the stage header so only the marker intersects the rule:

- The rule and the markers occupy their own row. Nothing else sits at that Y.
- The badge moves to **below** the marker row, on its own line above the stage name.
- Keep the marker ring (`box-shadow: 0 0 0 4px var(--paper)`) so the rule visibly passes behind
  the dot.

If keeping the badge inline beside the marker is preferred, then the badge needs the section
background as its own background plus horizontal padding, so the rule breaks cleanly around it.
The stacked version is cleaner — prefer it.

## While you are in here

- **The green.** One accent was the right call, but `--live` green now reads as a status colour
  across the whole timeline, and green means "online" elsewhere on this site. Use a neutral —
  `--graphite` for the track, `--ink` for the filled portion and the markers. Let the numerals
  and position carry the sequence. Reserve green for the live-status dots on project bands.
- **The opacity ramp** (`55% → 100%` across the four markers) makes the first stage look
  disabled. Drop it; all four markers are equally real.
- Check the four columns at 1024–1280px. If any description still breaks to fewer than five
  words per line, move to a 2×2 grid above 900px.

## Done when

- No text has a line through it at any viewport width.
- The rule reads as continuous, passing behind the markers.
- No green in the Process section; green survives only on the project-band live dots.
- All four stage markers render at identical opacity.
