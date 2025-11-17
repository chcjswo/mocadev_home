import { AppDetailPage } from '@/components/apps/AppDetailPage';
import { PageSEO } from '@/components/seo';
import { getAppBySlug, getAppStructuredData } from '@/lib/data/apps';
import { pageDefaults } from '@/lib/seo/config';

const app = getAppBySlug('lunch-picker');

export default function LunchPickerPage() {
  return (
    <>
      <PageSEO
        title={pageDefaults.apps['lunch-picker'].title}
        description={pageDefaults.apps['lunch-picker'].description}
        keywords={app.tags.join(', ')}
        canonical={`/apps/${app.slug}`}
        ogImage={app.heroImage}
        structuredData={getAppStructuredData(app)}
      />
      <AppDetailPage app={app} />
    </>
  );
}
