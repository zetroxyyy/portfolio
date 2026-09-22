# zetroxy.me — UI/UX pass, round three

**Four fixes. Run them one at a time, in order.** A and B are bugs — ship those first.

Builds on `ANTIGRAVITY-UIUX.md` and `ANTIGRAVITY-UIUX-2.md`, both already merged.

## Ground rules (unchanged)

Do not touch `Hero.tsx`/`.hero*`, `ProjectBand.tsx`/`.project-band*` layout, `Footer.tsx`, or
`public/images/projects/`. No new dependencies. `images.unoptimized: true` stays in
`next.config.ts`. No raw hex in components. Every colour defined for bare `:root`, the
`prefers-color-scheme: dark` query guarded with `:root:not([data-theme="light"])`, **and**
`:root[data-theme="dark"]`. `prefers-reduced-motion` honoured. After each fix:
`npx tsc --noEmit`, `npm run lint`, `npm run build` clean, no horizontal scroll at 375px.

---

# FIX A — Nav links do nothing on case study pages

## The bug

Open `/work/dream-adventure` and click **CAPABILITIES** or **PROCESS** in the nav. Nothing
happens.

`src/components/layout/Nav.tsx` renders nav items as `<button>` elements. `handleNavClick`
does `document.getElementById(id)` and scrolls to it. On a case study page there is no
`#capabilities` or `#process` element, so the lookup returns null and the function exits
silently. There is no `href`, so there is nothing to fall back to.

Same root cause makes `https://zetroxy.me/#capabilities` load at the top of the page instead of
at the section — there is no native anchor behaviour to rely on.

This also means: the nav is invisible to crawlers, cannot be Cmd-clicked or opened in a new
tab, and does not work with JavaScript disabled.

## The fix

Make them real links. Keep the Lenis smooth scroll, but only as an enhancement on top of
working anchors.

In `Nav.tsx`, replace both `<button>` sets (desktop list and mobile menu) with `next/link`
`<Link href={item.href}>`, and rewrite the handler:

```tsx
function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  // Let the browser handle modified clicks — new tab, new window, download.
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  if (!href.startsWith('/#')) return;

  const el = document.getElementById(href.slice(2));
  if (!el) return;            // not on this page — let the browser navigate to it

  e.preventDefault();
  setMenuOpen(false);

  const lenis = (window as unknown as {
    lenis?: { scrollTo: (el: Element, opts?: object) => void };
  }).lenis;

  if (lenis) lenis.scrollTo(el, { offset: -70 });
  else el.scrollIntoView({ behavior: 'smooth' });

  window.history.pushState(null, '', href.slice(1));
}
```

The `if (!el) return` before `preventDefault` is the important line — on a case study page the
element does not exist, so the click falls through and the browser navigates to `/#capabilities`,
which is exactly what should happen.

**Also fix the on-load hash.** When the homepage loads with a hash already in the URL, Lenis
takes over scrolling and the native jump is lost. In `LenisProvider` (or a small effect on the
homepage), after Lenis initialises, check `window.location.hash`, and if it matches an element,
`lenis.scrollTo(el, { offset: -70, immediate: true })`.

## Done when

- From `/work/dream-adventure`, clicking CAPABILITIES navigates home and lands on the section.
- Pasting `zetroxy.me/#process` into a fresh tab lands on Process, not the top.
- Cmd-clicking a nav item opens it in a new tab.
- Nav items render as `<a href>` in view-source.

---

# FIX B — "See the full page" button jumps sideways on hover

## The bug

The button visibly shifts left on hover. It is a transform-centring conflict.

`.browser-frame--expandable:not(.browser-frame--expanded) .browser-frame__expand-wrap` is
centred with `left: 50%; transform: translateX(-50%)`. That is correct — **the wrap owns the
centring.**

But `.browser-frame__expand-btn:hover` sets `transform: translateY(-1px)` on the *button*, and
then a second rule tries to compensate by putting `translateX(-50%)` on the **button** too:

```css
.browser-frame--expandable:not(.browser-frame--expanded) .browser-frame__expand-btn:hover {
  transform: translateX(-50%) translateY(-1px);   /* ← wrong element */
}
```

The button is already inside a centred wrap, so this shifts it a further 50% of its own width to
the left. Hence the jump.

## The fix

The button must never carry `translateX`. Delete both compensating rules:

- `.browser-frame--expandable:not(.browser-frame--expanded) .browser-frame__expand-btn:hover`
- `.browser-frame--expandable:not(.browser-frame--expanded) .browser-frame__expand-btn:active`

and leave only:

```css
.browser-frame__expand-btn:hover  { border-color: var(--project-accent, var(--ink)); transform: translateY(-1px); }
.browser-frame__expand-btn:active { transform: translateY(0); }
```

## While you are here — the button also looks wrong

It currently reads as a floating pill dropped on top of the image. Tighten it:

- The fade behind it is `linear-gradient(to bottom, transparent, var(--paper))`, but the frame
  sits on `--paper-2` in some sections. Use `currentColor`-free, section-aware fading, or
  simply set the fade to match the frame's own background rather than the page's.
