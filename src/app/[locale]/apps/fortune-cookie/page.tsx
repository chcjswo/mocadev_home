import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AppDetailPage } from '@/components/apps/AppDetailPage';
import { getAppBase, getAppStructuredData, getBreadcrumbStructuredData } from '@/lib/data/apps';
import { seoConfig } from '@/lib/seo/config';

const base = getAppBase('fortune-cookie')!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.apps.fortune-cookie' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${seoConfig.siteUrl}/${locale}/apps/fortune-cookie`,
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
      canonical: `${seoConfig.siteUrl}/${locale}/apps/fortune-cookie`,
      languages: {
        ko: `${seoConfig.siteUrl}/ko/apps/fortune-cookie`,
        en: `${seoConfig.siteUrl}/en/apps/fortune-cookie`,
      },
    },
  };
}

export default async function FortuneCookiePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'seo.apps.fortune-cookie' });
  const tApp = await getTranslations({ locale, namespace: 'apps.fortune-cookie' });
  const slug = 'fortune-cookie';
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
      <AppDetailPage slug="fortune-cookie" />
    </>
  );
}
