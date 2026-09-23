# zetroxy.me — PROCESS section, rebuild

**Scope: the Process section and its four animations. Nothing else.**

Do not touch `Capabilities.tsx` or `capability-anim/` — that section is being redesigned
separately and must end up looking nothing like this one. Do not touch `Hero.tsx`, `Work.tsx`,
`ProjectBand.tsx`, `Footer.tsx`.

Files in scope:
- `src/components/sections/Process.tsx`
- `src/components/ui/process-anim/{ScopeAnim,BuildAnim,ShipAnim,YoursAnim}.tsx` — **rewrite all
  four from scratch**
- the `.process*` blocks in `src/app/globals.css`

Rules: no new dependencies. No raw hex — tokens only. Both themes correct.
`prefers-reduced-motion` renders the final frame statically. When done: `npx tsc --noEmit`,
`npm run lint`, `npm run build` clean, no horizontal scroll at 375px.

---

## What is wrong now

The four animations are elaborate fake software — a five-row spec table, a two-panel IDE mock, a
deployment topology, an admin console with a sidebar and a data table. Thirty-plus elements each.

That complexity is the cause of every remaining problem: elements collide, phases overlap, the
canvases are crowded, and a visitor cannot tell what any of them is showing.

**Delete all four and rebuild them simple.** This is not a refinement pass.

### The rule for the rebuild

Each animation shows **the literal activity its step is named after**. One idea. Nothing else.

| Step | What actually happens | So the animation shows |
|---|---|---|
| **Scope** | We discuss the project with the client | A conversation, ending in an agreed document |
| **Build** | We write the code | Code being typed in an editor |
| **Ship** | The preview domain becomes the real domain, and everything is verified | An address bar changing, then checks passing |
| **Yours** | We hand over admin access, documentation and a walkthrough | Three things being handed across to the client |

**Hard limit: no animation may contain more than 10 drawn elements.** If a composition needs an
eleventh, the idea is too complicated — cut it. A visitor should understand each one within two
seconds, without reading the paragraph beside it.

No fake tables. No fake sidebars. No fake catalogue cards. No invented UI that is not the point
of the step.

---

# PART 1 — Section layout

The vertical stepper is too tall, the spine does almost nothing, and a narrow text column beside
a wide animation is unbalanced.

**Replace it with a 2 × 2 grid.**

- Four cells: `01` and `02` on the first row, `03` and `04` on the second.
- `gap: var(--space-12)` between cells both ways.
- Each cell, top to bottom:
  1. **Animation stage** — full cell width, `aspect-ratio: 16 / 9`, 1px `--fog` border,
     `--radius-lg`, background `--paper`
  2. **Meta line** — the number and the duration together in mono, e.g. `01 · WEEK 1`,
     `--mist`, `--text-xs`
  3. **Stage name** — `--text-lg`, `--ink`
  4. **`You get:`** block — keep exactly as it is now, accent left border, no background
  5. **Description** — `--text-sm`, `--graphite`
- **Delete the spine entirely** (`.process-stepper__spine-bg`, `.process-stepper__spine-fill`,
  and the numbered marker circles). In a 2 × 2 grid the numbers in the meta line carry the
  sequence, and a spine that only connects two of four cells is worse than none.
- Below 900px: single column, four cells stacked, same internal order.

This halves the section height, gives every animation roughly 560px of width at 1280px, and
gives the text a comfortable measure instead of a narrow strip.

Keep the heading, the subhead and the `.statement` block exactly as they are.

---

# PART 2 — The four animations

Shared canvas: **`viewBox="0 0 560 315"`** (16:9). Content bounds **x 28 → 532**, **y 28 → 287**.

Shared rules:
- One font: `var(--font-mono)`. One size: **11**. One tracking: `0.04em`. No second size.
- Text positioned with `dominant-baseline="middle"` on a stated centre-y, never by baseline.
- Structure (frames, borders, rails) is **drawn at all times and never animated in**.
- Colours: structure `--fog`, secondary text `--graphite`, active/complete `--ink`, fills
  `--paper` and `--paper-2`. No accents, no green, no white fills.
- Minimum 16 units of clear space between any two elements.

---

## 01 · ScopeAnim — a conversation becomes an agreement

**Elements: 7.** A rail, four message bubbles, a document, a check.

| Element | x | y | w | h |
|---|---|---|---|---|
| Bubble 1 (client, left) | 28 | 40 | 240 | 40 |
| Bubble 2 (you, right) | 292 | 92 | 240 | 40 |
| Bubble 3 (client, left) | 28 | 144 | 240 | 40 |
| Bubble 4 (you, right) | 292 | 196 | 240 | 40 |
| Agreement bar | 28 | 252 | 504 | 44 |

- Bubbles: `--radius` 8, 1px `--fog`, fill `--paper-2`. Client bubbles left-aligned with a
  squared bottom-left corner; yours right-aligned with a squared bottom-right corner. One line
  of text each, at bubble centre, inset 16 from the bubble's own leading edge.
- Text — short, generic, recognisably a scoping conversation:
  1. `What should it do?`
  2. `Bookings, and an admin panel.`
  3. `Who updates the content?`
  4. `Your team. No developer needed.`
- Agreement bar: 1px `--fog`, fill `--paper`. Left: `SCOPE AGREED` at x 48. Right: a 16×16 check
  centred at x 508. It appears only after all four bubbles have landed.

**Sequence:** bubbles appear one at a time, 900ms apart, each fading up and rising 8 units. Then
the agreement bar fades in and the check draws.

---

## 02 · BuildAnim — code being written

**Elements: 9.** An editor frame, a filename tab, a gutter rule, five code lines, a caret.

