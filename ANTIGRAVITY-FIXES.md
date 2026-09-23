# zetroxy.me — two bugs, one correctness fix, one nav improvement

**Four items. A and B are defects — do those first.**

Do not touch `Process.tsx`, `process-anim/`, `Capabilities.tsx`, `Testimonials.tsx`,
`ProjectBand.tsx`, or `public/images/projects/`.

Files in scope:
- `src/components/ui/ThemeToggle.tsx`
- `src/components/layout/Nav.tsx`
- `src/components/sections/Hero.tsx`
- `src/app/globals.css`

Rules: no new dependencies, tokens only, both themes correct, `prefers-reduced-motion`
honoured. When done: `npx tsc --noEmit`, `npm run lint`, `npm run build` clean.

---

# A — The theme toggle lies about the current theme

## Reproduced

With OS preference set to **light** and `localStorage.theme = "dark"`:

- `document.documentElement.dataset.theme` → `"dark"`
- page renders dark — correct
- the button reads **"Switch to dark mode"** and shows the moon icon — wrong, it is already dark
- clicking it computes `next = 'dark'` and writes `dark` again — **a visible no-op**

## Cause

`src/components/ui/ThemeToggle.tsx` has two sources of truth and they disagree.

The inline script in `src/app/layout.tsx` sets `data-theme` on `<html>` before React hydrates.
That attribute **is** the applied theme. But `getSnapshot()` ignores it and re-derives the theme
from `localStorage` and `matchMedia`, and `getServerSnapshot()` hard-returns `'light'`. When the
stored choice and the OS preference disagree, the button's state and the page's state diverge.

## Fix — read the attribute, since that is what is actually applied

```ts
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  // still needed so a change in another tab is reflected here
  window.addEventListener('storage', callback);
  return () => {
    observer.disconnect();
    window.removeEventListener('storage', callback);
  };
}

function getSnapshot(): 'light' | 'dark' {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}
```

`toggleTheme` then only needs to set the attribute and write `localStorage`. **Delete the
`window.dispatchEvent(new Event('storage'))` line** — the MutationObserver now picks the change
up, and manually firing a `storage` event was papering over the real problem.

### Hydration

`getServerSnapshot()` must still return something, and the server cannot know the user's theme.
Keep it returning `'light'`, and add **`suppressHydrationWarning`** to the two spans whose
content differs between server and client (the icon and the label). The mismatch is expected and
correct here — the whole point is that the client knows something the server does not.
`<html>` already carries `suppressHydrationWarning` in the layout; this extends the same
treatment to the only other nodes affected.

## Done when

- With OS light and stored dark, the button reads "Switch to light mode" and shows the sun.
- Clicking always visibly changes the theme — no dead clicks in any combination of stored value
  and OS preference.
- Changing the theme in a second tab updates the button in the first.
- No hydration warnings in the console.

---

# B — The mobile menu does not lock the page behind it

Open the menu at 375px and scroll: the page moves behind the panel. The menu stays put while the
content slides underneath it, which reads as broken.

## Fix

Lock scrolling while `menuOpen` is true, in an effect in `Nav.tsx` that cleans up on close **and
on unmount**.

**This site uses Lenis, so `overflow: hidden` alone is not enough** — Lenis drives scrolling
itself and will keep going. Stop Lenis as well:

```ts
useEffect(() => {
  if (!menuOpen) return;

  const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
  const previousOverflow = document.body.style.overflow;

  lenis?.stop();
  document.body.style.overflow = 'hidden';

  return () => {
    lenis?.start();
    document.body.style.overflow = previousOverflow;
  };
}, [menuOpen]);
```

Restoring the *previous* value rather than hardcoding `''` matters — it keeps this effect from
clobbering anything else that might set overflow later.

The menu already closes on Escape and on nav click; both paths flip `menuOpen`, so both unlock.

## Done when

- With the menu open at 375px, the page behind does not move on scroll or swipe.
- Closing by X, by Escape, or by tapping a nav item restores scrolling every time.
- Navigating away with the menu open does not leave the body locked.

---

# C — The hero's numbers are hardcoded and will go stale

`src/components/sections/Hero.tsx` lines 66–67:

```tsx
<span className="hero__proof-item">6 PRODUCTS SHIPPED</span>
<span className="hero__proof-item">3 CLIENT DOMAINS</span>
```

These are string literals. Add a seventh project and the site quietly states something untrue —
in the most prominent claim on the page.

## Fix

`content/projects.ts` already exports `projects` and `getClientProjects()`. Derive both numbers:

```tsx
const productCount = projects.length;
const clientCount  = getClientProjects().length;
```

Render them into the strings. **Handle the singular** — `1 PRODUCT SHIPPED`, `1 CLIENT DOMAIN` —
so the copy cannot read wrong at any count.

Update the strip's `aria-label` to use the same derived values rather than repeating the numbers
as literals; that label is currently a second hardcoded copy of the same facts.

The third item, `WEB · MOBILE · AI`, stays as written — it is a positioning statement, not a
count.

## Done when

- Both numbers come from `content/projects.ts`.
- Adding or removing a project changes the hero with no other edit.
- The `aria-label` matches what is rendered.
- Singular forms are correct.

---

# D — Show which section you are in

The nav has Work / Capabilities / Process / Contact and gives no indication of where the reader
is. On a page this long that is the main thing it should be doing.

## Build

An `IntersectionObserver` in `Nav.tsx` watching the four sections that have nav entries —
`#work`, `#capabilities`, `#process`, `#contact`.

- `rootMargin: '-45% 0px -45% 0px'` so a section becomes active when it crosses the middle of
  the viewport, not when its top edge first appears. Edge-triggered highlighting flickers.
- Track the currently-active id in state; apply it to the matching link in **both** the desktop
  list and the mobile menu.
- Observe only these four. `#hero` and `#testimonials` have no nav entry — while they are on
  screen, nothing is highlighted, and that is correct.

## Clicking must win immediately

When a nav item is clicked, set the active id straight away rather than waiting for the scroll
to arrive. Otherwise the highlight lags behind the click by the whole scroll duration and feels
broken. The existing `handleNavClick` is where this goes.

## Styling

- Active link: `--ink` (inactive stay `--graphite`) plus a 1px `--ink` underline offset 6px.
- Transition colour and underline over 250ms. Under `prefers-reduced-motion`, no transition —
  the state still changes, it just changes instantly.
- Do not move, scale or embolden the active item. Weight changes shift the widths of everything
  beside them and the whole nav jitters as you scroll.

## Accessibility

- `aria-current="true"` on the active link, removed from the others. That is what a screen
  reader uses; colour alone is not an accessible indicator.
- The underline is the non-colour cue for sighted users, which covers the colour-blind case.

## Done when

- Scrolling the homepage highlights exactly one nav item at a time, matching the section at the
  middle of the viewport.
- Nothing is highlighted over the hero or the testimonials.
- Clicking a nav item highlights it instantly, before the scroll finishes.
- The active item carries `aria-current="true"`.
- Nav item widths do not change as the active item moves.
- Works in the mobile menu too.
