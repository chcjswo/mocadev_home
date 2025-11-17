import { AppDetailPage } from '@/components/apps/AppDetailPage';
import { PageSEO } from '@/components/seo';
import { getAppBySlug, getAppStructuredData } from '@/lib/data/apps';
import { pageDefaults } from '@/lib/seo/config';

const app = getAppBySlug('bapjeongne');

export default function BapjeongnePage() {
  return (
    <>
      <PageSEO
        title={pageDefaults.apps.bapjeongne.title}
        description={pageDefaults.apps.bapjeongne.description}
        keywords={app.tags.join(', ')}
        canonical={`/apps/${app.slug}`}
        ogImage={app.heroImage}
        structuredData={getAppStructuredData(app)}
      />
      <AppDetailPage app={app} />
    </>
  );
}
