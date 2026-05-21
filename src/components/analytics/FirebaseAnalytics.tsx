'use client';

/**
 * Firebase Analytics: 라우트 변경 시마다 page_view 전송
 * - Next.js는 클라이언트 이동 시 새로고침이 없어, 초기화만으로는 페이지별 조회가 잡히지 않음
 * - usePathname() 변경 시마다 logEvent('page_view') 호출로 방문 수 집계
 */
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getFirebaseAnalytics } from '@/lib/firebase';

const isDev = process.env.NODE_ENV === 'development';

export function FirebaseAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const analytics = await getFirebaseAnalytics();
      if (cancelled) return;

      if (!analytics) {
        if (isDev) {
          console.warn(
            '[Firebase Analytics] 초기화되지 않음. .env.local에 NEXT_PUBLIC_FIREBASE_* 변수가 모두 있는지 확인하세요.',
          );
        }
        return;
      }

      const { logEvent } = await import('firebase/analytics');
      if (cancelled) return;

      const page_location = window.location.href;
      const page_title = document.title;

      logEvent(analytics, 'page_view', {
        page_path: pathname ?? window.location.pathname,
        page_title,
        page_location,
      });

      if (isDev) {
        console.log('[Firebase Analytics] page_view', { path: pathname, title: page_title });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
