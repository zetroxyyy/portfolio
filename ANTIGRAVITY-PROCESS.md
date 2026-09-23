# zetroxy.me — PROCESS section only

**Scope: the Process section and nothing else.**

Do not touch `Capabilities.tsx`, the `capability-anim/` components, or any Capabilities styles.
Do not touch `Hero.tsx`, `Work.tsx`, `ProjectBand.tsx`, `Footer.tsx`, or
`public/images/projects/`. That section is being handled separately and changes there will
collide.

Files in scope:
- `src/components/sections/Process.tsx`
- new: `src/components/ui/process-anim/*.tsx`
- the `.process*`, `.timeline*` and `.statement*` blocks in `src/app/globals.css`

Rules: no new dependencies — inline SVG plus the framer-motion already installed.
`images.unoptimized: true` stays in `next.config.ts`. No raw hex in components; colours come
from tokens. Every colour defined for bare `:root`, the `prefers-color-scheme: dark` query
guarded with `:root:not([data-theme="light"])`, **and** `:root[data-theme="dark"]`.
`prefers-reduced-motion` honoured. When done: `npx tsc --noEmit`, `npm run lint`,
`npm run build` clean, no horizontal scroll at 375px.

---

## Where it stands

The bugs from the last round are fixed — no strikethrough, no green, uniform markers. It is
tidy. It is also completely inert: four columns of small text that explain the stages in words
and show nothing.

Two problems to solve together:

1. **Nothing is explained visually.** Each stage needs an animation showing how that stage
   actually works.
2. **Four columns cannot hold an animation.** At 1280px each column is roughly 170px wide. A
   diagram in that space is illegible — the same mistake that made the Capabilities screenshots
   fail. The layout has to change to make room.

---

## The new layout — turn the timeline vertical

Replace the four-column horizontal timeline with a **vertical stepper**. Four full-width rows,
one per stage, stacked. This gives each animation roughly 500px of width instead of 170px, and
it reads top-to-bottom as a sequence without needing a connecting rule to imply one.

Per row, a two-column grid:

- **Text column** (~42%): duration badge, stage name, the `You get:` block, the description.
  Same content as now — the copy is good, keep all four stages' text exactly as written.
- **Animation column** (~58%): the stage's animated diagram on a plain stage — 1px hairline
  border, `--radius-lg`, background `--paper`, `aspect-ratio: 16 / 10`.

**Alternate the sides**: stage 01 text-left, 02 text-right, 03 text-left, 04 text-right. This
is the rhythm the project bands already use, so it will feel native rather than invented.

**The spine.** A 2px vertical rule running down the left edge of the section, behind the stage
markers, connecting all four. Each stage's marker sits on it with a
`box-shadow: 0 0 0 4px var(--paper)` ring so the rule passes behind it. As the section scrolls
into view, the rule draws downward (`scaleY` from `transformOrigin: top`) — one continuous
gesture tying the four stages together. Under reduced motion it renders fully drawn.

**Do not** put a background fill or border on the text column. The stage panel is the only
bordered element in each row. Keep the `You get:` accent left border; it has no background.

**Below 900px:** single column. Text first, then the animation beneath it. The spine stays on
the left. No alternation.

**Keep unchanged:** the heading (*"From first message to running it yourself."*), the subhead,
and the `.statement` block with *"Most agencies deliver a static brochure."* at the end.

---

## The four animations

One component each, in `src/components/ui/process-anim/`. **Follow the exact pattern already
established in `src/components/ui/capability-anim/`** — same SVG approach, same
`useInView` gating, same reduced-motion handling. Consistency with what is already working
matters more than novelty here.

Each animation explains the *mechanic* of its stage. Not a decorative loop — a diagram that
makes the stage understandable without reading the paragraph beside it.

### 01 · Scope — a conversation becomes an agreement

