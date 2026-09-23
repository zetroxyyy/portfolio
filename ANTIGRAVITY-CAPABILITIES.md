# zetroxy.me — CAPABILITIES section, rebuild

**Scope: the Capabilities section only.**

Do not touch `Process.tsx` or `process-anim/` — that section is finished. Do not touch
`Hero.tsx`, `Work.tsx`, `ProjectBand.tsx`, `Footer.tsx`, or `public/images/projects/`.

Files in scope:
- `src/components/sections/Capabilities.tsx` — **rewrite from scratch**
- `src/components/ui/capability-anim/` — **delete the whole directory** and every import of it
- new: `content/capabilities.ts`
- the `.capabilities*` and `.capability-*` blocks in `src/app/globals.css` — remove what is dead,
  write what is new

Rules: no new dependencies. No raw hex — tokens only. Both themes correct.
`prefers-reduced-motion` honoured. When done: `npx tsc --noEmit`, `npm run lint`,
`npm run build` clean, no horizontal scroll at 375px.

---

## Why this is being rebuilt

Two problems, and the first is structural.

**It has become the same instrument as Process.** Capabilities is currently four tabs driving a
large animated SVG diagram. Process is now a grid of large animated SVG diagrams. Back to back,
the page plays the same trick twice, and the second one is weaker for it.

**It does not do its job.** Capabilities exists for exactly one reason: to stop a visitor
concluding that this developer builds booking sites with admin panels. Right now even the "Web
applications" tab resolves into a `CUSTOMER → ADMIN` diagram, so the section meant to prove
range is reinforcing the narrowness.

The heading also promises something that is no longer its job — *"What I build and how the
system works"*. Process explains how things work. Capabilities answers one question only:
**what can you build for me?**

---

# The new approach — a menu, not a demo

Replace the tabs and the diagram with **a list of things he can build**, set in large type.

Around thirty concrete deliverables, grouped, laid out to be scanned. **The variety is the
argument.** Nobody who reads a list containing "An Android app", "A chatbot that answers from
your own documents", "A Chrome extension" and "An internal dashboard" comes away thinking this
person only builds booking sites. It kills the narrow read by weight of evidence rather than by
assertion.

**Roughly half the items link to something already shipped.** That is what keeps it from being a
wishlist — the reader can check. Items with proof are links; items without are plain text.

**Almost no motion.** A quiet reveal on scroll and hover states, nothing else. Process owns the
animation on this page; the contrast is deliberate and makes Process land harder.

---

# Content — put this in `content/capabilities.ts`

```ts
export interface CapabilityItem {
  label: string;
  /** Internal route or external URL. Present = this has been built and shipped. */
  href?: string;
}

export interface CapabilityGroup {
  label: string;      // mono, uppercase
  items: CapabilityItem[];
}
```

## Group 1 — `SITES & STORES`

| Item | Link |
|---|---|
| A business website | `/work/manjushree` |
| An online store | `/work/mydarlingfood` |
| A product catalogue | `/work/nexus-mcu` |
| A bilingual site | `/work/nischal-legal` |
| A site your team can edit | `/work/nischal-legal` |

## Group 2 — `SYSTEMS THAT RUN A BUSINESS`

| Item | Link |
|---|---|
| A booking system with live availability | `/work/dream-adventure` |
| An inventory and pricing tool | `/work/didee` |
| A customer portal | — |
| An internal dashboard | — |
| An order and fulfilment flow | — |
| Role-based staff accounts | `/work/dream-adventure` |

## Group 3 — `MOBILE`

| Item | Link |
|---|---|
| An Android app | `https://github.com/zetroxyyy/resumiq` |
| A cross-platform app | `https://github.com/zetroxyyy/resumiq` |
| Voice input instead of typing | `https://github.com/zetroxyyy/resumiq` |
| A mobile front-end on the same database as your site | — |

## Group 4 — `AI & SEARCH`

| Item | Link |
|---|---|
| A chatbot that answers from your own documents | `https://github.com/zetroxyyy/reels-second-brain` |
| Semantic search across your content | `https://github.com/zetroxyyy/reels-second-brain` |
| Automatic transcription and summaries | `https://github.com/zetroxyyy/reels-second-brain` |
| An AI document generator | `https://github.com/zetroxyyy/resumiq` |
| A model running on your own server, not an API | `https://github.com/zetroxyyy/reels-second-brain` |

## Group 5 — `UNDER THE HOOD`

