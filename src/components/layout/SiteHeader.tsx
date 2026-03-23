import { getTranslations } from 'next-intl/server';
import { SiteHeaderClient } from './SiteHeaderClient';

export async function SiteHeader() {
  const t = await getTranslations('nav');

  const navItems = [
    { label: t('apps'), href: '/#apps' },
    { label: t('team'), href: '/team' },
  ];

  return (
    <SiteHeaderClient
      brandSubline={t('brandSubline')}
      navItems={navItems}
      contact={t('contact')}
      contactShort={t('contactShort')}
      contactAriaLabel={t('contactAriaLabel')}
    />
  );
}
