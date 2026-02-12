import Image from 'next/image';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { seoConfig } from '@/lib/seo/config';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const memberImages = ['/images/profile/myimage.jpg', '/images/profile/maengkkongi.svg'];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.team' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${seoConfig.siteUrl}/${locale}/team`,
      siteName: seoConfig.siteName,
      images: [
        {
          url: `${seoConfig.siteUrl}${seoConfig.defaultImage}`,
          width: 1200,
          height: 630,
          alt: 'MokaDev Team',
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
      canonical: `${seoConfig.siteUrl}/${locale}/team`,
      languages: {
        ko: `${seoConfig.siteUrl}/ko/team`,
        en: `${seoConfig.siteUrl}/en/team`,
      },
    },
  };
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('team');

  return (
    <div className="bg-gradient-to-br from-[#f5f3ff] via-white to-[#e0f2fe]">
      <section className="border-b border-black/5">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              MokaDev Team
            </p>
            <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">{t('title')}</h1>
            <p className="mt-6 text-lg text-gray-700">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {memberImages.map((image, i) => {
              const name = t(`members.${i}.name`);
              const description = t(`members.${i}.description`);
              const roles = t.raw(`members.${i}.roles`) as string[];
              return (
                <Card key={i} className="border-black/5 bg-white shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-gray-100 shadow-md">
                        <Image
                          src={image}
                          alt={t('profileAlt', { name })}
                          width={128}
                          height={128}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
                      <div className="mt-3 flex flex-wrap justify-center gap-2">
                        {roles.map((role) => (
                          <Badge
                            key={role}
                            variant="secondary"
                            className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                          >
                            {role}
                          </Badge>
                        ))}
                      </div>
                      <p className="mt-4 text-sm text-gray-600">{description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
