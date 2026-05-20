import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
  localePrefix: 'always',
});

/** 지원 locale 유니온 타입 */
export type Locale = (typeof routing.locales)[number];
