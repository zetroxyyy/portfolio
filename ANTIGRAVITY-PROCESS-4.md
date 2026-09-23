# zetroxy.me — PROCESS animations, layout specification

**Scope: the four files in `src/components/ui/process-anim/`. Nothing else.**

Do not touch any other component, section or stylesheet. Do not change the Process copy, the row
layout, the spine, or the markers.

Rules: no new dependencies. No raw hex — tokens only. Both themes correct.
`prefers-reduced-motion` renders the final frame statically. When done: `npx tsc --noEmit`,
`npm run lint`, `npm run build` clean.

---

## Read this first — why this brief is different

The previous three briefs described these compositions in prose. That was the wrong way to
specify a drawing: it left you to invent exact coordinates for thirty-plus elements per canvas
with no way to see the result, so each pass fixed some overlaps and introduced others.

**This brief gives coordinates.** Treat the tables below as the specification. Place elements at
the stated positions. Do not re-compose, do not "improve" the arrangement, do not shift things to
balance them by eye. If a value looks wrong, implement it as written and say so afterwards.

Shared canvas for all four: **`viewBox="0 0 600 338"`**.
Content bounds: **x 32 → 568**, **y 32 → 306**. Nothing is drawn outside those bounds.

Shared type rules:
- One font: `var(--font-mono)`. One size: **9**. One tracking: `0.04em`. No exceptions, no
  second size anywhere in any of the four files.
- Values and data labels may go to **10** and `--ink` for emphasis. That is the only permitted
  second size, and only for row values.
- Every text element gets `dominant-baseline="middle"` and is positioned by the vertical centre
  of its row, not by its baseline. Baseline positioning is where most of the current misalignment
  comes from.
- Minimum 12 units of clear space between any text element and any other element.

Shared colour rules:
- Panel borders and structure: `var(--fog)`
- Secondary text and labels: `var(--graphite)`
- Active, completed and emphasised: `var(--ink)`
- Panel fills: `var(--paper)`; recessed fills `var(--paper-2)`
- No accents. No green. No white fills.

---

# Current bugs to fix (observed live at 1100px)

1. **`preview.yourproject.dev` is an invented domain.** It should be **`preview.zetroxy.me`** —
   the preview runs on his infrastructure, so this is both real and client-agnostic.
2. **`Web · Mobile` renders as `Web - Mobile`.** The middle dot has been replaced with a hyphen.
   Use the actual character `·` (U+00B7).
3. **The `Price` redaction is a bright near-white bar**, which makes the one hidden value the
   loudest thing on the panel. It must be a recessed dark bar.
4. **`YoursAnim`: the key glyph overlaps the `You · OWNER` chip.** The travel track ends inside
   the chip instead of before it.
5. **`YoursAnim`: the `2 WEEKS / WARRANTY` badge is a ~30-unit circle holding two lines of text.**
   The text is crushed and unreadable. The circle must be large enough, or the label moves out.
6. **`ShipAnim` has an empty left half.** `LOCAL` sits isolated bottom-left, `PRODUCTION` top
   right, the phone centre-right, and the middle-left of the canvas is dead space. The
   `BUILD` / `DB` / `ASSETS` blocks are not visible at all.
7. **Timing is still too quick.** Take every cycle to **14 seconds**.

---

# Layout: ScopeAnim

Closest to correct already. Reposition to these values and fix bugs 2 and 3.

| Element | x | y | w | h | Notes |
|---|---|---|---|---|---|
| Document panel | 32 | 32 | 536 | 274 | 1px `--fog` border, radius 6, fill `--paper` |
| Header divider | 32 | 74 | 536 | 1 | `--fog` |
| `PROJECT SCOPE` | 52 | 53 | — | — | centre-aligned vertically on y=53 |
| Status pill | 470 | 41 | 78 | 24 | radius 12; `DRAFT` → `AGREED` |
| Row 1 | 32 | 74 | 536 | 46 | centre y = 97 |
| Row 2 | 32 | 120 | 536 | 46 | centre y = 143 |
| Row 3 | 32 | 166 | 536 | 46 | centre y = 189 |
| Row 4 | 32 | 212 | 536 | 46 | centre y = 235 |
| Row 5 | 32 | 258 | 536 | 46 | centre y = 281 |

Within every row:
- label at **x = 52**, `--graphite`, size 9
- value at **x = 190**, `--ink`, size 10
- check mark centred at **x = 534**, 12×12
- 1px `--fog` divider at the row's bottom edge, except the last row

Content:

| Label | Value |
|---|---|
| `Scope` | `Pages, flows, admin screens` |
| `Platforms` | `Web · Mobile` |
| `Who edits it` | `Your team, no developer` |
| `Timeline` | `Agreed before work starts` |
| `Price` | redacted bar: x 190, w 96, h 12, fill `--paper-2`, 1px `--fog` border |

The three opening chat bubbles animate **inside the panel body** (y 74 → 306) and condense into
the rows. They must not extend past the panel border.

---

# Layout: BuildAnim

| Element | x | y | w | h | Notes |
|---|---|---|---|---|---|
| URL pill | 32 | 32 | 200 | 26 | radius 13; dot at x 46; text at x 60 |
| Commits pill | 428 | 32 | 140 | 26 | radius 13; text centred |
| Left panel | 32 | 72 | 258 | 234 | `01 / PUBLIC` |
| Right panel | 310 | 72 | 258 | 234 | `02 / ADMIN` |

Both panels: 1px `--fog`, radius 6, fill `--paper`. Panel title at **x = panel.x + 16**,
centre **y = 90**. Divider 1px `--fog` at **y = 106**, full panel width.

