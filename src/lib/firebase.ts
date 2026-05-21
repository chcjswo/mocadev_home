import type { FirebaseApp } from 'firebase/app';
import type { Analytics } from 'firebase/analytics';

const envVarMap = {
  apiKey: 'NEXT_PUBLIC_FIREBASE_API_KEY',
  authDomain: 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  projectId: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  storageBucket: 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  appId: 'NEXT_PUBLIC_FIREBASE_APP_ID',
  measurementId: 'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID',
} as const;

let app: FirebaseApp | null = null;
let analyticsPromise: Promise<Analytics | null> | null = null;

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

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([, value]) => !value)
    .map(([key]) => envVarMap[key as keyof typeof envVarMap]);

  if (missingVars.length > 0) {
    throw new Error(
      `Firebase 설정 오류: 다음 환경 변수가 필요합니다: ${missingVars.join(', ')}\n` +
        `.env.local 파일을 생성하고 필요한 환경 변수를 설정해주세요.`,
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

async function getFirebaseApp(): Promise<FirebaseApp> {
  if (app) {
    return app;
  }

  const { initializeApp, getApps } = await import('firebase/app');
  const firebaseConfig = getFirebaseConfig();

  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }

  return app;
}

/**
 * Firebase Analytics 인스턴스 가져오기 (클라이언트 전용, 동적 import)
 */
export function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }

  if (!analyticsPromise) {
    analyticsPromise = (async () => {
      try {
        const [{ getAnalytics }, firebaseApp] = await Promise.all([
          import('firebase/analytics'),
          getFirebaseApp(),
        ]);
        return getAnalytics(firebaseApp);
      } catch (error) {
        console.error('Firebase Analytics initialization error:', error);
        return null;
      }
    })();
  }

  return analyticsPromise;
}

export async function getApp(): Promise<FirebaseApp> {
  return getFirebaseApp();
}
