import type { Metadata } from 'next';
import { Martian_Mono } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/layout/Nav';
import { Playhead } from '@/components/layout/Playhead';
import { Footer } from '@/components/layout/Footer';
import { LenisProvider } from '@/components/layout/LenisProvider';
import { PageTransition } from '@/components/layout/PageTransition';
import { site } from '../../content/site';

// Martian Mono via next/font — declares the --font-mono variable
const martianMono = Martian_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.name} — Design. Build. Edit.`,
    template: `%s — ${site.name}`,
  },
  description: site.ogDescription,
  openGraph: {
    type: 'website',
    url: site.siteUrl,
    siteName: site.name,
    title: `${site.name} — Design. Build. Edit.`,
    description: site.ogDescription,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${site.name} — Design. Build. Edit.`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Design. Build. Edit.`,
    description: site.ogDescription,
    images: ['/og-image.png'],
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
    <html lang="en" className={martianMono.variable} data-scroll-behavior="smooth">
      <head>
        {/* Preconnect for Fontshare CDN */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
      </head>
      <body>
        {/* Skip to main content — keyboard accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <LenisProvider>
          {/* Playhead — the Runtime signature element, fixed left edge */}
          <Playhead />

          {/* Primary navigation */}
          <Nav />

          {/* Page content with cut-style route transitions */}
          <PageTransition>
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
          </PageTransition>

          {/* Footer — shared across all pages */}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
