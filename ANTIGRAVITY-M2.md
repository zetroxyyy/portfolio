# zetroxy.me — minimal rebuild, part 2 of 2

Continue on the `minimal` branch, on top of commit `b9e95bb`.

Part 1 built the homepage and it is approved. **Do not change the homepage layout, the type
scale, the colours, the spacing values or `globals.css`'s `:root` block.** Part 2 adds the
inner pages in the same system and fixes two small things on the homepage.

The design language is fixed and already in `src/app/globals.css`: white page, `#111111` text,
`#737373` secondary, `#A3A3A3` meta, `#E5E5E5` rules, `#0E6E4E` accent, Satoshi only, six sizes
(`--t-1` to `--t-6`), eight spacing values (`--s-1` to `--s-8`), 1120px column. **Every new page
uses these and introduces nothing new.** If a page seems to need a seventh size or a ninth gap,
it is being designed wrong — use what exists.

---

# 1 — Two fixes on the homepage

## 1.1 Show each project's homepage screenshot

The homepage currently shows admin and app screens. It should show each project's own homepage.

**Delete the `homeImage` and `homeImageAlt` fields** from the `Project` interface and from all
six entries in `content/projects.ts`. The homepage uses the existing `cover` and `coverAlt`
fields, which are already the homepage screenshots. Update `ProjectRow.tsx` and `page.tsx`
accordingly.

Those app screens are not lost — they are in `built[]` and appear on the case study pages.

## 1.2 The email link opens a prepared message

Add to `content/site.ts`, next to `email`:

```ts
mailtoHref:
  'mailto:hello@zetroxy.me' +
  '?subject=' + encodeURIComponent('Project enquiry — zetroxy.me') +
  '&body=' + encodeURIComponent(
    'Hi Aaditya,\n\nWhat I need built:\n\n\nRough timeline:\n\n\nBudget range:\n\n\n'
  ),
```

Use `site.mailtoHref` in **every** place the email is linked — `Header.tsx`, the intro status
line in `page.tsx`, and `Contact.tsx`. No raw `mailto:` strings anywhere else.

---

# 2 — `/work` — a compact text index

A new route at `src/app/work/page.tsx`. **No images.** The homepage already shows the
screenshots; this page exists to be scanned in five seconds and to list everything in one place.

```
Header

Work                                              --t-2, weight 500
Six products built for clients, and three tools I
maintain in the open.                             --t-4, --ink-2, max-width 560px

CLIENT WORK                                       --t-6, uppercase, --ink-3

┌ hairline top on every row, padding var(--s-3) 0 ─────────────────────┐
│ Dream Adventure                    2026 · Next.js, PostgreSQL        │  row 1
│ Booking and operations platform    Live ↗  ·  Case study →           │  row 2
│ for a Japanese rafting operator.                                     │
└──────────────────────────────────────────────────────────────────────┘
   name  --t-4 weight 500        meta   --t-5 --ink-3
   summary --t-4 --ink-2         links  --t-5 --accent

SOURCE-AVAILABLE TOOLS                            --t-6, uppercase, --ink-3

   same two-line row shape, from content/sideProjects.ts
   right side is just: GitHub ↗

Contact
```

- Six client rows in the homepage order, then the three tools.
- `summary` on a tool row is its existing `summary` string — already short enough.
- Below 640px each row becomes a single column: name, summary, meta, links, in that order.
- The whole page is text, so it needs no images and no motion. Do not add a fade.

---

# 3 — `/work/[slug]` — rebuild the case study from zero

The current page is broken because its styles went with the old stylesheet. **Delete
`src/app/work/[slug]/page.tsx` and rewrite it.** Delete `src/components/project/` entirely —
`MediaBlock.tsx`, `ProjectBand.tsx` and `SideProjectCard.tsx` all belong to the old design.

Build new components in `src/components/case/`. Keep the file count small.

All the content already exists in `content/projects.ts`. Use it; write no new copy.

## Page order — follow this exactly

