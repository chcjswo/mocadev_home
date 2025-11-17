import { SeoConfigProps } from '@/types/seo';

// 사이트 기본 SEO 설정
export const seoConfig: SeoConfigProps = {
  defaultTitle: '바이브코딩 올인원 스타터킷',
  titleTemplate: '%s | 바이브코딩 스타터킷',
  defaultDescription:
    '수강생들의 개발 시간을 70% 단축시키는 Next.js 올인원 템플릿. UI, SEO, 배포 설정까지 기본기가 갖춰진 스타터킷.',
  defaultKeywords:
    '바이브코딩, 스타터킷, Next.js, React, TypeScript, SEO 최적화, 웹 개발, 프론트엔드',
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL || 'https://mocadev_home.vercel.app',
  siteName: '바이브코딩 스타터킷',
  defaultImage: '/og-image.jpg',
  twitterUsername: '@vibecoding',
  language: 'ko',
  locale: 'ko_KR',
};

// 페이지별 기본 SEO 설정들
export const pageDefaults = {
  home: {
    title: '개발 시간 70% 단축 올인원 스타터킷',
    description: 'UI 컴포넌트, SEO, 배포 파이프라인까지 모두 갖춘 완성형 개발 환경',
    keywords: '웹 개발 스타터킷, Next.js 템플릿, React 보일러플레이트, 빠른 개발',
  },
} as const;

// Open Graph 기본 이미지 설정
export const defaultOpenGraphImages = {
  home: '/images/og/home.jpg',
  default: '/images/og/default.jpg',
};

// 구조화된 데이터 템플릿들
export const structuredDataTemplates = {
  // 조직 정보
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    logo: `${seoConfig.siteUrl}/logo.png`,
    description: seoConfig.defaultDescription,
    sameAs: [
      // 소셜 미디어 링크들 (실제 링크로 교체 필요)
      'https://github.com/vibecoding',
      'https://twitter.com/vibecoding',
    ],
  },

  // 웹사이트 정보
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    description: seoConfig.defaultDescription,
    inLanguage: seoConfig.language,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${seoConfig.siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },

  // 소프트웨어 애플리케이션 정보
  softwareApplication: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: seoConfig.siteName,
    description: seoConfig.defaultDescription,
    url: seoConfig.siteUrl,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    author: {
      '@type': 'Organization',
      name: '바이브코딩',
    },
  },
};
