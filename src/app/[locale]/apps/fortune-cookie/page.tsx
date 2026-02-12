import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AppDetailPage } from '@/components/apps/AppDetailPage';
import { PageSEO } from '@/components/seo';
import { getAppBase, getAppStructuredData } from '@/lib/data/apps';
import { pageDefaults, seoConfig } from '@/lib/seo/config';

const base = getAppBase('fortune-cookie')!;

export const metadata: Metadata = {
  title: pageDefaults.apps['fortune-cookie'].title,
  description: pageDefaults.apps['fortune-cookie'].description,
  openGraph: {
    title: pageDefaults.apps['fortune-cookie'].title,
    description: pageDefaults.apps['fortune-cookie'].description,
    url: `${seoConfig.siteUrl}/apps/fortune-cookie`,
    siteName: seoConfig.siteName,
    images: [
      {
        url: base.heroImage.startsWith('http')
          ? base.heroImage
          : `${seoConfig.siteUrl}${base.heroImage}`,
        width: 1200,
        height: 630,
        alt: 'fortune-cookie',
      },
    ],
    locale: seoConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: pageDefaults.apps['fortune-cookie'].title,
    description: pageDefaults.apps['fortune-cookie'].description,
    images: [
      base.heroImage.startsWith('http')
        ? base.heroImage
        : `${seoConfig.siteUrl}${base.heroImage}`,
    ],
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/apps/fortune-cookie`,
  },
};

export default async function FortuneCookiePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageSEO
        title={pageDefaults.apps['fortune-cookie'].title}
        description={pageDefaults.apps['fortune-cookie'].description}
        canonical="/apps/fortune-cookie"
        ogImage={base.heroImage}
        structuredData={getAppStructuredData(
          'fortune-cookie',
          pageDefaults.apps['fortune-cookie'].title,
          pageDefaults.apps['fortune-cookie'].description,
          base.heroImage,
        )}
      />
      <AppDetailPage slug="fortune-cookie" />
    </>
  );
}
