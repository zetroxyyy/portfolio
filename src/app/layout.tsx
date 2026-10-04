import type { Metadata } from 'next';
import './globals.css';
import { LenisProvider } from '@/components/layout/LenisProvider';
import { Analytics } from '@vercel/analytics/next';
import { site } from '../../content/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.name} — Full-Stack Developer`,
    template: `%s — ${site.name}`,
  },
  description: site.ogDescription,
  authors: [{ name: site.name, url: site.siteUrl }],
  creator: site.name,
  keywords: [
    'Full-stack developer',
    'Flutter Android developer',
    'Mobile app development',
    'LLM integration & RAG',
    'Next.js developer',
    'PostgreSQL & pgvector',
    'Web & mobile developer Nepal',
  ],
  openGraph: {
    type: 'website',
    url: site.siteUrl,
    siteName: site.name,
    title: `${site.name} — Full-Stack Developer`,
    description: site.ogDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Full-Stack Developer`,
    description: site.ogDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect for Fontshare CDN */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
      </head>
      <body>
        {/* Skip link */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <LenisProvider>
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
        </LenisProvider>

        <Analytics />
      </body>
    </html>
  );
}
