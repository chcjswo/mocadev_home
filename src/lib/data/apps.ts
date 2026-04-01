import { StructuredDataProps } from '@/types/seo';
import { seoConfig } from '@/lib/seo/config';

export type IntroVariant = 'bapjeongne' | 'standard' | 'cat-weather';

export interface AppIntroConfig {
  variant: IntroVariant;
  accentColorClass: string;
}

export interface AppBaseData {
  slug: 'bapjeongne' | 'fortune-cookie' | 'lunch-picker' | 'baby-med-diary' | 'cat-weather' | 'senior-care-diary' | 'recipehouse';
  heroImage: string;
  theme: { accent: string; gradientFrom: string; gradientTo: string };
  icon: string;
  storeLinks: { platform: 'ios' | 'android'; url: string }[];
  screenshotSrcs: string[];
  featureIcons: string[];
  featureCount: number;
  usageCount: number;
  screenshotCount: number;
  qnaCount: number;
  hasMessageExamples: boolean;
  messageExampleCount: number;
  hasTestimonials: boolean;
  testimonialCount: number;
  introBannerSrc?: string;
  introConfig?: AppIntroConfig;
}

export const appsBaseData: AppBaseData[] = [
  {
    slug: 'bapjeongne',
    heroImage: '/images/apps/bobjeongneo/icons/icon.png',
    theme: { accent: '#7C3AED', gradientFrom: '#ede9fe', gradientTo: '#c7d2fe' },
    icon: '🍱',
    storeLinks: [
      { platform: 'ios', url: 'https://apps.apple.com/kr/app/%EB%B0%A5%EC%A0%95%EB%84%88/id6755356516' },
      { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.mocadev.bobjeongneo' },
    ],
    screenshotSrcs: [
      '/images/apps/bobjeongneo/screenshot/Simulator-Screenshot---iPhone-17-Pro-Max---2025-11-10-at-20.50.33.png',
      '/images/apps/bobjeongneo/screenshot/Simulator-Screenshot---iPhone-17-Pro-Max---2025-11-10-at-20.50.51.png',
      '/images/apps/bobjeongneo/screenshot/Simulator-Screenshot---iPhone-17-Pro-Max---2025-11-10-at-20.50.59.png',
      '/images/apps/bobjeongneo/screenshot/Simulator-Screenshot---iPhone-17-Pro-Max---2025-11-10-at-20.51.07.png',
    ],
    featureIcons: ['📍', '🗺️', '📊'],
    featureCount: 3,
    usageCount: 3,
    screenshotCount: 4,
    qnaCount: 3,
    hasMessageExamples: false,
    messageExampleCount: 0,
    hasTestimonials: false,
    testimonialCount: 0,
    introBannerSrc: '/images/apps/bobjeongneo/ChatGPT-Image-2025년-11월-25일-오전-01_17_08.png',
    introConfig: { variant: 'bapjeongne', accentColorClass: 'text-purple-600' },
  },
  {
    slug: 'fortune-cookie',
    heroImage: '/images/apps/fortune-cookie/icons/icon.png',
    theme: { accent: '#ec4899', gradientFrom: '#ffe4e6', gradientTo: '#fde68a' },
    icon: '🥠',
    storeLinks: [
      { platform: 'ios', url: 'https://apps.apple.com/kr/app/fortune-cookie/id6755540351' },
      { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.mocadev.fortunecookie' },
    ],
    screenshotSrcs: [
      '/images/apps/fortune-cookie/screenshot/preview-1.png',
      '/images/apps/fortune-cookie/screenshot/preview-2.png',
      '/images/apps/fortune-cookie/screenshot/preview-3.png',
      '/images/apps/fortune-cookie/screenshot/preview-4.png',
    ],
    featureIcons: ['🌈', '🎧', '✨'],
    featureCount: 3,
    usageCount: 3,
    screenshotCount: 4,
    qnaCount: 3,
    hasMessageExamples: true,
    messageExampleCount: 4,
    hasTestimonials: false,
    testimonialCount: 0,
  },
  {
    slug: 'lunch-picker',
    heroImage: '/images/apps/lunch-pick/icons/icon.png',
    theme: { accent: '#0ea5e9', gradientFrom: '#cffafe', gradientTo: '#dbeafe' },
    icon: '🍽️',
    storeLinks: [
      { platform: 'ios', url: 'https://apps.apple.com/kr/app/%EC%A0%90%EC%8B%AC%EC%9A%94%EC%A0%95/id6755688150' },
      { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.mocadev.lunchpick&pli=1' },
    ],
    screenshotSrcs: [
      '/images/apps/lunch-pick/screenshot/preview-1.png',
      '/images/apps/lunch-pick/screenshot/preview-2.png',
      '/images/apps/lunch-pick/screenshot/preview-3.png',
      '/images/apps/lunch-pick/screenshot/preview-4.png',
      '/images/apps/lunch-pick/screenshot/preview-5.png',
      '/images/apps/lunch-pick/screenshot/preview-6.png',
      '/images/apps/lunch-pick/screenshot/preview-8.png',
    ],
    featureIcons: ['📝', '🔔', '✏️', '🎨'],
    featureCount: 4,
    usageCount: 3,
    screenshotCount: 7,
    qnaCount: 3,
    hasMessageExamples: false,
    messageExampleCount: 0,
    hasTestimonials: true,
    testimonialCount: 2,
    introBannerSrc: '/images/apps/lunch-pick/chatgpt_image_2025.png',
    introConfig: { variant: 'standard', accentColorClass: 'text-sky-600' },
  },
  {
    slug: 'baby-med-diary',
    heroImage: '/images/apps/babycarediary/icons/icon.png',
    theme: { accent: '#10b981', gradientFrom: '#d1fae5', gradientTo: '#a7f3d0' },
    icon: '💊',
    storeLinks: [
      { platform: 'ios', url: 'https://apps.apple.com/kr/app/%EC%9A%B0%EB%A6%AC%EC%95%84%EA%B8%B0-%ED%88%AC%EC%95%BD%EC%9D%BC%EA%B8%B0/id6756885629' },
      { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.mocadev.babymeddiary' },
    ],
    screenshotSrcs: [
      '/images/apps/babycarediary/screenshot/preview-1.png',
      '/images/apps/babycarediary/screenshot/preview-2.png',
      '/images/apps/babycarediary/screenshot/preview-3.png',
      '/images/apps/babycarediary/screenshot/preview-4.png',
      '/images/apps/babycarediary/screenshot/preview-5.png',
      '/images/apps/babycarediary/screenshot/preview-6.png',
      '/images/apps/babycarediary/screenshot/preview-7.png',
      '/images/apps/babycarediary/screenshot/preview-8.png',
      '/images/apps/babycarediary/screenshot/preview-9.png',
      '/images/apps/babycarediary/screenshot/preview-10.png',
    ],
    featureIcons: ['📝', '🔔', '📅', '👶'],
    featureCount: 4,
    usageCount: 4,
    screenshotCount: 10,
    qnaCount: 5,
    hasMessageExamples: false,
    messageExampleCount: 0,
    hasTestimonials: false,
    testimonialCount: 0,
    introBannerSrc: '/images/apps/babycarediary/0008c61d.png',
    introConfig: { variant: 'standard', accentColorClass: 'text-emerald-600' },
  },
  {
    slug: 'cat-weather',
    heroImage: '/images/apps/cat-weather/catweather.jpg',
    theme: { accent: '#f59e0b', gradientFrom: '#fef3c7', gradientTo: '#bfdbfe' },
    icon: '🐱',
    storeLinks: [
      { platform: 'ios', url: 'https://apps.apple.com/kr/app/%EB%82%A0%EC%94%A8%EB%8B%A4%EB%83%A5/id6758456802' },
      { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.mocadev.catweather' },
    ],
    screenshotSrcs: [
      '/images/apps/cat-weather/screenshot/preview-1.png',
      '/images/apps/cat-weather/screenshot/preview-2.png',
      '/images/apps/cat-weather/screenshot/preview-3.png',
      '/images/apps/cat-weather/screenshot/preview-4.png',
    ],
    featureIcons: ['🐱', '📅', '🌍', '📊', '🔔'],
    featureCount: 5,
    usageCount: 3,
    screenshotCount: 4,
    qnaCount: 3,
    hasMessageExamples: true,
    messageExampleCount: 3,
    hasTestimonials: false,
    testimonialCount: 0,
    introBannerSrc: '/images/apps/cat-weather/catweather.jpg',
    introConfig: { variant: 'cat-weather', accentColorClass: 'text-amber-600' },
  },
  {
    slug: 'senior-care-diary',
    heroImage: '/images/apps/seniorcarediary/seniorcarediary.jpg',
    theme: { accent: '#0d9488', gradientFrom: '#ccfbf1', gradientTo: '#99f6e4' },
    icon: '💊',
    storeLinks: [
      { platform: 'ios', url: 'https://apps.apple.com/kr/app/id0000000000' },
      { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.mocadev.seniorcarediary' },
    ],
    screenshotSrcs: [
      '/images/apps/seniorcarediary/screenshot/Simulator-Screenshot---iPhone-17-Pro-Max---2026-02-14-at-00.27.28.png',
      '/images/apps/seniorcarediary/screenshot/Simulator-Screenshot---iPhone-17-Pro-Max---2026-02-14-at-00.28.28.png',
      '/images/apps/seniorcarediary/screenshot/Simulator-Screenshot---iPhone-17-Pro-Max---2026-02-14-at-00.28.35.png',
      '/images/apps/seniorcarediary/screenshot/Simulator-Screenshot---iPhone-17-Pro-Max---2026-02-14-at-00.28.38.png',
      '/images/apps/seniorcarediary/screenshot/Simulator-Screenshot---iPhone-17-Pro-Max---2026-02-14-at-00.28.45.png',
    ],
    featureIcons: ['📋', '🔔', '📅', '👴'],
    featureCount: 4,
    usageCount: 4,
    screenshotCount: 5,
    qnaCount: 4,
    hasMessageExamples: false,
    messageExampleCount: 0,
    hasTestimonials: false,
    testimonialCount: 0,
    introBannerSrc: '/images/apps/seniorcarediary/seniorcarediary.jpg',
    introConfig: { variant: 'standard', accentColorClass: 'text-teal-600' },
  },
  {
    slug: 'recipehouse',
    heroImage: '/images/apps/recipehouse/icons/icon.png',
    theme: { accent: '#4CAF50', gradientFrom: '#e8f5e9', gradientTo: '#c8e6c9' },
    icon: '📖',
    storeLinks: [
      { platform: 'ios', url: 'https://apps.apple.com/kr/app/id0000000000' },
      { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.mocadev.recipehouse' },
    ],
    screenshotSrcs: [
      '/images/apps/recipehouse/screenshot/Simulator-Screenshot---iPhone-17-Pro-Max---2026-03-08-at-23.43.27.png',
      '/images/apps/recipehouse/screenshot/Simulator-Screenshot---iPhone-17-Pro-Max---2026-03-08-at-23.43.31.png',
      '/images/apps/recipehouse/screenshot/Simulator-Screenshot---iPhone-17-Pro-Max---2026-03-08-at-23.43.47.png',
    ],
    featureIcons: ['📝', '🔍', '📷', '🎬'],
    featureCount: 4,
    usageCount: 3,
    screenshotCount: 3,
    qnaCount: 4,
    hasMessageExamples: false,
    messageExampleCount: 0,
    hasTestimonials: false,
    testimonialCount: 0,
    introBannerSrc: '/images/apps/recipehouse/graphic_image.png',
    introConfig: { variant: 'standard', accentColorClass: 'text-green-600' },
  },
];

export const getAppBase = (slug: string): AppBaseData | undefined =>
  appsBaseData.find((a) => a.slug === slug);

export const getAllAppSlugs = () => appsBaseData.map((a) => a.slug);

export const getAllAppsBase = () => appsBaseData;

export const getAppStructuredData = (
  slug: string,
  name: string,
  description: string,
  heroImage: string,
  locale: string = 'ko',
): StructuredDataProps[] => [
  {
    type: 'SoftwareApplication',
    data: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name,
      description,
      image: heroImage.startsWith('http') ? heroImage : `${seoConfig.siteUrl}${heroImage}`,
      operatingSystem: 'iOS, Android',
      applicationCategory: 'LifestyleApplication',
      inLanguage: locale === 'en' ? 'en' : 'ko',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
      url: `${seoConfig.siteUrl}/${locale}/apps/${slug}`,
      creator: { '@type': 'Person', name: 'Mocadev' },
    },
  },
];

/** 앱 상세 페이지용 BreadcrumbList JSON-LD (검색 결과 breadcrumb 노출) */
export const getBreadcrumbStructuredData = (
  locale: string,
  appName: string,
  slug: string,
): StructuredDataProps => ({
  type: 'BreadcrumbList',
  data: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'ko' ? '홈' : 'Home',
        item: `${seoConfig.siteUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: appName,
        item: `${seoConfig.siteUrl}/${locale}/apps/${slug}`,
      },
    ],
  },
});
