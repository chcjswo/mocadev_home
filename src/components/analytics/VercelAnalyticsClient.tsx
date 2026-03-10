'use client';

import dynamic from 'next/dynamic';

const VercelAnalytics = dynamic(
  () => import('@vercel/analytics/react').then((m) => ({ default: m.Analytics })),
  { ssr: false },
);

export function VercelAnalyticsClient() {
  return <VercelAnalytics />;
}
