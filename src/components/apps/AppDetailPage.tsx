import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getAppBase } from '@/lib/data/apps';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DownloadButtons } from './DownloadButtons';
import { ScreenshotCarousel } from './ScreenshotCarousel';

interface AppDetailPageProps {
  slug: string;
}

export async function AppDetailPage({ slug }: AppDetailPageProps) {
  const base = getAppBase(slug);
  if (!base) return null;

  const t = await getTranslations(`apps.${slug}`);
  const ui = await getTranslations('appDetail');

  const storeLinks = base.storeLinks.map((link, i) => ({
    ...link,
    label: t(`storeLinks.${i}.label`),
    badge: t(`storeLinks.${i}.badge`),
  }));

  const screenshots = base.screenshotSrcs.map((src, i) => ({
    src,
    alt: t(`screenshots.${i}.alt`),
    caption: t(`screenshots.${i}.caption`),
  }));

  const tags = t.raw('tags') as string[];

  return (
    <div className="bg-white">
      <section
        className="border-b border-black/5"
        style={{
          backgroundImage: `linear-gradient(135deg, ${base.theme.gradientFrom}, ${base.theme.gradientTo})`,
        }}
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2 md:items-center">
          <div>
            <div className="mb-4 inline-flex rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-gray-600">
              {base.icon} {t('tagline')}
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900">{t('name')}</h1>
            <p className="mb-6 text-lg text-gray-700">{t('description')}</p>
            <DownloadButtons links={storeLinks} ariaLabelTemplate={ui('storeAriaLabel')} />
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-white/40 blur-3xl" />
            <div className="relative rounded-3xl border border-white/60 bg-white/90 p-4 shadow-2xl">
              <Image
                src={base.heroImage}
                alt={ui('heroImageAlt', { appName: t('name') })}
                width={900}
                height={600}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="h-auto w-full rounded-2xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16">
        <section className="grid gap-6 md:grid-cols-3">
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-sm text-gray-500">{ui('problemTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700">{t('summary.problem')}</CardContent>
          </Card>
          <Card className="bg-gray-50 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm text-gray-500">{ui('solutionTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700">{t('summary.solution')}</CardContent>
          </Card>
        </section>

        <section>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500">{ui('featuresSubtitle')}</p>
              <h2 className="text-2xl font-bold text-gray-900">{ui('featuresTitle')}</h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: base.featureCount }).map((_, i) => (
              <Card key={i} className="border-black/5">
                <CardContent className="p-6">
                  <div className="mb-4 text-2xl">{base.featureIcons[i]}</div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {t(`features.${i}.title`)}
                  </h3>
                  <p className="text-sm text-gray-600">{t(`features.${i}.description`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <p className="text-sm font-semibold text-gray-500">{ui('usageSubtitle')}</p>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">{ui('usageTitle')}</h2>
          <div className="space-y-4">
            {Array.from({ length: base.usageCount }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 rounded-2xl border border-black/5 bg-gray-50 p-5 md:flex-row md:items-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-semibold text-gray-900 shadow-sm">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{t(`usage.${i}.title`)}</p>
                  <p className="text-sm text-gray-600">{t(`usage.${i}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="text-sm font-semibold text-gray-500">{ui('screenshotsSubtitle')}</p>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">{ui('screenshotsTitle')}</h2>
          <ScreenshotCarousel screenshots={screenshots} accentColor={base.theme.accent} />
        </section>

        {slug === 'bapjeongne' && (
          <section>
            <p className="text-sm font-semibold text-gray-500">{ui('appIntroSubtitle')}</p>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">{t('intro.title')}</h2>
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white p-4 shadow-lg">
                <Image src={base.introBannerSrc!} alt={t('intro.bannerAlt')} width={1200} height={800} sizes="(min-width: 1280px) 1152px, 100vw" className="h-auto w-full rounded-2xl object-contain" />
              </div>
              <div className="space-y-4 rounded-3xl border border-black/5 bg-gradient-to-br from-gray-50 to-white p-8">
                <h3 className="text-xl font-bold text-gray-900">{t('intro.flowTitle')}</h3>
                <p className="text-gray-700">{t('intro.flowDesc1')}</p>
                <p className="text-gray-700">{t('intro.flowDesc2')}</p>
              </div>
              <div className="space-y-4 rounded-3xl border border-black/5 bg-gradient-to-br from-white to-gray-50 p-8">
                <h3 className="text-xl font-bold text-gray-900">{t('intro.solveTitle')}</h3>
                <ul className="space-y-2 text-gray-700">
                  {['solve1', 'solve2', 'solve3', 'solve4'].map((key) => (
                    <li key={key} className="flex items-start">
                      <span className="mr-2 text-purple-600">✓</span>
                      <span>{t(`intro.${key}`)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-gray-700">{t('intro.solveDesc')}</p>
              </div>
            </div>
          </section>
        )}

        {slug === 'lunch-picker' && (
          <section>
            <p className="text-sm font-semibold text-gray-500">{ui('appIntroSubtitle')}</p>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">{t('intro.title')}</h2>
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white p-4 shadow-lg">
                <Image src={base.introBannerSrc!} alt={t('intro.bannerAlt')} width={1200} height={800} sizes="(min-width: 1280px) 1152px, 100vw" className="h-auto w-full rounded-2xl object-contain" />
              </div>
              <div className="space-y-4 rounded-3xl border border-black/5 bg-gradient-to-br from-gray-50 to-white p-8">
                <h3 className="text-xl font-bold text-gray-900">{t('intro.targetTitle')}</h3>
                <ul className="space-y-3 text-gray-700">
                  {['target1', 'target2', 'target3', 'target4'].map((key) => (
                    <li key={key} className="flex items-start">
                      <span className="mr-2 text-sky-600">✓</span>
                      <span>{t(`intro.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4 rounded-3xl border border-black/5 bg-gradient-to-br from-white to-gray-50 p-8">
                <h3 className="text-xl font-bold text-gray-900">{t('intro.experienceTitle')}</h3>
                <p className="text-gray-700">{t('intro.experienceDesc1')}</p>
                <p className="mt-4 text-gray-700">{t('intro.experienceDesc2')}</p>
              </div>
            </div>
          </section>
        )}

        {slug === 'cat-weather' && (
          <section>
            <p className="text-sm font-semibold text-gray-500">{ui('appIntroSubtitle')}</p>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">{t('intro.title')}</h2>
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white p-4 shadow-lg">
                <Image src={base.introBannerSrc!} alt={t('intro.bannerAlt')} width={1200} height={800} sizes="(min-width: 1280px) 1152px, 100vw" className="h-auto w-full rounded-2xl object-contain" />
              </div>
              <div className="space-y-4 rounded-3xl border border-black/5 bg-gradient-to-br from-gray-50 to-white p-8">
                <h3 className="text-xl font-bold text-gray-900">{t('intro.recommendTitle')}</h3>
                <ul className="space-y-3 text-gray-700">
                  {['recommend1', 'recommend2', 'recommend3', 'recommend4', 'recommend5'].map((key) => (
                    <li key={key} className="flex items-start">
                      <span className="mr-2 text-amber-600">✓</span>
                      <span>{t(`intro.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4 rounded-3xl border border-black/5 bg-gradient-to-br from-white to-gray-50 p-8">
                <h3 className="text-xl font-bold text-gray-900">{t('intro.highlightTitle')}</h3>
                <ul className="space-y-2 text-gray-700">
                  {['highlight1', 'highlight2', 'highlight3', 'highlight4', 'highlight5'].map((key) => (
                    <li key={key} className="flex items-start">
                      <span className="mr-2 text-amber-600">·</span>
                      <span>{t(`intro.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4 rounded-3xl border border-black/5 bg-gradient-to-br from-amber-50/50 to-white p-8">
                <h3 className="text-xl font-bold text-gray-900">{t('intro.devMessageTitle')}</h3>
                <p className="text-gray-700">{t('intro.devMessageDesc1')}</p>
                <p className="text-gray-700">{t('intro.devMessageDesc2')}</p>
              </div>
            </div>
          </section>
        )}

        {slug === 'baby-med-diary' && (
          <section>
            <p className="text-sm font-semibold text-gray-500">{ui('appIntroSubtitle')}</p>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">{t('intro.title')}</h2>
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white p-4 shadow-lg">
                <Image src={base.introBannerSrc!} alt={t('intro.bannerAlt')} width={1200} height={800} sizes="(min-width: 1280px) 1152px, 100vw" className="h-auto w-full rounded-2xl object-contain" />
              </div>
              <div className="space-y-4 rounded-3xl border border-black/5 bg-gradient-to-br from-gray-50 to-white p-8">
                <h3 className="text-xl font-bold text-gray-900">{t('intro.targetTitle')}</h3>
                <ul className="space-y-3 text-gray-700">
                  {['target1', 'target2', 'target3', 'target4'].map((key) => (
                    <li key={key} className="flex items-start">
                      <span className="mr-2 text-emerald-600">✓</span>
                      <span>{t(`intro.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4 rounded-3xl border border-black/5 bg-gradient-to-br from-white to-gray-50 p-8">
                <h3 className="text-xl font-bold text-gray-900">{t('intro.experienceTitle')}</h3>
                <p className="text-gray-700">{t('intro.experienceDesc1')}</p>
                <p className="mt-4 text-gray-700">{t('intro.experienceDesc2')}</p>
              </div>
            </div>
          </section>
        )}

        {base.hasMessageExamples && (
          <section>
            <p className="text-sm font-semibold text-gray-500">
              {slug === 'cat-weather' ? ui('catMessageSubtitle') : ui('messageExamplesSubtitle')}
            </p>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              {slug === 'cat-weather' ? ui('catMessageTitle') : ui('messageExamplesTitle')}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: base.messageExampleCount }).map((_, i) => (
                <Card key={i} className="border-black/5 bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-6 text-base text-gray-800">
                    {t(`messageExamples.${i}`)}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {base.hasTestimonials && (
          <section>
            <p className="text-sm font-semibold text-gray-500">{ui('testimonialsSubtitle')}</p>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">{ui('testimonialsTitle')}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {Array.from({ length: base.testimonialCount }).map((_, i) => (
                <Card key={i} className="border-black/5">
                  <CardContent className="space-y-3 p-6">
                    <p className="text-base text-gray-800">
                      &ldquo;{t(`testimonials.${i}.quote`)}&rdquo;
                    </p>
                    <p className="text-sm text-gray-500">
                      {t(`testimonials.${i}.name`)} · {t(`testimonials.${i}.role`)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section>
          <p className="text-sm font-semibold text-gray-500">{ui('qnaSubtitle')}</p>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">{ui('qnaTitle')}</h2>
          <div className="space-y-4">
            {Array.from({ length: base.qnaCount }).map((_, i) => (
              <Card key={i} className="border-black/5">
                <CardContent className="space-y-2 p-6">
                  <p className="font-semibold text-gray-900">{t(`qna.${i}.question`)}</p>
                  <p className="text-sm text-gray-600">{t(`qna.${i}.answer`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
