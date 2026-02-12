import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AppDetailPage } from '@/components/apps/AppDetailPage';
import { PageSEO } from '@/components/seo';
import { getAppBase, getAppStructuredData } from '@/lib/data/apps';
import { pageDefaults, seoConfig } from '@/lib/seo/config';

const base = getAppBase('baby-med-diary')!;

export const metadata: Metadata = {
  title: pageDefaults.apps['baby-med-diary'].title,
  description: pageDefaults.apps['baby-med-diary'].description,
  openGraph: {
    title: pageDefaults.apps['baby-med-diary'].title,
    description: pageDefaults.apps['baby-med-diary'].description,
    url: `${seoConfig.siteUrl}/apps/baby-med-diary`,
    siteName: seoConfig.siteName,
    images: [
      {
        url: base.heroImage.startsWith('http')
          ? base.heroImage
          : `${seoConfig.siteUrl}${base.heroImage}`,
        width: 1200,
        height: 630,
        alt: 'baby-med-diary',
      },
    ],
    locale: seoConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: pageDefaults.apps['baby-med-diary'].title,
    description: pageDefaults.apps['baby-med-diary'].description,
    images: [
      base.heroImage.startsWith('http')
        ? base.heroImage
        : `${seoConfig.siteUrl}${base.heroImage}`,
    ],
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/apps/baby-med-diary`,
  },
};

export default async function BabyMedDiaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageSEO
        title={pageDefaults.apps['baby-med-diary'].title}
        description={pageDefaults.apps['baby-med-diary'].description}
        canonical="/apps/baby-med-diary"
        ogImage={base.heroImage}
        structuredData={getAppStructuredData(
          'baby-med-diary',
          pageDefaults.apps['baby-med-diary'].title,
          pageDefaults.apps['baby-med-diary'].description,
          base.heroImage,
        )}
      />
      <AppDetailPage slug="baby-med-diary" />
    </>
  );
}
