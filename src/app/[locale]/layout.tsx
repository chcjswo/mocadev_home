import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { seoConfig } from '@/lib/seo/config';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { FirebaseAnalyticsClient } from '@/components/analytics/FirebaseAnalyticsClient';
import { VercelAnalyticsClient } from '@/components/analytics/VercelAnalyticsClient';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase:
      typeof process.env.NEXT_PUBLIC_SITE_URL === 'string'
        ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
        : undefined,
    title: {
      default: t('siteTitle'),
      template: t('titleTemplate'),
    },
    description: t('siteDescription'),
    keywords: seoConfig.defaultKeywords,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      siteName: seoConfig.siteName,
      type: 'website',
      images: [
        {
          url: seoConfig.defaultImage.startsWith('http') ? seoConfig.defaultImage : `${seoConfig.siteUrl}${seoConfig.defaultImage}`,
          width: 1200,
          height: 630,
          alt: seoConfig.siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: seoConfig.twitterUsername,
    },
    alternates: {
      languages: {
        ko: `${seoConfig.siteUrl}/ko`,
        en: `${seoConfig.siteUrl}/en`,
        'x-default': `${seoConfig.siteUrl}/ko`,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const tMeta = await getTranslations({ locale, namespace: 'metadata' });

  const siteDescription = tMeta('siteDescription');
  const siteName = locale === 'ko' ? '모카데브' : 'Mocadev';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${seoConfig.siteUrl}/#organization`,
    name: siteName,
    url: seoConfig.siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${seoConfig.siteUrl}/logo.svg`,
      width: 200,
      height: 200,
    },
    description: siteDescription,
    sameAs: ['https://github.com/mocadev'],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${seoConfig.siteUrl}/#website`,
    name: siteName,
    url: seoConfig.siteUrl,
    description: siteDescription,
    inLanguage: locale,
    publisher: { '@id': `${seoConfig.siteUrl}/#organization` },
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f7f6fb]`}>
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <VercelAnalyticsClient />
          <FirebaseAnalyticsClient />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
