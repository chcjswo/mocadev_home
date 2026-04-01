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
const getDynamicPages = async (): Promise<SitemapUrl[]> => {
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
      alternates['x-default'] = `${seoConfig.siteUrl}/${routing.defaultLocale}${page.url}`;
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

// robots.txt 생성 (주요 검색엔진 크롤러 허용, 불필요한 경로 차단)
export const generateRobotsTxt = (): string => {
  const disallowPaths = ['/api/', '/admin/', '/_next/'];
  const allowPaths = ['/'];

  const rules: RobotsRule[] = [
    { userAgent: '*', allow: allowPaths, disallow: disallowPaths },
    // 구글
    { userAgent: 'Googlebot', allow: allowPaths, disallow: disallowPaths },
    { userAgent: 'Googlebot-Image', allow: allowPaths, disallow: [] },
    // 네이버
    { userAgent: 'Yeti', allow: allowPaths, disallow: disallowPaths },
    // 빙
    { userAgent: 'Bingbot', allow: allowPaths, disallow: disallowPaths },
    // 애플
    { userAgent: 'Applebot', allow: allowPaths, disallow: disallowPaths },
  ];

  let robotsTxt = '';

  rules.forEach((rule) => {
    robotsTxt += `User-agent: ${rule.userAgent}\n`;
    if (rule.allow) rule.allow.forEach((path) => (robotsTxt += `Allow: ${path}\n`));
    if (rule.disallow) rule.disallow.forEach((path) => (robotsTxt += `Disallow: ${path}\n`));
    if (rule.crawlDelay) robotsTxt += `Crawl-delay: ${rule.crawlDelay}\n`;
    robotsTxt += '\n';
  });

  robotsTxt += `Sitemap: ${seoConfig.siteUrl}/sitemap.xml\n`;

  return robotsTxt;
};
