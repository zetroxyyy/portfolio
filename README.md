# zetroxy.me

Portfolio of Aaditya Chhetri — full-stack developer in Kathmandu.
Six production web platforms built for clients in Japan and Nepal, with case studies.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · framer-motion · lenis
Deployed on Vercel at [zetroxy.me](https://zetroxy.me).

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # verify before pushing
```

## Notes

- `images.unoptimized: true` in `next.config.ts` must stay. The Vercel image optimizer
  quota is exhausted and `/_next/image` returns HTTP 402 — without it every image
  silently disappears.
- Content lives in `content/` — projects, side projects, testimonials, site config.
- The design system is the `:root` block in `src/app/globals.css`: five colours,
  six type sizes, eight spacing values, one typeface. Nothing outside those lists.
