# zetroxy.me — scroll-spy fixes, back to top, mid-page contact

**Three parts. A is bug fixes to the section indicator, B and C are additions.**

Do not touch `Process.tsx`, `process-anim/`, `Capabilities.tsx`, `Testimonials.tsx`,
`ProjectBand.tsx`, `ThemeToggle.tsx`, or `public/images/projects/`.

Files in scope:
- `src/components/layout/Nav.tsx`
- `src/app/globals.css`
- new: `src/components/ui/BackToTop.tsx`
- new: `src/components/sections/MidContact.tsx`
- `src/app/page.tsx` (to mount the new section)
- `src/app/layout.tsx` (to mount BackToTop)

Rules: no new dependencies, tokens only, both themes correct, `prefers-reduced-motion`
honoured. When done: `npx tsc --noEmit`, `npm run lint`, `npm run build` clean, no horizontal
scroll at 375px.

---

# PART A — Fix the section indicator

Six defects. Measured on the live site.

## A1 — The highlight blanks out over Testimonials

Probing `.nav__link[aria-current]` at the centre of each section:

| Scroll position | Active |
|---|---|
| Hero | *(none)* — correct |
| Work | `Work` |
| **Testimonials** | **(none)** — wrong |
| Capabilities | `Capabilities` |
| Process | `Process` |
| Contact | `Contact` |

Testimonials has no nav entry, so `visibleSections` empties and `setActiveSection(null)` fires.
The nav goes Work → nothing → Capabilities, which reads as a glitch.

**Fix: make the active section sticky.** Once a section has become active, it stays active until
a *different* tracked section takes over. Remove the `setActiveSection(null)` branch entirely.

The initial state stays `null`, so nothing is highlighted over the hero — correct, because the
reader has not reached any tracked section yet. But once they pass Work, Work stays lit through
Testimonials until Capabilities takes over. That is standard scroll-spy behaviour and it is what
people expect.

## A2 — At boundaries it picks document order, not the nearest section

```ts
const active = sectionIds.find((id) => visibleSections.has(id)) || null;
```

When two sections are in the observation band at once, `find()` always returns whichever comes
first in the array — which is document order. Scrolling **down**, the old section stays lit until
it fully exits; scrolling **up**, the new one wins immediately. The behaviour is asymmetric and
the highlight lags in one direction.

**Fix: choose the section whose centre is nearest the viewport centre.** Keep a map of the
observed entries and, on each callback, pick the intersecting one minimising
`Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2)`. Direction-independent, and
correct when sections overlap.

## A3 — The click lock is shorter than the scroll it is protecting

`isClickScrollingRef` is released after a hardcoded **800ms**. Lenis's default `scrollTo`
duration is around **1.2s**. So the lock expires while the page is still travelling, the
observer regains control, and the highlight jumps to whatever section is passing before settling.

**Fix: release the lock when the scroll actually ends, not on a guess.** Pass an `onComplete`
callback to `lenis.scrollTo`, and clear the ref there. Keep a timeout only as a fallback for the
no-Lenis path, and set that one to **1500ms** so it cannot expire early.

## A4 — The click timeout leaks

`clickTimeoutRef` is never cleared on unmount, so a pending timer can fire after the component
is gone. Add a cleanup effect that clears it.

## A5 — `aria-current="true"` is not the right token here

For "the section of this page you are currently viewing", the correct value is
**`aria-current="location"`**. `"true"` is valid but generic; `"location"` is what assistive
technology expects for a position within a page rather than a page within a site.

## A6 — Every nav click pushes a history entry

`window.history.pushState(...)` on each click means the back button walks backwards through every
section the visitor clicked before it leaves the page. Click four nav items and it takes four
presses to get back to where they came from.

**Fix: use `replaceState`.** The URL still updates so the address bar is shareable, but the
history stack stays clean.

## Done when

- Scrolling the whole page always highlights exactly one item once Work has been reached.
- Nothing is highlighted over the hero.
- The highlight does not lag at boundaries in either direction.
- Clicking a nav item highlights it and it stays highlighted for the whole scroll.
- Back, after several nav clicks, leaves the page in one press.
- The active link carries `aria-current="location"`.

---

# PART B — Back to top

The page is **28,807px**, roughly 36 screens. There is currently no way back except scrolling all
of it.

Create `src/components/ui/BackToTop.tsx` and mount it in `layout.tsx` alongside `ScrollProgress`.

- A circular button, 44 × 44, fixed bottom-right, `var(--space-6)` from both edges.
- `--paper` background, 1px `--fog` border, `--ink` arrow glyph, subtle shadow. On hover the
  border goes `--ink`. No lift, no scale.
- **Hidden until the reader is past roughly 1.5 viewports**, then fades in over 250ms. Never
  visible in the hero — the page has not earned the button yet.
- Clicking scrolls to top via Lenis if present, `window.scrollTo({ top: 0 })` otherwise. Also
  move focus to the skip-link target so keyboard users do not lose their place.
- `aria-label="Back to top"`. Real `<button>`, in the tab order, visible focus ring.
- Sits above the footer content, `z-index` below the nav.
- `prefers-reduced-motion`: appears without the fade and jumps instead of smooth-scrolling.
- On mobile, keep it clear of the safe area — add `env(safe-area-inset-bottom)` to its offset.

---

# PART C — A contact point that is not at 96% of the page

Measured section starts, as a percentage of total page height:

| Section | Starts at |
|---|---|
| Work | 5% |
| Testimonials | 48% |
| Capabilities | 65% |
| Process | 78% |
| **Contact** | **96%** |

The only way to contact him sits on screen thirty-five. Anyone convinced by the testimonials at
the halfway mark has nothing to act on and has to keep scrolling — or leave.

Add a compact contact band, `src/components/sections/MidContact.tsx`, mounted **between
`<Testimonials />` and `<Capabilities />`** in `page.tsx`. That places it right after the social
proof, at the point where a reader is most likely to be persuaded.

Deliberately small — this is a prompt, not a section:

- Full width, `--paper-2` background, hairlines top and bottom, generous vertical padding but
  nothing taller than about 200px.
- One line of type at `--h-sub`: **`Seen enough?`** in roman + serif italic
  **`Tell me what you need built.`**
- Beneath it, the email as a link in mono — the same `hello@zetroxy.me` the footer uses, pulled
  from `site.email` so there is one source.
- A one-line reassurance in `--text-sm` `--graphite`: **`A reply within one working day, with honest scope and timing.`**
- No form, no illustration, no button stack. One link.
- Fades up 12px on scroll once, like the other sections.

**Give it no `id` and do not add it to the nav.** It is a repeat of the footer's offer, not a new
destination — an `id` would give the scroll-spy a fifth thing to track and put a duplicate
"Contact" in the nav.

---

# Done when

- The nav highlight behaves correctly across the whole page in both scroll directions.
- Back to top appears after 1.5 viewports and works with and without Lenis.
- A contact prompt exists at roughly the halfway point as well as in the footer.
- Neither addition has an `id` that the scroll-spy observes.
- Both respect `prefers-reduced-motion`.
- No horizontal scroll at 375px and the back-to-top clears the mobile safe area.
