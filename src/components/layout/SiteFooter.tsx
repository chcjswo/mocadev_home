import { getTranslations } from 'next-intl/server';

export async function SiteFooter() {
  const t = await getTranslations('footer');

  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-gray-900">&copy; {new Date().getFullYear()} MokaDev</p>
          <p>{t('tagline')}</p>
        </div>
      </div>
    </footer>
  );
}
