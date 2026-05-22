import type { Metadata } from 'next';
import { routing, type Locale } from '@/i18n/routing';
import { seoConfig } from './config';

export function getSiteUrl(): string {
  return seoConfig.siteUrl.replace(/\/$/, '');
}

export function resolveAbsoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${getSiteUrl()}${path.startsWith('/') ? path : `/${path}`}`;
}

export function toOpenGraphLocale(locale: Locale): string {
  return locale === 'ko' ? 'ko_KR' : 'en_US';
}

export function buildLanguageAlternates(path: string): Metadata['alternates'] {
  const normalizedPath = path === '/' ? '' : path;
  const languages = Object.fromEntries(
    routing.locales.map((loc) => [loc, `${getSiteUrl()}/${loc}${normalizedPath}`]),
  ) as Record<string, string>;

  languages['x-default'] = `${getSiteUrl()}/${routing.defaultLocale}${normalizedPath}`;

  return { languages };
}

export type PageMetadataInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  robots?: Metadata['robots'];
  openGraphType?: 'website' | 'article';
};

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  ogImage = seoConfig.defaultImage,
  ogImageAlt,
  ogImageWidth = 1200,
  ogImageHeight = 630,
  robots = { index: true, follow: true },
  openGraphType = 'website',
}: PageMetadataInput): Metadata {
  const canonical = `${getSiteUrl()}/${locale}${path === '/' ? '' : path}`;
  const ogImageUrl = resolveAbsoluteUrl(ogImage);

  return {
    title,
    description,
    keywords,
    robots,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: seoConfig.siteName,
      locale: toOpenGraphLocale(locale),
      type: openGraphType,
      images: [
        {
          url: ogImageUrl,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: ogImageAlt ?? title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: seoConfig.twitterUsername,
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical,
      ...buildLanguageAlternates(path),
    },
  };
}

export function buildRootLayoutMetadata(
  locale: Locale,
  siteTitle: string,
  siteDescription: string,
  keywords: string,
  titleTemplate: string,
): Metadata {
  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: siteTitle,
      template: titleTemplate,
    },
    description: siteDescription,
    keywords,
    applicationName: seoConfig.siteName,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    icons: {
      icon: [{ url: '/logo.svg', type: 'image/svg+xml' }],
      apple: [{ url: '/logo.svg', type: 'image/svg+xml' }],
    },
    openGraph: {
      siteName: seoConfig.siteName,
      type: 'website',
      locale: toOpenGraphLocale(locale),
      title: siteTitle,
      description: siteDescription,
      url: `${getSiteUrl()}/${locale}`,
      images: [
        {
          url: resolveAbsoluteUrl(seoConfig.defaultImage),
          width: 1200,
          height: 630,
          alt: siteTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: seoConfig.twitterUsername,
      title: siteTitle,
      description: siteDescription,
      images: [resolveAbsoluteUrl(seoConfig.defaultImage)],
    },
    alternates: buildLanguageAlternates('/'),
  };
}