```
Header

← All work                                        --t-5, --ink-2

Dream Adventure                                   --t-2, weight 500
Booking and operations platform for a             --t-4, --ink-2, max-width 620px
Japanese rafting operator.

┌ meta grid — 4 columns desktop, 2 columns mobile, gap var(--s-4) ─────┐
│  CLIENT          YEAR         ROLE            STATUS                  │  --t-6 --ink-3
│  Dream Adventure 2026         Solo — design,  Live ·                  │  --t-5 --ink
│  — outdoor tour               front-end,      thedreamadventure.com ↗ │
│  operator, Japan              back-end                                │
└───────────────────────────────────────────────────────────────────────┘
   top and bottom hairline, padding var(--s-4) 0, margin-top var(--s-5)

THE PROBLEM                                       --t-6
   the problem[] paragraphs                       --t-4, max-width 680px, gap var(--s-3)

WHAT I BUILT                                      --t-6
   for each entry in built[]:
      heading                                     --t-3, weight 500
      body                                        --t-4, --ink-2, max-width 680px
      image in <BrowserFrame>                     full column width
      caption                                     --t-5, --ink-3, margin-top var(--s-2)
      var(--s-6) between entries

KEY DECISIONS                                     --t-6
   for each entry in decisions[], a two-column row:
      left   01   --t-5 --ink-3, fixed 64px
             heading --t-4 weight 500
      right  body  --t-4 --ink-2, max-width 620px
      hairline between rows, padding var(--s-3) 0

OUTCOME                                           --t-6
   the outcome paragraph                          --t-4, max-width 680px

   the client's testimonial for this project       (section 3.2)

BUILT WITH                                        --t-6
   the stack[] array as plain text, separated by " · "   --t-5, --ink-3

┌ hairline top, padding var(--s-4) 0 ──────────────────────────────────┐
│ ← Nischal Legal Service                     Nexus →                  │   --t-4
└──────────────────────────────────────────────────────────────────────┘
   from getAdjacentProjects(slug), which already exists in content/projects.ts

Contact
```

Section labels (`THE PROBLEM`, `WHAT I BUILT`, …) get `margin-top: var(--s-7)` and
`margin-bottom: var(--s-4)`. That large, consistent gap is what makes the page read as ordered
rather than as a wall.

## 3.1 Images

Use the existing `BrowserFrame` with `url={project.liveUrl}`. **Do not modify `BrowserFrame.tsx`.**
Entries with `isFullScroll: true` get `expandable` so the tall capture stays collapsed until
clicked — that behaviour already works.

A `built[]` entry with no `image` renders as heading and body only. Do not invent an image.

`BrowserFrame` is used here and nowhere else. The homepage keeps its plain bordered images.

## 3.2 The testimonial

Match `content/testimonials.ts` to the project by `slug` (`nexus-mcu` matches the `nexus`
testimonial — handle that one mapping explicitly). If there is no match, render nothing.

```
hairline top and bottom, padding var(--s-5) 0, margin-top var(--s-6)

"<quote>"                     --t-3, weight 500, max-width 760px, line-height 1.45
<translation>                 --t-4, --ink-2, margin-top var(--s-3), max-width 680px
<author> · <role>             --t-5, --ink-3, margin-top var(--s-3)
```

- The quote renders in its original language. Set `lang="ja"` / `lang="ne"` / `lang="en"` on
  the quote element.
- **The Japanese quote contains a client typo (`対応してれる`). Keep it exactly. Do not correct it.**
- Add `--font-jp` and `--font-deva` font stacks to `globals.css` and apply them **only** to the
  quote element on this route, selected by the `lang` attribute. They are not a third and
  fourth typeface for the site; they are fallbacks so Japanese and Devanagari render properly.
- The English testimonial has no `translation` field — render only the quote.

## 3.3 Motion

One fade, same as the homepage: each `built[]` entry fades from `opacity: 0, y: 16px` on enter,
500ms, `once: true`. Nothing else animates. No parallax, no reveals, no accent transitions.

Delete every use of `project.accent`, `accentContrast` and `accentWash` from the page. The
accent on this site is `#0E6E4E` and nothing else. Leave the fields in `projects.ts`.

---

# 4 — `/approach` becomes `/about`, rebuilt from zero

## 4.1 Delete

```
src/app/approach/page.tsx
src/components/approach/Process.tsx
src/components/approach/Capabilities.tsx
src/components/approach/process-anim/        (all four animation files)
```

The whole folder goes. The process animations, the capabilities toolkit and the two-tier skills
list are not coming back in any form.

## 4.2 Build `src/app/about/page.tsx`

```
Header

About                                             --t-2, weight 500

three paragraphs                                  --t-4, max-width 680px, gap var(--s-3)

HOW I WORK                                        --t-6
   four items, 2×2 grid on desktop, stacked on mobile, gap var(--s-5)
      heading   --t-4, weight 500
      body      --t-4, --ink-2
   No icons. No diagrams. No animation. No numbered steps.

WHAT I BUILD WITH                                 --t-6
   five lines, each: LABEL (--t-5, --ink-3, 110px fixed) then the list (--t-5, --ink)
   hairline between lines, padding var(--s-2) 0

Contact
```

