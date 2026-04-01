# Mocadev Home

모카데브가 직접 설계하고 운영하는 생활형 모바일 앱 컬렉션을 소개하는 포트폴리오 웹사이트입니다.

## 📱 소개

Mocadev Home은 개인 개발자 모카데브가 만든 7개의 모바일 앱을 소개하는 웹사이트입니다. 각 앱의 기능, 사용법, 다운로드 링크를 한 곳에서 확인할 수 있습니다.

### 주요 앱

| 앱 | 아이콘 | 설명 |
|----|--------|------|
| **밥정너** | 🍱 | 당신의 점심 고민을 대신 해결하는 한 끼 큐레이터 |
| **포춘쿠키** | 🥠 | 쿠키를 톡! 오늘의 메시지가 도착합니다 |
| **점심 뭐 먹지** | 🍽️ | 내가 고른 식당들로 완성되는, 나만의 점심 추천 앱 |
| **우리아기 투약일기** | 💊 | 아기 투약 기록과 알림을 한눈에 |
| **날씨다냥** | 🐱 | 귀여운 고양이와 함께 날씨를 확인하세요! |
| **어르신 투약일지** | 💊 | 한 번 등록하면 기간 동안 자동 관리 |
| **레시피창고** | 📖 | 나만의 레시피를 기록하고 찾는 심플한 앱 |

## 🛠️ 기술 스택

- **프레임워크**: Next.js 16 (App Router, Turbopack)
- **언어**: TypeScript 5
- **스타일링**: Tailwind CSS 4
- **UI 컴포넌트**: Shadcn/ui (Radix UI 기반)
- **폰트**: Geist Sans, Geist Mono
- **다국어**: next-intl (한국어 / 영어)
- **분석**: Vercel Analytics, Firebase Analytics
- **광고**: Google AdSense

## 📦 주요 의존성

- `next` - Next.js 프레임워크
- `react` / `react-dom` - React 19
- `tailwindcss` - 유틸리티 CSS 프레임워크
- `@radix-ui/*` - 접근성 우선 UI 프리미티브
- `lucide-react` - 아이콘 라이브러리
- `next-intl` - 다국어 지원 (i18n)
- `firebase` - Firebase Analytics
- `@vercel/analytics` - Vercel Analytics

## 🚀 시작하기

### 사전 요구사항

- Node.js 22.x
- npm

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (Turbopack)
npm run dev
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

### 린팅

```bash
npm run lint
```

### 이미지 최적화

새 이미지를 `public/images`에 추가한 후 아래 명령으로 압축하세요:

```bash
npm run optimize:images
```

- PNG: compressionLevel 9 / quality 85
- JPEG: quality 82 progressive
- 파일명 공백 자동 제거 (공백 → 하이픈)

## 📁 프로젝트 구조

```
src/
├── app/
│   └── [locale]/              # 다국어 라우트 (ko / en)
│       ├── apps/              # 앱 상세 페이지
│       │   ├── bapjeongne/
│       │   ├── fortune-cookie/
│       │   ├── lunch-picker/
│       │   ├── baby-med-diary/
│       │   ├── cat-weather/
│       │   ├── senior-care-diary/
│       │   └── recipehouse/
│       ├── privacy/           # 개인정보 처리방침
│       ├── team/              # 팀 소개
│       ├── layout.tsx         # 로케일 레이아웃
│       └── page.tsx           # 홈페이지
├── components/
│   ├── ads/              # 광고 컴포넌트
│   ├── analytics/        # Vercel / Firebase Analytics
│   ├── apps/             # 앱 관련 컴포넌트
│   ├── layout/           # 헤더, 푸터, 언어 전환
│   ├── privacy/          # 개인정보 처리방침
│   ├── seo/              # SEO 컴포넌트
│   └── ui/               # Shadcn/ui 컴포넌트
├── i18n/                 # next-intl 설정
├── lib/
│   ├── data/             # 앱 데이터 (apps.ts)
│   ├── seo/              # SEO 설정 & 사이트맵
│   └── utils.ts
├── types/                # TypeScript 타입 정의
messages/
├── ko.json               # 한국어 번역
└── en.json               # 영어 번역
scripts/
└── optimize-images.mjs   # 이미지 압축 스크립트
```

## ✨ 주요 기능

### SEO 최적화

- 동적 메타 태그 생성
- 구조화된 데이터 (JSON-LD)
- 사이트맵 자동 생성
- robots.txt 설정
- Open Graph 이미지 지원

### 앱 소개 페이지

각 앱별로 다음 정보를 제공합니다:

- 앱 소개 및 태그라인
- 주요 기능 설명
- 사용 방법 가이드
- 스크린샷 캐러셀
- FAQ
- 앱스토어 다운로드 링크
- 업데이트 로그

### 반응형 디자인

모든 페이지는 모바일, 태블릿, 데스크톱 환경에 최적화되어 있습니다.

## 🔧 환경 변수

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Firebase Analytics
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Google AdSense (선택)
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=
```

## 📝 개발 규칙

- 모든 코드는 TypeScript로 작성
- 컴포넌트는 Shadcn/ui 기반으로 구현
- 한국어 주석 및 응답 필수
- Conventional Commits 형식으로 커밋

## 📄 라이선스

이 프로젝트는 개인 프로젝트입니다.

## 📧 문의

프로젝트 관련 문의사항이 있으시면 다음으로 연락해주세요:

- 이메일: mocadev.tony@gmail.com
- GitHub: [@mocadev](https://github.com/mocadev)

## 🙏 감사의 말

이 프로젝트는 다음 오픈소스 프로젝트들의 도움을 받았습니다:

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)

