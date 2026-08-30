# zetroxy.me — Full Rebuild Brief

You are rebuilding `zetroxy.me`, the portfolio of a **full-stack web developer** based in Nepal. The
repo is already open. This is a **redesign and repositioning**, not a fresh start — keep the stack,
replace the concept.

Work through this document top to bottom. Do not skip the Non-Negotiables. Do not ask me to choose
between options that are already decided here.

---

## 0. Non-negotiables — read these first

1. **The audience is business owners, not engineers.** Nobody visiting this site cares about GitHub
   stars, commit graphs, contribution heatmaps, LeetCode, or badge walls. **Do not build any of
   those.** They want one question answered: *can this person build and ship the thing I need?*
   Everything on the page must serve that question.

2. **This is a full-stack web development portfolio only.** The current site positions three
   disciplines — "Design. Build. Edit." Video editing is being cut entirely. Every trace of it goes:
   the tagline, the hero, the bio, the discipline filter, the `Discipline` type. See §7.

3. **Proof over taste.** The strongest asset is six live, working products. The design's job is to
   present them as *real shipped software*, not as pretty pictures. Screenshots go in **browser
   chrome frames with the real URL visible in the address bar**. This single detail is the most
   important visual decision in the brief — it is what separates "I made a mockup" from "this is
   running in production right now."

4. **Do not invent facts.** Every technical claim in §5 was verified against the actual repos. Do not
   add metrics, client quotes, "300% increase in conversions", team sizes, or awards. If you need
   filler, use less copy instead.

5. **Do not use Vercel image optimization.** The account is on Hobby and is *already over* the image
   transformation quota (6.2K used of 5K). Every image in `public/images/projects/` has already been
   pre-sized and compressed to its final display dimensions. See §6.4 — this is a hard requirement,
   not a preference.

---

## 1. What already exists

**Stack (keep all of it):** Next.js 16.2.9 (App Router), React 19.2.4, TypeScript 5, Tailwind CSS v4,
`framer-motion` ^12, `lenis` ^1.3 (smooth scroll). No new heavy dependencies. You may add
`clsx`/`tailwind-merge` if genuinely useful. Do not add a UI kit, a CMS, or an animation library.

```
content/projects.ts        project data — REWRITE completely (§5)
content/site.ts            global config — REWRITE (§7)
src/app/globals.css        design tokens + all component CSS — REWRITE (§4)
src/app/page.tsx           home — REBUILD (§3)
src/app/work/[slug]/page.tsx   case study — REBUILD (§3.2)
src/app/layout.tsx         fonts, metadata, providers — update (§4.2)
src/components/            sections/, project/, ui/, layout/ — see §3
src/hooks/                 useScramble, useScrollProgress, useTimecode
src/lib/motionConfig.ts    shared easing + durations — keep
public/images/projects/    ALREADY POPULATED with the new assets (§6)
```

**What is good and should survive in spirit:** the CSS custom-property token layer at the top of
`globals.css`, the strict spacing scale, the reduced-motion handling, the skip link, the hairline
borders, the restraint. The bones are solid. The *concept* is what's wrong.

**What is wrong:** three-discipline positioning; only two projects; a `Playhead` / timecode /
"00:00 — INTRO" video-editing metaphor running through the whole UI; a discipline filter with three
options for two projects; grayscale-by-default project covers that hide the one thing worth showing.

---

## 2. Positioning

**Old:** "Design. Build. Edit." — a generalist who does three things.

**New:** A full-stack developer who ships complete production systems — public site *and* the admin
panel the client actually runs the business from. That is the differentiator and it should be
explicit. Most freelance web developers deliver a brochure site. This person delivers booking
engines, CMSs, inventory systems, and bilingual content platforms with real auth, real databases,
and real admin tooling — and every one of them is live on a real domain right now.

**The through-line, stated once in the hero and proven six times below it:**
Six live products. Three domains sold to paying clients. Full-stack — database to interface.

**Tone:** direct, specific, quietly confident. Short sentences. No "passionate about crafting
pixel-perfect experiences." No "let's build something amazing together." No em-dash-heavy AI voice.
No exclamation marks. Write like someone who has shipped things and doesn't need to oversell.

---

## 3. Information architecture

### 3.1 Home — `/`

A single scrolling page. Six sections, in this order.

**§ Hero** — one viewport. Not a wall of text.
- Small mono eyebrow: `FULL-STACK WEB DEVELOPMENT · NEPAL`
- Display headline, 2–3 lines max. Concrete, not aspirational. Something in the register of:
  *"I build the website **and** the system that runs it."* (You may improve the wording; keep the
  claim.) Set the contrasting half in the serif italic (§4.2) — that one typographic move is the
  site's signature.
