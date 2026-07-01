// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS CONTENT
// ─────────────────────────────────────────────────────────────────────────────
// Each entry in this array is one portfolio piece. Add / remove / edit freely.
//
// disciplines: one or more of 'design' | 'build' | 'edit'
// cover:       path under /public — e.g. /images/projects/my-project/cover.jpg
// media:       ordered list of content blocks shown in the case study
// body:        prose sections (rendered with headings + paragraphs)
//
// All fields marked REPLACE_ME must be updated before going live.
// Fields left as placeholder will render a visible "[PLACEHOLDER]" reminder.
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
// Add your real projects below. Keep slugs kebab-case.
// ─────────────────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  // ─── PROJECT 1 ─────────────────────────────────────────────────────────────
  // REPLACE_ME: This is a placeholder. Replace every field with real content.
  {
    slug: 'project-one',
    title: 'REPLACE_ME — Project Title Here', // e.g. "Meridian — Brand & Web Platform"
    year: '2024',
    disciplines: ['design', 'build'], // pick from: 'design' | 'build' | 'edit'
    role: 'REPLACE_ME — e.g. "Design, Frontend Development"',
    summary:
      'REPLACE_ME — One or two sentences. What was built, what problem it solved, what made it distinct. Specific over generic.',
    cover: '/images/projects/placeholder-cover.jpg',
    coverAlt: 'REPLACE_ME — Describe what the cover image shows for accessibility',
    featured: true,
    media: [
      // REPLACE_ME: Add your project images and/or video clips
      {
        type: 'image',
        src: '/images/projects/placeholder-01.jpg',
        alt: 'REPLACE_ME — describe this image',
        span: 'full',
      },
      {
        type: 'image',
        src: '/images/projects/placeholder-02.jpg',
        alt: 'REPLACE_ME — describe this image',
        span: 'half',
      },
      {
        type: 'image',
        src: '/images/projects/placeholder-03.jpg',
        alt: 'REPLACE_ME — describe this image',
        span: 'half',
      },
    ],
    links: [
      // REPLACE_ME: Add live / repo / case-study links
      { label: 'Live site', href: 'https://REPLACE_ME.com' },
      { label: 'GitHub', href: 'https://github.com/zetroxyyy/REPLACE_ME' },
    ],
    body: [
      {
        heading: 'Context',
        body: 'REPLACE_ME — What was the brief? Who was it for? What were the real constraints?\n\nKeep it specific. One honest sentence beats three marketing sentences.',
      },
      {
        heading: 'Approach',
        body: 'REPLACE_ME — What decisions did you make and why? What did you try that didn\'t work? What does "done well" look like for this kind of problem?',
      },
      {
        heading: 'Outcome',
        body: 'REPLACE_ME — What shipped? What changed? Real outcomes only — no fabricated metrics.',
      },
    ],
  },

  // ─── PROJECT 2 ─────────────────────────────────────────────────────────────
  // REPLACE_ME: Video / edit-focused piece
  {
    slug: 'project-two',
    title: 'REPLACE_ME — Film / Edit Title Here', // e.g. "Solstice — Short Documentary"
    year: '2024',
    disciplines: ['edit'], // this one is edit-led
    role: 'REPLACE_ME — e.g. "Cinematography, Editing, Color Grade"',
    summary:
      'REPLACE_ME — What is this film / edit? What was the subject, the mood, the intent? A sentence that makes someone want to watch it.',
    cover: '/images/projects/placeholder-cover.jpg',
    coverAlt: 'REPLACE_ME — describe the cover frame',
    featured: false,
    media: [
      // REPLACE_ME: Replace with your real video embed or MP4
      {
        type: 'video',
        src: '/images/projects/placeholder-reel.mp4', // REPLACE_ME
        poster: '/images/projects/placeholder-cover.jpg', // REPLACE_ME
        caption: 'REPLACE_ME — optional caption for the reel',
      },
    ],
    links: [
      // REPLACE_ME: e.g. Vimeo / YouTube link
      { label: 'Watch on Vimeo', href: 'https://vimeo.com/REPLACE_ME' },
    ],
    body: [
      {
        heading: 'The project',
        body: 'REPLACE_ME — What is this? Real description of the work.',
      },
      {
        heading: 'Process',
        body: 'REPLACE_ME — How did you approach the cut? Any specific techniques, pacing choices, music selection rationale.',
      },
    ],
  },

  // ─── PROJECT 3 ─────────────────────────────────────────────────────────────
  // REPLACE_ME: Cross-discipline piece (design + build + edit — shows range)
  {
    slug: 'project-three',
    title: 'REPLACE_ME — Cross-Discipline Project', // e.g. "Parallax — Design System & Motion Brand"
    year: '2023',
    disciplines: ['design', 'build', 'edit'],
    role: 'REPLACE_ME — "Design, Development, Motion"',
    summary:
      'REPLACE_ME — A project that required all three disciplines. What held it together?',
    cover: '/images/projects/placeholder-cover.jpg',
    coverAlt: 'REPLACE_ME — describe the cover',
    featured: false,
    media: [
      {
        type: 'image',
        src: '/images/projects/placeholder-01.jpg',
        alt: 'REPLACE_ME',
        span: 'full',
      },
    ],
    links: [],
    body: [
      {
        heading: 'Overview',
        body: 'REPLACE_ME — Real description of this project.',
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
