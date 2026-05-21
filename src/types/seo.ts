// 사이트 기본 설정 타입
export interface SeoConfigProps {
  defaultTitle: string;
  titleTemplate?: string;
  defaultDescription: string;
  defaultKeywords?: string;
  siteUrl: string;
  siteName: string;
  defaultImage: string;
  twitterUsername?: string;
  language: string;
  locale: string;
}

// JSON-LD 구조화된 데이터 타입
export interface StructuredDataProps {
  type:
    | 'Organization'
    | 'WebSite'
    | 'WebPage'
    | 'Article'
    | 'BreadcrumbList'
    | 'Product'
    | 'LocalBusiness'
    | 'Event'
    | 'Review'
    | 'SoftwareApplication';
  data: Record<string, unknown>;
}

// Sitemap URL 타입
export interface SitemapUrl {
  url: string;
  lastModified?: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  /** 다국어 대체 URL (locale -> 절대 URL). 사이트맵 hreflang 출력용 */
  alternates?: Record<string, string>;
}

// Robots.txt 규칙 타입
export interface RobotsRule {
  userAgent: string;
  allow?: string[];
  disallow?: string[];
  crawlDelay?: number;
}