- One-sentence subhead naming what actually gets built: booking engines, custom CMSs, storefronts,
  admin dashboards — front to back, deployed and maintained.
- A live proof strip, styled as data rather than as marketing: `6 PRODUCTS SHIPPED · 3 CLIENT
  DOMAINS · NEXT.JS + POSTGRES`. Mono, small, hairline-separated.
- One primary action to the work, one quiet `hello@zetroxy.me`.
- **No** stock illustration, no 3D blob, no particle field, no typewriter effect, no "scroll down"
  mouse icon.

**§ Selected work — client engagements** (3 projects)
Section label: `CLIENT WORK` with a one-line qualifier: *Commissioned, shipped, live on the client's
own domain.*

**§ Independent builds** (3 projects)
Section label: `INDEPENDENT BUILDS` with a one-line qualifier: *Self-initiated production builds for
real businesses, made to demonstrate the work. Live on zetroxy.me subdomains.*

> Be straight about this distinction — do not blur the two groups together and do not hide the
> second one. Presented plainly it reads as initiative: this person builds complete systems on spec
> rather than waiting for permission. Presented vaguely it reads as padding. Use the honest label.

**Project band — the core component.** Each project gets a **full-width band**, not a card in a
grid. This is the central structural decision of the redesign. Per band:

- Large index numeral `01`–`06`, mono, low-contrast, set as a background/margin element.
- Project name in display type; client/business name beneath in mono.
- One-sentence problem statement — what the business could not do before.
- The cover screenshot **inside a browser chrome frame** (§4.4) showing the real URL. Screenshots are
  in **full colour** — the covers are the only saturated colour on the page and they must not be
  desaturated. Remove the existing `filter: grayscale(1)` treatment entirely.
- A row of stack chips (mono, hairline border): `Next.js 16` `PostgreSQL` `Prisma` `NextAuth` …
- A live-status row: a small pulsing dot + the domain, linking out with `target="_blank"
  rel="noopener noreferrer"`.
- Two actions: `Read the case study →` (internal) and `Visit live site ↗` (external).

Bands alternate image-left / image-right on desktop; stack image-below-text on mobile. As a band
enters the viewport, the page background picks up a **very faint** wash of that project's accent
(§4.3) — 3–5% opacity maximum. It should register as a mood shift, not a colour change. If you
cannot make it subtle, omit it.

**§ Capabilities** — what actually gets built, in four groups. Short. Not a logo wall of 30 tech
icons, not animated skill bars, not percentage ratings.
- *Product & front-end* — Next.js App Router, React 19, TypeScript, Tailwind, responsive down to
  375px, accessibility, i18n
- *Back-end & data* — PostgreSQL (Neon / Supabase), Prisma, server actions, REST route handlers,
  JWT and NextAuth sessions, bcrypt, role-gated admin
- *Systems* — booking and availability engines, custom CMSs, inventory and pricing tools, PDF
  generation, transactional email, audit logging, blob storage
- *Ship & operate* — Vercel deploys, custom domains, DNS, SEO and metadata, Core Web Vitals,
  post-launch maintenance

**§ Process** — four steps, one line each. Keep it to a single tight row.
`Scope` → `Build` → `Ship` → `Maintain`. State that the client gets an admin panel and can run the
site without calling a developer. That is the actual selling point.

**§ Contact** — the closing moment.
- Large `hello@zetroxy.me` as the primary element (it already is in the current footer; keep that
  energy, it works).
- One line on availability and location: Nepal, works with clients in Japan and internationally.
- GitHub link kept small in the footer only. It is not a selling point here (see §0.1).

### 3.2 Case study — `/work/[slug]`

Six of these, statically generated via `generateStaticParams`. Structure:

1. **Header** — project name, business name, year, one-line summary.
2. **Meta bar** — a hairline-bordered strip: `Role` · `Year` · `Status` · `Stack` · `Live URL`.
3. **Hero image** — the cover in browser chrome, full-bleed within the content column.
4. **The problem** — 2–3 short paragraphs. What the business was doing before and why it failed.
5. **What I built** — the substance. Screenshots interleaved with prose, each with a real caption.
   Public-facing screens first, then the admin panel. **The admin screens are the most persuasive
   images on the site** — they are what proves this is a system and not a template. Give them room.
6. **Technical decisions** — two to four genuine ones, drawn from §5. Name the constraint and the
   call made. This section is what an experienced reader scans for.
7. **Outcome** — what the client can now do that they could not before. No invented metrics.
8. **Live link** + prev/next project navigation.

Use the `*-full.webp` tall scroll images (§6.2) at least once per case study, presented inside a
**fixed-height frame that scrolls internally** (`max-height: 70vh; overflow-y: auto`) so the reader
can scan the whole page design without the article becoming a mile long. Give it a subtle inner
shadow and a scroll hint.

