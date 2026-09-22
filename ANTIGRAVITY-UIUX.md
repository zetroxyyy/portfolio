# zetroxy.me — UI/UX pass

**Four phases. Run them one at a time, in order, and check the site between each.**
Paste one phase into Antigravity, review, commit, then move to the next. Do not paste the
whole file — later phases assume earlier ones landed.

Repo is already open. Stack is Next.js 16 App Router, React 19, TypeScript, Tailwind v4,
framer-motion, lenis. `src/app/globals.css` holds every design token and component style.

---

## Ground rules for all four phases

1. **Do not touch these.** They work and are not up for redesign:
   - `src/components/sections/Hero.tsx` and the `.hero*` styles
   - `src/components/ui/BrowserFrame.tsx` and the `.browser-frame*` styles
   - `src/components/project/ProjectBand.tsx` and the `.project-band*` layout
   - `src/components/layout/Footer.tsx`
   - Anything under `public/images/projects/`

2. **No new dependencies.** No UI kit, no animation library, no icon package.

3. **`images.unoptimized: true` stays in `next.config.ts`.** The Vercel account is over its
   image transformation quota; re-enabling the optimizer returns HTTP 402 and images vanish.

4. **Design tokens live in `globals.css` as CSS custom properties.** No raw hex in component
   files. The one legitimate inline style is passing a per-project accent as a custom property.

5. **Every colour is defined for both themes.** Define the light value on bare `:root`, then
   redefine tokens under `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }`
   **and** under `:root[data-theme="dark"]`. A colour whose only definition sits inside a media
   query renders one theme's text on the other theme's background.

6. **`prefers-reduced-motion` is honoured.** Keep colour and border feedback, drop movement.

7. **After every phase:** `npx tsc --noEmit`, `npm run lint`, `npm run build` must all pass
   clean, and the page must have no horizontal scroll at 375px.

---

# PHASE 1 — Fix the nav bleed

**Ship this on its own. It is two numbers and it is the most visible flaw on the site.**

## The problem

At every scroll position, text underneath the fixed nav is readable *through* it. At the
Capabilities section you can read "PostgreSQL (Neon | Supabase)" and "Operations" behind the
nav links. It reads as broken rather than as a deliberate glass effect.

## The cause

In `src/app/globals.css`:

```css
.nav--scrolled {
  background-color: color-mix(in srgb, var(--paper) 88%, transparent);
  backdrop-filter: blur(12px);
}
```

The blur is working. 88% is simply not opaque enough once dense small text passes under it.

## The fix

Raise opacity to **96%** and blur to **20px**, and add a saturation boost so the glass does not
grey out colour passing beneath it:

```css
.nav--scrolled {
  background-color: color-mix(in srgb, var(--paper) 96%, transparent);
  backdrop-filter: blur(20px) saturate(140%);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  border-bottom-color: var(--hairline);
}
```

Add a fallback for browsers without `backdrop-filter` support, where a 96% translucent bar
still lets text through:

```css
@supports not (backdrop-filter: blur(1px)) {
  .nav--scrolled { background-color: var(--paper); }
}
```

## Done when

- Scroll the whole page slowly. No text is legible through the nav at any point.
- The nav still reads as translucent, not as a solid slab — you should sense movement behind it.
- Both themes checked.

---

# PHASE 2 — Make the typography carry the whole page

**This is the core of the brief. The site introduces a voice in the hero and then talks in
monotone for five sections.**

## The problem, precisely

1. `Instrument Serif` italic appears in exactly three places: the hero headline, and two small
   grey sub-lines under section headings. It is introduced as a signature and then demoted to
   decoration. It is never structural.

2. Every section `<h2>` is the same size — `clamp(var(--text-2xl), 4vw, var(--text-3xl))` — and
   two of them are **inline-styled**, bypassing the class system:
   - `src/components/sections/Capabilities.tsx` line 65
   - `src/components/sections/Process.tsx` line 37

