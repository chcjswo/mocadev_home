import { AppDetailPage } from '@/components/apps/AppDetailPage';
import { PageSEO } from '@/components/seo';
import { getAppBySlug, getAppStructuredData } from '@/lib/data/apps';
import { pageDefaults } from '@/lib/seo/config';

const app = getAppBySlug('fortune-cookie');

export default function FortuneCookiePage() {
  return (
    <>
      <PageSEO
        title={pageDefaults.apps['fortune-cookie'].title}
        description={pageDefaults.apps['fortune-cookie'].description}
        keywords={app.tags.join(', ')}
        canonical={`/apps/${app.slug}`}
        ogImage={app.heroImage}
        structuredData={getAppStructuredData(app)}
      />
      <AppDetailPage app={app} />
    </>
  );
}