Three chat bubbles appear in sequence, alternating left and right, as if a conversation. They
hold for a beat, then **condense downward** into a document panel — the bubbles shrink and fade
as the document grows from them. Inside the document, three structured rows write themselves in
left to right, each labelled in mono: `SCOPE`, `TIMELINE`, `PRICE`. A check mark ticks at the
right of each as it completes. Hold on the finished document, then repeat.

The idea: talk in, signed specification out. Nothing starts before that document exists.

### 02 · Build — both sides built at once, on a live URL

A preview URL pill sits at the top, in mono. Beneath it, two panels side by side, labelled
`PUBLIC` and `ADMIN`. Content blocks fill into them **alternately** — one into public, one into
admin, back and forth — so the eye reads them as being built together rather than in sequence.

Partway through, a small comment marker appears on the public panel; a beat later one of its
blocks changes shape, as though the note was acted on. Hold, repeat.

The idea: the customer side and the back office are the same job, and the client watches it
happen on a real link.

### 03 · Ship — deploy, domain, checked on a phone

A small stack of three file blocks sits at the bottom left on a `LOCAL` plinth. The stack lifts
and travels along a curved path up to a rounded node at the top right. A domain pill fades in
beneath the node, in mono, and a padlock glyph snaps shut on its left edge. Then a phone outline
slides in beside it and a check mark ticks inside it. Hold, repeat.

The idea: the build moves to production, the domain and certificate are handled, and it is
verified on a phone before anyone sees it.

### 04 · Yours — the keys change hands

An admin panel outline sits centred, with a few placeholder rows. A key glyph rests beside a
simple figure on the left. The key **slides across** to a second figure on the right; as it
arrives, the panel's rows brighten to full contrast — control has transferred. The left figure
fades to `--fog` and steps back slightly. A `2 WEEKS` badge then fades in beneath with a thin
arc that sweeps to completion around it. Hold, repeat.

The idea: full access is handed over, the developer steps out, and the warranty window is
finite and stated.

---

## Motion discipline — this is the part to get right

The request was **clean and smooth**. That means restrained and slow, not busy.

- **One thing moves at a time.** If two elements animate simultaneously they should be doing the
  same thing (the alternating block fills in stage 02 are one gesture, not two).
- **Timing:** each full cycle 6–8 seconds, with a 1.2–2s hold on the final state before it
  repeats. The hold is important — it is what makes the diagram readable rather than a loop you
  watch without absorbing.
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` for entrances, linear for anything travelling a
  path. No spring, no bounce, no overshoot.
- **Opacity and transform only.** No animated filters, no moving gradients, no glow, no blur.
- **Colour:** structure in `--fog` / `--graphite`, the active or completed element in `--ink`.
  **No accent colours in this section** — the neutral treatment was a deliberate fix last round
  and green in particular is reserved for live project status. Both themes must read correctly.
- Nothing scales more than about 1.04, nothing travels more than about 40% of the stage width.
- **Each animation runs only when its own row is in view.** Four loops running off-screen is
  wasted battery. Use `useInView` per row, not one flag for the section.

**Reduced motion:** render the final frame of each — document complete with three checks, both
panels filled, domain locked and phone checked, key delivered with the badge complete. The
diagram must fully explain its stage with nothing moving. That is the test of whether these are
diagrams or decoration.

---

## Accessibility

- Keep the semantic `<ol>` / `<li>` structure. The stages are an ordered sequence.
- Each animation stage gets `role="img"` and an `aria-label` describing what it shows — e.g.
  *"A conversation condensing into a written scope, timeline and price, each marked complete."*
- All text inside the SVGs is `aria-hidden`; the mono labels are decorative, and the real
  content is the visible copy beside them.
- The animations are presentational: nothing in them is the only source of any information.

---

## Done when

- Four full-width rows, alternating sides, each with a legible animation.
- Each animation explains its stage without the paragraph beside it.
- The spine draws once on entry and visibly passes behind all four markers.
- No accent colour and no green anywhere in the section.
- Reduced motion shows four complete, static, self-explanatory diagrams.
- At 375px each row stacks, the animations scale without clipping, and no row overflows.
- Nothing outside the files listed at the top has been modified.
