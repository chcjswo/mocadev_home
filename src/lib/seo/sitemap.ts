import { SitemapUrl, RobotsRule } from '@/types/seo';
import { routing } from '@/i18n/routing';
import { getAllAppSlugs } from '@/lib/data/apps';
import { seoConfig } from './config';

const APP_PRIORITY = 0.8;
const APP_CHANGE_FREQ = 'monthly' as const;

/** 각 앱의 마지막 업데이트 날짜 (앱 추가/업데이트 시 갱신) */
const APP_LAST_MODIFIED: Record<string, Date> = {
  bapjeongne: new Date('2025-11-25'),
  'fortune-cookie': new Date('2025-11-25'),
  'lunch-picker': new Date('2025-11-25'),
  'baby-med-diary': new Date('2026-01-15'),
  'cat-weather': new Date('2026-01-15'),
  'senior-care-diary': new Date('2026-02-14'),
  recipehouse: new Date('2026-03-08'),
};

/** 고정 라우트 (앱 목록은 apps 데이터에서 생성) */
const FIXED_PAGES: Array<{
  url: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly';
  lastModified: Date;
}> = [
  { url: '/', priority: 1.0, changeFrequency: 'weekly', lastModified: new Date('2026-03-08') },
  { url: '/team', priority: 0.7, changeFrequency: 'monthly', lastModified: new Date('2026-01-01') },
];

/** 정적 페이지 목록: 고정 라우트 + 앱 상세 (locale prefix 없음, generateSitemap에서 locale별 확장) */
function getStaticPages(): Array<{
  url: string;
  priority: number;
  changeFrequency: SitemapUrl['changeFrequency'];
  lastModified: Date;
}> {
  const appPages = getAllAppSlugs().map((slug) => ({
    url: `/apps/${slug}`,
    priority: APP_PRIORITY,
    changeFrequency: APP_CHANGE_FREQ,
    lastModified: APP_LAST_MODIFIED[slug] ?? new Date('2026-01-01'),
  }));
  return [...FIXED_PAGES, ...appPages];
}

/** 동적 페이지 URL (블로그·상품 등 추가 시 여기서 반환) */
export const getDynamicPages = async (): Promise<SitemapUrl[]> => {
  return [];
};