### 3.3 Global chrome

- **Nav** — fixed, minimal. Wordmark left; `Work · Capabilities · Contact` right; hamburger under
  768px. The existing `Nav.tsx` behaviour is fine; restyle it.
- **Scroll progress** — the current left-edge `Playhead` is a video-editing metaphor and its
  `--signal` dot and rotated timecode belong to the old concept. **Delete `Playhead.tsx`,
  `useTimecode.ts`, and `SectionMeta`'s timecode display.** Replace with either a 1px top progress
  bar or nothing at all. Also remove the `padding-left: 20px` playhead gutter on `body` and the
  `left: 20px` offset on `.nav`.
- **Footer** — email, location, GitHub, year. Nothing else.
- **404** — keep, restyle.

---

## 4. Design system

The current palette (`--paper` `#F5F5F3`, `--ink` `#111110`) is genuinely good and should be the
starting point. Keep the near-monochrome canvas; the screenshots supply all the colour. What changes
is the type, the framing, and the structure.

### 4.1 Palette

```
--paper      #F6F5F2   canvas, very slightly warmer than current
--paper-2    #EFEEE9   recessed surfaces, band alternation
--ink        #12110F   primary text
--graphite   #55534C   secondary text
--mist       #918E85   tertiary / mono metadata
--fog        #C7C4BA   dividers
--hairline   rgba(18,17,15,0.10)
--hairline-2 rgba(18,17,15,0.05)
--live       #16A34A   the live-status dot only
```

Per-project accents (§4.3) are the only other colour, and they appear only as faint washes and as the
chrome-frame tab tint.

**Ship a dark mode.** `prefers-color-scheme: dark` plus a manual toggle persisted to `localStorage`.
Define the full light palette on bare `:root`, redefine only the tokens inside
`@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { … } }` and again inside
`:root[data-theme="dark"]`. Never give a colour its only definition inside a media query. Screenshots
sit on light-tinted frames in both themes — do not invert or dim them.

### 4.2 Typography

Three faces, three jobs. This combination is the differentiator — resist substituting Inter.

| Role | Face | Source | Used for |
|---|---|---|---|
| Display | **Satoshi** (variable, 500/700/900) | Fontshare CDN | Headlines, project names, section heads |
| Editorial accent | **Instrument Serif Italic** | Google Fonts | *Only* the emphasised clause in the hero and the opening line of each section. Never for body copy. |
| Mono | **JetBrains Mono** (400/500) | Google Fonts, via `next/font` | Metadata, stack chips, index numerals, URLs, labels |

Body copy runs in Satoshi at a comfortable weight. Drop Cabinet Grotesk, Supreme, and Martian Mono
and remove their imports.

Keep the existing type scale variables and the `--tracking-*` set. Hero: `clamp(2.75rem, 7vw, 6.5rem)`,
`line-height: 0.95`, `letter-spacing: -0.04em`. Body: `1.05rem`, `line-height: 1.7`, max `68ch`.

Use `next/font` for the Google faces so they self-host and do not block render. Give every family a
real fallback stack.

### 4.3 Per-project accents

```
dream-adventure  #0D9488   teal
nexus-mcu        #E11D2F   marvel red
nischal-legal    #B3222C   deep red
manjushree       #C8322B   corporate red
didee            #1A1A18   near-black (fashion)
mydarlingfood    #D97A2B   warm orange
```

Used for: the faint band wash, the browser-frame tab tint, and the case-study page accent. Never for
body text (contrast) and never as a large flat fill.

### 4.4 The browser chrome frame — build this properly

A reusable `<BrowserFrame>` component wrapping every project screenshot. This is the highest-value
component in the build; give it real care.

- Rounded top corners (10px), squared bottom, 1px hairline border, soft grounded shadow.
- A ~36px title bar: three small dots left (use neutral greys tinted with the project accent, not
  literal macOS red/yellow/green), then a pill-shaped address bar, centred-left, containing a small
  lock glyph and the **real URL in mono at ~11px**.
- The screenshot fills the body of the frame at its natural 16:9 ratio.
- Props: `src`, `alt`, `url`, `accent`, `priority`.
- A `variant="mobile"` version (rounded rect, no chrome, notch-less) if you use any mobile shots.
- Frames must scale down cleanly to 375px — at small sizes shrink the title bar and truncate the URL
  with `text-overflow: ellipsis`, never let it wrap.

### 4.5 Motion

Keep `framer-motion` and `lenis`. Restrained and fast throughout.

- Section reveals: opacity + 12–16px rise, 500–650ms, `cubic-bezier(0.16, 1, 0.3, 1)`,
  `viewport={{ once: true }}`.
