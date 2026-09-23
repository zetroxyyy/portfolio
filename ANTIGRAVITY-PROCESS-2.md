# zetroxy.me — PROCESS section, refinement pass

**Scope: the Process section only.** Two parts — layout first, then the animations.

Do not touch `Capabilities.tsx`, `capability-anim/`, or any Capabilities styles. Do not touch
`Hero.tsx`, `Work.tsx`, `ProjectBand.tsx`, `Footer.tsx`, or `public/images/projects/`.

Files in scope:
- `src/components/sections/Process.tsx`
- `src/components/ui/process-anim/{ScopeAnim,BuildAnim,ShipAnim,YoursAnim}.tsx`
- the `.process*` blocks in `src/app/globals.css`

Rules: no new dependencies. `images.unoptimized: true` stays. No raw hex in components —
tokens only. Colours defined for bare `:root`, the `prefers-color-scheme: dark` query guarded
with `:root:not([data-theme="light"])`, **and** `:root[data-theme="dark"]`.
`prefers-reduced-motion` honoured. When done: `npx tsc --noEmit`, `npm run lint`,
`npm run build` clean, no horizontal scroll at 375px.

The structure is right and the copy is right. Do not change the four stages' text, the heading,
the subhead, or the `.statement` block.

---

# PART 1 — Placement

Five concrete problems, in order of how much they cost.

## 1.1 — Drop the left/right alternation

Currently rows 1 and 3 are text-left, rows 2 and 4 are text-right. **This fights the spine.**

The spine and its marker live on the far left. On a reversed row the marker therefore sits next
to the *animation*, while the stage name it is marking is all the way across on the right. The
marker stops meaning anything, and the eye has to cross the row to connect the dot to the word.

**Make every row text-left, animation-right.** `1fr 1.38fr`, no reversal. Delete
`.process-row--reversed` and the `isReversed` logic.

Alternation is right for the project bands because there is no spine there. Here it is wrong.
Consistency also makes the four steps scan as a sequence rather than as a zigzag.

## 1.2 — The marker should be a number, not a dot

A bare 10px dot on a line reads as a bullet point. Replace it with the stage number in a
circular marker:

- A ~28px circle, 1px border in `--fog`, background `--paper`, centred on the spine.
- Inside, the stage number — `01`–`04` — in mono at `--text-xs`, colour `--ink`.
- Keep the background ring so the spine passes behind it.
- The numbers already exist in the `stages` array as `num` and are currently unused. Use them.

This restores the numbering the section lost in the rewrite, and makes the spine read as a
numbered sequence.

## 1.3 — The spine is too far from everything

`.process-stepper__spine-bg` sits at `left: 17px` while `.process-stepper` has
`padding-left: 48px`. That leaves the spine stranded ~30px away from any content, reading as an
unrelated vertical line at the edge of the section rather than as part of the steps.

Tighten the gutter so the marker clearly belongs to the row it marks: bring the spine and the
content closer together — around a 36–40px gutter total, with the marker centred on the spine
and roughly 16–20px of clear space between the marker's edge and the text column.

Re-derive the `left` and `padding-left` values together so the marker is *exactly* centred on
the spine. The current comment in the CSS does this arithmetic by hand and it is fragile —
prefer positioning the marker relative to the spine's own coordinate rather than with a
negative offset that has to be kept in sync.

## 1.4 — The stage box is too tall, so the text floats

The stage is `aspect-ratio: 16 / 10`. Next to it the text block is roughly 40% of that height,
and because the grid is `align-items: center` the text ends up marooned in the middle of a tall
row with large voids above and below it.

- **Change the stage to `aspect-ratio: 16 / 9`.** Shorter row, and closer to the height of the
  text beside it.
- Update all four SVG `viewBox` values from `0 0 600 375` to **`0 0 600 338`** to match, and
  re-lay-out the drawn content for the new canvas (see Part 2.1 — you are redrawing anyway).
- Keep `align-items: center`. Once the heights are comparable, centred is correct.

## 1.5 — Tighten the row gap

`gap: var(--space-20)` (80px) between four tall rows makes the section enormous, and the long
runs of empty spine between rows are what make it feel disconnected. Bring it to
`var(--space-16)`. The shorter stages from 1.4 will help too.

## Done when

- All four rows read text-left, animation-right.
- Every marker is a numbered circle sitting exactly centred on the spine.
- The marker is visibly closer to its own text than to anything else.
- No row has a large empty band above or below its text.
- The section is meaningfully shorter than it is now.

---

# PART 2 — Make the animations read as real software

## The problem

They are wireframes. Grey bars in rounded rectangles. `ScopeAnim` is the worst offender — a
panel with three unlabelled progress bars — but all four lean on placeholder blocks where real
content would be more convincing and no harder to draw.

