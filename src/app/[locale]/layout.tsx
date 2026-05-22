import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { pickClientMessages } from '@/i18n/client-messages';
import { routing, type Locale } from '@/i18n/routing';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/seo/json-ld';
import { buildRootLayoutMetadata, getSiteUrl, resolveAbsoluteUrl } from '@/lib/seo/metadata';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { AnalyticsProviders } from '@/components/analytics/AnalyticsProviders';

const geistSans = Geist({
  variable: '--font-geist-sans',
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

  return buildRootLayoutMetadata(
    locale as Locale,
    t('siteTitle'),
    t('siteDescription'),
    t('keywords'),
    t('titleTemplate'),
  );
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
  const siteName = tMeta('siteName');

  const siteUrl = getSiteUrl();
  const orgSchema = organizationSchema({
    siteUrl,
    name: siteName,
    description: siteDescription,
    logoUrl: resolveAbsoluteUrl('/logo.svg'),
    email: 'mocadev.tony@gmail.com',
  });
  const siteSchema = websiteSchema({
    siteUrl,
    localeUrl: `${siteUrl}/${locale}`,
    name: siteName,
    description: siteDescription,
    locale,
    publisherId: `${siteUrl}/#organization`,
    inLanguage: [...routing.locales],
  });

  return (
    <html lang={locale}>
      <head>
        <JsonLd data={[orgSchema, siteSchema]} />
      </head>
      <body className={`${geistSans.variable} antialiased bg-[#f7f6fb]`}>
        <NextIntlClientProvider messages={pickClientMessages(messages)}>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <AnalyticsProviders />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
