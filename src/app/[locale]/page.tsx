import { ArrowRight } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { seoConfig, structuredDataTemplates } from '@/lib/seo/config';
import { getAllAppsBase } from '@/lib/data/apps';
import { AppCard } from '@/components/apps/AppCard';
import { Card, CardContent } from '@/components/ui/card';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.home' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: seoConfig.siteUrl,
      siteName: seoConfig.siteName,
      images: [
        {
          url: `${seoConfig.siteUrl}${seoConfig.defaultImage}`,
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${seoConfig.siteUrl}${seoConfig.defaultImage}`],
    },
    alternates: {
      canonical: `${seoConfig.siteUrl}/${locale}`,
      languages: {
        ko: `${seoConfig.siteUrl}/ko`,
        en: `${seoConfig.siteUrl}/en`,
      },
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const tCard = await getTranslations('appCard');
  const tApps = await getTranslations('apps');

  const appsBase = getAllAppsBase();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredDataTemplates.softwareApplication),
        }}
      />

      <div className="bg-gradient-to-br from-[#f5f3ff] via-white to-[#e0f2fe]">
        <section className="border-b border-black/5">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.2fr,0.8fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                MokaDev
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                {t('hero.title1')}
                <br />
                {t('hero.title2')}
              </h1>
              <p className="mt-6 text-lg text-gray-700">
                {t('hero.description')}
              </p>
            </div>
            <Card className="border-none bg-white/90 shadow-xl">
              <CardContent className="space-y-5 p-6">
                <p className="text-sm font-semibold text-gray-500">{t('hero.principlesTitle')}</p>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li>• {t('hero.principle1')}</li>
                  <li>• {t('hero.principle2')}</li>
                  <li>• {t('hero.principle3')}</li>
                </ul>
                <Link
                  href="#apps"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900"
                >
                  {t('hero.browseApps')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="apps" className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500">MokaDev Apps</p>
              <h2 className="text-3xl font-bold text-gray-900">{t('appsSection.title')}</h2>
              <p className="text-sm text-gray-600">
                {t('appsSection.description')}
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {appsBase.map((app) => {
              const tags = tApps.raw(`${app.slug}.tags`) as string[];
              return (
                <AppCard
                  key={app.slug}
                  slug={app.slug}
                  icon={app.icon}
                  name={tApps(`${app.slug}.name`)}
                  tagline={tApps(`${app.slug}.tagline`)}
                  tags={tags}
                  theme={app.theme}
                  viewDetails={tCard('viewDetails')}
                />
              );
            })}
          </div>
        </section>

        <section className="border-t border-black/5 bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-gray-500">About MokaDev</p>
              <h2 className="text-3xl font-bold text-gray-900">{t('about.title')}</h2>
              <p className="mt-4 text-sm text-gray-600">
                {t('about.description')}
              </p>
            </div>
            <div className="grid gap-4 text-sm text-gray-600">
              <Card className="border-black/5 bg-gray-50">
                <CardContent className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Workflow
                  </p>
                  <p className="mt-2">
                    {t('about.workflowDescription')}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-black/5 bg-gray-50">
                <CardContent className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Stack
                  </p>
                  <p className="mt-2">
                    {t('about.stackDescription')}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-black/5 bg-gray-50">
                <CardContent className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Contact
                  </p>
                  <p className="mt-2">
                    {t.rich('about.contactDescription', {
                      email: () => (
                        <a
                          href="mailto:mocadev.tony@gmail.com"
                          className="font-semibold text-gray-900"
                        >
                          mocadev.tony@gmail.com
                        </a>
                      ),
                    })}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-t border-black/5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 text-center">
            <h2 className="text-3xl font-bold">{t('cta.title')}</h2>
            <p className="text-base text-white/80">
              {t('cta.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
              <a
                href="mailto:mocadev.tony@gmail.com"
                className="rounded-full bg-white px-5 py-3 text-gray-900"
              >
                {t('cta.emailButton')}
              </a>
              <a
                href="https://github.com/mocadev"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/50 px-5 py-3"
              >
                {t('cta.githubButton')}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
