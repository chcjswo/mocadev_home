import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AppDetailPage } from '@/components/apps/AppDetailPage';
import { PageSEO } from '@/components/seo';
import { getAppBase, getAppStructuredData } from '@/lib/data/apps';
import { pageDefaults, seoConfig } from '@/lib/seo/config';

const base = getAppBase('bapjeongne')!;

export const metadata: Metadata = {
  title: pageDefaults.apps.bapjeongne.title,
  description: pageDefaults.apps.bapjeongne.description,
  openGraph: {
    title: pageDefaults.apps.bapjeongne.title,
    description: pageDefaults.apps.bapjeongne.description,
    url: `${seoConfig.siteUrl}/apps/bapjeongne`,
    siteName: seoConfig.siteName,
    images: [
      {
        url: base.heroImage.startsWith('http')
          ? base.heroImage
          : `${seoConfig.siteUrl}${base.heroImage}`,
        width: 1200,
        height: 630,
        alt: 'bapjeongne',
      },
    ],
    locale: seoConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: pageDefaults.apps.bapjeongne.title,
    description: pageDefaults.apps.bapjeongne.description,
    images: [
      base.heroImage.startsWith('http')
        ? base.heroImage
        : `${seoConfig.siteUrl}${base.heroImage}`,
    ],
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/apps/bapjeongne`,
  },
};

export default async function BapjeongnePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageSEO
        title={pageDefaults.apps.bapjeongne.title}
        description={pageDefaults.apps.bapjeongne.description}
        canonical="/apps/bapjeongne"
        ogImage={base.heroImage}
        structuredData={getAppStructuredData(
          'bapjeongne',
          pageDefaults.apps.bapjeongne.title,
          pageDefaults.apps.bapjeongne.description,
          base.heroImage,
        )}
      />
      <AppDetailPage slug="bapjeongne" />
    </>
  );
}
