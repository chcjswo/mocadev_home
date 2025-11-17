import { SeoConfigProps } from '@/types/seo';

// 사이트 기본 SEO 설정
export const seoConfig: SeoConfigProps = {
  defaultTitle: '모카데브 – 개인 앱 개발자',
  titleTemplate: '%s | MokaDev',
  defaultDescription:
    '모카데브가 직접 설계하고 운영하는 생활형 모바일 앱 컬렉션. 랜덤 식당 추천, 포춘 메시지, 푸시 기반 점심 관리까지 한 곳에서 만나보세요.',
  defaultKeywords:
    '모카데브, MokaDev, 개인 개발자, 식당 추천 앱, 포춘쿠키 앱, 점심 추천, 포트폴리오',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://mocadev-home.vercel.app',
  siteName: 'MokaDev',
  defaultImage: '/images/og/home.svg',
  twitterUsername: '@mocadev',
  language: 'ko',
  locale: 'ko_KR',
};

// 페이지별 기본 SEO 설정들
export const pageDefaults = {
  home: {
    title: '모카데브 – 생활을 바꾸는 3개의 실험적인 앱',
    description:
      '랜덤 식당 추천부터 포춘 메시지까지. 모카데브가 만든 모바일 앱과 제작 과정을 한 번에 살펴보세요.',
    keywords: '모카데브, 개인 개발자, 포트폴리오, 앱 다운로드, 모바일 서비스',
  },
  privacy: {
    title: '모카데브 개인정보 처리방침',
    description:
      '모카데브가 서비스하는 밥정너, 포춘쿠키, 점심 뭐 먹지 앱에 적용되는 개인정보 처리방침입니다.',
    keywords: '모카데브 개인정보 처리방침, 개인정보 보호, 약관',
  },
  apps: {
    bapjeongne: {
      title: '밥정너 – 주변 맛집 랜덤 추천',
      description:
        '주변 식당을 식사 취향에 맞춰 랜덤 추천해주는 모카데브의 대표 앱. 3분 안에 점심 고민 끝.',
    },
    'fortune-cookie': {
      title: '포춘쿠키 – 오늘의 메시지',
      description:
        '포춘쿠키를 클릭해 오늘의 운세와 메시지를 받아보세요. 하루를 가볍게 시작하는 감성 앱.',
    },
    'lunch-picker': {
      title: '점심 뭐 먹지 – 스케줄 기반 랜덤 추천',
      description:
        '등록한 식당 목록을 기반으로 요일·시간대별 푸시 알림을 보내주는 스마트 점심 추천 탁상비서.',
    },
  },
} as const;

// Open Graph 기본 이미지 설정
export const defaultOpenGraphImages = {
  home: '/images/og/home.svg',
  default: '/images/og/home.svg',
};

// 구조화된 데이터 템플릿들
export const structuredDataTemplates = {
  // 조직 정보
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    logo: `${seoConfig.siteUrl}/logo.svg`,
    description: seoConfig.defaultDescription,
    sameAs: ['https://github.com/mocadev', 'https://x.com/mocadev'],
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
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    author: {
      '@type': 'Person',
      name: 'MokaDev',
    },
  },
};
