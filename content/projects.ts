// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS CONTENT
// ─────────────────────────────────────────────────────────────────────────────
// Each entry in this array is one portfolio piece. Add / remove / edit freely.
//
// disciplines: one or more of 'design' | 'build' | 'edit'
// cover:       path under /public — e.g. /images/projects/my-project/cover.jpg
// media:       ordered list of content blocks shown in the case study
// body:        prose sections (rendered with headings + paragraphs)
// ─────────────────────────────────────────────────────────────────────────────

export type Discipline = 'design' | 'build' | 'edit';

export type MediaBlock =
  | { type: 'image'; src: string; alt: string; caption?: string; span?: 'full' | 'half' }
  | { type: 'video'; src: string; poster?: string; caption?: string };

export interface BodySection {
  heading?: string;
  body: string; // plain text — rendered as <p>. Use \n for paragraph breaks.
}

export interface Project {
  slug: string;
  title: string;
  year: string;
  disciplines: Discipline[];
  role: string;
  summary: string;
  cover: string;
  coverAlt: string;
  accentColor?: string; // single hex used ONLY for this project's detail page accent (optional, subtle)
  media: MediaBlock[];
  links?: { label: string; href: string }[];
  body?: BodySection[];
  featured?: boolean; // if true, shown larger in the work grid
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT DATA
// ─────────────────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  // ─── Dream Adventure ───────────────────────────────────────────────────────
  {
    slug: 'dream-adventure',
    title: 'Dream Adventure',
    year: '2026',
    disciplines: ['design', 'build'],
    role: 'Solo — product design, front-end, back-end',
    summary:
      'A full booking and operations platform for an outdoor-adventure company in Minakami, Japan. A multi-step reservation flow with a live availability calendar, combo packages and bilingual JP/EN UI, backed by an admin dashboard for revenue, bookings and scheduling.',
    cover: '/images/projects/dream-adventure/home.png',
    coverAlt: 'Dream Adventure homepage — teal hero with Minakami gorge imagery and booking call-to-action',
    featured: true,
    media: [
      {
        type: 'image',
        src: '/images/projects/dream-adventure/packages.png',
        alt: 'Adventure packages grid — combo tours with pricing and availability indicators',
        span: 'full',
      },
      {
        type: 'image',
        src: '/images/projects/dream-adventure/date.png',
        alt: 'Live availability calendar — date picker for multi-step reservation flow',
        span: 'full',
      },
      {
        type: 'image',
        src: '/images/projects/dream-adventure/dashboard.png',
        alt: 'Admin dashboard — revenue overview, booking timeline and scheduling tools',
        span: 'full',
      },
    ],
    links: [{ label: 'Live', href: 'https://thedreamadventure.com' }],
    body: [
      {
        heading: 'Context',
        body: 'Dream Adventure runs rafting, canyoning and multi-activity tours out of Minakami, Gunma. The brief was to replace a static HTML site and offline booking process with a full reservation platform — bilingual (JP/EN), mobile-first, and operable without a developer.',
      },
      {
        heading: 'Approach',
        body: 'Designed the reservation flow as a linear step-wizard (activity → date → guests → confirmation) to reduce drop-off. The availability calendar pulls live from the backend so over-booking is impossible. The admin dashboard was kept minimal — revenue chart, booking queue, and a per-activity schedule view.',
      },
      {
        heading: 'Outcome',
        body: 'A live booking platform replacing manual email/phone reservations, with a bilingual front-end and a fully self-serve admin panel. Currently live behind a construction page ahead of the 2026 season launch.',
      },
    ],
  },

  // ─── Zetsteal ──────────────────────────────────────────────────────────────
  {
    slug: 'zetsteal',
    title: 'Zetsteal',
    year: '2025',
    disciplines: ['design'],
    role: 'Design — store & landing UI',
    summary:
      'Store and landing design for Zetsteal, a Minecraft product under Zetroxy Systems — pricing, feature and purchase flows in a dark, high-contrast game-UI style.',
    cover: '/images/projects/zetsteal/pricing.png',
    coverAlt: 'Zetsteal pricing page — dark high-contrast game-UI with tiered plan layout',
    featured: false,
    media: [
      {
        type: 'image',
        src: '/images/projects/zetsteal/top.png',
        alt: 'Zetsteal landing hero — above the fold product statement',
        span: 'full',
      },
      {
        type: 'image',
        src: '/images/projects/zetsteal/why.png',
        alt: 'Why Zetsteal — feature highlights and value proposition section',
        span: 'full',
      },
      {
        type: 'image',
        src: '/images/projects/zetsteal/thumbnail.png',
        alt: 'Zetsteal promotional thumbnail',
        span: 'full',
      },
    ],
    // links: [],
    body: [
      {
        heading: 'Context',
        body: 'Zetsteal is a Minecraft server setup sold through Zetroxy Systems. The existing presence was minimal. The goal was a store and landing that felt native to the game-modding aesthetic — dark, high-contrast, dense — without tipping into generic dark-gamer cliché.',
      },
      {
        heading: 'Approach',
        body: 'Used a deep charcoal base with sharp green and white accents to match the Minecraft aesthetic while keeping the UI legible and structured. The pricing page was the primary conversion surface, so hierarchy and plan differentiation got the most attention.',
      },
    ],
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
