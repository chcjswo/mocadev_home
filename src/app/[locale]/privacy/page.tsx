import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PrivacyContentKo } from '@/components/privacy/PrivacyContentKo';
import { PrivacyContentEn } from '@/components/privacy/PrivacyContentEn';
import type { Locale } from '@/i18n/routing';
import { buildLanguageAlternates, buildPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.privacy' });

  const metadata = buildPageMetadata({
    locale: locale as Locale,
    path: '/privacy',
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    ogImageAlt: t('ogImageAlt'),
    robots: { index: false, follow: false },
  });

  return {
    ...metadata,
    twitter: {
      ...metadata.twitter,
      card: 'summary',
    },
    alternates: {
      canonical: metadata.alternates?.canonical,
      ...buildLanguageAlternates('/privacy'),
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

  return (
    <div className="bg-white">
      {locale === 'ko' ? <PrivacyContentKo /> : <PrivacyContentEn />}
    </div>
  );
}