| Element | x | y | w | h |
|---|---|---|---|---|
| Editor frame | 28 | 28 | 504 | 259 |
| Tab bar divider | 28 | 64 | 504 | 1 |
| Gutter divider | 76 | 64 | 1 | 223 |
| Code line 1 | 96 | — | up to 300 | 8 |
| Code line 2 | 112 | — | up to 260 | 8 |
| Code line 3 | 112 | — | up to 330 | 8 |
| Code line 4 | 96 | — | up to 220 | 8 |
| Code line 5 | 96 | — | up to 290 | 8 |

- Filename at x 48, centre y 46: `booking.ts` — generic enough for any project.
- Line numbers `1`–`5` right-aligned at x 64, at the same centre-y as their line.
- Code line centre-y values: 96, 128, 160, 192, 224. Indentation is carried by the differing
  x values above — that is what makes it read as code rather than as bars.
- Each line is a rounded bar, `--graphite`, that **types in** — animate its width from 0 to its
  final value over 700ms, left to right.
- A 2-unit-wide caret in `--ink` sits at the growing end of the current line and moves with it.
  After the last line it blinks at the end of line 5.

That is the whole thing. No panels, no preview URL, no commit counter, no second column.

---

## 03 · ShipAnim — the preview domain becomes the real one

**Elements: 8.** An address bar, a padlock, two domain labels, three check rows.

| Element | x | y | w | h |
|---|---|---|---|---|
| Address bar | 28 | 48 | 504 | 52 |
| Padlock | 52 | 62 | 18 | 24 |
| Domain text | 88 | — | — | — |
| Check row 1 | 28 | 148 | 504 | 40 |
| Check row 2 | 28 | 196 | 504 | 40 |
| Check row 3 | 28 | 244 | 504 | 40 |

- Address bar: radius 26, 1px `--fog`, fill `--paper-2`.
- Domain text at centre y 74, size 11, `--ink`.
- **The one move that matters:** the text reads `preview.zetroxy.me`, then it fades out and
  `yourdomain.com` fades in to replace it. **The old text must reach opacity 0 before the new
  text starts fading in** — 400ms out, 200ms gap, 400ms in. Never cross-fade them; overlapping
  text is unreadable and is one of the current bugs.
- The padlock is drawn open (shackle offset up-left) and closes when the domain changes.
- Check rows: label at x 48, a 16×16 check centred at x 508, 1px `--fog` divider at the bottom of
  rows 1 and 2. Labels: `SSL certificate`, `Search metadata`, `Mobile verified`. Each check draws
  700ms after the previous.

---

## 04 · YoursAnim — everything handed across

**Elements: 9.** Two endpoint labels, a rail, three item cards, three check marks.

| Element | x | y | w | h |
|---|---|---|---|---|
| `zetroxy` label | 28 | — | — | — |
| `You` label | — | — | — | — |
| Rail | 28 | 76 | 504 | 1 |
| Card 1 | — | 104 | 160 | 52 |
| Card 2 | — | 172 | 160 | 52 |
| Card 3 | — | 240 | 160 | 52 |

- `zetroxy` at x 28, centre y 52, `--graphite`. `You` right-aligned ending at x 532, same
  centre-y, `--ink`. A 1px `--fog` rail spans between them at y 76.
- Three cards, each 160 × 52, radius 8, 1px `--fog`, fill `--paper-2`, with a label centred
  inside at size 11:
  1. `Admin access`
  2. `Documentation`
  3. `Walkthrough`
- Each card **starts at x 28** (under `zetroxy`) and **travels to x 372** (under `You`), one at a
  time, 1.1s each, 400ms apart. A 14×14 check appears at x 504 on that card's row once it lands.
- **Cards must not overlap each other.** They are on separate rows 68 units apart and each
  travels only horizontally. No card moves until the previous one has arrived.

---

# PART 3 — Timing, and the overlap bug

Phases currently overlap — content from one part is still fading out while the next part fades
in, so elements sit on top of each other mid-cycle. Fix it by making the phases strictly
sequential.

**Cycle: 14 seconds, identical for all four.**

| Phase | Window | What happens |
|---|---|---|
| Structure | always | Frames, rails, dividers, labels — visible at all times, never animated |
| Build-up | 0 → 7.0s | Content appears in sequence |
| Hold | 7.0 → 11.5s | Completed state, **entirely still** for 4.5s |
| Fade out | 11.5 → 12.4s | All animated content fades to 0 together, 900ms |
| Rest | 12.4 → 14.0s | Structure only |

**The non-overlap rules — these are the fix for complaint 3:**

1. **No two animated elements may transition at the same time.** Each element's transition ends
   before the next begins. Sequential, not staggered-overlapping.
2. **When one element replaces another** (the domain text in ShipAnim), the outgoing element must
   reach opacity 0 before the incoming one leaves 0. Leave a 200ms gap between them.
3. **Nothing moves during the hold.** No pulsing, no drift. The only exception is the caret in
   BuildAnim.
4. Minimum transition duration 600ms; minimum gap between sequential items 300ms.

Keep the per-cell stagger so the four do not pulse in unison: 0s, 0.5s, 1.0s, 1.5s.

---

# Done when

- Every animation has **10 or fewer drawn elements**. Count them.
- Each one shows the literal activity in its step's name — a conversation, code being typed, a
  domain changing, things being handed over.
- Nothing overlaps anything, at any moment of any cycle.
- The section is a 2 × 2 grid with no spine and no marker circles.
- One font size across all four animations.
- `preview.zetroxy.me` appears in ShipAnim; no invented domain anywhere.
- Cycles run 14s with a completely still 4.5s hold.
- Reduced motion shows four complete, static, readable diagrams.
- Nothing outside the listed files has been modified.