3. The hero runs at roughly 100px. Nothing else on the page is ever large again — everything
   below sits between 13px and 44px. Big confident type is the site's best asset and it appears
   on one screen out of six.

## What to build

### 2.1 — A real heading scale

Add tokens to `globals.css`. These are display roles, not just sizes:

```css
:root {
  /* Hero — unchanged, already correct */
  --h-display: clamp(2.75rem, 7vw, 6.25rem);
  /* A section that is making a statement. Used sparingly — twice on the page. */
  --h-major:   clamp(2.25rem, 5vw, 4rem);
  /* A normal section heading. */
  --h-section: clamp(1.75rem, 3.4vw, 2.75rem);
  /* A sub-head inside a section. */
  --h-sub:     clamp(1.25rem, 2vw, 1.625rem);
}
```

Create a shared `.section-heading` class using `--h-section`, and `.section-heading--major`
using `--h-major`. **Delete the inline `style={{ fontSize: … }}` from both section components**
and use the classes. `.work-group__title` in `globals.css` should also use the token.

Apply `--h-major` to exactly two headings so it stays an event, not a default:
- `Capabilities` — "What I build and ship."
- `Process` — "From scope to self-serve production."

### 2.2 — Make the serif structural, not decorative

Every section heading becomes a two-part construction, exactly like the hero already does:
plain Satoshi for the setup, `.serif-italic` for the operative phrase. Set the italic slightly
larger than the roman it sits beside — Instrument Serif has a smaller optical size than Satoshi
at the same px, so matching them numerically makes the serif look shrunken. Around **1.08em**
on the `.serif-italic` span inside a heading corrects it.

Rewrite these headings (keep the meaning, keep them short):

| Section | Roman | Serif italic |
|---|---|---|
| Work — client group | `Client work.` | `Shipped, and still running.` |
| Work — independent group | `Independent builds.` | `Made without waiting to be asked.` |
| Work — side projects | `Side projects.` | `Built to scratch my own itch.` |
| Capabilities | `What I build` | `and what it costs you to run.` |
| Process | `From first message` | `to running it yourself.` |

You may improve the wording. Keep the two-part structure and keep the italic half carrying the
idea, not the setup — the serif should land on the interesting word every time.

### 2.3 — One moment of scale below the hero

Pick the single strongest sentence on the page and set it large. It is this one, currently
buried in a grey box at the end of Process:

> Most agencies deliver a static brochure.

Build a reusable `.statement` block: `--h-major` scale, serif italic, generous space above and
below, no box, no border, no background. Full measure of the content column, left-aligned with
everything else. It should read as the page raising its voice once.

The rest of that paragraph becomes a normal-size line beneath it.

## Done when

- No `style={{ fontSize: … }}` remains in any section component.
- Every section heading has a roman half and a serif italic half.
- Exactly two headings use `--h-major`; the statement block is the only other large type.
- The serif italic never renders visually smaller than the roman beside it.
- At 375px no heading overflows or breaks mid-word.

---

# PHASE 3 — Rebuild Capabilities as proof, not a list

## The problem

Twenty-eight dashed bullets in four columns. It is the only undesigned part of the page, and it
sits immediately before the closing — so the page ends on its weakest section.

It also serves neither reader. A business owner cannot act on "bcrypt hashing & brute-force
lockouts". A hiring manager does not need a list, because the six case studies already
demonstrate every item on it in context.

## The idea

**Turn the skills list into a proof list.** Every capability names the thing built *and the
project where it shipped*. Same information, a fraction of the words, and every claim is
checkable — which is the whole argument of this site.

## What to build

Replace the four-column bullet grid in `src/components/sections/Capabilities.tsx` with **four
capability rows**. Each row carries:

- A large index numeral (`01`–`04`), mono, in the project accent of the example it cites
- A short capability name, `--h-sub`
- One sentence of plain description
- A **proof line**: the concrete thing, the project, and a link to that case study

Draft content — all of it is true and verifiable against the existing case studies:

