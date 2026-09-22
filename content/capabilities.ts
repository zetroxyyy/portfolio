export interface CapabilityItem {
  label: string;
  /** Internal route or external URL. Present = this has been built and shipped. */
  href?: string;
}

export interface CapabilityGroup {
  label: string; // mono, uppercase
  items: CapabilityItem[];
}

export const capabilityGroups: CapabilityGroup[] = [
  {
    label: 'SITES & STORES',
    items: [
      { label: 'A business website', href: '/work/manjushree' },
      { label: 'An online store', href: '/work/mydarlingfood' },
      { label: 'A product catalogue', href: '/work/nexus-mcu' },
      { label: 'A bilingual site', href: '/work/nischal-legal' },
      { label: 'A site your team can edit', href: '/work/nischal-legal' },
    ],
  },
  {
    label: 'SYSTEMS THAT RUN A BUSINESS',
    items: [
      { label: 'A booking system with live availability', href: '/work/dream-adventure' },
      { label: 'An inventory and pricing tool', href: '/work/didee' },
      { label: 'A customer portal' },
      { label: 'An internal dashboard' },
      { label: 'An order and fulfilment flow' },
      { label: 'Role-based staff accounts', href: '/work/dream-adventure' },
    ],
  },
  {
    label: 'MOBILE',
    items: [
      { label: 'An Android app', href: 'https://github.com/zetroxyyy/resumiq' },
      { label: 'A cross-platform app', href: 'https://github.com/zetroxyyy/resumiq' },
      { label: 'Voice input instead of typing', href: 'https://github.com/zetroxyyy/resumiq' },
      { label: 'A mobile front-end on the same database as your site' },
    ],
  },
  {
    label: 'AI & SEARCH',
    items: [
      { label: 'A chatbot that answers from your own documents', href: 'https://github.com/zetroxyyy/reels-second-brain' },
      { label: 'Semantic search across your content', href: 'https://github.com/zetroxyyy/reels-second-brain' },
      { label: 'Automatic transcription and summaries', href: 'https://github.com/zetroxyyy/reels-second-brain' },
      { label: 'An AI document generator', href: 'https://github.com/zetroxyyy/resumiq' },
      { label: 'A model running on your own server, not an API', href: 'https://github.com/zetroxyyy/reels-second-brain' },
    ],
  },
  {
    label: 'UNDER THE HOOD',
    items: [
      { label: 'A custom admin panel', href: '/work/didee' },
      { label: 'A REST API' },
      { label: 'Authentication and user roles', href: '/work/nischal-legal' },
      { label: 'PDF and report generation', href: '/work/dream-adventure' },
      { label: 'Transactional email', href: '/work/dream-adventure' },
      { label: 'A Chrome extension', href: 'https://github.com/zetroxyyy/reels-second-brain' },
      { label: 'A background worker on a schedule', href: 'https://github.com/zetroxyyy/reels-second-brain' },
      { label: 'File upload and storage', href: '/work/nischal-legal' },
      { label: 'A database built for the actual business' },
    ],
  },
];