| Item | Link |
|---|---|
| A custom admin panel | `/work/didee` |
| A REST API | — |
| Authentication and user roles | `/work/nischal-legal` |
| PDF and report generation | `/work/dream-adventure` |
| Transactional email | `/work/dream-adventure` |
| A Chrome extension | `https://github.com/zetroxyyy/reels-second-brain` |
| A background worker on a schedule | `https://github.com/zetroxyyy/reels-second-brain` |
| File upload and storage | `/work/nischal-legal` |
| A database built for the actual business | — |

**Twenty-nine items, nineteen of them linked to real work.** Every link above points at
something that genuinely exists — do not add links to the unlinked items to make the ratio look
better, and do not invent new items. If you want to adjust wording, keep each item under about
50 characters so it does not wrap awkwardly at large type.

---

# Layout

## Header

- Eyebrow: `CAPABILITIES` — unchanged, mono, `--mist`
- Heading, using the existing `.section-heading--major` two-part pattern:
  **`What I build`** + serif italic **`is not one thing.`**
  That line does the work of the whole section in five words, and it answers the narrowness
  head-on rather than tiptoeing around it.
- Subhead: **`Websites, mobile apps, internal tools, and the systems behind them. Underlined items link to something already running.`**

That second sentence is load-bearing — it tells the reader the list is checkable. Keep it.

## The list

- Five groups, stacked, in the order above.
- Each group: a mono uppercase label in `--mist` at `--text-xs`, then the items beneath.
- **Items flow inline and wrap**, separated by a middot `·` in `--fog`, like a run of text rather
  than a bulleted list. That is what makes it read as range instead of as a spec sheet.
- Item type: `clamp(1.125rem, 2vw, 1.5rem)`, line-height `1.55`, `--graphite`.
- Group separation: `var(--space-10)`… **use `var(--space-8)`** — `--space-10` does not exist in
  this codebase and silently drops. Check any spacing token you use against `:root` first.
- A 1px `--hairline-2` divider between groups.
- Max width on the list: full content width. Long flowing lines are the point.

## Linked vs unlinked items

- **Linked:** `--ink`, with a 1px `--fog` underline offset 4px. On hover the underline goes to
  `--ink` and the text stays `--ink`. External links get `target="_blank" rel="noopener noreferrer"`.
- **Unlinked:** `--graphite`, no underline, no hover state. They must be visibly quieter than the
  linked ones — the contrast between "shipped" and "can build" is information.

## Motion

- On scroll into view, each **group** fades up 12px, staggered 90ms apart. Groups, not items —
  twenty-nine individually animating items would be noise.
- Hover: colour and underline only. No transform, no lift.
- Nothing loops. Nothing moves after the reveal.
- `prefers-reduced-motion`: everything renders in place, no fade, no movement.

---

# Cleanup

- **Delete `src/components/ui/capability-anim/` entirely** — `WebAppAnim.tsx`,
  `MobileAppAnim.tsx`, `AiRetrievalAnim.tsx`, `ShipHandoverAnim.tsx` — and every import.
- Remove the tab bar, the tab state, the arrow-key handler, the accordion, the `useInView`
  gating and the cross-fade from `Capabilities.tsx`. None of it survives.
- Remove the now-dead `.capabilities__selector`, `.capabilities__viewer`, `.capability-nav-btn`,
  `.capabilities__accordion-panel`, `.capabilities__caption*` and any `capability-anim` styles.
- Grep for `capability-anim` and `capability-row` afterwards; there should be zero hits.

---

# Accessibility

- The groups are a `<section>` containing a `<h2>` and, per group, a `<h3>` and a `<ul>`.
  Inline flow is a CSS concern, not a reason to abandon list semantics.
- The middot separators are decorative — generate them in CSS via `li + li::before`, not as text
  nodes, so a screen reader does not read "middot" twenty-nine times.
- Every link has a discernible name from its own text. No "learn more".
- Focus-visible on every link, using the existing site rule.

---

# Done when

- The section is a list of twenty-nine buildable things in five groups, and contains no tabs, no
  diagrams and no SVG animation.
- `src/components/ui/capability-anim/` no longer exists.
- Nineteen items are links; every one resolves to a real route or a real repository.
- Unlinked items are visibly quieter than linked ones.
- The heading reads `What I build is not one thing.`
- Nothing on the page animates in this section after the initial reveal.
- No undefined CSS custom properties anywhere in the new styles.
- At 375px items wrap cleanly with no horizontal scroll.
