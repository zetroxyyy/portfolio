# zetroxy.me

Personal portfolio — Design · Build · Edit.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS, Framer Motion, and Lenis.
Deployed on Vercel at [zetroxy.me](https://zetroxy.me).

---

## Quick start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:3000

# Production build (verify before deploy)
npm run build && npm run start
```

---

## Adding a project

Open [`content/projects.ts`](./content/projects.ts). Each entry in the `projects` array is one portfolio piece.

### Minimal example

```ts
{
  slug: 'my-project',            // URL: /work/my-project
  title: 'Project Title',
  year: '2025',
  disciplines: ['design', 'build'],  // 'design' | 'build' | 'edit'
  role: 'Design, Development',
  summary: 'One sentence about what this is and why it matters.',
  cover: '/images/projects/my-project/cover.jpg',
  coverAlt: 'Describe the cover image for screen readers',
  featured: true,               // renders larger in the work grid
  media: [
    { type: 'image', src: '/images/projects/my-project/01.jpg', alt: '...', span: 'full' },
    { type: 'image', src: '/images/projects/my-project/02.jpg', alt: '...', span: 'half' },
    { type: 'image', src: '/images/projects/my-project/03.jpg', alt: '...', span: 'half' },
    { type: 'video', src: '/images/projects/my-project/reel.mp4', poster: '/images/projects/my-project/poster.jpg' },
  ],
  links: [
    { label: 'Live site', href: 'https://example.com' },
    { label: 'GitHub', href: 'https://github.com/zetroxyyy/my-project' },
  ],
  body: [
    { heading: 'Context', body: 'What was the brief...' },
    { heading: 'Approach', body: 'What decisions were made...' },
    { heading: 'Outcome', body: 'What shipped...' },
  ],
}
```

### Rules

- `slug` must be unique and kebab-case.
- Images go in `/public/images/projects/<slug>/`. Use `next/image`-compatible paths.
- Order matters: projects appear in array order in the work grid. Put your best/most recent first.
- `featured: true` renders the card wider. Use sparingly — one featured per grid group looks best.

---

## Updating site info

Open [`content/site.ts`](./content/site.ts):

- `name` — displayed in nav and footer
- `tagline` — used in meta descriptions
- `email` — shown in footer CTA
- `bio` — About section paragraphs (array of strings)
- `location` — shown in About
- `socials` — object of `platform: href` pairs; add/remove freely
- `siteUrl` — must match your production domain (used for sitemap + OG)

---

## Swapping fonts

### Display + Body (Cabinet Grotesk / Supreme)
Both are loaded via Fontshare CDN in [`src/app/globals.css`](./src/app/globals.css):

```css
@import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800&display=swap');
@import url('https://api.fontshare.com/v2/css?f[]=supreme@300,400,450,500&display=swap');
```

To self-host (recommended for production performance):
1. Download the fonts from [Fontshare](https://www.fontshare.com).
2. Place the `.woff2` files in `/public/fonts/`.
3. Replace the `@import` with `@font-face` declarations pointing to your files.
4. Update `--font-display` and `--font-body` in `:root`.

**Premium upgrade (licensed):** Neue Montreal (Pangram-Pangram) for display/body. Self-host the `.woff2` and update the vars.

### Mono (Martian Mono)
Loaded via `next/font` in [`src/app/layout.tsx`](./src/app/layout.tsx):

```ts
const martianMono = Martian_Mono({ ... });
```

To swap: change the import to another `next/font/google` font, or use a self-hosted `localFont`.

---

## Swapping the accent color

The cobalt accent (`--signal: #1E3AE0`) is used **only** for:
- The active playhead dot
- Focus rings (`:focus-visible`)

To change it: update `--signal` in [`src/app/globals.css`](./src/app/globals.css).

---

## Palette tokens

All palette lives in `globals.css` as CSS variables. Swap them in one place to retheme:

| Token | Default | Role |
|---|---|---|
| `--paper` | `#F5F5F3` | Background |
| `--ink` | `#111110` | Primary text |
| `--graphite` | `#56564F` | Secondary text |
| `--mist` | `#97968E` | Meta, labels |
| `--fog` | `#C4C4BC` | Borders |
| `--signal` | `#1E3AE0` | Accent (playhead/focus only) |

---

## Deploy to Vercel

1. Push to GitHub (`github.com/zetroxyyy`).
2. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
3. Vercel auto-detects Next.js — no configuration needed.
4. After deploy, go to **Project Settings → Domains → Add → `zetroxy.me`**.
5. Vercel gives you DNS records. Update your Namecheap DNS:
   - **A record**: `@` → Vercel IP (shown in Vercel dashboard)
   - **CNAME**: `www` → `cname.vercel-dns.com`
   - Wait up to 24h for propagation.

For the GitHub CLI:

```bash
gh auth login
gh repo create zetroxyyy/portfolio --public --source=. --remote=origin --push
```

---

## Project structure

```
content/
  site.ts           ← site info, nav, socials
  projects.ts       ← all portfolio projects

src/
  app/
    layout.tsx      ← root layout (fonts, meta, nav, playhead, footer)
    page.tsx        ← homepage
    globals.css     ← design system tokens + all styles
    work/[slug]/
      page.tsx      ← project detail template
    sitemap.ts      ← auto-generated sitemap
    robots.ts       ← robots.txt

  components/
    layout/
      Nav.tsx           ← fixed navigation
      Playhead.tsx      ← Runtime signature element
      Footer.tsx        ← footer
      PageTransition.tsx← cut-style route transitions
      LenisProvider.tsx ← smooth scroll wrapper
    sections/
      Hero.tsx          ← hero section
      Work.tsx          ← filterable work grid
      About.tsx         ← about section
    project/
      ProjectCard.tsx   ← work grid item
      MediaBlock.tsx    ← image/video in case study
    ui/
      HeadingReveal.tsx ← word-by-word heading animation
      FilterBar.tsx     ← discipline filter tabs
      SectionMeta.tsx   ← "01:12 — SELECTED WORK" meta

  lib/
    motionConfig.ts   ← all animation variants + easing curves

  hooks/
    useScrollProgress.ts  ← scroll progress with spring
    useTimecode.ts        ← scroll → timecode string

public/
  fonts/            ← self-host fonts here (optional)
  images/
    projects/       ← project covers and media
  og-image.png      ← Open Graph image
```

---

## Design system notes

The site uses the **"Runtime"** signature: the vocabulary of an edit bay applied to a portfolio.

- **Playhead** — left-edge scroll tracker (like a video timeline scrubber).
- **Timecode section meta** — `01:12 — SELECTED WORK` in mono face.
- **Cut transitions** — route changes feel like edit cuts.

Hierarchy comes from type scale, weight, and space — not color. Chrome stays grayscale. Project thumbnails and reels carry all the color.

---

## License

Not open-source. Personal portfolio — all rights reserved.