- Give the button the same visual language as the rest of the site's controls: match
  `.project-band__btn-study` — mono, uppercase, `--text-xs`, hairline border, and fill with
  `--ink` on hover with the label flipping to `--paper`. Drop the drop shadow; nothing else on
  this site floats.
- Keep the `↓` / `↑` arrow, and animate only the arrow on hover (`translateY(2px)`), not the
  whole button.

## Done when

- No horizontal movement on hover at any viewport.
- The button matches the other buttons on the site rather than looking like a foreign element.
- Still centred over the fade when collapsed, centred below the image when expanded.

---

# FIX C — Capabilities: fix the break, then fix the idea

## Part 1 — the section is literally broken

```css
.capabilities__layout {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: var(--space-10);        /* ← --space-10 DOES NOT EXIST */
}
```

The spacing scale defines `--space-1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32, 40`. There is no
`--space-10`. The `gap` declaration is invalid and drops, so the gap computes to **zero** and
the left column's text runs straight into the screenshot. That is why it looks broken.

`var(--space-10)` is used in exactly two places — `globals.css` line 1366 and line 2097. **Fix
both**, and audit the file for any other undefined token while you are in there.

> Do not "fix" this by adding a `--space-10` token. The scale is deliberately non-linear.
> Use `--space-8` or `--space-12`.

## Part 2 — the layout is wrong regardless

Even with the gap restored, the concept does not work in two columns, and this is a design
error in the brief rather than in the implementation.

Admin screenshots are dense interfaces captured at 2400px wide. Rendered into a ~450px column
they are illegible grey noise — the reader cannot see a calendar, a price grid or a manifest,
so the "proof" proves nothing. The images only work at real size.

**Restructure from side-by-side to stacked.**

- **A horizontal tab row** across the full content width: four compact items, each with its
  accent numeral, the capability name, and nothing else. The selected one gets the accent
  underline and full-contrast text. These are the same buttons with the same `aria-pressed`
  and arrow-key behaviour — only the arrangement changes to Left/Right instead of Up/Down.
- **One `<BrowserFrame>` beneath, at full content width**, showing the selected screenshot.
  This is the whole point: the image gets ~1100px instead of ~450px and becomes readable.
- **The one-line description moves under the frame**, beside the caption and the case study
  link, so the tabs stay tight.

Keep everything else that already works: the four capabilities, the screenshots, the accent
colours, the 250ms cross-fade, the case study links, first-item-selected on server render,
`priority` on the first image only.

**Mobile (≤ 820px):** keep the existing accordion. It already works and stacking is correct
there.

Reserve the frame's height so switching tabs causes no layout shift — all four screenshots are
2400×1350, so a fixed 16:9 box handles it.

## Done when

- No undefined custom properties anywhere in `globals.css`.
- Nothing overlaps at any width between 375px and 1920px.
- The selected screenshot is large enough to read individual UI labels in it.
- Switching tabs does not move anything on the page.

---

# FIX D — Process: make the timeline read as a sequence

The structure is right and the "You get:" reframing works. Three things hold it back.

## D1 — The connecting rule is invisible

```css
.timeline__track { top: 10px; left: 8px; right: 8px; height: 1px; background-color: var(--hairline); }
```

`--hairline` is a 10–12% alpha. At 1px, behind the markers, it does not read at all — so the
four stages still look like four unrelated columns, which was the thing the rule was supposed
to fix.

- Raise it to `var(--fog)` at 2px.
- The markers currently sit *on* the line but share its colour. Give each marker a ring of the
  section background (`box-shadow: 0 0 0 4px var(--paper)`) so the rule appears to pass *behind*
  them. That small detail is what makes a timeline read as continuous.
- The animated fill should be a second element in the stage accent, drawn over the static track
  — so the line looks like it is being traced, not just appearing.

## D2 — Four invented colours mean nothing

`--stage-1` through `--stage-4` introduce teal, blue, orange and green. Every other colour on
this site comes from a real project. These are decoration pretending to be information, and
four hues across four adjacent columns is noisy.

Replace with **one accent across all four stages**, and let *position* carry the sequence
instead of hue — the numerals, the markers and the drawn rule already do that job. Use the
existing `--live` green, or a single neutral accent. Delete the `--stage-*` tokens.

If you want progression, vary **opacity** of one hue across the four stages (say 55% → 100%),
not the hue itself.

## D3 — Four columns is too narrow for this much text

At 1200px each column holds roughly 150px of text, which gives a ragged three-word measure and
makes the descriptions tiring.

Either:
- **Preferred:** drop to a 2×2 grid above 900px, giving each stage a comfortable measure; or
- keep four columns and cut each `desc` to a single short sentence.

Do not do both.

## D4 — One box left

The `.timeline-stage__deliverable` block still has a background fill and border. It is now the
only card-like element in the section. Keep the accent left border, drop the background — the
label, the border and the weight are enough.

## Done when

- The four stages read as one connected sequence on desktop.
- Exactly one accent colour in the section; `--stage-*` tokens are gone from `globals.css`.
- No description line breaks into fewer than five words per line at 1280px.
- Nothing in the section has a background fill.
- Reduced motion renders the rule fully drawn with no animation.
