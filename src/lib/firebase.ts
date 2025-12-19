import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAnalytics, type Analytics } from 'firebase/analytics';

// Firebase 환경 변수 맵
const envVarMap = {
  apiKey: 'NEXT_PUBLIC_FIREBASE_API_KEY',
  authDomain: 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  projectId: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  storageBucket: 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  appId: 'NEXT_PUBLIC_FIREBASE_APP_ID',
  measurementId: 'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID',
} as const;

// Firebase 앱 인스턴스 캐시
let app: FirebaseApp | null = null;

/**
 * Firebase 환경 변수 검증 및 설정값 반환
 */
function getFirebaseConfig() {
  const requiredEnvVars = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  // 필수 환경 변수 검증
  const missingVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => envVarMap[key as keyof typeof envVarMap]);

  if (missingVars.length > 0) {
    throw new Error(
      `Firebase 설정 오류: 다음 환경 변수가 필요합니다: ${missingVars.join(', ')}\n` +
      `.env.local 파일을 생성하고 필요한 환경 변수를 설정해주세요.`
    );
  }

  return {
    apiKey: requiredEnvVars.apiKey!,
    authDomain: requiredEnvVars.authDomain!,
    projectId: requiredEnvVars.projectId!,
    storageBucket: requiredEnvVars.storageBucket!,
    messagingSenderId: requiredEnvVars.messagingSenderId!,
    appId: requiredEnvVars.appId!,
    measurementId: requiredEnvVars.measurementId!,
  };
}

/**
 * Firebase 앱 인스턴스 가져오기 (지연 초기화)
 */
function getFirebaseApp(): FirebaseApp {
  if (app) {
    return app;
  }

  const firebaseConfig = getFirebaseConfig();

  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }

  return app;
}

/**
 * Firebase Analytics 인스턴스 가져오기
 * 클라이언트 사이드에서만 초기화 가능
 */
export const getFirebaseAnalytics = (): Analytics | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const firebaseApp = getFirebaseApp();
    return getAnalytics(firebaseApp);
  } catch (error) {
    console.error('Firebase Analytics initialization error:', error);
    return null;
  }
};

/**
 * Firebase 앱 인스턴스 가져오기 (export용)
 */
export function getApp(): FirebaseApp {
  return getFirebaseApp();
}

// 기본 export는 지연 초기화를 위한 getter 함수
export default {
  get app() {
    return getFirebaseApp();
  },
};

