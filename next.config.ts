import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow next/image to serve images from the public directory
    // Add remote domains here if using external image hosts
    formats: ['image/avif', 'image/webp'],
  },
  // Compiler options for performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
