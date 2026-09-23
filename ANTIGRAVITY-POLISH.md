# zetroxy.me — copy leaks, small fixes, and testimonials

**Two phases. Run A first — it is fifteen minutes and it undoes four rounds of regression.
Then B.**

Do not touch `Process.tsx`, `process-anim/`, `Capabilities.tsx`, `ProjectBand.tsx`, or
`public/images/projects/` beyond what each phase names.

Rules: tokens only, no raw hex, both themes correct, `prefers-reduced-motion` honoured. When
done: `npx tsc --noEmit`, `npm run lint`, `npm run build` clean, no horizontal scroll at 375px.

---

# PHASE A — Copy leaks and small fixes

## A1 — The hero subhead still narrows him to booking sites

This is the first paragraph anyone reads on the site, and it survived every round of
repositioning. `src/components/sections/Hero.tsx` line 55:

> `Booking engines, custom CMSs, storefronts, and admin dashboards — front to back, database to interface, deployed and maintained.`

The eyebrow, the proof strip, the page title, the tagline, the bio, the OG description, the SEO
keywords, the Process subhead and the whole Capabilities section were all widened to cover web,
mobile and AI. This line was missed, and it is the most-read sentence on the page.

Replace with:

> **`Websites, mobile apps, and the systems that run them — database to interface, deployed and maintained.`**

The tail is kept deliberately; "database to interface, deployed and maintained" is the strongest
part of the original and it still works.

## A2 — The footer contradicts the page title

`src/components/layout/Footer.tsx` line 39:

> `© {currentYear} {site.name} · Full-Stack Web Development`

The page title is now `zetroxy — Full-Stack Developer`. Drop the word:

> **`© {currentYear} {site.name} · Full-Stack Developer`**

## A3 — The proof strip drops an orphan separator on mobile

At 375px the strip wraps to two lines and the second line begins with a stray `·`, because the
separators are standalone `<span>` elements that wrap independently of the items they separate.

Delete the two `<span className="hero__proof-sep">·</span>` elements from `Hero.tsx` and generate
the separator in CSS instead, so it belongs to the item and wraps with it:

```css
.hero__proof-item + .hero__proof-item::before {
  content: '·';
  color: var(--fog);
  margin-right: var(--space-2);
}
```

Add the matching left margin to the item so spacing stays even. The `aria-label` on the strip
already describes the content, so the separators stay decorative.

## A4 — Add analytics

There is currently no way to tell whether anyone reads past the hero, whether the case studies
get opened, or which project gets clicked.

Add `@vercel/analytics` and mount `<Analytics />` in `src/app/layout.tsx`.

**This is the one permitted new dependency.** It is roughly 1 KB, it is free on the Hobby plan,
and it needs no cookie banner because it stores nothing identifying. Nothing else gets added.

## A5 — Check, do not assume

I flagged case study pages for loading covers belonging to other projects. On re-reading, that
was probably my own error — the network log persists across navigations and I had visited the
homepage in the same tab first.

**Verify before changing anything:** open `/work/didee` in a fresh tab, filter the network panel
for `.webp`, and confirm which images load. If only `didee/*` appears, there is no bug and no
fix is needed. If other projects' covers genuinely load, it will be `<Link>` prefetching on the
prev/next cards — and that is a reasonable trade for instant navigation, so leave it unless the
cost is more than two images.

Do not "fix" this speculatively.

---

# PHASE B — Bring back the testimonials

Three real clients wrote these. Two are in their own language. They were built once and lost in
an unrelated revert, and they are the highest-value unused asset on the site — client
testimonials in three languages prove the international reach rather than asserting it.

## B1 — Placement

Insert between `<Work />` and `<Capabilities />` in `src/app/page.tsx`:

```
Hero → Work → Testimonials → Capabilities → Process
```

The reader has just seen six shipped products. Three clients saying he was good to work with,
immediately after, is the strongest possible sequence. Capabilities and Process then answer
"what else can he do" and "how does this work".

## B2 — Content: `content/testimonials.ts`

```ts
export interface Testimonial {
  slug: string;
  project: string;
  domain: string;
  lang: 'ja' | 'ne' | 'en';   // BCP-47 for the ORIGINAL quote
  langLabel: string;
  quote: string;              // verbatim — never edit
  translation?: string;       // omit when the original is English
  author: string;
  role: string;
}
```

**1 — Dream Adventure** · `thedreamadventure.com` · lang `ja` · label `日本語`

> 私たちの旅行会社のウェブサイトを美しく、そして非常に使いやすく構築していただきました。デザインのセンスが素晴らしいだけでなく、モバイル対応や予約機能の動線も完璧で、サイト公開後はお客様からの問い合わせが目に見えて増えました。コミュニケーションもスムーズで、細かな要望にも迅速に対応してれる非常にプロフェッショナルな開発者です。自信を持ってお勧めします。

Translation: *They built a beautiful and highly user-friendly website for our travel agency. Not
only is their design sense fantastic, but the mobile responsiveness and booking flow are perfect.
Inquiries have visibly increased since the launch. Communication was smooth, and they are a
highly professional developer who quickly responded to our detailed requests. I recommend them
with confidence.*

