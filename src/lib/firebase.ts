import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAnalytics, type Analytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCe0LcU2zgv26FHzm0sMWz1hBgFjoUOZ2k',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'mocadev-home.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'mocadev-home',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'mocadev-home.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '77914732718',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:77914732718:web:30c3753d62fcf0c10d953f',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-BTFKGEGJKV',
};

// Initialize Firebase
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Analytics는 클라이언트 사이드에서만 초기화 가능
export const getFirebaseAnalytics = (): Analytics | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    return getAnalytics(app);
  } catch (error) {
    console.error('Firebase Analytics initialization error:', error);
    return null;
  }
};

export { app };
export default app;

