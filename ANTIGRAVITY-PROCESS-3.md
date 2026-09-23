# zetroxy.me — PROCESS animations, third pass

**Scope: the four Process animations and their placement. Nothing else.**

Do not touch `Capabilities.tsx` or `capability-anim/`. Do not touch `Hero.tsx`, `Work.tsx`,
`ProjectBand.tsx`, `Footer.tsx`, or `public/images/projects/`.

Files in scope:
- `src/components/ui/process-anim/{ScopeAnim,BuildAnim,ShipAnim,YoursAnim}.tsx`
- `src/components/sections/Process.tsx` (marker alignment only)
- the `.process-row*` blocks in `src/app/globals.css`

Rules: no new dependencies. No raw hex — tokens only. Both themes correct.
`prefers-reduced-motion` honoured. When done: `npx tsc --noEmit`, `npm run lint`,
`npm run build` clean, no horizontal scroll at 375px.

**Do not change** the four stages' copy, the heading, the subhead, the `.statement` block, the
row layout, or the spine. Those are settled.

---

# 1 — Strip Dream Adventure out of all four animations

## Why this is wrong

The last pass told you to use Dream Adventure to make the animations concrete. That instruction
was a mistake and this pass reverses it.

Process is the section that explains **how working with this developer goes, for anybody**. It
is not a case study — there are six of those elsewhere on the page. Right now the animations
show `SCOPE — DREAM ADVENTURE`, `thedreamadventure.com`, a `DREAM ADVENTURE · CMS CONSOLE` with
a `Bookings / Availability / Pricing / Promos` sidebar, and a table of tour reservations with
invented customer names.

Two costs:

1. **It narrows him again.** A visitor who needs a mobile app, a storefront or an internal tool
   sees a rafting booking system and concludes this is a booking-system developer. The site
   spent a whole round widening to web, mobile and AI; this section quietly undoes it.
2. **It confuses what the section is.** A reader cannot tell whether this explains the process
   or describes one past project.

## The principle

Keep every animation exactly as **specific and detailed** as it is now — that is why they read
as real software and it must not be lost. Change only *whose* software it is.

**Generic does not mean vague.** The replacement content stays concrete; it just belongs to the
reader instead of to a past client. Where a name is needed, use the second person — `your
project`, `yourdomain.com`, `You`. That is stronger marketing anyway: the visitor sees their own
project in the frame rather than someone else's.

**Invent no people.** Remove `S. Tanaka`, `K. Miller`, `A. Dupont`. Fake customer names in a
fake table are the one detail that tips from "schematic" into "fabricated". Use neutral bars or
record references instead.

## Replacements

### ScopeAnim
- Header: `SCOPE — DREAM ADVENTURE` → **`PROJECT SCOPE`**
- Keep the `DRAFT` → `AGREED` pill.
- Replace the five line items with ones true of any engagement, and which quietly restate his
  differentiators:
  - `Scope` · `Pages, flows, admin screens`
  - `Platforms` · `Web · Mobile`
  - `Who edits it` · `Your team, no developer`
  - `Timeline` · `Agreed before work starts`
  - `Price` · redacted bar — still no invented figure
- Keep the three opening chat bubbles and the condensation into the document. Make the bubble
  contents generic scoping talk, not rafting talk.

### BuildAnim
- URL pill: `preview-build.zetroxy.dev` → **`preview.yourproject.dev`**
- `01 / PUBLIC STOREFRONT` → **`01 / PUBLIC`**; `02 / ADMIN DASHBOARD` → **`02 / ADMIN`**
- `Search tours...` → **`Search...`** (keep the blinking cursor — it is the best detail in the
  set)
- The `BOOK` button → a filled primary button with no label, or **`CONTINUE`**
- Keep `SHARED DB SYNC: LIVE` and the commit counter. Both are generic already.

### ShipAnim
- Domain pill: `thedreamadventure.com` → **`yourdomain.com`**
- Keep `LOCAL`, `BUILD` / `DB` / `ASSETS`, and the padlock.
- `VERCEL · PRODUCTION` → **`PRODUCTION`**. Naming the host is an implementation detail, and it
  dates the diagram the day he moves anything.
- The phone miniature stays a neutral page — a banner band, two text lines, one button. No
  rafting imagery.