**01 · Booking and availability systems**
Reservation flows where a seat cannot be sold twice, because availability is read from the
database at the moment of booking rather than cached.
→ *Dream Adventure holds 21 rafting seats across three daily departures, in Japanese and
English.* `/work/dream-adventure` — accent `#0D9488`

**02 · Admin panels the client actually runs**
Not a generic CMS bolted on — screens built for the specific things this business changes, in
the language its staff work in.
→ *A legal practice in Chitwan edits its own services, photography and contact details in
Nepali.* `/work/nischal-legal` — accent `#B3222C`

**03 · Catalogues and storefronts**
Product, category and pricing management built for bulk editing, because catalogues go stale
when every change takes six clicks.
→ *Didee's back office updates prices across the whole catalogue in a single pass.*
`/work/didee` — accent `#1A1A18`

**04 · Shipped and maintained**
Custom domain, SSL, search metadata, Core Web Vitals, and the deployment pipeline — set up
once and handed over with the credentials.
→ *Six products live on their own domains, including three client-owned.* `#work` — accent `#E11D2F`

Layout: rows, not cards. Each row a two-column grid — numeral and name on the left, description
and proof on the right — collapsing to a single column under 820px. Hairline rule between rows,
no boxes. This echoes the project band rhythm without repeating it.

The proof line gets a subtle left border in the row's accent colour, and links to the case study.

## Done when

- The section fits on roughly one screen at 1280px instead of being a wall.
- Every one of the four rows links to a real case study route that exists.
- No claim appears that is not demonstrated by one of the six projects.
- Reads sensibly with images off and with a screen reader.

---

# PHASE 4 — Rhythm and accent

**Polish pass. Smallest changes, do it last.**

## 4.1 — Break the identical section rhythm

Every section is currently: hairline top border → mono eyebrow → heading → content, five times,
all left-aligned to the same margin, all with the same vertical padding. Correct, and
monotonous.

Introduce variation without inventing a new language:

- **Alternate the background.** Sections currently alternate `--paper` and `--paper-2`
  inconsistently. Make it deliberate: Hero and Work on `--paper`, Capabilities on `--paper-2`,
  Process on `--paper`. One clean alternation the eye can follow.
- **Vary vertical padding by weight.** The statement block from Phase 2 and the Work section
  earn more space than Capabilities does. Do not use `--space-32` for everything.
- **Indent one section's content** — Process reads well shifted right into a narrower measure,
  which makes it feel like a step-by-step rather than another full-width block.
- **Drop the eyebrow where the heading already says it.** "PROCESS" above a heading that reads
  "From first message to running it yourself" is redundant.

## 4.2 — Let the project accents do more work

The six accent colours currently appear as a 2px rule above the project text and a small dot.
They already exist in the data (`content/projects.ts`, `accent` field) and are passed as
`--project-accent`. Extend their reach:

- **Project index numerals** (`01`–`06`) take the accent at rest, not only on hover. Currently
  they are `--fog` and only colour on hover, so most visitors never see it.
- **Case study pages** pick up their project's accent for the section rules, the meta bar
  border and link underlines — each case study should feel faintly like the product it covers.
- **Capabilities row numerals** use the accent of the project they cite (Phase 3).
- **The live status dot** stays `--live` green everywhere. It means "this is online", which is
  not a per-project fact.

Keep it restrained: accents are for rules, numerals, borders and hover states. Never a large
flat fill, never body text, and never anything that has to pass a contrast check as small text
on paper.

## 4.3 — The Process statement

Phase 2 already promoted "Most agencies deliver a static brochure" into a `.statement` block.
Delete the old `.process__statement` grey box entirely — do not leave both.

## Done when

- Backgrounds alternate on a pattern you can describe in one sentence.
- Not every section has the same top padding.
- Each project's accent is visible at rest on the home page and on its case study.
- Contrast still passes: `--mist` on both `--paper` and `--paper-2`, and every accent used for
  text or icons.
- `npx tsc --noEmit`, `npm run lint`, `npm run build` clean. No horizontal scroll at 375px.