- Project bands: image scales `1.02 → 1` on entry. Nothing rotates, nothing bounces, nothing parallaxes
  more than ~20px.
- Hero: stagger the eyebrow → headline → subhead → proof strip. Total under 1.2s. The current
  `HeadingReveal` word-by-word clip is good — keep it for the hero headline only, not for every heading.
- Honour `prefers-reduced-motion` for all of it. The existing media query block is a good model.
- No scroll-jacking, no full-screen page transitions, no cursor followers, no magnetic buttons.

---

## 5. Project content — all six, verified

Rewrite `content/projects.ts` entirely. Suggested shape:

```ts
export type ProjectKind = 'client' | 'independent';

export interface Project {
  slug: string;
  title: string;
  client: string;
  year: string;
  kind: ProjectKind;
  role: string;
  status: string;             // e.g. 'Live · thedreamadventure.com'
  liveUrl: string;
  accent: string;             // §4.3
  summary: string;            // one sentence, used on the band
  stack: string[];            // chips
  cover: string;
  coverAlt: string;
  problem: string[];          // paragraphs
  built: { heading: string; body: string; image?: string; imageAlt?: string; caption?: string }[];
  decisions: { heading: string; body: string }[];
  outcome: string;
  featured?: boolean;
}
```

Every image path below **exists on disk already**. Use them exactly as written.

---

### 01 · Dream Adventure — `dream-adventure` — CLIENT

- **Client:** Dream Adventure — outdoor tour operator, Minakami, Gunma, Japan
- **Live:** `https://thedreamadventure.com` · **Year:** 2026 · **Accent:** `#0D9488`
- **Role:** Solo — product design, front-end, back-end, deployment
- **Stack:** Next.js 16 · React 19 · TypeScript · PostgreSQL · Prisma · NextAuth · next-intl ·
  Tailwind v4 · Resend · React PDF · Recharts · Vercel

**Summary:** A bilingual booking and operations platform for a Japanese rafting and canyoning
operator — public reservation flow, live availability, and a full admin back office.

**Problem:** The business took every reservation by phone and email, tracked capacity on paper, and
had a static HTML site that could not show whether a given date was full. Double-bookings were a
routine risk, and the owner — not a developer — needed to change prices, block dates, and run
promotions without calling anyone.

**What I built** (use these images in this order):
- `/images/projects/dream-adventure/cover.webp` — English homepage, Tone River hero
- `/images/projects/dream-adventure/rafting.webp` — rafting activity page
- `/images/projects/dream-adventure/canyoning.webp` — canyoning activity page
- `/images/projects/dream-adventure/admin-revenue.webp` — admin revenue dashboard
- `/images/projects/dream-adventure/admin-availability.webp` — availability calendar with per-slot
  capacity control
- `/images/projects/dream-adventure/admin-manifest.webp` — daily manifest, departures grouped by time
- `/images/projects/dream-adventure/admin-promotions.webp` — promo code builder
- `/images/projects/dream-adventure/home-full.webp` — full homepage scroll (use in the scroll frame)

Real features to describe: a linear booking wizard (activity → date → guests → confirmation);
availability read live from the database so a slot cannot be oversold; capacity of 21 for rafting and
35 for canyoning across three daily departures (09:00 / 11:30 / 13:30); combo packages; a promotion
engine; PDF daily manifests generated server-side; transactional email to guest and owner on every
booking; a full audit log; and a Japanese-default / English site served from one codebase.

**Technical decisions** — use two or three of these, they are all real:
- *Japanese at the root, English at `/en`.* `next-intl` with `localePrefix: "as-needed"` and browser
  language detection deliberately off. The client's primary market is domestic; making Japanese the
  unprefixed default rather than redirecting by `Accept-Language` kept URLs stable for their existing
  SEO and avoided sending Japanese customers to an English page.
- *No online checkout, on purpose.* The operator collects payment on arrival in cash, by card
  terminal, or by bank transfer. Stripe was removed rather than worked around, and `paymentStatus`
  is a string column holding compound values like `"PAID - Card Terminal"` so the admin, the CSV
  export, and the revenue report all read the same field. Building a payment gateway the business
  would never use would have added a failure mode and a fee for nothing.
- *Everything in JST, explicitly.* Vercel's servers are not in Japan, so "today" is computed by
  offsetting UTC by nine hours rather than trusting the host clock. Getting this wrong shows the
  wrong day's manifest to a guide standing at the river at 8am.
- *Soft deletes only.* Bookings cancel, guides deactivate — nothing is destroyed, because the audit
  trail is the record of what the business actually did.

**Outcome:** Reservations run through the site instead of a phone. The owner sets availability,
prices, and promotions without a developer, prints the day's manifest as a PDF, and sees revenue by
period. Live ahead of the 2026 season.

