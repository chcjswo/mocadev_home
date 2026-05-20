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

