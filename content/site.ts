// ─────────────────────────────────────────────────────────────────────────────
// SITE CONFIGURATION
// Global site details and metadata for zetroxy.me
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: 'zetroxy',
  title: 'zetroxy — Full-Stack Web Developer',
  tagline: 'Full-stack web developer building complete web platforms and the systems that run them.',

  email: 'hello@zetroxy.me',

  bio: [
    'I build complete web platforms and the admin back offices that run them — database to interface, deployed and maintained.',
    'Six live products. Three domains sold to paying clients. Every system is production-ready, accessible, and operable by non-technical teams without calling a developer.',
  ],

  location: 'Nepal',
  locationDetails: 'Built in Nepal. Running worldwide.',

  socials: {
    github: 'https://github.com/zetroxyyy',
  },

  nav: [
    { label: 'Work', href: '/#work' },
    { label: 'Process', href: '/#process' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Start a project', href: '/#contact' },
  ],

  // SEO / meta
  siteUrl: 'https://zetroxy.me',
  ogDescription: 'Full-stack web developer based in Nepal building complete production systems — public sites, booking engines, custom CMSs, and admin dashboards.',
} as const;
