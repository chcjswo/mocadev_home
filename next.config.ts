import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Vercel 빌드 안정화: Next 16 기본 Turbopack 대신 package.json build 스크립트에서 --webpack 사용
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
};

export default nextConfig;