---

### 02 · Nischal Legal Service — `nischal-legal` — CLIENT

- **Client:** Nischal Legal Service (निस्चल लीगल अफिस) — advocate, notary public and mediator,
  Bharatpur, Chitwan, Nepal
- **Live:** `https://nischallegalservice.com` · **Year:** 2026 · **Accent:** `#B3222C`
- **Role:** Solo — front-end, back-end, CMS, deployment
- **Stack:** Next.js 16 · React 19 · TypeScript · Neon serverless Postgres · Vercel Blob · jose (JWT)
  · bcrypt · Tailwind v4 · Vercel

**Summary:** A bilingual Nepali/English site for a legal practice, with a purpose-built CMS that lets
non-technical office staff edit every section of the site themselves.

**Problem:** A legal practice needed a credible web presence in both Devanagari Nepali and English,
and needed to update services, court procedures, gallery photos, and contact details without a
developer. WordPress was the obvious answer and the wrong one — a monolith, a plugin surface, and an
admin interface in English for staff who work in Nepali.

**What I built:**
- `/images/projects/nischal-legal/cover.webp` — bilingual homepage
- `/images/projects/nischal-legal/services.webp` — services and practice areas
- `/images/projects/nischal-legal/contact.webp` — contact page with embedded map
- `/images/projects/nischal-legal/admin-dashboard.webp` — CMS dashboard (interface in Nepali)
- `/images/projects/nischal-legal/admin-services.webp` — service editor
- `/images/projects/nischal-legal/admin-settings.webp` — general settings
- `/images/projects/nischal-legal/home-full.webp` — full homepage scroll

Real features: every content section editable from `/admin` (hero, services, court procedures,
gallery, about, contact, and the bilingual interface labels themselves); image upload straight to
Vercel Blob with automatic deletion of replaced files; a public contact form writing into Postgres
with unread tracking at `/admin/messages`; custom JWT sessions with bcrypt hashing and brute-force
lockout; and a seed script guarded so it cannot overwrite live client-edited content.

**Technical decisions:**
- *A custom CMS instead of WordPress.* The office needed to edit roughly a dozen well-defined
  sections in two languages. A single-row JSONB content model in Postgres plus purpose-built editors
  gave them exactly those fields and nothing else — no plugin updates, no theme conflicts, no attack
  surface, and an admin panel labelled in Nepali.
- *Neon serverless Postgres over a pooled connection.* Serverless functions and traditional
  connection pools fight each other. Neon's HTTP SQL client sidesteps pool exhaustion entirely,
  which matters on a site with spiky, low-volume traffic.
- *Bilingual as a data shape, not a translation layer.* Every content field stores a Nepali/English
  pair, with Devanagari digit conversion applied at render. Language is a cookie-persisted
  preference, so a returning Nepali visitor never lands on English.

**Outcome:** The practice publishes and edits its own content in Nepali, in both languages, with no
recurring platform cost and no developer in the loop.

---

### 03 · Nexus — `nexus-mcu` — CLIENT

- **Client / product:** NEXUS — an MCU streaming interface and content management system
- **Live:** `https://nexus-mcu.online` · **Year:** 2026 · **Accent:** `#E11D2F`
- **Role:** Solo — product design, front-end, back-end, deployment
- **Stack:** Next.js 16 · React 19 · TypeScript · Prisma · PostgreSQL · NextAuth · Framer Motion ·
  Tailwind v4 · Vercel

**Summary:** A streaming-grade catalogue interface for the Marvel Cinematic Universe, backed by a
custom CMS for managing titles, phases, episodes, and release timelines.

**Problem:** Presenting a large, deeply interlinked media catalogue — films, series, episodes,
phases, chronological versus release ordering — as something a person can actually browse, with a
back office capable of maintaining it.

**What I built:**
- `/images/projects/nexus-mcu/cover.webp` — homepage hero
- `/images/projects/nexus-mcu/timeline.webp` — the full chronological timeline
- `/images/projects/nexus-mcu/coming-soon.webp` — upcoming releases grid
- `/images/projects/nexus-mcu/home-full.webp` — full homepage scroll
- `/images/projects/nexus-mcu/timeline-full.webp` — timeline scroll

Real features: a quick-view overlay that opens title detail without a page load or losing scroll
position; instant client-side search across the catalogue; a watchlist ("The Vault") persisted to
`localStorage` with progress tracking; a chronological timeline grouped by phase including the
pre-MCU foundation titles; and an admin panel with full CRUD over media, phases, episodes, cast,
stream overrides, and site settings.

