// ─────────────────────────────────────────────────────────────────────────────
// SIDE PROJECTS — source-available tools, run locally
// ─────────────────────────────────────────────────────────────────────────────
// Deliberately a different shape from `projects.ts`.
//
// The six entries in projects.ts are shipped products with a public URL, a
// browser-framed screenshot and a full case study. These three are not deployed
// anywhere — they are cloned and run by the reader. So they carry a repo link
// instead of a live link, no cover image, and no case study page.
//
// Keeping them in a separate file and a separate section is the point: it stops
// a prospective client mistaking "clone this and run Docker" for "here is a
// site you can visit right now".
// ─────────────────────────────────────────────────────────────────────────────

export interface SideProject {
  slug: string;
  title: string;
  /** One line. What it is, in the reader's terms — not the architecture. */
  summary: string;
  /** Two or three sentences on the interesting part. */
  detail: string;
  repoUrl: string;
  /** Platform label shown in the card corner — e.g. 'Android app', 'Web + CLI'. */
  platform: string;
  year: string;
  /** How someone actually runs it. Set expectations honestly. */
  runsOn: string;
  license: string;
  stack: string[];
}

export const sideProjects: SideProject[] = [
  {
    slug: 'reels-second-brain',
    title: 'Reels Second Brain',
    summary:
      'Makes a saved Instagram Reels library searchable by what was actually said in the video.',
    detail:
      'Instagram lets you save Reels but gives you no search, no tags, and no transcripts — so a saved library becomes write-only. A Chrome extension scrapes the saved list, a Dockerised Python worker pulls just the audio stream, transcribes it locally with Whisper, and generates summaries and 768-dimension embeddings through a local Ollama instance. A Next.js dashboard then answers questions against the whole library over pgvector.',
    repoUrl: 'https://github.com/zetroxyyy/reels-second-brain',
    platform: 'Monorepo — extension, web, worker',
    year: '2026',
    runsOn: 'Self-hosted · Docker Compose + Supabase',
    license: 'MIT',
    stack: [
      'Next.js 16',
      'Chrome MV3',
      'Python',
      'Docker',
      'Supabase pgvector',
      'Whisper',
      'Ollama',
      'RAG',
    ],
  },
  {
    slug: 'resumiq',
    title: 'Resumiq',
    summary:
      'An Android app that turns a filled-in form and a spoken description into a formatted, exportable CV.',
    detail:
      'Built for job seekers who need a credible CV without design skills — including the Nepal foreign-employment formats that generic resume builders do not carry. Experience can be dictated rather than typed, which matters when the alternative is thumb-typing a career history on a phone. Generation runs on Llama 3.3 70B via Groq; the result stays fully editable section by section before PDF export.',
    repoUrl: 'https://github.com/zetroxyyy/resumiq',
    platform: 'Android app',
    year: '2026',
    runsOn: 'Build locally · Flutter SDK + Firebase project',
    license: 'MIT',
    stack: ['Flutter', 'Dart', 'Groq / Llama 3.3', 'Firebase Auth', 'Firestore', 'Cloudinary'],
  },
  {
    slug: 'fileaxa-to-drive',
    title: 'FileAxa to Drive',
    summary:
      'Moves files from a FileAxa account straight into Google Drive without ever writing them to disk.',
    detail:
      'The obvious build downloads a file, then uploads it — which needs as much free disk as the largest file and falls over on a small server. This one authenticates with FileAxa, resolves the direct link, and pipes the download stream into the Google Drive upload in one pass, so memory stays flat regardless of file size. Credentials are encrypted client-side before they reach the server.',
    repoUrl: 'https://github.com/zetroxyyy/fileaxa-to-drive',
    platform: 'Web app',
    year: '2026',
    runsOn: 'Run locally or self-host · Google OAuth credentials required',
    license: 'MIT',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind', 'NextAuth', 'Google Drive API', 'Docker'],
  },
];
