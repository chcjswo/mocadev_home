export type AppPlatform = 'ios' | 'android';

export interface AppPlatformLink {
  platform: AppPlatform;
  url: string;
  label: string;
  badge: string;
}

export interface AppFeature {
  title: string;
  description: string;
  icon: string;
}

export interface AppUsageStep {
  title: string;
  description: string;
}

export interface AppScreenshot {
  src: string;
  alt: string;
  caption: string;
}

export interface AppFaq {
  question: string;
  answer: string;
}

export interface AppUpdateLog {
  version: string;
  date: string;
  summary: string;
}

export interface AppMetric {
  label: string;
  value: string;
}

export interface AppTestimonial {
  name: string;
  role: string;
  quote: string;
}

export interface AppContent {
  slug: 'bapjeongne' | 'fortune-cookie' | 'lunch-picker' | 'baby-med-diary' | 'cat-weather' | 'senior-care-diary';
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  theme: {
    accent: string;
    gradientFrom: string;
    gradientTo: string;
  };
  icon: string;
  tags: string[];
  storeLinks: AppPlatformLink[];
  features: AppFeature[];
  usage: AppUsageStep[];
  screenshots: AppScreenshot[];
  qna: AppFaq[];
  updates?: AppUpdateLog[];
  messageExamples?: string[];
  testimonials?: AppTestimonial[];
  summary: {
    problem: string;
    solution: string;
    metrics: AppMetric[];
  };
}