Left panel body (starts y 118):
- Search field: x 48, y 118, w 226, h 24 — text `Search...` at x 60, blinking caret after it
- Two content cards: x 48 and x 166, y 154, w 108, h 62
- Bottom bar: x 48, y 264, w 226, h 26; `CONTINUE` button right-aligned inside it,
  w 76, h 20, at x 190

Right panel body (starts y 118):
- Three table rows at y 118, 152, 186 — each x 326, w 226, h 26
- Status line at x 326, **y 272**, with a dot at x 326 and `SHARED DB SYNC: LIVE` at x 340

URL text: **`preview.zetroxy.me`**. Commits: `+12 commits` → `+14 commits · main`.

---

# Layout: ShipAnim — full recomposition

The current arrangement is the main failure. Rebuild to a left-to-right flow across the
horizontal centre.

| Element | x | y | w | h | Notes |
|---|---|---|---|---|---|
| `LOCAL` panel | 32 | 104 | 150 | 130 | label centred at y 122 |
| — `BUILD` block | 48 | 142 | 118 | 24 | |
| — `DB` block | 48 | 172 | 118 | 24 | |
| — `ASSETS` block | 48 | 202 | 118 | 24 | |
| Travel path | 182 → 330 | 169 → 120 | — | — | gentle curve, roughly horizontal |
| `PRODUCTION` panel | 330 | 72 | 238 | 96 | label centred at y 90 |
| — domain pill | 346 | 112 | 206 | 28 | padlock at x 358, `yourdomain.com` at x 376 |
| Phone | 330 | 190 | 96 | 116 | radius 10 |
| — screen content | 340 | 202 | 76 | 92 | banner band, two lines, one button |
| `VERIFIED` label | 442 | — | — | — | centre y 248, left-aligned |

The three blocks travel along the path one after another and land inside the `PRODUCTION` panel.
The padlock snaps shut on the domain pill once all three have arrived. The phone check runs last.

Keep the node label as **`PRODUCTION`** — do not name a hosting provider.

---

# Layout: YoursAnim

| Element | x | y | w | h | Notes |
|---|---|---|---|---|---|
| Console panel | 32 | 32 | 536 | 186 | radius 6, 1px `--fog` |
| — window dots | 48 | 46 | — | — | three 5-unit dots, 8 apart |
| — `YOUR ADMIN CONSOLE` | 84 | — | — | — | centre y 48 |
| — access pill | 462 | 38 | 90 | 22 | `READ ONLY` → `OWNER ACCESS` |
| — header divider | 32 | 66 | 536 | 1 | |
| — sidebar | 32 | 66 | 116 | 152 | 5 items, 26 apart, first centre y 84 |
| — sidebar divider | 148 | 66 | 1 | 152 | vertical |
| — table header | 164 | — | — | — | centre y 84: `REF` x 164, `RECORD` x 236, `STATUS` x 470 |
| — table rows | 164 | — | — | — | centres y 116, 150, 184 |
| Chip: developer | 32 | 250 | 152 | 40 | radius 20 |
| Travel track | 196 | 270 | 118 | 1 | dashed |
| Chip: owner | 326 | 250 | 132 | 40 | radius 20 |
| Warranty badge | 484 | 238 | 64 | 64 | circle, centre (516, 270) |

**Fixing the two overlaps:**

- The key travels along the track from **x 196 to x 314** and stops there — **18 units before**
  the owner chip's left edge at x 326. It must never enter the chip.
- The warranty badge circle is **64 units** across, not 30. Inside it, `2 WEEKS` on one line at
  centre y 264 and `WARRANTY` at centre y 278, both size 9, both centred on x 516. The progress
  arc is drawn on the circle's own radius, outside the text.

Chip contents: left `zetroxy` / `DEVELOPER`, right `You` / `OWNER`. Name on the first line at
size 10 `--ink`, role beneath at size 9 `--graphite`. Avatar circle 24 units at chip.x + 12.

Table rows: `#1042`, `#1043`, `#1044` in the `REF` column, a `--paper-2` bar in `RECORD`
(x 236, w 180, h 10), and a status pill in `STATUS` (x 470, w 62, h 18) reading `ACTIVE`,
`ACTIVE`, `PENDING`.

As the key docks, sidebar items and table rows go `--fog` → `--ink` and the access pill flips.

---

# Timing — 14 second cycles

Same shape for all four:

| Phase | Duration | What happens |
|---|---|---|
| Structure | 0s | Panels, borders, labels, dividers — **always visible, never animated in** |
| Build-up | 0 → 6.0s | Content lands in sequence, minimum 600ms between items |
| Hold | 6.0 → 11.5s | Completed state, fully still for 5.5 seconds |
| Fade | 11.5 → 12.3s | Animated content fades to 0 over 800ms; structure stays |
| Rest | 12.3 → 14.0s | Structure only, 1.7s pause |

- Every individual transition is at least **600ms**.
- Nothing moves during the hold. No pulsing, no blinking, no drift. The one exception is the
  search caret in `BuildAnim`, which may continue blinking.
- Row stagger stays: 0s, 0.4s, 0.8s, 1.2s.

---

# Done when

- Every element sits at its specified coordinate.
- Nothing overlaps anything. Check `YoursAnim` specifically: the key stops before the chip, and
  the warranty text sits inside its circle with clear space.
- One font size throughout, with row values the only exception.
- `preview.zetroxy.me` appears; `yourproject.dev` does not.
- `Web · Mobile` uses a middle dot.
- The `Price` redaction is a dark recessed bar.
- `ShipAnim` has content across its full width with no dead left half.
- Cycles run 14s with a still 5.5s hold.
- Structure is visible at every instant, including during the rest phase.
- Reduced motion shows four complete, static diagrams.