`BuildAnim` is closest to right already: it has `01 / PUBLIC STOREFRONT`,
`02 / ADMIN DASHBOARD`, a `preview-build.zetroxy.dev` pill and a `SHARED DB SYNC: LIVE` status.
That is why it reads as a real thing. **Bring the other three up to that standard.**

## 2.1 — Use the whole canvas

Every animation draws its content in a small centred region of the 600-unit-wide canvas, so
each stage has big dead margins left and right. The document panel in `ScopeAnim` uses roughly
45% of the width.

Target **~88% of the canvas**, with uniform padding — about 32 units on all sides of a
600×338 viewBox. Nothing should be adrift in the middle with empty thirds either side of it.

Where content is intentionally at opposite corners (`ShipAnim`'s local build and production
node), the *path between them* must occupy the space rather than leaving an empty middle —
route it across the canvas, not around the edge.

## 2.2 — Real labels and plausible values

Schematic is fine. Anonymous is not. Every panel should carry the kind of label a real screen
would have, in mono at small size, so a reader recognises what they are looking at.

Use the real projects — they are on the same page, and specificity is what makes it land.

### ScopeAnim — needs the most work

Draw an actual specification document, not three bars:

- A document panel with a header row: `SCOPE — DREAM ADVENTURE` and a small `DRAFT` pill that
  flips to `AGREED` at the end.
- Body rows written as real line items, each with a label and a value, appearing in sequence:
  - `Booking flow` · `6 steps`
  - `Languages` · `JA / EN`
  - `Admin` · `Availability, pricing, promos`
  - `Timeline` · `6 weeks`
  - `Price` · a redacted block, not a number — do not invent a figure
- Each row gets a check mark as it lands.
- **Keep the opening beat:** three chat bubbles condensing into the document. That transition is
  the idea of the whole stage — a conversation becoming an agreement — and it should not be lost.

### BuildAnim — small additions only

It works. Add just enough to make it feel live: a blinking cursor in one storefront field, and
a small `+12 commits` or similar counter ticking up once per cycle. Nothing else.

### ShipAnim

- Label the plinth `LOCAL` and the node `VERCEL · PRODUCTION`.
- The domain pill should read a real domain — `thedreamadventure.com` — with the padlock
  snapping shut on it.
- Replace the generic file stack with three labelled blocks: `BUILD`, `DB`, `ASSETS`.
- The phone check at the end should show a miniature of the site's own hero rather than an empty
  outline — a coloured band and two text lines is enough to read as a page.

### YoursAnim

- The admin panel should look like an admin panel: a sidebar with 4–5 nav items
  (`Bookings`, `Availability`, `Pricing`, `Promos`, `Settings`), a header row, and a table with
  three rows.
- The two figures are too literal. Replace them with labelled account chips —
  `zetroxy` on the left, `Dream Adventure` on the right — and slide the key between those.
- As the key lands, the sidebar and table rows go from `--fog` to `--ink`: control transferred.
- Keep the `2 WEEKS` arc.

## 2.3 — Motion notes

Everything from the last brief still holds: one thing moving at a time, 6–8s cycles with a
1.2–2s hold on the final state, `cubic-bezier(0.16, 1, 0.3, 1)` or linear, opacity and transform
only, no spring, no bounce, nothing scaling past 1.04.

Two additions:

- **The hold is doing the work.** If any cycle currently reaches its final state and immediately
  restarts, lengthen the hold. The reader needs to see the finished diagram.
- **Stagger the four rows' cycles.** All four starting in sync makes the page feel like it is
  pulsing. Give each animation a different start offset — 0, 0.4s, 0.8s, 1.2s.

## 2.4 — Still no colour

Structure in `--fog` / `--graphite`, active and completed elements in `--ink`. No accents, and
no green — green stays reserved for live project status dots. The one permitted exception is the
tiny hero band in `ShipAnim`'s phone, which may use a muted neutral fill so it reads as an
image rather than as text.

Both themes must be checked. Anything drawn with a hard-coded colour will fail one of them.

## 2.5 — Reduced motion

Unchanged, and still the real test: render the final frame of each — the spec `AGREED` with all
rows checked, both panels filled, the domain locked and the phone verified, the key delivered
with the arc complete. Each must fully explain its stage standing still.

## Done when

- No animation has empty thirds; each fills roughly 88% of its canvas.
- Every panel in every animation carries a label a real screen would have.
- `ScopeAnim` shows an actual specification document with line items, and still opens with the
  conversation condensing into it.
- The four animations are visibly out of phase with each other.
- Reduced motion gives four complete, static, self-explanatory diagrams.
- Both themes correct; no hard-coded colours anywhere in the four components.
