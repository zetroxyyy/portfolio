import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Disable Next.js image optimization service entirely.
    // All local project images are pre-compressed and pre-sized WebP assets.
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/approach',
        destination: '/about',
        permanent: true,
      },
    ];
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
