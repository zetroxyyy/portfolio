import type { MetadataRoute } from 'next';
import { site } from '../../content/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.ogDescription,
    start_url: '/',
    display: 'standalone',
    theme_color: '#F6F5F2',
    background_color: '#F6F5F2',
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
