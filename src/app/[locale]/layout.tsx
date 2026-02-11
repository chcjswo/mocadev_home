import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import { routing } from '@/i18n/routing';
import { structuredDataTemplates } from '@/lib/seo/config';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { FirebaseAnalyticsClient } from '@/components/analytics/FirebaseAnalyticsClient';

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

export const metadata: Metadata = {
  metadataBase:
    typeof process.env.NEXT_PUBLIC_SITE_URL === 'string'
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
      : undefined,
  title: {
    default: '모카데브 – 개인 앱 개발자',
    template: '%s | 모카데브',
  },
  description:
    '랜덤 식당 추천부터 포춘쿠키 메시지까지. 모카데브가 직접 설계하고 운영하는 생활형 앱 컬렉션을 만나보세요.',
};

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

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredDataTemplates.organization),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredDataTemplates.website),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f7f6fb]`}>
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <Analytics />
          <FirebaseAnalyticsClient />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
