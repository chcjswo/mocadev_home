import { SeoConfigProps } from '@/types/seo';

// 사이트 기본 SEO 설정
export const seoConfig: SeoConfigProps = {
  defaultTitle: '모카데브 – 개인 앱 개발자',
  titleTemplate: '%s | 모카데브',
  defaultDescription:
    '밥정너, 포춘쿠키, 점심 뭐 먹지, 우리아기 투약일기, 날씨다냥, 어르신 투약일지, 레시피창고. 모카데브가 직접 설계하고 운영하는 생활형 모바일 앱 컬렉션.',
  defaultKeywords:
    '모카데브, Mocadev, 밥정너, 포춘쿠키, 점심 뭐 먹지, 우리아기 투약일기, 날씨다냥, 어르신 투약일지, 레시피창고, 인디 개발자, 모바일 앱, iOS 앱, Android 앱, 포트폴리오',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://mocadev-home.vercel.app',
  siteName: 'Mocadev',
  defaultImage: '/images/og/home.svg',
  twitterUsername: '@mocadev',
  language: 'ko',
  locale: 'ko_KR',
};

// 구조화된 데이터 템플릿들
export const structuredDataTemplates = {
  // 조직 정보
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${seoConfig.siteUrl}/#organization`,
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${seoConfig.siteUrl}/logo.svg`,
      width: 200,
      height: 200,
    },
    description: seoConfig.defaultDescription,
    sameAs: ['https://github.com/mocadev'],
  },

  // 웹사이트 정보
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${seoConfig.siteUrl}/#website`,
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    description: seoConfig.defaultDescription,
    inLanguage: ['ko', 'en'],
    publisher: { '@id': `${seoConfig.siteUrl}/#organization` },
  },

  // 소프트웨어 애플리케이션 정보
  softwareApplication: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: seoConfig.siteName,
    description: seoConfig.defaultDescription,
    url: seoConfig.siteUrl,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    author: {
      '@type': 'Person',
      name: 'Mocadev',
    },
  },
};
