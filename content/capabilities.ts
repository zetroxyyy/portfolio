export interface CapabilityLayer {
  label: string; // mono, uppercase
  core: string[];
  also: string[];
}

export const capabilityLayers: CapabilityLayer[] = [
  {
    label: 'INTERFACE',
    core: ['React 19', 'Next.js App Router', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion'],
    also: ['Radix UI', 'Recharts', 'React Hook Form', 'Zod', 'Lenis'],
  },
  {
    label: 'SERVER & DATA',
    core: ['Node.js', 'PostgreSQL', 'Prisma', 'Server Actions', 'REST route handlers'],
    also: ['Python', 'Neon serverless', 'Supabase', 'Cloud Firestore', 'Raw SQL'],
  },
  {
    label: 'AUTH & SECURITY',
    core: ['NextAuth', 'JWT (jose)', 'bcrypt', 'Role-based access'],
    also: ['Google OAuth 2.0', 'Brute-force lockout', 'CSP headers', 'Client-side encryption'],
  },
  {
    label: 'MOBILE',
    core: ['Flutter', 'Dart', 'Android'],
    also: ['Firebase Auth', 'Firestore', 'Speech-to-text', 'On-device PDF export'],
  },
  {
    label: 'AI & RETRIEVAL',
    core: ['LLM integration', 'RAG pipelines', 'Vector search'],
    also: ['Groq / Llama 3.3', 'Ollama (self-hosted)', 'OpenAI Whisper', 'pgvector', 'Vercel AI SDK'],
  },
  {
    label: 'SHIP & OPERATE',
    core: ['Vercel', 'Git', 'Custom domains & DNS', 'SSL', 'Core Web Vitals'],
    also: ['Docker', 'Vercel Blob', 'Resend', 'Cloudinary', 'Chrome MV3', 'next-intl (i18n)'],
  },
];