// 사이트맵 XML 생성 (다국어: 각 페이지를 locale별 URL로 노출, hreflang 링크 포함)
export const generateSitemap = async (): Promise<string> => {
  const staticPages = getStaticPages();
  const staticUrls: SitemapUrl[] = [];
  for (const locale of routing.locales) {
    for (const page of staticPages) {
      const alternates: Record<string, string> = {};
      for (const loc of routing.locales) {
        alternates[loc] = `${seoConfig.siteUrl}/${loc}${page.url}`;
      }
      alternates['x-default'] = `${seoConfig.siteUrl}/ko${page.url}`;
      staticUrls.push({
        url: `/${locale}${page.url}`,
        lastModified: page.lastModified,
        priority: page.priority,
        changeFrequency: page.changeFrequency,
        alternates,
      });
    }
  }

  const dynamicUrls = await getDynamicPages();
  const allUrls = [...staticUrls, ...dynamicUrls];

  const urlEntry = (url: SitemapUrl) => {
    const loc = `${seoConfig.siteUrl}${url.url}`;
    const lastmod = url.lastModified?.toISOString() || new Date().toISOString();
    const changefreq = url.changeFrequency || 'monthly';
    const priority = url.priority ?? 0.5;
    const xhtmlLinks =
      url.alternates &&
      Object.entries(url.alternates)
        .map(
          ([hreflang, href]) =>
            `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`,
        )
        .join('\n');
    const xhtmlBlock = xhtmlLinks ? `\n${xhtmlLinks}\n    ` : '';
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${xhtmlBlock}
  </url>`;
  };

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allUrls.map(urlEntry).join('\n')}
</urlset>`;

  return sitemap;
};

// robots.txt 생성 (구글·네이버 검색엔진 수집 허용)
export const generateRobotsTxt = (): string => {
  const rules: RobotsRule[] = [
    {
      userAgent: '*',
      allow: ['/'],
      disallow: ['/api/', '/admin/'],
    },
    {
      userAgent: 'Googlebot',
      allow: ['/'],
      disallow: ['/api/', '/admin/'],
    },
    {
      userAgent: 'Yeti',
      allow: ['/'],
      disallow: ['/api/', '/admin/'],
    },
  ];

  let robotsTxt = '';

  rules.forEach((rule) => {
    robotsTxt += `User-agent: ${rule.userAgent}\n`;

    if (rule.allow) {
      rule.allow.forEach((path) => {
        robotsTxt += `Allow: ${path}\n`;
      });
    }

    if (rule.disallow) {
      rule.disallow.forEach((path) => {
        robotsTxt += `Disallow: ${path}\n`;
      });
    }

    if (rule.crawlDelay) {
      robotsTxt += `Crawl-delay: ${rule.crawlDelay}\n`;
    }

    robotsTxt += '\n';
  });

  // 사이트맵 URL 추가
  robotsTxt += `Sitemap: ${seoConfig.siteUrl}/sitemap.xml\n`;

  return robotsTxt;
};

// 사이트맵 인덱스 생성 (여러 사이트맵이 있는 경우)
export const generateSitemapIndex = (): string => {
  const sitemaps = [
    { url: '/sitemap.xml', lastModified: new Date() },
    // 추가 사이트맵이 있다면 여기에 추가
    // { url: '/sitemap-news.xml', lastModified: new Date() },
    // { url: '/sitemap-images.xml', lastModified: new Date() },
  ];

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (sitemap) => `  <sitemap>
    <loc>${seoConfig.siteUrl}${sitemap.url}</loc>
    <lastmod>${sitemap.lastModified.toISOString()}</lastmod>
  </sitemap>`,
  )
  .join('\n')}
</sitemapindex>`;

  return sitemapIndex;
};

// Next.js API 라우트에서 사용할 헬퍼 함수들
export const sitemapHelpers = {
  // 사이트맵 응답 헤더 설정
  setSitemapHeaders: (res: { setHeader: (key: string, value: string) => void }) => {
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  },

  // robots.txt 응답 헤더 설정
  setRobotsHeaders: (res: { setHeader: (key: string, value: string) => void }) => {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  },
};

// URL 정규화 함수
export const normalizeUrl = (url: string): string => {
  // 중복 슬래시 제거
  url = url.replace(/\/+/g, '/');

  // 마지막 슬래시 제거 (루트 URL 제외)
  if (url.length > 1 && url.endsWith('/')) {
    url = url.slice(0, -1);
  }

  return url;
};

// URL 우선순위 계산 (페이지 깊이 기반)
export const calculatePriority = (url: string): number => {
  const depth = url.split('/').length - 1;

  if (depth === 1) return 1.0; // 홈페이지
  if (depth === 2) return 0.8; // 주요 섹션
  if (depth === 3) return 0.6; // 서브 페이지
  return 0.4; // 깊은 페이지
};

// 페이지 변경 빈도 계산
export const calculateChangeFrequency = (url: string): SitemapUrl['changeFrequency'] => {
  if (url === '/') return 'daily';
  if (url.includes('/blog/') || url.includes('/news/')) return 'weekly';
  if (url.includes('/product/') || url.includes('/service/')) return 'monthly';
  return 'yearly';
};

// 사이트맵 검증
export const validateSitemap = (sitemap: string): boolean => {
  try {
    // XML 형식 기본 검증
    const hasXmlDeclaration = sitemap.includes('<?xml version="1.0"');
    const hasUrlset = sitemap.includes('<urlset');
    const hasClosingUrlset = sitemap.includes('</urlset>');

    return hasXmlDeclaration && hasUrlset && hasClosingUrlset;
  } catch (error) {
    console.error('사이트맵 검증 오류:', error);
    return false;
  }
};