**Use this copy. Change any sentence you disagree with, but do not expand it.**

Paragraphs:

> I'm Aaditya Chhetri, a full-stack developer in Kathmandu. I build web products end to end —
> the public site, the database behind it, and the admin panel the client opens every morning.
>
> Most of my work is for small businesses that were running on paper, phone calls and
> spreadsheets. Dream Adventure took every booking by phone and tracked capacity on a sheet.
> Nischal Legal needed staff who work in Nepali to edit their own site without calling anyone.
> The interesting part is rarely the front end.
>
> I work alone, which means one person from the first conversation through to deployment and
> whatever breaks afterwards.

How I work:

> **Scope** — I write down what the system has to do before writing any code, including the
> things it deliberately will not do. Dream Adventure has no online checkout on purpose.
>
> **Build** — One person, start to finish. Nothing is lost in a handoff between a designer, a
> front-end developer and a back-end developer.
>
> **Ship** — Deployed on a real domain with the client's own content and real data in it. Not a
> demo that needs finishing later.
>
> **Hand over** — Every project ships with an admin panel the client's own staff can use.
> Prices, availability, photos, text. They should not need me to change a phone number.

What I build with:

```
FRONT END   Next.js · React · TypeScript · Tailwind
BACK END    Node · PostgreSQL · Prisma · Supabase · Neon
MOBILE      Flutter · Dart
AI          Whisper · Ollama · Groq · pgvector
INFRA       Vercel · Docker · Git
```

## 4.3 Route changes

- `src/components/site/Header.tsx` — `Work` points to `/work`, `About` points to `/about`,
  `Email` uses `site.mailtoHref`.
- `content/site.ts` — update the `nav` array to match.
- `src/app/sitemap.ts` — add `/work` and `/about`, remove `/approach`.
- `next.config.ts` — add a permanent redirect from `/approach` to `/about`, because the old URL
  is indexed. **Keep `images.unoptimized: true` exactly as it is.** The Vercel optimizer quota
  is spent; removing it returns HTTP 402 and every image on the site disappears.

---

# 5 — Verify, then push

```bash
npx tsc --noEmit
npm run lint
npm run build
npm start &
sleep 4
curl -s localhost:3000        | sed 's/<[^>]*>/ /g' | tr -s ' \n' ' ' | wc -w
curl -s localhost:3000/work   -o /dev/null -w "%{http_code}\n"
curl -s localhost:3000/about  -o /dev/null -w "%{http_code}\n"
curl -s localhost:3000/work/dream-adventure -o /dev/null -w "%{http_code}\n"
grep -rn "grayscale\|data-theme\|prefers-color-scheme" src/
grep -rn "components/approach\|components/project" src/
grep -rn "mailto:" src/ | grep -v "site.mailtoHref"
```

Report:

1. Each command's output.
2. The homepage word count — still under 250.
3. That `/work`, `/about` and all six `/work/<slug>` routes return 200.
4. That the last two greps return nothing — no leftover imports, no stray `mailto:` strings.
5. That the Japanese quote still reads `対応してれる`, uncorrected.
6. Whether any horizontal scrollbar appears at 375px on each of the three new page types.
7. How many distinct font sizes render on `/work/dream-adventure`. It must be six or fewer.

Then:

```bash
git push origin minimal
```

The `minimal` branch is already on GitHub and Vercel builds a preview from it, so pushing this
commit updates that preview. Still do not push to `main`.

---

## Do not

- No new npm dependencies.
- Do not change `globals.css`'s `:root` block — no new colours, sizes or spacing values. Adding
  the Japanese and Devanagari font stacks is the single permitted addition.
- Do not modify `BrowserFrame.tsx` or `opengraph-image.tsx`.
- Do not change the homepage layout. Only the two fixes in section 1.
- Do not bring back the process animations, the capabilities toolkit, or a skills list.
- Do not add a hero image to the case study pages. The first image is the first `built[]` entry,
  which is deliberate — it opens on working software rather than a repeat of the homepage shot.
- Do not add testimonials, stats, counters, logos or a call-to-action band to any page.
- Do not add an idea of your own. Everything here was decided and approved.
- No placeholders, no `// TODO`. Write complete files.

**Commit to `minimal`. Stop when step 5 is reported.**
