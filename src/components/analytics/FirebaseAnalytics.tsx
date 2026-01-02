'use client';

import { useEffect } from 'react';
import { getFirebaseAnalytics } from '@/lib/firebase';

export function FirebaseAnalytics() {
  useEffect(() => {
    // 클라이언트 사이드에서만 Analytics 초기화
    const analytics = getFirebaseAnalytics();
    if (analytics) {
      console.log('Firebase Analytics initialized');
    }
  }, []);

  return null;
}

