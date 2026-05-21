'use client';

import dynamic from 'next/dynamic';

const VercelAnalytics = dynamic(
  () => import('@vercel/analytics/react').then((m) => ({ default: m.Analytics })),
  { ssr: false },
);

const FirebaseAnalytics = dynamic(
  () =>
    import('@/components/analytics/FirebaseAnalytics').then((m) => ({
      default: m.FirebaseAnalytics,
    })),
  { ssr: false },
);

export function AnalyticsProviders() {
  return (
    <>
      <VercelAnalytics />
      <FirebaseAnalytics />
    </>
  );
}
