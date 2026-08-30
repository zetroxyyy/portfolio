import type { Metadata } from 'next';
import { JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { LenisProvider } from '@/components/layout/LenisProvider';
import { PageTransition } from '@/components/layout/PageTransition';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { site } from '../../content/site';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
  preload: true,
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif-italic',
  display: 'swap',
  weight: ['400'],
  style: ['italic'],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.name} — Full-Stack Web Developer`,
    template: `%s — ${site.name}`,
  },
  description: site.ogDescription,
  authors: [{ name: site.name, url: site.siteUrl }],
  creator: site.name,
  keywords: [
    'Full-stack web developer',
    'Next.js developer',
    'PostgreSQL',
    'Web application developer Nepal',
    'Custom CMS development',
    'Booking engine development',
    'Admin dashboard developer',
  ],
  openGraph: {
    type: 'website',
    url: site.siteUrl,
    siteName: site.name,
    title: `${site.name} — Full-Stack Web Developer`,
    description: site.ogDescription,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${site.name} — Full-Stack Web Developer`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Full-Stack Web Developer`,
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
  const jsonLdWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.siteUrl,
    description: site.ogDescription,
  };

  const jsonLdPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: site.siteUrl,
    jobTitle: 'Full-Stack Web Developer',
    description: site.ogDescription,
    email: site.email,
    sameAs: [site.socials.github],
    knowsAbout: [
      'Full-Stack Web Development',
      'Next.js',
      'React',
      'PostgreSQL',
      'Prisma',
      'TypeScript',
      'System Architecture',
    ],
  };

  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${instrumentSerif.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Immediate theme initialization to avoid FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.setAttribute('data-theme','dark');}else{document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`,
          }}
        />
        {/* Preconnect for Fontshare CDN */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      </head>
      <body>
        {/* Skip link */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* 1px scroll progress bar at top edge */}
        <ScrollProgress />

        <LenisProvider>
          {/* Main navigation */}
          <Nav />

          {/* Page transition */}
          <PageTransition>
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
          </PageTransition>

          {/* Footer */}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
