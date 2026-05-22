import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AppDetailPage } from '@/components/apps/AppDetailPage';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Locale } from '@/i18n/routing';
import {
  getAppBase,
  getAppStructuredData,
  getBreadcrumbStructuredData,
  type AppBaseData,
} from '@/lib/data/apps';
import { buildPageMetadata, resolveAbsoluteUrl } from './metadata';

const OG_ICON_SIZE = 512;

export function createAppPage(slug: AppBaseData['slug']) {
  const base = getAppBase(slug);
  if (!base) {
    throw new Error(`Unknown app slug: ${slug}`);
  }
  const appBase = base;

  async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: Locale }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: `seo.apps.${slug}` });

    return buildPageMetadata({
      locale,
      path: `/apps/${slug}`,
      title: t('title'),
      description: t('description'),
      keywords: t('keywords'),
      ogImage: appBase.heroImage,
      ogImageAlt: t('ogImageAlt'),
      ogImageWidth: OG_ICON_SIZE,
      ogImageHeight: OG_ICON_SIZE,
    });
  }

  async function AppPage({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: `seo.apps.${slug}` });
    const tApp = await getTranslations({ locale, namespace: `apps.${slug}` });
    const tNav = await getTranslations({ locale, namespace: 'nav' });

    const appStructured = getAppStructuredData(slug, t('title'), t('description'), appBase, locale);
    const breadcrumb = getBreadcrumbStructuredData(locale, tApp('name'), slug, tNav('home'));

    return (
      <>
        <JsonLd data={[appStructured[0].data, breadcrumb.data]} />
        <AppDetailPage slug={slug} />
      </>
    );
  }

  return { generateMetadata, Page: AppPage };
}
