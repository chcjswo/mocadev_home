'use client';

/**
 * Firebase Analytics: 라우트 변경 시마다 page_view 전송
 * - Next.js는 클라이언트 이동 시 새로고침이 없어, 초기화만으로는 페이지별 조회가 잡히지 않음
 * - usePathname() 변경 시마다 logEvent('page_view') 호출로 방문 수 집계
 * 동작 안 할 때: .env.local의 NEXT_PUBLIC_FIREBASE_* 전부 설정 여부, 광고/트래커 차단 확장 프로그램 비활성화 후 확인
 */
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { logEvent } from 'firebase/analytics';
import { getFirebaseAnalytics } from '@/lib/firebase';

const isDev = process.env.NODE_ENV === 'development';

export function FirebaseAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const analytics = getFirebaseAnalytics();
    if (!analytics) {
      if (isDev) {
        console.warn(
          '[Firebase Analytics] 초기화되지 않음. .env.local에 NEXT_PUBLIC_FIREBASE_* 변수가 모두 있는지 확인하세요.'
        );
      }
      return;
    }

    const page_location = typeof window !== 'undefined' ? window.location.href : '';
    const page_title = typeof document !== 'undefined' ? document.title : '';

    logEvent(analytics, 'page_view', {
      page_path: pathname ?? window.location.pathname,
      page_title,
      page_location,
    });

    if (isDev) {
      console.log('[Firebase Analytics] page_view', { path: pathname, title: page_title });
    }
  }, [pathname]);

  return null;
}

