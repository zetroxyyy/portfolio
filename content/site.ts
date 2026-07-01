// ─────────────────────────────────────────────────────────────────────────────
// SITE CONFIGURATION
// Edit this file to update the global details shown across the site.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: 'zetroxy',

  // REPLACE_ME: One line. Specific. Not a tagline — a statement of craft.
  // e.g. "Front-end engineer and video editor based in Kathmandu."
  tagline: 'Design. Build. Edit.',

  // REPLACE_ME: Your contact email
  email: 'hello@zetroxy.me',

  // REPLACE_ME: Brief bio for the About section (2–3 sentences max — real voice, no fluff)
  bio: [
    'I design interfaces, write the code that ships them, and cut the videos that tell the story.',
    'Three disciplines that inform each other. The edit teaches you pacing. The code teaches you constraints. The design teaches you where to stop.',
  ],

  // REPLACE_ME: Secondary bio paragraph (optional — can be left as empty string to hide)
  bioSecondary: '',

  // Location — shown in footer / about
  // REPLACE_ME: Your city or region
  location: 'Nepal',

  socials: {
    github: 'https://github.com/zetroxyyy',
    // REPLACE_ME: Add or remove social links as needed
    // twitter: 'https://twitter.com/zetroxy',
    // linkedin: 'https://linkedin.com/in/zetroxy',
    // instagram: 'https://instagram.com/zetroxy',
    // youtube: 'https://youtube.com/@zetroxy',
    // behance: 'https://behance.net/zetroxy',
  },

  nav: [
    { label: 'Work', href: '/#work' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ],

  // SEO / meta
  siteUrl: 'https://zetroxy.me',
  ogDescription: 'zetroxy — designer, developer, and video editor. Design. Build. Edit.',
} as const;
