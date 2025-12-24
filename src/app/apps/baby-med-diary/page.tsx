import type { Metadata } from 'next';
import { AppDetailPage } from '@/components/apps/AppDetailPage';
import { PageSEO } from '@/components/seo';
import { getAppBySlug, getAppStructuredData } from '@/lib/data/apps';
import { pageDefaults, seoConfig } from '@/lib/seo/config';

const app = getAppBySlug('baby-med-diary');

export const metadata: Metadata = {
  title: pageDefaults.apps['baby-med-diary'].title,
  description: pageDefaults.apps['baby-med-diary'].description,
  keywords: app.tags.join(', '),
  openGraph: {
    title: pageDefaults.apps['baby-med-diary'].title,
    description: pageDefaults.apps['baby-med-diary'].description,
    url: `${seoConfig.siteUrl}/apps/${app.slug}`,
    siteName: seoConfig.siteName,
    images: [
      {
        url: app.heroImage.startsWith('http')
          ? app.heroImage
          : `${seoConfig.siteUrl}${app.heroImage}`,
        width: 1200,
        height: 630,
        alt: `${app.name} 앱 아이콘`,
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
      app.heroImage.startsWith('http')
        ? app.heroImage
        : `${seoConfig.siteUrl}${app.heroImage}`,
    ],
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/apps/${app.slug}`,
  },
  other: {
    ...(app.storeLinks.find((link) => link.platform === 'ios') && {
      'apple-itunes-app': app.storeLinks
        .find((link) => link.platform === 'ios')!
        .url.replace('https://apps.apple.com', ''),
    }),
    ...(app.storeLinks.find((link) => link.platform === 'android') && {
      'google-play-app': app.storeLinks
        .find((link) => link.platform === 'android')!
        .url.replace('https://play.google.com/store/apps/details?id=', ''),
    }),
  },
};

export default function BabyMedDiaryPage() {
  return (
    <>
      <PageSEO
        title={pageDefaults.apps['baby-med-diary'].title}
        description={pageDefaults.apps['baby-med-diary'].description}
        keywords={app.tags.join(', ')}
        canonical={`/apps/${app.slug}`}
        ogImage={app.heroImage}
        structuredData={getAppStructuredData(app)}
      />
      <AppDetailPage app={app} />
    </>
  );
}

