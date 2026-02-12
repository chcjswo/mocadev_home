'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: 'ko' | 'en') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 p-0.5 text-xs font-medium">
      <button
        onClick={() => switchLocale('ko')}
        className={cn(
          'rounded-full px-2.5 py-1 transition-colors',
          locale === 'ko' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600',
        )}
      >
        KO
      </button>
      <button
        onClick={() => switchLocale('en')}
        className={cn(
          'rounded-full px-2.5 py-1 transition-colors',
          locale === 'en' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600',
        )}
      >
        EN
      </button>
    </div>
  );
}
