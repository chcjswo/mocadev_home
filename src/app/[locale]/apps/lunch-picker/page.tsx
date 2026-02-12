import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AppDetailPage } from '@/components/apps/AppDetailPage';
import { PageSEO } from '@/components/seo';
import { getAppBase, getAppStructuredData } from '@/lib/data/apps';
import { pageDefaults, seoConfig } from '@/lib/seo/config';

const base = getAppBase('lunch-picker')!;

export const metadata: Metadata = {
  title: pageDefaults.apps['lunch-picker'].title,
  description: pageDefaults.apps['lunch-picker'].description,
  openGraph: {
    title: pageDefaults.apps['lunch-picker'].title,
    description: pageDefaults.apps['lunch-picker'].description,
    url: `${seoConfig.siteUrl}/apps/lunch-picker`,
    siteName: seoConfig.siteName,
    images: [
      {
        url: base.heroImage.startsWith('http')
          ? base.heroImage
          : `${seoConfig.siteUrl}${base.heroImage}`,
        width: 1200,
        height: 630,
        alt: 'lunch-picker',
      },
    ],
    locale: seoConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: pageDefaults.apps['lunch-picker'].title,
    description: pageDefaults.apps['lunch-picker'].description,
    images: [
      base.heroImage.startsWith('http')
        ? base.heroImage
        : `${seoConfig.siteUrl}${base.heroImage}`,
    ],
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/apps/lunch-picker`,
  },
};

export default async function LunchPickerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageSEO
        title={pageDefaults.apps['lunch-picker'].title}
        description={pageDefaults.apps['lunch-picker'].description}
        canonical="/apps/lunch-picker"
        ogImage={base.heroImage}
        structuredData={getAppStructuredData(
          'lunch-picker',
          pageDefaults.apps['lunch-picker'].title,
          pageDefaults.apps['lunch-picker'].description,
          base.heroImage,
        )}
      />
      <AppDetailPage slug="lunch-picker" />
    </>
  );
}
