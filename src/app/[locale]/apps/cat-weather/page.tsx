import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AppDetailPage } from '@/components/apps/AppDetailPage';
import { PageSEO } from '@/components/seo';
import { getAppBase, getAppStructuredData } from '@/lib/data/apps';
import { pageDefaults, seoConfig } from '@/lib/seo/config';

const base = getAppBase('cat-weather')!;

export const metadata: Metadata = {
  title: pageDefaults.apps['cat-weather'].title,
  description: pageDefaults.apps['cat-weather'].description,
  openGraph: {
    title: pageDefaults.apps['cat-weather'].title,
    description: pageDefaults.apps['cat-weather'].description,
    url: `${seoConfig.siteUrl}/apps/cat-weather`,
    siteName: seoConfig.siteName,
    images: [
      {
        url: base.heroImage.startsWith('http')
          ? base.heroImage
          : `${seoConfig.siteUrl}${base.heroImage}`,
        width: 1200,
        height: 630,
        alt: 'cat-weather',
      },
    ],
    locale: seoConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: pageDefaults.apps['cat-weather'].title,
    description: pageDefaults.apps['cat-weather'].description,
    images: [
      base.heroImage.startsWith('http')
        ? base.heroImage
        : `${seoConfig.siteUrl}${base.heroImage}`,
    ],
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/apps/cat-weather`,
  },
};

export default async function CatWeatherPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageSEO
        title={pageDefaults.apps['cat-weather'].title}
        description={pageDefaults.apps['cat-weather'].description}
        canonical="/apps/cat-weather"
        ogImage={base.heroImage}
        structuredData={getAppStructuredData(
          'cat-weather',
          pageDefaults.apps['cat-weather'].title,
          pageDefaults.apps['cat-weather'].description,
          base.heroImage,
        )}
      />
      <AppDetailPage slug="cat-weather" />
    </>
  );
}