**Technical decisions:**
- *A custom image loader instead of Vercel's optimizer.* Poster and backdrop art comes from TMDB's
  CDN, which already serves pre-rendered size buckets (`w185`, `w500`, `w780`, `w1280`). Routing
  those through Vercel's optimizer would re-transform images that are already optimal and burn
  transformation quota for no gain. A custom `next/image` loader maps the requested width to the
  nearest safe TMDB bucket and returns the CDN URL directly — zero transformations billed, smaller
  payloads, and the loader falls through untouched for anything it does not recognise rather than
  guessing and 404-ing.
- *Flat by design.* No drop shadows, no borders, strict aspect ratios. Depth comes from spacing and
  contrast, which keeps a dense grid of poster art legible instead of noisy.

**Outcome:** A live catalogue with a working back office, running on its own domain.

---

### 04 · Manjushree Overseas — `manjushree` — INDEPENDENT

- **Business:** Manjushree Overseas (P.) Ltd. — international recruitment agency, Kathmandu, Nepal
- **Live:** `https://manjushree.zetroxy.me` · **Year:** 2026 · **Accent:** `#C8322B`
- **Role:** Solo — design, build, deployment
- **Stack:** Next.js 16 · React 19 · TypeScript · Tailwind v4 · Vercel

**Summary:** A corporate site for a Nepalese overseas recruitment agency placing technical and
professional workers across the GCC, Malaysia, Japan, and Europe.

**Problem:** Recruitment agencies are selling trust to foreign employers who will never visit the
office. The site has to read as a credible institutional partner to a hiring manager in Doha or
Osaka — not as a template with stock photos.

**What I built:**
- `/images/projects/manjushree/cover.webp` — homepage hero
- `/images/projects/manjushree/services.webp` — end-to-end workforce solutions
- `/images/projects/manjushree/why-nepalese.webp` — the sourcing-advantage argument
- `/images/projects/manjushree/team.webp` — board of directors and management
- `/images/projects/manjushree/gallery.webp` — operations and sourcing gallery
- `/images/projects/manjushree/about.webp` — about
- `/images/projects/manjushree/contact.webp` — corporate sourcing inquiry form
- `/images/projects/manjushree/home-full.webp` — full homepage scroll

Seven-page corporate structure: home, about, services, why Nepalese, team, gallery, contact — with a
structured corporate sourcing inquiry form rather than a generic "get in touch" box.

**Technical decisions:**
- *Institutional restraint over agency polish.* Navy and red on white, dense factual copy, real
  photography of staff and operations. The audience is a corporate HR department; the design signals
  process and compliance rather than creativity.
- *An inquiry form shaped like the actual sales conversation.* Fields for role type, headcount, and
  destination market, so the first message contains what the agency needs to quote instead of
  starting a five-email thread.

**Outcome:** A complete seven-page corporate site, live and ready to hand over.

*Mark this project's kind as `independent` — self-initiated, built for a real business as a working
proposal rather than a commission.*

---

### 05 · Didee — `didee` — INDEPENDENT

- **Business:** Didee — fashion and streetwear retailer, Gongabu, Kathmandu
- **Live:** `https://didee.zetroxy.me` · **Year:** 2026 · **Accent:** `#1A1A18`
- **Role:** Solo — design, build, deployment
- **Stack:** Next.js 16 · React 19 · TypeScript · Tailwind v4 · Vercel

**Summary:** A dark editorial storefront for a Kathmandu fashion retailer, with an admin back office
for catalogue, categories, bulk pricing, and site settings.

**Problem:** A physical clothing store with no online catalogue. Stock, prices, and categories change
constantly, so any solution the owner cannot update daily — without a developer — is worse than no
solution at all.

**What I built:**
- `/images/projects/didee/cover.webp` — editorial homepage
- `/images/projects/didee/menu.webp` — full-screen category navigation
- `/images/projects/didee/store.webp` — store / location page
- `/images/projects/didee/admin-products.webp` — product catalogue management
- `/images/projects/didee/admin-prices.webp` — bulk price entry
- `/images/projects/didee/admin-categories.webp` — category management
- `/images/projects/didee/admin-settings.webp` — site settings
- `/images/projects/didee/home-full.webp` — full homepage scroll

Real features: a dark editorial storefront with full-screen category navigation (Shop All, Tops, Tee,
Dress, Bags, Shorts, Footwear); an admin panel covering product CRUD, category management, a
bulk-price-entry screen built for updating many items in one pass, and site settings.

**Technical decisions:**
- *A bulk price editor as a first-class screen.* Editing prices one product at a time is how a
  catalogue goes stale. A dedicated grid for entering many prices in one pass matches how the owner
  actually works after a wholesale run.
- *Editorial over e-commerce template.* Near-black canvas, full-bleed photography, restrained type.
  The store sells on look; a conventional product grid with badges and star ratings would undercut it.

