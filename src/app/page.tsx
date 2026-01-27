import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { PageSEO } from '@/components/seo';
import { pageDefaults, seoConfig, structuredDataTemplates } from '@/lib/seo/config';
import { getAllApps } from '@/lib/data/apps';
import { AppCard } from '@/components/apps/AppCard';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: pageDefaults.home.title,
  description: pageDefaults.home.description,
  keywords: pageDefaults.home.keywords,
  openGraph: {
    title: pageDefaults.home.title,
    description: pageDefaults.home.description,
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    images: [
      {
        url: `${seoConfig.siteUrl}${seoConfig.defaultImage}`,
        width: 1200,
        height: 630,
        alt: '모카데브 홈',
      },
    ],
    locale: seoConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: pageDefaults.home.title,
    description: pageDefaults.home.description,
    images: [`${seoConfig.siteUrl}${seoConfig.defaultImage}`],
  },
  alternates: {
    canonical: seoConfig.siteUrl,
  },
};

export default function Home() {
  const featuredApps = getAllApps();

  return (
    <>
      <PageSEO
        title={pageDefaults.home.title}
        description={pageDefaults.home.description}
        keywords={pageDefaults.home.keywords}
        ogImage="/images/og/home.svg"
        structuredData={[
          { type: 'SoftwareApplication', data: structuredDataTemplates.softwareApplication },
        ]}
      />

      <div className="bg-gradient-to-br from-[#f5f3ff] via-white to-[#e0f2fe]">
        <section className="border-b border-black/5">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.2fr,0.8fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                MokaDev
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                개인이 만든
                <br />
                생활형 모바일 실험실
              </h1>
              <p className="mt-6 text-lg text-gray-700">
                랜덤 식당 추천, 포춘 메시지, 스케줄 기반 점심 관리까지. 작은 문제를 날카롭게
                정의하고 앱으로 해결하는 개인 개발자 모카데브의 작업실입니다.
              </p>
            </div>
            <Card className="border-none bg-white/90 shadow-xl">
              <CardContent className="space-y-5 p-6">
                <p className="text-sm font-semibold text-gray-500">모카데브의 제작 원칙</p>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li>• 문제 정의와 데이터 수집을 먼저 끝낸다.</li>
                  <li>• 사용성 테스트 결과를 주 1회 이상 반영한다.</li>
                  <li>• 개인정보는 기능에 필요한 최소 범위만 수집한다.</li>
                </ul>
                <Link
                  href="#apps"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900"
                >
                  앱 살펴보기
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="apps" className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500">MokaDev Apps</p>
              <h2 className="text-3xl font-bold text-gray-900">모카데브가 만든 앱들</h2>
              <p className="text-sm text-gray-600">
                각 카드에서 상세 페이지로 이동해 스크린샷과 다운로드 링크를 확인하세요.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredApps.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </div>
        </section>

        <section className="border-t border-black/5 bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-gray-500">About MokaDev</p>
              <h2 className="text-3xl font-bold text-gray-900">작은 문제를 발견하는 능력</h2>
              <p className="mt-4 text-sm text-gray-600">
                사용자 인터뷰를 통해 점심 의사결정과 감정 케어라는 두 가지 문제를 발견했고, 이를
                해결하기 위한 실험을 계속하고 있습니다. 앱 하나하나에는 모카데브의 디자인 시스템과
                데이터 파이프라인이 녹아 있습니다.
              </p>
            </div>
            <div className="grid gap-4 text-sm text-gray-600">
              <Card className="border-black/5 bg-gray-50">
                <CardContent className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Workflow
                  </p>
                  <p className="mt-2">
                    아이디어 → 프로토타입 → 커뮤니티 피드백 → 데이터 계측 → 제품화 순으로 반복하며,
                    각 단계별로 Notion/Linear를 통해 기록을 남깁니다.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-black/5 bg-gray-50">
                <CardContent className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Stack
                  </p>
                  <p className="mt-2">
                    Next.js, React Native, Expo, Firebase, Supabase, Vercel, Cloudflare, GA4, FCM,
                    RevenueCat.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-black/5 bg-gray-50">
                <CardContent className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Contact
                  </p>
                  <p className="mt-2">
                    사이드 프로젝트 협업 혹은 강연 요청은{' '}
                    <Link
                      href="mailto:mocadev.tony@gmail.com"
                      className="font-semibold text-gray-900"
                    >
                      mocadev.tony@gmail.com
                    </Link>
                    으로 편하게 보내주세요.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-t border-black/5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 text-center">
            <h2 className="text-3xl font-bold">다음 실험에 함께하고 싶다면</h2>
            <p className="text-base text-white/80">
              새로운 아이디어 제안, 강연, 인터뷰 요청을 기다리고 있어요.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
              <Link
                href="mailto:mocadev.tony@gmail.com"
                className="rounded-full bg-white px-5 py-3 text-gray-900"
              >
                이메일 보내기
              </Link>
              <Link
                href="https://github.com/mocadev"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/50 px-5 py-3"
              >
                GitHub 살펴보기
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
