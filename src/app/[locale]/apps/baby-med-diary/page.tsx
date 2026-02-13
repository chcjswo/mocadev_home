import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AppDetailPage } from '@/components/apps/AppDetailPage';
import { getAppBase, getAppStructuredData, getBreadcrumbStructuredData } from '@/lib/data/apps';
import { seoConfig } from '@/lib/seo/config';

const base = getAppBase('baby-med-diary')!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.apps.baby-med-diary' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${seoConfig.siteUrl}/${locale}/apps/baby-med-diary`,
      siteName: seoConfig.siteName,
      images: [
        {
          url: base.heroImage.startsWith('http')
            ? base.heroImage
            : `${seoConfig.siteUrl}${base.heroImage}`,
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [
        base.heroImage.startsWith('http')
          ? base.heroImage
          : `${seoConfig.siteUrl}${base.heroImage}`,
      ],
    },
    alternates: {
      canonical: `${seoConfig.siteUrl}/${locale}/apps/baby-med-diary`,
      languages: {
        ko: `${seoConfig.siteUrl}/ko/apps/baby-med-diary`,
        en: `${seoConfig.siteUrl}/en/apps/baby-med-diary`,
      },
    },
  };
}

export default async function BabyMedDiaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'seo.apps.baby-med-diary' });
  const tApp = await getTranslations({ locale, namespace: 'apps.baby-med-diary' });
  const slug = 'baby-med-diary';
  const appStructured = getAppStructuredData(slug, t('title'), t('description'), base.heroImage, locale);
  const breadcrumb = getBreadcrumbStructuredData(locale, tApp('name'), slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appStructured[0].data) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb.data) }}
      />
      <AppDetailPage slug="baby-med-diary" />
    </>
  );
}