**Outcome:** A complete storefront and back office, live and ready to hand over.

*Mark `independent`.*

---

### 06 · My Darling Food — `mydarlingfood` — INDEPENDENT

- **Business:** My Darling Food — Nepali pickle and achar producer
- **Live:** `https://mydarlingfood.zetroxy.me` (redirects to `/shop`) · **Year:** 2026 ·
  **Accent:** `#D97A2B`
- **Role:** Solo — design, build, deployment
- **Stack:** Next.js 16 · React 19 · TypeScript · Tailwind v4 · Vercel

**Summary:** A warm product storefront for a Nepali pickle and achar brand, with filterable
categories and product detail.

**Problem:** A food producer selling a physical product with genuine shelf appeal, and no online
storefront that does the packaging justice.

**What I built:**
- `/images/projects/mydarlingfood/cover.webp` — shop landing
- `/images/projects/mydarlingfood/shop-full.webp` — full shop scroll

A filterable shop (veg / non-veg / fish / pork) with large product photography, pricing, and reviews.

**Technical decisions:**
- *Warm cream canvas, product photography carrying the page.* Food sells on appetite; the interface
  gets out of the way.

**Outcome:** A working storefront, live on its own subdomain.

*Mark `independent`. Note: the live site carries a visible "concept preview — not affiliated"
banner. Keep the framing honest on the case study page; do not imply a commission.*

---

## 6. Images — already prepared, do not regenerate

### 6.1 What is on disk

`public/images/projects/<slug>/` for the six slugs above. 38 files, all WebP, total ~10 MB.

- **`cover.webp`** — 2400×1350, exactly 16:9. Every project has one. Use for the band and the case
  study hero.
- **Section shots** — 2400×1350, 16:9, named for what they show (`admin-revenue.webp`,
  `services.webp`, `menu.webp`, …). Exact filenames are listed per project in §5.
- **`*-full.webp`** — 1400px wide, tall (2400–6000px). Whole-page scroll captures for the scrolling
  frame described in §3.2.

### 6.2 Rules

- Reference paths exactly as written in §5. Do not rename, re-crop, re-compress, or move them.
- Every `next/image` gets explicit `width`/`height` (or `fill` with a ratio-locked parent) — no
  layout shift.
- `priority` on the hero cover only. Everything else lazy.
- Alt text describes what the screen shows, not "screenshot of website".
- `sizes` set correctly on every responsive image.
- `screenshots-source/` at the repo root holds the original PNG captures. It is **gitignored** —
  leave it alone, do not import from it, do not commit it.

### 6.3 Delete these

```
public/images/projects/zetsteal/          entire directory — project is cut
public/images/projects/dream-adventure/dashboard.png
public/images/projects/dream-adventure/date.png
public/images/projects/dream-adventure/home.png
public/images/projects/dream-adventure/packages.png
```
The four PNGs are superseded by the WebP set. Also remove any stray `.DS_Store` files and add
`.DS_Store` to `.gitignore` if it is not already covered.

### 6.4 Do not use Vercel image optimization — hard requirement

The Vercel account is on Hobby and is **already over** the image transformation quota (6.2K of 5K).
Once exceeded, new optimizations return **HTTP 402** and images silently fail to render. Every asset
in `public/images/projects/` has already been resized and compressed to its final display dimensions,
so routing them through the optimizer would cost quota and deliver nothing.

Add to `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
};
```

Keep using the `next/image` component (you still get lazy loading, `sizes`, and the width/height
contract that prevents layout shift) — it just serves the files as-is. If you prefer a passthrough
custom loader over the global flag, that is acceptable, but the global flag is simpler here because
every image on this site is a local pre-optimized asset.

Confirm after building that no request hits `/_next/image?url=…`.

---

## 7. Everything to delete or rewrite

**`content/site.ts`** — rewrite:
- `tagline` — currently `'Design. Build. Edit.'` → a full-stack development statement
- `bio` — currently three-discipline copy about editing teaching pacing → rewrite around building
  complete systems for real businesses
- `ogDescription` — currently "designer, developer, and video editor" → rewrite
- Remove every `REPLACE_ME` comment
- Keep `email: 'hello@zetroxy.me'`, `siteUrl`, `location: 'Nepal'`, the GitHub link
- Update `nav` to `Work · Capabilities · Contact`

**`content/projects.ts`** — delete the Zetsteal entry and the entire `Discipline` type. Replace with
the schema in §5.

**Components to delete outright:**
- `src/components/layout/Playhead.tsx` — video-editing scroll metaphor
- `src/hooks/useTimecode.ts` — only used by Playhead and SectionMeta
- `src/components/ui/FilterBar.tsx` — the design/build/edit filter is gone; six projects in two
  labelled groups need no filter

