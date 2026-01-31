import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Next.js 16: eslint 옵션은 next.config에서 제거됨. 빌드 시 ESLint 스킵은 터미널에서 next build --no-lint 또는 환경변수 사용
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
