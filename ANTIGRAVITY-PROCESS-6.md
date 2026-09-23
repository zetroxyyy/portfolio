# zetroxy.me — PROCESS section, final pass

**Scope: the Process section only.** Copy alignment, de-narrowing, and three small animation
additions. The layout, timing and structure are right — do not change them.

Do not touch `Capabilities.tsx` or `capability-anim/`. Do not touch `Hero.tsx`, `Work.tsx`,
`ProjectBand.tsx`, `Footer.tsx`.

Files in scope:
- `src/components/sections/Process.tsx`
- `src/components/ui/process-anim/{ScopeAnim,BuildAnim,YoursAnim}.tsx`
  (`ShipAnim` needs no changes)
- `.process*` in `src/app/globals.css` only if a new element needs a style

Rules unchanged: no new dependencies, tokens only, both themes, reduced motion renders the final
frame, `npx tsc --noEmit` / `npm run lint` / `npm run build` clean.

**Keep exactly as they are:** the 2 × 2 grid, the 14s cycle with the 4.5s still hold, the
sequential no-overlap rules, the element budget, the one-font-one-size rule, the heading.

---

# PART 1 — The text and the animation must say the same thing

The copy was written for an earlier, more elaborate set of animations and was never updated when
they were simplified. Every cell now promises something the picture does not show.

| Step | Copy promises | Animation shows | Fix |
|---|---|---|---|
| Scope | scope, **timeline, price** | a conversation → `SCOPE AGREED` | add timeline and price to the bar |
| Build | **a live preview link** | code being typed | add the preview link to the editor |
| Ship | **database migration** | domain change, SSL, metadata, mobile | fix the copy |
| Yours | access, walkthrough, **two weeks of fixes** | access, documentation, walkthrough | fix the copy |

## 1.1 — ScopeAnim: the agreement bar carries all three

The bar currently reads `SCOPE AGREED`. Change the label to **`SCOPE · TIMELINE · PRICE`**, still
at x 48, with the same single check at x 508.

One text element changed. Now the picture and the `You get:` line promise the same three things.

## 1.2 — BuildAnim: put the preview link in the editor

The preview link is one of the strongest promises in the section and it is currently invisible.

Add a single pill to the tab bar, right-aligned: **x 372, y 36, w 160, h 22**, radius 11, 1px
`--fog`, fill `--paper-2`, containing `preview.zetroxy.me` at size 11, `--graphite`, centred.

It is **structure** — visible at all times, never animated in. That is one element added; the
budget still holds.

## 1.3 — Copy rewrites

Rewrite these four `desc` values and two `deliverable` values so each describes what its own
animation shows, and so none of them narrows the work to booking systems or admin panels.

**01 · Scope**
- `deliverable`: `a written scope, a fixed timeline, and a price.` — unchanged, now matches the bar
- `desc`: → **`A conversation about what the system has to do, written down and agreed before any code exists.`**

**02 · Build**
- `deliverable`: → **`a preview link you can open from the first week.`**
- `desc`: → **`Front-end and back-end written together, on a link you can check any time — not a reveal at the end.`**

**03 · Ship**
- `deliverable`: `your domain, live, with SSL and search metadata.` — unchanged, already matches
- `desc`: → **`The preview link becomes your own domain, with the certificate, search metadata and mobile checks done before it opens.`**

**04 · Yours**
- `deliverable`: → **`admin access, documentation, and a walkthrough.`**
- `desc`: → **`Everything handed across, with the docs to use it. Two weeks of fixes included, then it runs without me.`**

Note the two-weeks promise moves into the description, where it does not need a picture. Do not
add a fourth card to `YoursAnim`.

Update each `ariaLabel` to match its revised animation.

---

# PART 2 — Stop the section reading as booking-and-admin only

This developer builds web applications, mobile applications and AI-backed systems. The Process
section currently sounds like he builds booking sites with admin panels, and that impression
comes from five specific strings.

| Where | Currently | Change to |
|---|---|---|
| `ScopeAnim` bubble 2 | `Bookings, and an admin panel.` | see §3 — the whole conversation is rewritten |
| `BuildAnim` filename | `booking.ts` | **`app.tsx`** |
| Section subhead | `Every build includes the admin tooling needed to operate without ongoing developer friction.` | **`The same four steps whether it's a website, a mobile app, or the system running behind both.`** |
| `.statement__sub` | `Every system here includes a custom admin back office so non-technical staff can update prices, dates, media, and copy autonomously.` | **`Everything I build ships with the tools to run it, so your team can change what needs changing without calling a developer.`** |

