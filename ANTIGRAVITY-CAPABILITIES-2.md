# zetroxy.me — CAPABILITIES section, rebuild as a toolkit

**Scope: the Capabilities section only.**

Do not touch `Process.tsx` or `process-anim/` — finished. Do not touch `Hero.tsx`, `Work.tsx`,
`ProjectBand.tsx`, `Footer.tsx`, or `public/images/projects/`.

Files in scope:
- `src/components/sections/Capabilities.tsx` — **rewrite from scratch**
- `content/capabilities.ts` — **replace its contents entirely**
- the `.capabilities*` blocks in `src/app/globals.css`

Rules: no new dependencies. No raw hex — tokens only. Both themes correct.
`prefers-reduced-motion` honoured. When done: `npx tsc --noEmit`, `npm run lint`,
`npm run build` clean, no horizontal scroll at 375px.

---

## Why this is being rebuilt again

The previous version was a menu of ~29 buildable things, with 19 of them linked to case studies
and repositories. Linking them was meant to make the claims checkable. Instead it turned the
section into **a second index of the same work shown directly above it**, so the page said the
same thing twice.

Capabilities is not about what has been built. It is about **what this developer is able to do**.

There is also a genuine hole in the site: Work shows the output, Process shows the method, and
**nothing anywhere shows the stack**. An employer reading this page cannot tell whether he knows
their technologies. That hole is what this section now fills.

**No links to projects anywhere in this section.** That is the rule that keeps it from collapsing
back into Work.

---

# Structure — six layers, two tiers each

Six capability layers. Within each, two tiers:

- **`CORE`** — what most projects are actually built on
- **`ALSO SHIPPED WITH`** — genuinely used in production work, just less often

The second label matters. "Also shipped with" says these are not tutorial credentials; they have
been in something that runs. Do not soften it to "familiar with" or "learning".

The two-tier split is the honest part and the interesting part. A flat wall of forty
technologies is the pattern junior portfolios use and experienced readers discount it. A
portfolio that admits a hierarchy reads as someone who knows the difference.

---

# Content — replace `content/capabilities.ts` with this

```ts
export interface CapabilityLayer {
  label: string;     // mono, uppercase
  core: string[];
  also: string[];
}
```

### 1 — `INTERFACE`
- **core:** `React 19` · `Next.js App Router` · `TypeScript` · `Tailwind CSS v4` · `Framer Motion`
- **also:** `Radix UI` · `Recharts` · `React Hook Form` · `Zod` · `Lenis`

### 2 — `SERVER & DATA`
- **core:** `Node.js` · `PostgreSQL` · `Prisma` · `Server Actions` · `REST route handlers`
- **also:** `Python` · `Neon serverless` · `Supabase` · `Cloud Firestore` · `Raw SQL`

### 3 — `AUTH & SECURITY`
- **core:** `NextAuth` · `JWT (jose)` · `bcrypt` · `Role-based access`
- **also:** `Google OAuth 2.0` · `Brute-force lockout` · `CSP headers` · `Client-side encryption`

### 4 — `MOBILE`
- **core:** `Flutter` · `Dart` · `Android`
- **also:** `Firebase Auth` · `Firestore` · `Speech-to-text` · `On-device PDF export`

### 5 — `AI & RETRIEVAL`
- **core:** `LLM integration` · `RAG pipelines` · `Vector search`
- **also:** `Groq / Llama 3.3` · `Ollama (self-hosted)` · `OpenAI Whisper` · `pgvector` · `Vercel AI SDK`

### 6 — `SHIP & OPERATE`
- **core:** `Vercel` · `Git` · `Custom domains & DNS` · `SSL` · `Core Web Vitals`
- **also:** `Docker` · `Vercel Blob` · `Resend` · `Cloudinary` · `Chrome MV3` · `next-intl (i18n)`

**Every item above is evidenced by a real repository or deployed project.** Do not add
technologies that are not on this list, do not pad a tier to make it look even, and do not move
items between tiers to balance the columns. The asymmetry is the honesty.

---

# Layout

## Header

- Eyebrow: `CAPABILITIES` — mono, `--mist`, unchanged
- Heading, using the existing `.section-heading--major` two-part pattern:
  **`What I work with`** + serif italic **`and what I reach for first.`**
  It states the section's job and signals the two-tier structure in one line.
- Subhead: **`Six layers. Core is what most projects are built on — the rest has shipped too, just less often.`**

## The grid

- **Three columns** above 1024px, **two** between 700 and 1024px, **one** below 700px.
- `gap: var(--space-12)` column, `var(--space-16)` row. (Check every spacing token against
  `:root` before using it — `--space-10` does not exist in this codebase and silently drops.)
- No cards, no borders, no background fills on the layers. The page already learned this lesson
  on the project bands; boxes here would fight the Process grid directly below.

## Each layer

1. **Layer label** — mono, `--text-xs`, `--mist`, uppercase, `--tracking-wider`
2. **A 1px `--hairline` rule** directly beneath it, full column width
3. **Core items** — `--text-base`, `--ink`, weight 500. Flowing inline, wrapping, separated by a
   `·` in `--fog`.
4. **A 1px `--hairline-2` rule**, inset to about 40% width, as a quiet tier divider
5. **Also items** — `--text-sm`, `--graphite`, weight 400. Same inline flow, same separator.

The size and colour difference between the two tiers is what encodes the hierarchy. Do not add
badges, dots, bars or percentage indicators — nobody believes a skill percentage and it would
undo the credibility the honest split buys.

`--space-4` between the label and core, `--space-3` between core and the divider, `--space-3`
after it.

## Motion

Almost none — Process owns the animation on this page and the contrast is deliberate.

- On scroll into view each **layer** fades up 12px, staggered 80ms. Layers, not items.
- **No hover states.** Nothing here is interactive; hover affordances on non-interactive text
  are a lie.
- Nothing loops, nothing moves after the reveal.
- `prefers-reduced-motion`: everything renders in place with no fade and no movement.

---

# Cleanup

- Remove everything from the previous menu version: the `CapabilityItem` / `CapabilityGroup`
  types, the 29-item list, the linked/unlinked styling, and any `target="_blank"` handling.
- Remove dead CSS from both previous versions — grep for `capability-row`, `capabilities__item`,
  `capabilities__selector`, `capabilities__viewer`, `capability-nav-btn`,
  `capabilities__accordion-panel`, `capabilities__caption`. Zero hits when finished.
- Confirm `src/components/ui/capability-anim/` is gone; if any import of it survives, remove it.

---

# Accessibility

- `<section>` → `<h2>` → per layer a `<h3>` and two `<ul>`s.
- Separators are decorative: generate them with `li + li::before` in CSS, never as text nodes, or
  a screen reader announces "middot" forty times.
- Each `<ul>` gets an accessible name distinguishing the tiers — e.g. `aria-label="Core"` and
  `aria-label="Also shipped with"` — so the hierarchy survives without the visual styling.
- Check `--graphite` on `--paper-2` at `--text-sm`; it must clear 4.5:1.

---

# Done when

- Six layers, each with a core tier and an also tier, in a responsive grid.
- **No links anywhere in the section.**
- No cards, no boxes, no badges, no percentage or proficiency indicators.
- The two tiers are visually distinct by size and colour alone.
- Every technology listed appears in a real repo — nothing invented, no padding.
- Nothing animates after the initial reveal, and there are no hover states.
- No undefined CSS custom properties.
- Old menu code and all three generations of dead Capabilities CSS are gone.
- At 375px items wrap cleanly with no horizontal scroll.