Author: `Representative` · Role: `The Dream Adventure · Minakami, Gunma, Japan`

**2 — Nischal Legal Service** · `nischallegalservice.com` · lang `ne` · label `नेपाली`

> हाम्रो ल फर्मको वेबसाइट निर्माणको लागि उहाँको काम उत्कृष्ट रह्यो। वेबसाइट एकदमै प्रोफेसनल देखिन्छ र यसले हाम्रा कानुनी सेवाहरूलाई सेवाग्राहीमाझ स्पष्ट रूपमा प्रस्तुत गरेको छ। उहाँको काम गर्ने शैली, समयको पालना र प्राविधिक ज्ञानबाट हामी धेरै सन्तुष्ट छौं। हाम्रो आवश्यकतालाई बुझेर सोही अनुसारको छिटो र सुरक्षित वेबसाइट बनाइदिनुभएकोमा धेरै धेरै धन्यवाद!

Translation: *Their work on building our law firm's website was excellent. The website looks very
professional and clearly presents our legal services to the clients. We are very satisfied with
their working style, punctuality, and technical knowledge. Thank you very much for understanding
our needs and creating a fast and secure website accordingly!*

Author: `Founder / Advocate` · Role: `Nischal Legal Service · Chitwan, Nepal`

**3 — Nexus** · `nexus-mcu.online` · lang `en` · label `English` · no translation

> Building the platform for Nexus MCU required a clean UI, fast load times, and seamless
> navigation, and the final delivery absolutely exceeded our expectations. They took our initial
> concept and turned it into a highly responsive, modern website that handles our traffic
> effortlessly. It is rare to find a developer who perfectly balances technical backend skills
> with such a strong eye for frontend design. Highly recommended for any complex web project.

Author: `Project Lead` · Role: `Nexus MCU`

**Nothing in `quote` may be edited, corrected or tidied.** These are other people's words.

> Note for the owner, not a code change: the Japanese quote contains `対応してれる` where standard
> Japanese would be `対応してくれる`. It is almost certainly a transcription slip. It has been left
> exactly as supplied, because correcting a client's quote is not a developer's call — but a
> Japanese reader will notice it, so it is worth asking the client.

## B3 — Font coverage

Two of these are not Latin script and the site loads **no** Japanese or Devanagari webfont.
Without a stack they fall back to whatever the OS happens to have.

Do **not** add a CJK webfont — that is megabytes for two paragraphs. Add system stacks as tokens:

```css
--font-jp:   'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Yu Gothic',
             'Noto Sans JP', Meiryo, sans-serif;
--font-deva: 'Kohinoor Devanagari', 'Noto Sans Devanagari', 'Mangal',
             'Nirmala UI', sans-serif;
```

Select them off the `lang` attribute on the blockquote, and give each script room:
`lang="ja"` → `line-height: 1.95`; `lang="ne"` → `line-height: 2` (Devanagari needs headroom for
matras). The `lang` attribute must match the script — it drives both the font and the screen
reader's pronunciation.

## B4 — Layout

Section header, matching the established pattern:
- Eyebrow `CLIENT FEEDBACK`, mono, `--mist`
- Heading using `.section-heading--major`: **`What the clients`** + serif italic **`actually said.`**
- Subhead: **`Two of these were written in the client's own language. Shown as written, translated underneath.`**

Three quotes, stacked full width, a hairline between each. Per quote, a two-column grid —
attribution left (~220px), words right:

- **Left:** a language pill (`日本語` / `नेपाली` / `English`) in a rounded outline, then the project
  name and its domain in mono `--mist`
- **Right:** the original quote as a `<blockquote>` with a 2px `--fog` left border, at
  `--text-base`/`--text-md`, `--ink`. Beneath it, a small mono `TRANSLATED` label and the English
  in `--text-sm` `--graphite`. Then the attribution — author in `--ink`, role in mono `--mist`.

The original is the primary element and the translation is visibly secondary. That ordering is
the point: it shows the words as the client wrote them rather than replacing them with an
English paraphrase.

Below 820px: single column, the language pill and project name on one row.

**Motion:** each quote fades up 16px on scroll, staggered 60ms. Nothing else — Process owns the
animation on this page.

**No star ratings, no avatars, no quote-mark graphics, no carousel.** The words and the scripts
carry it.

---

# Done when

- The hero subhead names websites, mobile apps and systems.
- No occurrence of `Full-Stack Web Development` anywhere in the repo.
- The proof strip wraps at 375px with no leading separator.
- `<Analytics />` is mounted and `@vercel/analytics` is the only dependency added.
- A5 was verified in a fresh tab and either fixed or explicitly left alone with a note.
- Three testimonials render between Work and Capabilities.
- The Japanese and Nepali quotes carry correct `lang` attributes and render in a real script font.
- Quotes are verbatim — diff them against this document.
- At 375px everything stacks with no horizontal scroll.
