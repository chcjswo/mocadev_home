import { PageSEO } from '@/components/seo';
import { pageDefaults } from '@/lib/seo/config';

const effectiveDate = new Intl.DateTimeFormat('ko', {
  dateStyle: 'long',
}).format(new Date());

export default function PrivacyPage() {
  return (
    <>
      <PageSEO
        title={pageDefaults.privacy.title}
        description={pageDefaults.privacy.description}
        keywords={pageDefaults.privacy.keywords}
        canonical="/privacy"
      />
      <div className="bg-white">
        <section className="border-b border-black/5 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="mx-auto max-w-4xl px-4 py-16">
            <p className="text-sm font-semibold text-gray-500">Privacy Policy</p>
            <h1 className="mt-2 text-4xl font-bold text-gray-900">모카데브 개인정보 처리방침</h1>
            <p className="mt-4 text-sm text-gray-600">
              본 약관은 밥정너, 포춘쿠키, 점심 뭐 먹지 (이하 “3개 앱”)에 공통으로 적용됩니다.
              모카데브는 기능 제공에 필요한 최소한의 정보만을 수집하며, 이용 목적 외 다른 용도로
              사용하지 않습니다.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-gray-500">
              시행일 {effectiveDate}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-12 px-4 py-16 text-sm text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900">1. 수집 항목 및 이용 목적</h2>
            <div className="mt-4 space-y-4 rounded-2xl border border-black/5 bg-gray-50 p-6">
              <div>
                <p className="font-semibold text-gray-900">필수 수집 항목</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>계정/디바이스 정보: Firebase 설치 ID, OS 버전 (문제 분석용)</li>
                  <li>앱 이용 기록: 추천 버튼 클릭, 메시지 저장, 푸시 응답 여부 (서비스 개선)</li>
                  <li>푸시 토큰: 점심 뭐 먹지, 포춘쿠키 푸시 알림 발송 목적</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900">선택 수집 항목</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>위치 정보: 밥정너가 주변 식당을 추천하기 위해 사용 (실시간 저장 없음)</li>
                  <li>사용자 입력 식당 데이터: 점심 뭐 먹지의 추천 정확도 향상</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">2. 보관 기간</h2>
            <p className="mt-4">
              서비스 이용 중에는 데이터를 안전하게 보관하며, 탈퇴 및 삭제 요청 시 즉시 파기합니다.
              마지막 로그인 후 12개월 동안 접속 기록이 없으면 자동으로 익명화합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">3. 외부 연동</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>카카오/네이버 지도 API: 식당 정보 및 길찾기 연동 (밥정너)</li>
              <li>Google Places: 영문명 매핑 및 평점 보강</li>
              <li>Firebase Cloud Messaging: 푸시 알림 전송</li>
              <li>RevenueCat: 구독/인앱 구매 관리 (점심 뭐 먹지)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">4. 이용자 권리</h2>
            <p className="mt-4">
              앱 내 [설정 &gt; 개인정보] 메뉴에서 열람/정정/삭제 및 동의 철회가 가능합니다. 위치
              권한과 푸시 알림은 기기 설정에서도 별도로 제어할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">5. 안전성 확보 조치</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>전송 구간 암호화(HTTPS) 및 Firebase Authentication 적용</li>
              <li>민감 데이터 분리 저장, 접근 권한 최소화</li>
              <li>월 1회 이상 로그 점검 및 이상 징후 모니터링</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">6. 문의처</h2>
            <p className="mt-4">
              개인정보 관련 문의는{' '}
              <a href="mailto:mocadev.tony@gmail.com" className="font-semibold text-gray-900">
                mocadev.tony@gmail.com
              </a>
              으로 연락해 주세요. 영업일 기준 7일 이내에 답변드리겠습니다.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