**Components to rewrite:** `Hero`, `Work`, `About` → `Capabilities`, `ProjectCard` → `ProjectBand`,
`SectionMeta` (drop the timecode, keep a mono section label), `MediaBlock` (add the scrolling frame
variant), `Footer`, `Nav`.

**CSS to remove from `globals.css`:** the entire `.playhead*` block, `.hero__spine` and
`.hero__discipline`, `.filter-bar*`, `.discipline-tag*`, `.placeholder-cover*`, the
`body { padding-left: 20px }` gutter, `.nav { left: 20px }`, and the
`.project-card__img { filter: grayscale(1) }` treatment.

**Copy to purge site-wide:** any occurrence of "edit", "editing", "video", "three disciplines",
"Design. Build. Edit." Grep for them before you finish.

---

## 8. Quality bar

**Responsive** — real layouts at **375px**, 768px, 1280px, 1920px. 375 is the primary target, not an
afterthought. Nothing scrolls horizontally. Browser frames and tables stay inside
`overflow-x: auto` containers.

**Accessibility**
- Semantic landmarks; one `<h1>` per page; heading levels never skip.
- Visible focus on everything interactive — never `outline: none` without a `focus-visible`
  replacement. The existing `:focus-visible` rule is the right pattern.
- Real alt text on every image (§6.2). Decorative elements get `aria-hidden`.
- Keep the skip link.
- Full keyboard operation, including the mobile menu (Escape closes, focus trapped while open,
  focus returned on close).
- `prefers-reduced-motion` honoured everywhere.
- Text contrast ≥ 4.5:1 in both themes. Check `--mist` on `--paper` specifically; darken it if it
  fails.

**Performance**
- LCP under 2.0s on the homepage. The hero must not wait on a font or an image.
- Zero CLS — every image and frame has reserved dimensions.
- Fonts via `next/font` with `display: swap`.
- Server Components by default; `"use client"` only where state, effects, or handlers require it.
  Push it down to the smallest possible leaf — the current `Work.tsx` makes the whole section a
  client component just to read two media queries, which should be CSS instead.
- Six case studies statically generated.

**SEO**
- Per-page `metadata` with real titles and descriptions; the root layout template stays.
- OG image per case study (reuse the project cover — the existing `/og-image.png` covers the home).
- `sitemap.ts` and `robots.ts` already exist — update the sitemap to emit all six case study routes.
- JSON-LD: `Person` on the home page, `WebSite` in the layout.
- Canonical URLs.

**Code**
- TypeScript strict, zero `any`. `npx tsc --noEmit` and `npm run lint` must both pass clean.
- No placeholders, no `// TODO`, no stubbed sections, no "rest of file unchanged". Write complete
  files.
- Design tokens stay in `globals.css` as CSS custom properties. No raw hex in component files —
  per-project accents come from the project data and are passed as CSS custom properties on the
  element, which is the legitimate use of inline `style`.

---

## 9. Definition of done

- [ ] `npm run build` succeeds; `npx tsc --noEmit` and `npm run lint` are clean
- [ ] Six projects render on the home page in two labelled groups (3 client, 3 independent)
- [ ] Six case study pages build statically and are reachable from the home page
- [ ] Every image path in §5 resolves — no broken images, no 404s in the network tab
- [ ] No network request to `/_next/image` anywhere on the site (§6.4)
- [ ] Zetsteal is gone from the data, the images, and the build output
- [ ] Grep for `edit`, `video`, `discipline`, `Playhead`, `timecode` returns nothing meaningful
- [ ] Every screenshot appears inside a `BrowserFrame` showing its real URL
- [ ] Screenshots are in full colour — no grayscale filter anywhere
- [ ] Dark mode works, is toggleable, and persists
- [ ] 375px renders with no horizontal scroll and no overlapping text
- [ ] Keyboard-only pass: reach every link and button, mobile menu opens and closes, focus is always visible
- [ ] Lighthouse ≥ 95 on Performance, Accessibility, Best Practices, SEO
- [ ] No invented metrics, testimonials, client logos, or awards anywhere on the site

---

## 10. Build order

1. Delete what §7 says to delete. Get the build passing with a stripped-down page first.
2. Rewrite `globals.css` tokens and `layout.tsx` fonts. Verify light and dark.
3. Build `BrowserFrame` in isolation and get it right at 375px and 1920px before anything depends on it.
4. Rewrite `content/site.ts` and `content/projects.ts` with all six projects from §5.
5. Build `ProjectBand`, then the two work sections.
6. Build the Hero, Capabilities, Process, Contact.
7. Build the case study template, verify all six.
8. Metadata, sitemap, JSON-LD, OG images.
9. Accessibility and responsive pass at all four widths.
10. Lighthouse, then the §9 checklist.
