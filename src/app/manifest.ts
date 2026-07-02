import type { MetadataRoute } from 'next';

/**
 * Web app manifest — generated via App Router manifest.ts.
 * Next.js auto-injects the <link rel="manifest"> tag.
 * Android-chrome icons are served from /public (not /app).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'zetroxy',
    short_name: 'zetroxy',
    description: 'Design. Build. Edit. — zetroxy.me',
    start_url: '/',
    display: 'standalone',
    theme_color: '#F5F5F3',
    background_color: '#F5F5F3',
    icons: [
      {
        src: '/favicons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
