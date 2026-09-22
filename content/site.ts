// ─────────────────────────────────────────────────────────────────────────────
// SITE CONFIGURATION
// Global site details and metadata for zetroxy.me
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: 'zetroxy',
  title: 'zetroxy — Full-Stack Developer',
  tagline: 'Full-stack developer building web and mobile applications, and the systems that run them.',

  email: 'hello@zetroxy.me',

  bio: [
    'I build complete web platforms, mobile applications, and AI-backed systems — from database to interface, deployed and maintained.',
    'Six live products. Three domains sold to paying clients. Every system is production-ready, accessible, and operable by non-technical teams without calling a developer.',
  ],

  location: 'Nepal',
  locationDetails: 'Built in Nepal. Running worldwide.',

  socials: {
    github: 'https://github.com/zetroxyyy',
  },

  nav: [
    { label: 'Work', href: '/#work' },
    { label: 'Capabilities', href: '/#capabilities' },
    { label: 'Process', href: '/#process' },
    { label: 'Contact', href: '/#contact' },
  ],

  // SEO / meta
  siteUrl: 'https://zetroxy.me',
  ogDescription: 'Full-stack developer based in Nepal building production web platforms, native mobile apps, AI pipelines, and custom admin systems.',
} as const;
