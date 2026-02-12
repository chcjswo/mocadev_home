'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';

export function SiteHeader() {
  const pathname = usePathname();
  const t = useTranslations('nav');

  const navigation = [
    { label: 'Apps', href: '/#apps' },
    { label: t('team'), href: '/team' },
  ];

  const isActive = (href: string) => {
    if (href.startsWith('/#')) {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-sm">
            M
          </span>
          <div className="flex flex-col leading-tight">
            <span>MokaDev</span>
            <span className="text-xs font-normal text-gray-500">Personal App Lab</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-500 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'transition-colors hover:text-gray-900',
                isActive(item.href) && 'text-gray-900',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Button asChild variant="default">
            <a href="mailto:mocadev.tony@gmail.com" aria-label={t('contactAriaLabel')}>
              {t('contact')}
            </a>
          </Button>
        </div>
      </div>
      <div className="block border-t border-black/5 bg-white md:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm font-medium text-gray-500">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-full px-3 py-1 transition-colors',
                isActive(item.href) ? 'text-gray-900' : 'text-gray-500',
              )}
            >
              {item.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <a
            href="mailto:mocadev.tony@gmail.com"
            className="rounded-full bg-gray-900 px-3 py-1 text-white"
            aria-label={t('contactAriaLabel')}
          >
            {t('contactShort')}
          </a>
        </div>
      </div>
    </header>
  );
}
