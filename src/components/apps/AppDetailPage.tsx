import Image from 'next/image';
import { AppContent } from '@/types/app';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DownloadButtons } from './DownloadButtons';
import { ScreenshotCarousel } from './ScreenshotCarousel';

interface AppDetailPageProps {
  app: AppContent;
}

export function AppDetailPage({ app }: AppDetailPageProps) {
  return (
    <div className="bg-white">
      <section
        className="border-b border-black/5"
        style={{
          backgroundImage: `linear-gradient(135deg, ${app.theme.gradientFrom}, ${app.theme.gradientTo})`,
        }}
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2 md:items-center">
          <div>
            <div className="mb-4 inline-flex rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-gray-600">
              {app.icon} {app.tagline}
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900">{app.name}</h1>
            <p className="mb-6 text-lg text-gray-700">{app.description}</p>
            <DownloadButtons links={app.storeLinks} />
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-white/40 blur-3xl" />
            <div className="relative rounded-3xl border border-white/60 bg-white/90 p-4 shadow-2xl">
              <Image
                src={app.heroImage}
                alt={`${app.name} 대표 이미지`}
                width={900}
                height={600}
                className="h-auto w-full rounded-2xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16">
        <section className="grid gap-6 md:grid-cols-3">
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-sm text-gray-500">해결하고 싶은 문제</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700">{app.summary.problem}</CardContent>
          </Card>
          <Card className="bg-gray-50 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm text-gray-500">모카데브의 접근</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700">{app.summary.solution}</CardContent>
          </Card>
          {app.summary.metrics.map((metric) => (
            <Card key={metric.label} className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-900">{metric.value}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-500">{metric.label}</CardContent>
            </Card>
          ))}
        </section>

        <section>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500">핵심 기능</p>
              <h2 className="text-2xl font-bold text-gray-900">앱을 특별하게 만드는 요소</h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {app.features.map((feature) => (
              <Card key={feature.title} className="border-black/5">
                <CardContent className="p-6">
                  <div className="mb-4 text-2xl">{feature.icon}</div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <p className="text-sm font-semibold text-gray-500">사용 플로우</p>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">등록부터 활용까지 3단계</h2>
          <div className="space-y-4">
            {app.usage.map((step, index) => (
              <div
                key={step.title}
                className="flex flex-col gap-3 rounded-2xl border border-black/5 bg-gray-50 p-5 md:flex-row md:items-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-semibold text-gray-900 shadow-sm">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{step.title}</p>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="text-sm font-semibold text-gray-500">스크린샷</p>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">앱 화면 미리보기</h2>
          <ScreenshotCarousel screenshots={app.screenshots} accentColor={app.theme.accent} />
        </section>

        {app.slug === 'bapjeongne' && (
          <section>
            <p className="text-sm font-semibold text-gray-500">앱 소개</p>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">밥정너를 만나보세요</h2>
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white p-4 shadow-lg">
                <Image
                  src="/images/apps/bobjeongneo/ChatGPT Image 2025년 11월 25일 오전 01_17_08.png"
                  alt="밥정너 앱 소개 이미지"
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-2xl object-contain"
                  priority={false}
                />
              </div>
              <div className="space-y-4 rounded-3xl border border-black/5 bg-gradient-to-br from-gray-50 to-white p-8">
                <h3 className="text-xl font-bold text-gray-900">가볍지만 흐트러짐 없는 사용 흐름</h3>
                <p className="text-gray-700">
                  앱은 네 가지 단순한 화면으로 돌아간다. 시작하기 화면, 지도에서 위치 선택 & 검색 반경 설정, 3초 카운트다운 → 랜덤 추천, 식당 정보 & 방문 통계. 필요한 것만 남긴 구성이라 누구나 처음 보는 순간부터 바로 사용할 수 있다.
                </p>
                <p className="text-gray-700">
                  똑똑한 기능이지만 다루기는 편한 앱, 그것이 밥정너의 핵심이다.
                </p>
              </div>
              <div className="space-y-4 rounded-3xl border border-black/5 bg-gradient-to-br from-white to-gray-50 p-8">
                <h3 className="text-xl font-bold text-gray-900">밥정너가 해결하는 것</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 text-purple-600">✓</span>
                    <span>점심 메뉴 결정 스트레스</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-purple-600">✓</span>
                    <span>매번 같은 곳만 가는 단조로움</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-purple-600">✓</span>
                    <span>새로운 식당을 찾아보기 귀찮은 순간</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-purple-600">✓</span>
                    <span>식당 선택을 대신해줄 누군가가 필요한 시간</span>
                  </li>
                </ul>
                <p className="mt-4 text-gray-700">
                  당신이 해야 할 일은 단 한 가지다. 위치를 고르고, "저 여기 있어요!" 버튼을 누르는 것. 나머지는 밥정너가 알아서 움직인다.
                </p>
              </div>
            </div>
          </section>
        )}

        {app.messageExamples && (
          <section>
            <p className="text-sm font-semibold text-gray-500">메시지 예시</p>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">오늘 받을 수 있는 문장</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {app.messageExamples.map((message) => (
                <Card
                  key={message}
                  className="border-black/5 bg-gradient-to-br from-white to-gray-50"
                >
                  <CardContent className="p-6 text-base text-gray-800">{message}</CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {app.testimonials && (
          <section>
            <p className="text-sm font-semibold text-gray-500">사용자 후기</p>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              팀과 개인이 이렇게 활용하고 있어요
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {app.testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="border-black/5">
                  <CardContent className="space-y-3 p-6">
                    <p className="text-base text-gray-800">“{testimonial.quote}”</p>
                    <p className="text-sm text-gray-500">
                      {testimonial.name} · {testimonial.role}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section>
          <p className="text-sm font-semibold text-gray-500">Q&A</p>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">자주 묻는 질문</h2>
          <div className="space-y-4">
            {app.qna.map((item) => (
              <Card key={item.question} className="border-black/5">
                <CardContent className="space-y-2 p-6">
                  <p className="font-semibold text-gray-900">{item.question}</p>
                  <p className="text-sm text-gray-600">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {app.updates && (
          <section>
            <p className="text-sm font-semibold text-gray-500">업데이트 로그</p>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">꾸준히 진화하는 제품</h2>
            <div className="space-y-4">
              {app.updates.map((update) => (
                <div
                  key={update.version}
                  className="flex flex-col gap-4 rounded-2xl border border-black/5 bg-white p-5 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-500">{update.date}</p>
                    <p className="text-lg font-semibold text-gray-900">{update.version}</p>
                  </div>
                  <p className="text-sm text-gray-600">{update.summary}</p>
                  <Badge className="bg-gray-900 text-white">업데이트</Badge>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
