'use client';

import dynamic from 'next/dynamic';

const FirebaseAnalytics = dynamic(
  () => import('@/components/analytics/FirebaseAnalytics').then((m) => ({ default: m.FirebaseAnalytics })),
  { ssr: false }
);

export function FirebaseAnalyticsClient() {
  return <FirebaseAnalytics />;
}
