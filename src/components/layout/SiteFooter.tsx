import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function SiteFooter() {
  const t = await getTranslations('footer');

  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-gray-900">&copy; {new Date().getFullYear()} Mocadev</p>
          <p>{t('tagline')}</p>
        </div>
        <nav aria-label="Footer">
          <Link href="/privacy" className="font-medium text-gray-700 transition-colors hover:text-gray-900">
            {t('privacy')}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
