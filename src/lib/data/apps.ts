import { StructuredDataProps } from '@/types/seo';
import { seoConfig } from '@/lib/seo/config';

export interface AppBaseData {
  slug: 'bapjeongne' | 'fortune-cookie' | 'lunch-picker' | 'baby-med-diary' | 'cat-weather' | 'senior-care-diary';
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
      '/images/apps/bobjeongneo/screenshot/Simulator Screenshot - iPhone 17 Pro Max - 2025-11-10 at 20.50.33.png',
      '/images/apps/bobjeongneo/screenshot/Simulator Screenshot - iPhone 17 Pro Max - 2025-11-10 at 20.50.51.png',
      '/images/apps/bobjeongneo/screenshot/Simulator Screenshot - iPhone 17 Pro Max - 2025-11-10 at 20.50.59.png',
      '/images/apps/bobjeongneo/screenshot/Simulator Screenshot - iPhone 17 Pro Max - 2025-11-10 at 20.51.07.png',
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
    introBannerSrc: '/images/apps/bobjeongneo/ChatGPT Image 2025년 11월 25일 오전 01_17_08.png',
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
      '/images/apps/seniorcarediary/screenshot/Simulator Screenshot - iPhone 17 Pro Max - 2026-02-14 at 00.27.28.png',
      '/images/apps/seniorcarediary/screenshot/Simulator Screenshot - iPhone 17 Pro Max - 2026-02-14 at 00.28.28.png',
      '/images/apps/seniorcarediary/screenshot/Simulator Screenshot - iPhone 17 Pro Max - 2026-02-14 at 00.28.35.png',
      '/images/apps/seniorcarediary/screenshot/Simulator Screenshot - iPhone 17 Pro Max - 2026-02-14 at 00.28.38.png',
      '/images/apps/seniorcarediary/screenshot/Simulator Screenshot - iPhone 17 Pro Max - 2026-02-14 at 00.28.45.png',
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
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
      url: `${seoConfig.siteUrl}/apps/${slug}`,
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '120' },
      creator: { '@type': 'Person', name: 'MocaDev' },
    },
  },
];
