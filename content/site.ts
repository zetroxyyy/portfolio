// ─────────────────────────────────────────────────────────────────────────────
// SITE CONFIGURATION
// Global site details and metadata for zetroxy.me
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: 'zetroxy',
  title: 'zetroxy — Full-Stack Developer',

  email: 'hello@zetroxy.me',
  mailtoHref:
    'mailto:hello@zetroxy.me' +
    '?subject=' +
    encodeURIComponent('Project enquiry — zetroxy.me') +
    '&body=' +
    encodeURIComponent(
      'Hi Aaditya,\n\nWhat I need built:\n\n\nRough timeline:\n\n\nBudget range:\n\n\n'
    ),

  location: 'Nepal',

  socials: {
    github: 'https://github.com/zetroxyyy',
  },

  // SEO / meta
  siteUrl: 'https://zetroxy.me',
  ogDescription:
    'Full-stack developer in Kathmandu. I build web products end to end — the public site, the database behind it, and the admin panel the client uses every day.',
} as const;