### YoursAnim
- Header: `DREAM ADVENTURE · CMS CONSOLE` → **`YOUR ADMIN CONSOLE`**
- Sidebar: `Bookings / Availability / Pricing / Promos / Settings` →
  **`Dashboard / Content / Customers / Orders / Settings`** — generic, still plausible.
- Table: drop the invented people. Keep three rows with a `REF` column
  (`#1042`, `#1043`, `#1044`), a neutral bar where a name would be, and a status pill.
- Chips: `zetroxy · DEVELOPER` on the left stays. `Dream Adventure · OWNER` → **`You · OWNER`**.

---

# 2 — Slow them down, and never show an empty box

## The real problem is not only speed

Watching stage 01 live: for roughly the first third of its cycle **the stage is completely
blank**. Then the document appears with all rows. Then the rows vanish and only the header
remains. A reader who glances at it sees an empty bordered rectangle and moves on.

The cycle is also resetting hard — everything disappears at once and starts over, which is what
makes it feel fast and jumpy even where the individual timings are not.

## The fix — persistent structure, animated content

**The container never disappears.** Draw the document panel, the two build panels, the local and
production nodes, the admin console — all of it — as a permanent, always-visible frame at low
contrast (`--fog`). Only the *content inside* animates: rows landing, bars filling, the key
travelling, checks appearing.

At every instant of every cycle the stage must show a recognisable diagram. Nothing should ever
be blank.

At the end of a cycle, **fade the completed content back out gently** rather than cutting it —
about 600ms — then begin again. No hard resets.

## Timing

Current cycles are 6–8s. Take them to **10–13s**, distributed roughly:

- entrance and build-up: 45% of the cycle
- **hold on the completed state: 35%** — this is the part that was too short
- graceful fade-out and reset: 20%

Keep the 0 / 0.4 / 0.8 / 1.2s stagger between the four rows.

Individual element transitions should also ease off: nothing under 500ms, and sequential items
spaced at least 450ms apart so the eye can follow one thing at a time.

---

# 3 — Placement and alignment

## 3.1 — The stage marker floats above its text

The numbered marker (`01`–`04`) currently aligns with the top of the animation stage, which sits
roughly 60px above the `WEEK 1` badge it belongs to. It reads as marking the picture rather than
the step.

Align the marker's vertical centre with the **badge line** in the text column. The marker labels
the step; the step is named in the text.

## 3.2 — Internal padding is inconsistent between the four

Set one internal margin and hold all four to it: **32 units on every side of the 600×338
viewBox**, with nothing drawn outside it. Right now the four differ, which is why they do not
feel like a set.

## 3.3 — ShipAnim wastes its middle

The local plinth sits bottom-left and the production node top-right, connected by a wide arc
that curves around the outside of the canvas. The centre is empty and the two objects are small
and far apart.

Bring them closer to the horizontal centre line, make both objects larger, and run the travel
path more directly between them. The phone check should sit in the lower right **inside** the
margin, not crowding the edge.

## 3.4 — Check for clipping

The stage has `overflow: hidden`. Verify at 1280px, 1440px and 1920px that no label, pill or
chip is being cut by the stage edge — particularly the commit pill in `BuildAnim` and the owner
chip in `YoursAnim`, both of which sit close to the right boundary.

## 3.5 — Type inside the animations

- Mono for every label, one size throughout (roughly 9–10 units on the 600-wide canvas), one
  letter-spacing. Two different label sizes inside one diagram reads as sloppy.
- Labels align to the element they describe — left edges flush, baselines consistent.
- Nothing set so small it turns to mush at the rendered size. If a label is not readable at the
  real display width, remove it rather than shrinking it.

---

# Done when

- Neither "Dream Adventure", `thedreamadventure.com`, nor any invented person appears anywhere
  in the four animation components. Grep to confirm.
- Every stage shows a recognisable diagram at every moment of its cycle — no blank frames.
- Cycles run 10–13s with a long hold and a soft fade-out.
- All four use identical internal margins and one label size.
- Each marker sits level with its own badge line.
- Nothing is clipped at 1280 / 1440 / 1920px.
- Reduced motion still renders four complete, static, self-explanatory diagrams.
