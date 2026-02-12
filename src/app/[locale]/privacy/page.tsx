import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageSEO } from '@/components/seo';
import { seoConfig } from '@/lib/seo/config';
import { PrivacyContentKo } from '@/components/privacy/PrivacyContentKo';
import { PrivacyContentEn } from '@/components/privacy/PrivacyContentEn';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.privacy' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${seoConfig.siteUrl}/${locale}/privacy`,
      siteName: seoConfig.siteName,
      images: [
        {
          url: `${seoConfig.siteUrl}${seoConfig.defaultImage}`,
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: t('title'),
      description: t('description'),
    },
    alternates: {
      canonical: `${seoConfig.siteUrl}/${locale}/privacy`,
      languages: {
        ko: `${seoConfig.siteUrl}/ko/privacy`,
        en: `${seoConfig.siteUrl}/en/privacy`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'seo.privacy' });

  return (
    <>
      <PageSEO
        title={t('title')}
        description={t('description')}
        keywords={t('keywords')}
        canonical={`/${locale}/privacy`}
      />
      <div className="bg-white">
        {locale === 'ko' ? <PrivacyContentKo /> : <PrivacyContentEn />}
      </div>
    </>
  );
}
