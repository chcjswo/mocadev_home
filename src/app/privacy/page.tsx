import type { Metadata } from 'next';
import { PageSEO } from '@/components/seo';
import { pageDefaults, seoConfig } from '@/lib/seo/config';

export const metadata: Metadata = {
  title: pageDefaults.privacy.title,
  description: pageDefaults.privacy.description,
  keywords: pageDefaults.privacy.keywords,
  openGraph: {
    title: pageDefaults.privacy.title,
    description: pageDefaults.privacy.description,
    url: `${seoConfig.siteUrl}/privacy`,
    siteName: seoConfig.siteName,
    images: [
      {
        url: `${seoConfig.siteUrl}${seoConfig.defaultImage}`,
        width: 1200,
        height: 630,
        alt: '모카데브 개인정보 처리방침',
      },
    ],
    locale: seoConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: pageDefaults.privacy.title,
    description: pageDefaults.privacy.description,
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/privacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
            <h1 className="mt-2 text-4xl font-bold text-gray-900">개인정보처리방침</h1>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-12 px-4 py-16 text-sm text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900">제1조(목적)</h2>
            <p className="mt-4 leading-relaxed">
              모카데브(이하 &lsquo;회사&rsquo;라고 함)는 회사가 제공하고자 하는 서비스(이하
              &lsquo;회사 서비스&rsquo;)를 이용하는 개인(이하 &lsquo;이용자&rsquo; 또는
              &lsquo;개인&rsquo;)의 정보(이하 &lsquo;개인정보&rsquo;)를 보호하기 위해,
              개인정보보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률(이하
              &lsquo;정보통신망법&rsquo;) 등 관련 법령을 준수하고, 서비스 이용자의 개인정보 보호
              관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이
              개인정보처리방침(이하 &lsquo;본 방침&rsquo;)을 수립합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">제2조(개인정보 처리의 원칙)</h2>
            <p className="mt-4 leading-relaxed">
              개인정보 관련 법령 및 본 방침에 따라 회사는 이용자의 개인정보를 수집할 수 있으며
              수집된 개인정보는 개인의 동의가 있는 경우에 한해 제3자에게 제공될 수 있습니다. 단,
              법령의 규정 등에 의해 적법하게 강제되는 경우 회사는 수집한 이용자의 개인정보를 사전에
              개인의 동의 없이 제3자에게 제공할 수도 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">제3조(본 방침의 공개)</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                회사는 이용자가 언제든지 쉽게 본 방침을 확인할 수 있도록 회사 홈페이지 첫 화면 또는
                첫 화면과의 연결화면을 통해 본 방침을 공개하고 있습니다.
              </li>
              <li>
                회사는 제1항에 따라 본 방침을 공개하는 경우 글자 크기, 색상 등을 활용하여 이용자가
                본 방침을 쉽게 확인할 수 있도록 합니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">제4조(본 방침의 변경)</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                본 방침은 개인정보 관련 법령, 지침, 고시 또는 정부나 회사 서비스의 정책이나 내용의
                변경에 따라 개정될 수 있습니다.
              </li>
              <li>
                회사는 제1항에 따라 본 방침을 개정하는 경우 다음 각 호 하나 이상의 방법으로
                공지합니다.
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>
                    회사가 운영하는 인터넷 홈페이지의 첫 화면의 공지사항란 또는 별도의 창을 통하여
                    공지하는 방법
                  </li>
                  <li>서면·모사전송·전자우편 또는 이와 비슷한 방법으로 이용자에게 공지하는 방법</li>
                </ol>
              </li>
              <li>
                회사는 제2항의 공지는 본 방침 개정의 시행일로부터 최소 7일 이전에 공지합니다. 다만,
                이용자 권리의 중요한 변경이 있을 경우에는 최소 30일 전에 공지합니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">제5조(개인정보 수집 방법)</h2>
            <p className="mt-4 leading-relaxed">
              회사는 다음과 같은 방법으로 이용자의 개인정보를 수집합니다.
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>이용자가 회사의 홈페이지에 자신의 개인정보를 입력하는 방식</li>
              <li>
                어플리케이션 등 회사가 제공하는 홈페이지 외의 서비스를 통해 이용자가 자신의
                개인정보를 입력하는 방식
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">제6조(개인정보의 이용)</h2>
            <p className="mt-4 leading-relaxed">
              회사는 개인정보를 다음 각 호의 경우에 이용합니다.
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>공지사항의 전달 등 회사운영에 필요한 경우</li>
              <li>이용문의에 대한 회신, 불만의 처리 등 이용자에 대한 서비스 개선을 위한 경우</li>
              <li>회사의 서비스를 제공하기 위한 경우</li>
              <li>
                법령 및 회사 약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용 행위를 포함하여
                서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및 제재를 위한 경우
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">제7조(개인정보의 보유 및 이용기간)</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                회사는 이용자의 개인정보에 대해 개인정보의 수집·이용 목적 달성을 위한 기간 동안
                개인정보를 보유 및 이용합니다.
              </li>
              <li>
                전항에도 불구하고 회사는 내부 방침에 의해 서비스 부정이용기록은 부정 가입 및 이용
                방지를 위하여 회원 탈퇴 시점으로부터 최대 1년간 보관합니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              제8조(법령에 따른 개인정보의 보유 및 이용기간)
            </h2>
            <p className="mt-4 leading-relaxed">
              회사는 관계법령에 따라 다음과 같이 개인정보를 보유 및 이용합니다.
            </p>
            <ol className="mt-4 list-decimal space-y-4 pl-5 leading-relaxed">
              <li>
                전자상거래 등에서의 소비자보호에 관한 법률에 따른 보유정보 및 보유기간
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>계약 또는 청약철회 등에 관한 기록 : 5년</li>
                  <li>대금결제 및 재화 등의 공급에 관한 기록 : 5년</li>
                  <li>소비자의 불만 또는 분쟁처리에 관한 기록 : 3년</li>
                  <li>표시•광고에 관한 기록 : 6개월</li>
                </ol>
              </li>
              <li>
                통신비밀보호법에 따른 보유정보 및 보유기간
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>웹사이트 로그 기록 자료 : 3개월</li>
                </ol>
              </li>
              <li>
                전자금융거래법에 따른 보유정보 및 보유기간
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>전자금융거래에 관한 기록 : 5년</li>
                </ol>
              </li>
              <li>
                위치정보의 보호 및 이용 등에 관한 법률
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>개인위치정보에 관한 기록 : 6개월</li>
                </ol>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">제9조(개인정보의 파기원칙)</h2>
            <p className="mt-4 leading-relaxed">
              회사는 원칙적으로 이용자의 개인정보 처리 목적의 달성, 보유·이용기간의 경과 등
              개인정보가 필요하지 않을 경우에는 해당 정보를 지체 없이 파기합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">제10조(개인정보파기절차)</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                이용자가 회원가입 등을 위해 입력한 정보는 개인정보 처리 목적이 달성된 후 별도의 DB로
                옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에
                따라(보유 및 이용기간 참조) 일정 기간 저장된 후 파기 되어집니다.
              </li>
              <li>
                회사는 파기 사유가 발생한 개인정보를 개인정보보호 책임자의 승인절차를 거쳐
                파기합니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">제11조(개인정보파기방법)</h2>
            <p className="mt-4 leading-relaxed">
              회사는 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을
              사용하여 삭제하며, 종이로 출력된 개인정보는 분쇄기로 분쇄하거나 소각 등을 통하여
              파기합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              제12조(개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항)
            </h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용 정보를 저장하고 수시로
                불러오는 개인정보 자동 수집장치(이하 &lsquo;쿠키&rsquo;)를 사용합니다. 쿠키는
                웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 웹브라우저(PC 및 모바일을
                포함)에게 보내는 소량의 정보이며 이용자의 저장공간에 저장되기도 합니다.
              </li>
              <li>
                이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서 이용자는 웹브라우저에서
                옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나,
                아니면 모든 쿠키의 저장을 거부할 수도 있습니다.
              </li>
              <li>
                다만, 쿠키의 저장을 거부할 경우에는 로그인이 필요한 회사의 일부 서비스는 이용에
                어려움이 있을 수 있습니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">제13조(쿠키 설치 허용 지정 방법)</h2>
            <p className="mt-4 leading-relaxed">
              웹브라우저 옵션 설정을 통해 쿠키 허용, 쿠키 차단 등의 설정을 할 수 있습니다.
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                Edge : 웹브라우저 우측 상단의 설정 메뉴 &gt; 쿠키 및 사이트 권한 &gt; 쿠키 및 사이트
                데이터 관리 및 삭제
              </li>
              <li>
                Chrome : 웹브라우저 우측 상단의 설정 메뉴 &gt; 개인정보 및 보안 &gt; 쿠키 및 기타
                사이트 데이터
              </li>
              <li>
                Whale : 웹브라우저 우측 상단의 설정 메뉴 &gt; 개인정보 보호 &gt; 쿠키 및 기타 사이트
                데이터
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              제14조(회사의 개인정보 보호 책임자 지정)
            </h2>
            <p className="mt-4 leading-relaxed">
              회사는 이용자의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와
              같이 관련 부서 및 개인정보 보호 책임자를 지정하고 있습니다.
            </p>
            <div className="mt-4 space-y-2">
              <p className="font-semibold text-gray-900">가. 개인정보 보호 책임자</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5">
                <li>성명: 전민철</li>
                <li>직책: 대표</li>
                <li>이메일: mocadev.tony@gmail.com</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">부칙</h2>
            <p className="mt-4 leading-relaxed">제1조 본 방침은 2025.11.10.부터 시행됩니다.</p>
          </section>
        </div>
      </div>
    </>
  );
}