Keep the `.statement` line — *"Most agencies deliver a static brochure."* — exactly as it is. It
is the sharpest sentence in the section and it earns its place.

The new subhead is doing real work: it is the one line that tells a visitor this process applies
to their project whatever it is. Do not soften it into something generic.

---

# PART 3 — Make the Scope conversation read like a real conversation

## What is wrong

The four bubbles are:

1. `What should it do?`
2. `Bookings, and an admin panel.`
3. `Who updates the content?`
4. `Your team. No developer needed.`

Two problems. **Nobody can tell who is speaking** — left and right alone do not establish that,
and line 4 reads as the developer answering his own question from line 3. And it reads as a
questionnaire rather than a conversation between two people with different concerns.

## The fix

### Label the speakers

Add two small labels, drawn as permanent structure:

- **`CLIENT`** at x 28, centre y 28, size 11, `--graphite`, left-aligned
- **`ZETROXY`** right-aligned ending at x 532, centre y 28, same size and colour

Shift the four bubbles down by 20 units to make room — new y values **60, 112, 164, 216** — and
the agreement bar to **y 260, h 44**, which keeps it inside the 287 lower bound.

That is two elements added and it is the single change that makes the whole thing legible.

### Rewrite the dialogue

The client speaks first, because the client always speaks first. Left bubbles are the client;
right bubbles are you.

1. **Client:** `We need a site now, an app later.`
2. **You:** `What has to work on day one?`
3. **Client:** `Sign-ups, and our team editing content.`
4. **You:** `Scope, timeline and price by Friday.`

Why this works, so it is not "improved" back into a questionnaire:

- **It is a real exchange.** The client states a need, you ask the one question that decides the
  build, the client answers, you commit to something concrete.
- **It covers web and mobile in the first line** without listing technologies.
- **"Sign-ups, and our team editing content"** is true of almost any project — a shop, a booking
  system, a directory, an internal tool. It names the admin capability without making the whole
  section about admin panels.
- **Line 4 sets up the agreement bar.** The conversation ends with a promise of scope, timeline
  and price, and then that exact bar appears. Picture and words agree.

Keep the lines short enough to fit one line inside a 240-unit bubble at size 11. If any wraps,
shorten the line rather than shrinking the type.

---

# PART 4 — Three small animation improvements

Only these three. Do not re-compose anything else.

1. **ScopeAnim — bubble tails.** The bubbles currently only differ by which side they sit on.
   Give client bubbles a squared bottom-left corner and yours a squared bottom-right corner
   (the other three corners stay at radius 8). It is a one-property change and it makes the
   direction of each message obvious at a glance.

2. **BuildAnim — one line of real syntax colour weighting.** All five code bars are the same
   `--graphite`. Draw each bar as **two or three segments of differing length** with the first
   segment in `--ink` and the rest in `--graphite`. It reads as keyword-plus-expression instead
   of a plain bar, at no cost in element count — the segments are part of the same line.

3. **YoursAnim — the rail should show progress.** The rail between `zetroxy` and `You` is a flat
   1px line. As each card completes its journey, fill the rail from left to right by one third,
   in `--ink`, over the same duration as the card's travel. By the end the rail is fully drawn.
   It gives the sequence a sense of completion that the checks alone do not.

---

# Done when

- Every `You get:` line names exactly the things its animation shows, and nothing it does not.
- Every `desc` describes its own animation.
- No occurrence of `booking`, `Bookings` or `booking.ts` anywhere in the section or the four
  animation files. Grep to confirm.
- The subhead names websites, mobile apps and systems.
- The Scope conversation has `CLIENT` and `ZETROXY` labels and reads as a real four-line exchange.
- The agreement bar reads `SCOPE · TIMELINE · PRICE`.
- `preview.zetroxy.me` is visible in BuildAnim at all times.
- Nothing overlaps; the 14s cycle and 4.5s still hold are unchanged.
- Reduced motion still renders four complete, static, readable diagrams.
