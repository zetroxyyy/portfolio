// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS CONTENT — Verified data for all 6 production builds
// ─────────────────────────────────────────────────────────────────────────────

export type ProjectKind = 'client' | 'independent';

export interface ProjectBuiltItem {
  heading: string;
  body: string;
  image?: string;
  imageAlt?: string;
  caption?: string;
  isFullScroll?: boolean;
}

export interface ProjectDecision {
  heading: string;
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  year: string;
  kind: ProjectKind;
  role: string;
  status: string;
  liveUrl: string;
  accent: string;
  summary: string;
  stack: string[];
  cover: string;
  coverAlt: string;
  problem: string[];
  built: ProjectBuiltItem[];
  decisions: ProjectDecision[];
  outcome: string;
  featured?: boolean;
}

export const projects: Project[] = [
  // ─── 01 · Dream Adventure ──────────────────────────────────────────────────
  {
    slug: 'dream-adventure',
    title: 'Dream Adventure',
    client: 'Dream Adventure — outdoor tour operator, Minakami, Gunma, Japan',
    year: '2026',
    kind: 'client',
    role: 'Solo — product design, front-end, back-end, deployment',
    status: 'Live · thedreamadventure.com',
    liveUrl: 'https://thedreamadventure.com',
    accent: '#0D9488',
    summary:
      'A bilingual booking and operations platform for a Japanese rafting and canyoning operator — public reservation flow, live availability, and a full admin back office.',
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'PostgreSQL',
      'Prisma',
      'NextAuth',
      'next-intl',
      'Tailwind v4',
      'Resend',
      'React PDF',
      'Recharts',
      'Vercel',
    ],
    cover: '/images/projects/dream-adventure/cover.webp',
    coverAlt: 'Dream Adventure homepage — English hero showcasing Tone River rafting in Minakami, Japan',
    problem: [
      'The business took every reservation by phone and email, tracked daily capacity on paper, and operated a static HTML site that could not display real-time availability.',
      'Double-bookings were a recurring operational risk during peak season. The owner — who is not a developer — needed the autonomy to adjust seasonal pricing, block out dates, launch promotional discounts, and generate daily guide manifests without relying on outside technical help.',
    ],
    built: [
      {
        heading: 'Public Booking Flow & Experience Pages',
        body: 'A frictionless, linear booking wizard guiding customers from tour selection to date picking, party size, and instant confirmation. Tour activity pages present detailed difficulty levels, gear requirements, and safety briefings.',
        image: '/images/projects/dream-adventure/rafting.webp',
        imageAlt: 'Dream Adventure rafting activity page with tour specifications and booking CTA',
        caption: 'Rafting activity page — overview, difficulty rating, and departure schedules.',
      },
      {
        heading: 'Canyoning & Multi-Activity Combos',
        body: 'Dedicated tour pages for technical canyoning routes and package deals, allowing guests to combine morning rafting with afternoon canyoning under a single consolidated reservation.',
        image: '/images/projects/dream-adventure/canyoning.webp',
        imageAlt: 'Dream Adventure canyoning activity page highlighting courses and gear',
        caption: 'Canyoning experience page with course breakdowns and equipment checklists.',
      },
      {
        heading: 'Revenue & Operations Dashboard',
        body: 'A centralized admin overview showing real-time revenue trends, booking volume by departure time, and customer acquisition metrics across seasons.',
        image: '/images/projects/dream-adventure/admin-revenue.webp',
        imageAlt: 'Admin revenue dashboard displaying booking analytics and financial charts',
        caption: 'Back-office revenue overview with periodic breakdowns and channel analytics.',
      },
      {
        heading: 'Live Capacity & Departure Control',
        body: 'A real-time availability engine enforcing hard capacity limits (21 guests for rafting, 35 for canyoning) across three daily departures (09:00, 11:30, 13:30). The owner can lock individual slots or whole dates in one click.',
        image: '/images/projects/dream-adventure/admin-availability.webp',
        imageAlt: 'Admin availability calendar with per-slot capacity controls and departure management',
        caption: 'Availability management calendar — per-slot capacity thresholds and blackout controls.',
      },
      {
        heading: 'Daily Guide Manifest & PDF Generation',
        body: 'Server-side PDF generation compiles daily departure manifests grouped by guide, tour time, and guest equipment sizes for river guides standing on the riverbank at 8:00 AM.',
        image: '/images/projects/dream-adventure/admin-manifest.webp',
        imageAlt: 'Daily guide manifest screen showing customer roster grouped by departure',
        caption: 'Daily operational manifest with equipment sizing and one-click PDF export.',
      },
      {
        heading: 'Promotion & Discount Engine',
        body: 'Full coupon and promotional campaign builder supporting percentage discounts, fixed reductions, date-range validity, and per-activity restrictions.',
        image: '/images/projects/dream-adventure/admin-promotions.webp',
        imageAlt: 'Promotion management interface for discount codes and seasonal campaigns',
        caption: 'Promotions manager — custom promo codes, expiration windows, and usage tracking.',
      },
      {
        heading: 'Full Public Experience',
        body: 'The complete public-facing homepage layout, featuring river imagery, tour highlights, customer reviews, and bilingual navigation.',
        image: '/images/projects/dream-adventure/home-full.webp',
        imageAlt: 'Full page layout scroll of the Dream Adventure homepage',
        caption: 'Complete public homepage scroll capture.',
        isFullScroll: true,
      },
    ],
    decisions: [
      {
        heading: 'Japanese at the root, English at /en',
        body: 'Configured next-intl with localePrefix: "as-needed" and disabled browser language detection. The client\'s primary market is domestic Japanese tourism; serving Japanese at the root domain preserved search rankings and eliminated unwanted redirects for local customers.',
      },
      {
        heading: 'No online checkout, on purpose',
        body: 'The operator collects payment upon arrival via cash, card terminal, or domestic bank transfer. Stripe was eliminated entirely to avoid unnecessary transaction fees and API failure modes. The paymentStatus field stores composite states like "PAID - Card Terminal", unifying the admin UI, CSV exports, and accounting reports.',
      },
      {
        heading: 'Strict Japan Standard Time (JST) calculations',
        body: 'Because Vercel serverless functions run across global UTC regions, "today" is explicitly calculated with a +9 hour offset rather than relying on the host system clock. This prevents guides on the river from seeing previous-day manifests.',
      },
      {
        heading: 'Soft deletes and persistent audit logging',
        body: 'Cancellations and guide deactivations utilize soft deletes exclusively. The operational audit log retains complete transaction history to resolve customer inquiries and financial discrepancies.',
      },
    ],
    outcome:
      'Reservations now flow through an automated digital system rather than phone and paper. The owner manages availability, seasonal pricing, and promotions independently, prints daily PDF manifests for field staff, and tracks revenue trends in real time.',
  },

  // ─── 02 · Nischal Legal Service ────────────────────────────────────────────
  {
    slug: 'nischal-legal',
    title: 'Nischal Legal Service',
    client: 'Nischal Legal Service (निस्चल लीगल अफिस) — advocate, notary & mediator, Chitwan, Nepal',
    year: '2026',
    kind: 'client',
    role: 'Solo — front-end, back-end, CMS, deployment',
    status: 'Live · nischallegalservice.com',
    liveUrl: 'https://nischallegalservice.com',
    accent: '#B3222C',
    summary:
      'A bilingual Nepali/English site for a legal practice, with a purpose-built CMS that lets non-technical office staff edit every section of the site themselves.',
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Neon Postgres',
      'Vercel Blob',
      'jose (JWT)',
      'bcrypt',
      'Tailwind v4',
      'Vercel',
    ],
    cover: '/images/projects/nischal-legal/cover.webp',
    coverAlt: 'Nischal Legal Service homepage — bilingual hero in Nepali and English with legal practice areas',
    problem: [
      'A multi-disciplinary legal office needed a credible, modern web presence in both Devanagari Nepali and English to serve local clients and overseas Nepalese.',
      'The practice required frequent updates to practice areas, court procedural guides, photo galleries, and contact channels. WordPress was rejected due to heavy maintenance overhead, plugin vulnerabilities, and an English-only admin interface that alienated staff working primarily in Nepali.',
    ],
    built: [
      {
        heading: 'Bilingual Public Platform',
        body: 'A clean, authoritative public interface presenting legal services, advocate credentials, and procedural information with instant Devanagari Nepali and English switching.',
        image: '/images/projects/nischal-legal/services.webp',
        imageAlt: 'Nischal Legal Service practice areas and legal services breakdown',
        caption: 'Practice areas overview — civil litigation, corporate registration, and mediation.',
      },
      {
        heading: 'Interactive Location & Direct Inquiry',
        body: 'Contact page with embedded mapping for the Bharatpur office, structured consultation request form, and direct WhatsApp and phone action triggers.',
        image: '/images/projects/nischal-legal/contact.webp',
        imageAlt: 'Contact page with embedded map and legal consultation form',
        caption: 'Contact and consultation request interface with interactive map.',
      },
      {
        heading: 'Native Nepali CMS Dashboard',
        body: 'A lightweight, secure administrative back office entirely labelled in Nepali script, allowing office staff to manage messages, website copy, and media without technical friction.',
        image: '/images/projects/nischal-legal/admin-dashboard.webp',
        imageAlt: 'Custom CMS dashboard in Devanagari Nepali showing quick actions and unread messages',
        caption: 'Administrative dashboard — native Nepali UI with inquiry tracking.',
      },
      {
        heading: 'Structured Service & Procedure Editor',
        body: 'Field-level bilingual editor for legal service descriptions and court procedural timelines, with rich text formatting and automatic Devanagari digit conversion.',
        image: '/images/projects/nischal-legal/admin-services.webp',
        imageAlt: 'Bilingual service editor in CMS dashboard',
        caption: 'Service editor — parallel Nepali and English input fields.',
      },
      {
        heading: 'Media & Global Site Settings',
        body: 'Direct image uploads to Vercel Blob with automatic cleanup of replaced files, hero banner configuration, and office contact information management.',
        image: '/images/projects/nischal-legal/admin-settings.webp',
        imageAlt: 'Site settings panel for general configuration and branding',
        caption: 'Site settings — hero configuration, branding assets, and contact metadata.',
      },
      {
        heading: 'Full Page Layout',
        body: 'Full scroll capture of the public homepage displaying legal credentials, court procedure guides, and office overview.',
        image: '/images/projects/nischal-legal/home-full.webp',
        imageAlt: 'Full page layout scroll of Nischal Legal Service',
        caption: 'Complete public homepage layout.',
        isFullScroll: true,
      },
    ],
    decisions: [
      {
        heading: 'Purpose-built CMS over WordPress',
        body: 'The practice required editing a dozen well-defined sections in two languages. A single-row JSONB content model in PostgreSQL paired with tailored admin editors provided exact field control without plugin updates, theme vulnerabilities, or unnecessary database bloat.',
      },
      {
        heading: 'Neon serverless Postgres via HTTP SQL',
        body: 'Traditional database connection pools conflict with serverless function spin-ups. Using Neon\'s HTTP-based SQL client eliminates pool exhaustion entirely, guaranteeing instant response times during low-frequency or spiky traffic.',
      },
      {
        heading: 'Bilingual as a data shape, not a translation layer',
        body: 'Every content field stores a paired Nepali and English record natively. Devanagari digit conversion is applied dynamically at render time. Language preference is persisted in cookies so returning visitors remain on their chosen language.',
      },
    ],
    outcome:
      'The law practice publishes and updates legal content independently in Nepali and English, with zero ongoing platform licensing fees and zero technical intervention.',
  },

  // ─── 03 · Nexus ────────────────────────────────────────────────────────────
  {
    slug: 'nexus-mcu',
    title: 'Nexus',
    client: 'NEXUS — MCU streaming interface and content management system',
    year: '2026',
    kind: 'client',
    role: 'Solo — product design, front-end, back-end, deployment',
    status: 'Live · nexus-mcu.online',
    liveUrl: 'https://nexus-mcu.online',
    accent: '#E11D2F',
    summary:
      'A streaming-grade catalogue interface for the Marvel Cinematic Universe, backed by a custom CMS for managing titles, phases, episodes, and release timelines.',
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Prisma',
      'PostgreSQL',
      'NextAuth',
      'Framer Motion',
      'Tailwind v4',
      'Vercel',
    ],
    cover: '/images/projects/nexus-mcu/cover.webp',
    coverAlt: 'NEXUS homepage hero showcasing Marvel Cinematic Universe streaming interface',
    problem: [
      'Presenting a massive, multi-decade cinematic catalogue — spanning 40+ films, dozens of television series, chronological storylines, and evolving phase structures — in a smooth, cinematic web interface.',
      'Maintaining this interlinked dataset required a purpose-built editorial CMS allowing administrators to manage cast lists, trailer embeds, chronological timelines, and release schedules.',
    ],
    built: [
      {
        heading: 'Cinematic Catalog & Quick-View Modal',
        body: 'A high-performance streaming interface with real-time client-side search, category filtering, and an instant quick-view overlay that displays synopsis, runtime, cast, and trailer without breaking scroll position.',
        image: '/images/projects/nexus-mcu/cover.webp',
        imageAlt: 'NEXUS streaming catalog with featured media banner and title cards',
        caption: 'Catalog browsing interface with featured spotlight and category filters.',
      },
      {
        heading: 'Interactive Chronological Timeline',
        body: 'A timeline view organizing the entire franchise in in-universe story order, grouped by narrative arcs and phases, incorporating pre-MCU foundational titles.',
        image: '/images/projects/nexus-mcu/timeline.webp',
        imageAlt: 'NEXUS chronological timeline layout showing phase groupings',
        caption: 'Chronological timeline with phase milestones and release ordering.',
      },
      {
        heading: 'Upcoming Releases & Watchlist (The Vault)',
        body: 'An upcoming release calendar with countdown timers alongside "The Vault", a local-storage-backed watchlist that tracks watched titles and view progress without requiring an account.',
        image: '/images/projects/nexus-mcu/coming-soon.webp',
        imageAlt: 'Upcoming MCU releases grid with dates and countdowns',
        caption: 'Upcoming slate with release dates and phase designations.',
      },
      {
        heading: 'Full Public Experience',
        body: 'Complete scroll capture of the public homepage displaying featured hero, trending titles, phase collections, and search.',
        image: '/images/projects/nexus-mcu/home-full.webp',
        imageAlt: 'Full page layout scroll of NEXUS catalog homepage',
        caption: 'Complete catalog homepage scroll.',
        isFullScroll: true,
      },
      {
        heading: 'Chronological Scroll View',
        body: 'Full-height view of the complete chronological MCU timeline from Captain America to future phase releases.',
        image: '/images/projects/nexus-mcu/timeline-full.webp',
        imageAlt: 'Full height scroll of the chronological timeline',
        caption: 'Complete chronological timeline layout.',
        isFullScroll: true,
      },
    ],
    decisions: [
      {
        heading: 'Custom TMDB CDN image loader',
        body: 'Poster and backdrop artwork originate from TMDB\'s global CDN, which already provides optimized dimensions (w185, w500, w780, w1280). A custom Next.js image loader maps requested viewport widths directly to the closest safe TMDB bucket, eliminating Vercel image transformation billing while delivering maximum image fidelity.',
      },
      {
        heading: 'High-contrast flat design system',
        body: 'Eliminated drop shadows, borders, and decorative noise in favor of strict aspect ratios, precise typographic hierarchy, and pure black background layers, allowing dense grids of movie poster art to remain clean and legible.',
      },
      {
        heading: 'Client-side instant search and Vault persistence',
        body: 'Implemented an in-memory search index for immediate filtering across hundreds of media entities, with watchlist state persisted to localStorage for zero-latency client state.',
      },
    ],
    outcome:
      'A responsive, streaming-grade media catalog with an administrative management dashboard running on its own production domain.',
  },

  // ─── 04 · Manjushree Overseas ──────────────────────────────────────────────
  {
    slug: 'manjushree',
    title: 'Manjushree Overseas',
    client: 'Manjushree Overseas (P.) Ltd. — international recruitment agency, Kathmandu, Nepal',
    year: '2026',
    kind: 'independent',
    role: 'Solo — design, build, deployment',
    status: 'Live · manjushree.zetroxy.me',
    liveUrl: 'https://manjushree.zetroxy.me',
    accent: '#C8322B',
    summary:
      'A corporate site for a Nepalese overseas recruitment agency placing technical and professional workers across the GCC, Malaysia, Japan, and Europe.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'Vercel'],
    cover: '/images/projects/manjushree/cover.webp',
    coverAlt: 'Manjushree Overseas corporate homepage — institutional header and workforce recruitment overview',
    problem: [
      'Overseas recruitment agencies must establish instant credibility and institutional compliance with international HR directors and foreign hiring managers who will never visit the physical Kathmandu headquarters.',
      'Generic recruitment templates with stock photos fail to communicate government licensing, ethical recruitment standards, trade-testing capabilities, and deployment capacity.',
    ],
    built: [
      {
        heading: 'End-to-End Workforce Solutions',
        body: 'Detailed breakdowns of technical, hospitality, security, and industrial recruitment pipelines, outlining candidate screening and pre-departure orientation.',
        image: '/images/projects/manjushree/services.webp',
        imageAlt: 'Manjushree Overseas recruitment services and sector categories',
        caption: 'Recruitment sectors — technical trades, hospitality, healthcare, and security.',
      },
      {
        heading: 'The Sourcing Advantage & Trade Verification',
        body: 'Comprehensive value proposition detailing Nepal\'s workforce strengths, skills testing certifications, and institutional compliance standards.',
        image: '/images/projects/manjushree/why-nepalese.webp',
        imageAlt: 'Why Nepalese workers section explaining workforce reliability and work ethic',
        caption: 'Sourcing advantage and skill-verification protocols.',
      },
      {
        heading: 'Executive Leadership & Compliance',
        body: 'Board of directors, executive management profiles, and verified government licensing credentials establishing organizational transparency.',
        image: '/images/projects/manjushree/team.webp',
        imageAlt: 'Board of directors and management profiles',
        caption: 'Executive management and compliance leadership.',
      },
      {
        heading: 'Trade Testing & Training Gallery',
        body: 'Photographic documentation of candidate interviews, vocational skills testing, pre-deployment medical assessments, and training facilities.',
        image: '/images/projects/manjushree/gallery.webp',
        imageAlt: 'Trade testing, vocational interviews, and deployment gallery',
        caption: 'Operations gallery — trade testing, candidate interviews, and pre-departure briefings.',
      },
      {
        heading: 'Company Profile & Institutional Vision',
        body: 'In-depth overview of company history, ethical recruitment charter, international partnerships, and operational roadmap.',
        image: '/images/projects/manjushree/about.webp',
        imageAlt: 'About page detailing company history and ethical recruitment values',
        caption: 'Company background, licensing details, and ethical recruitment charter.',
      },
      {
        heading: 'Structured Corporate Sourcing Inquiry',
        body: 'A purposeful B2B inquiry form capturing target destination country, required job categories, worker headcount, and project timeline.',
        image: '/images/projects/manjushree/contact.webp',
        imageAlt: 'Corporate sourcing inquiry form with sector and headcount fields',
        caption: 'B2B inquiry form tailored for employer manpower demands.',
      },
      {
        heading: 'Full Corporate Layout',
        body: 'Full-height scroll capture of the corporate homepage showing hero, services, licensing credentials, and client contact.',
        image: '/images/projects/manjushree/home-full.webp',
        imageAlt: 'Full page scroll capture of Manjushree Overseas homepage',
        caption: 'Complete corporate homepage scroll layout.',
        isFullScroll: true,
      },
    ],
    decisions: [
      {
        heading: 'Institutional restraint over agency polish',
        body: 'Utilized deep corporate navy, crimson accents, dense structured typography, and authentic operational photography to project regulatory stability and professionalism for corporate enterprise clients.',
      },
      {
        heading: 'B2B sales-shaped inquiry architecture',
        body: 'Structured the inquiry form around destination market, industry sector, and headcount requirements, ensuring inbound inquiries provide all necessary quotation data in the initial contact.',
      },
      {
        heading: 'Multi-page static architecture',
        body: 'Implemented a 7-page static route structure (Home, About, Services, Why Nepalese, Team, Gallery, Contact) optimizing crawlability and international loading speeds.',
      },
    ],
    outcome:
      'A complete 7-page institutional web presence deployed as a working proposal, ready for operational deployment.',
  },

  // ─── 05 · Didee ────────────────────────────────────────────────────────────
  {
    slug: 'didee',
    title: 'Didee',
    client: 'Didee — fashion and streetwear retailer, Gongabu, Kathmandu',
    year: '2026',
    kind: 'independent',
    role: 'Solo — design, build, deployment',
    status: 'Live · didee.zetroxy.me',
    liveUrl: 'https://didee.zetroxy.me',
    accent: '#1A1A18',
    summary:
      'A dark editorial storefront for a Kathmandu fashion retailer, with an admin back office for catalogue, categories, bulk pricing, and site settings.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'Vercel'],
    cover: '/images/projects/didee/cover.webp',
    coverAlt: 'Didee fashion storefront homepage — dark editorial aesthetic with contemporary lookbook',
    problem: [
      'A physical streetwear boutique in Kathmandu operated with no digital catalogue. Stock drops, pricing, and collections rotated weekly.',
      'A complex e-commerce platform would be abandoned due to tedious single-item price editing after wholesale shipments. The retailer required a dark editorial lookbook coupled with an ultra-efficient bulk administration interface.',
    ],
    built: [
      {
        heading: 'Editorial Storefront & Lookbook',
        body: 'High-contrast, dark-mode-first aesthetic with full-bleed photography, fluid transitions, and typography tuned for contemporary urban fashion.',
        image: '/images/projects/didee/cover.webp',
        imageAlt: 'Didee editorial storefront featuring new apparel arrivals',
        caption: 'Storefront lookbook — hero drops and new seasonal collections.',
      },
      {
        heading: 'Full-Screen Category Navigation',
        body: 'Immersive full-screen overlay menu allowing customers to navigate across apparel lines: Shop All, Tops, Tees, Dresses, Bags, Shorts, and Footwear.',
        image: '/images/projects/didee/menu.webp',
        imageAlt: 'Full-screen category navigation overlay',
        caption: 'Full-screen collection menu with visual category hierarchy.',
      },
      {
        heading: 'Retail Store & Location Guide',
        body: 'Physical storefront location page with operating hours, map directions, and customer support channels for local in-store pickup.',
        image: '/images/projects/didee/store.webp',
        imageAlt: 'Physical store location page with map and hours',
        caption: 'Store location and operating hours for in-person shopping.',
      },
      {
        heading: 'Product Catalogue Management',
        body: 'Admin interface for adding, editing, and archiving products with image uploads, stock status flags, and category tags.',
        image: '/images/projects/didee/admin-products.webp',
        imageAlt: 'Product catalog admin screen with inventory list',
        caption: 'Product administration — image management, inventory tags, and visibility.',
      },
      {
        heading: 'Bulk Price Matrix Editor',
        body: 'A purpose-built rapid pricing matrix enabling the store owner to update prices across dozens of SKUs in a single spreadsheet-like screen after wholesale restocks.',
        image: '/images/projects/didee/admin-prices.webp',
        imageAlt: 'Bulk price editor matrix in the admin dashboard',
        caption: 'Bulk price update tool — fast price adjustments across multiple inventory items.',
      },
      {
        heading: 'Category & Collection Manager',
        body: 'Administrative tool to create seasonal collections, reorder display hierarchy, and toggle active merchandising lines.',
        image: '/images/projects/didee/admin-categories.webp',
        imageAlt: 'Category management dashboard interface',
        caption: 'Category manager — create, reorder, and activate apparel categories.',
      },
      {
        heading: 'Site Settings & Store Metadata',
        body: 'Centralized controls for store announcements, banner promotions, social links, and contact channels.',
        image: '/images/projects/didee/admin-settings.webp',
        imageAlt: 'Store settings interface for announcements and branding',
        caption: 'Store settings — announcement bars, social channels, and store details.',
      },
      {
        heading: 'Full Storefront Scroll',
        body: 'Complete scroll capture of the public storefront showing hero drop, featured collection grid, and brand statement.',
        image: '/images/projects/didee/home-full.webp',
        imageAlt: 'Full height scroll capture of Didee fashion homepage',
        caption: 'Complete storefront homepage scroll.',
        isFullScroll: true,
      },
    ],
    decisions: [
      {
        heading: 'Bulk price editor as a first-class admin tool',
        body: 'Editing retail prices product by product is the primary reason boutique catalogues go out of date. Building a specialized tabular bulk-edit interface matched the physical retailer\'s workflow following wholesale inventory arrivals.',
      },
      {
        heading: 'Editorial minimalism over generic e-commerce templates',
        body: 'Avoided aggressive sales badges, discount popups, and review widgets in favor of clean photography, bold typography, and a near-black palette that aligns with urban fashion aesthetics.',
      },
    ],
    outcome:
      'A live fashion storefront and back-office management system ready for full catalog deployment.',
  },

  // ─── 06 · My Darling Food ──────────────────────────────────────────────────
  {
    slug: 'mydarlingfood',
    title: 'My Darling Food',
    client: 'My Darling Food — Nepali pickle and achar producer',
    year: '2026',
    kind: 'independent',
    role: 'Solo — design, build, deployment',
    status: 'Live · mydarlingfood.zetroxy.me',
    liveUrl: 'https://mydarlingfood.zetroxy.me',
    accent: '#D97A2B',
    summary:
      'A warm product storefront for a Nepali pickle and achar brand, with filterable categories and product detail.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'Vercel'],
    cover: '/images/projects/mydarlingfood/cover.webp',
    coverAlt: 'My Darling Food storefront — warm artisanal pickle and achar product showcase',
    problem: [
      'An artisanal food producer creating traditional Nepali achar and pickles with premium shelf appeal lacked a focused online presence to present product ingredients, spice profiles, and variety packs.',
      'The brand required a warm, appetizing interface that highlights jar packaging, ingredient authenticity, and easy dietary categorization (vegetarian, meat, fish).',
    ],
    built: [
      {
        heading: 'Appetite-First Storefront',
        body: 'Warm cream aesthetic designed around vivid product photography, highlighting authentic recipes, ingredient sourcing, and flavor profiles.',
        image: '/images/projects/mydarlingfood/cover.webp',
        imageAlt: 'My Darling Food shop hero banner with pickle jars',
        caption: 'Storefront landing — product showcase and brand introduction.',
      },
      {
        heading: 'Dietary & Category Filtering',
        body: 'Instant filtering allowing shoppers to filter products by dietary preferences: Vegetarian, Non-Vegetarian, Fish, and Specialty Pork achar.',
        image: '/images/projects/mydarlingfood/shop-full.webp',
        imageAlt: 'Full catalog scroll of My Darling Food products and jar varieties',
        caption: 'Shop catalog — category filters, pricing, and product cards.',
        isFullScroll: true,
      },
    ],
    decisions: [
      {
        heading: 'Warm cream palette tailored for culinary craft',
        body: 'Adopted a warm organic palette with rich amber and terracotta accents to let natural food packaging and photography stimulate appetite, steering clear of stark tech-style monochromes.',
      },
      {
        heading: 'Transparent concept framing',
        body: 'Maintained clear, honest concept labeling across the public preview banner to demonstrate product capability without implying an official corporate engagement.',
      },
    ],
    outcome:
      'A live, high-conversion product catalog demonstrating artisanal food merchandising on a dedicated subdomain.',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const idx = projects.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  };
}

export function getClientProjects(): Project[] {
  return projects.filter((p) => p.kind === 'client');
}

export function getIndependentProjects(): Project[] {
  return projects.filter((p) => p.kind === 'independent');
}
