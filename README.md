# MokaDev Home

모카데브가 직접 설계하고 운영하는 생활형 모바일 앱 컬렉션을 소개하는 포트폴리오 웹사이트입니다.

## 📱 소개

MokaDev Home은 개인 개발자 모카데브가 만든 3개의 모바일 앱을 소개하는 웹사이트입니다. 각 앱의 기능, 사용법, 다운로드 링크를 한 곳에서 확인할 수 있습니다.

### 주요 앱

- **밥정너** - 주변 맛집을 랜덤으로 추천해 주는 점심 파트너
- **포춘쿠키** - 쿠키를 톡! 오늘의 메시지가 도착합니다
- **점심 뭐 먹지** - 스케줄 기반 푸시로 점심 고민을 자동화

## 🛠️ 기술 스택

- **프레임워크**: Next.js 15.4.2 (App Router)
- **언어**: TypeScript 5
- **스타일링**: Tailwind CSS 4
- **UI 컴포넌트**: Shadcn/ui (Radix UI 기반)
- **폰트**: Geist Sans, Geist Mono
- **분석**: Vercel Analytics
- **광고**: Google AdSense

## 📦 주요 의존성

- `next` - Next.js 프레임워크
- `react` / `react-dom` - React 19
- `tailwindcss` - 유틸리티 CSS 프레임워크
- `@radix-ui/*` - 접근성 우선 UI 프리미티브
- `lucide-react` - 아이콘 라이브러리
- `zod` - 스키마 검증
- `react-hook-form` - 폼 관리
- `next-themes` - 다크모드 지원

## 🚀 시작하기

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
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

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API 라우트
│   ├── apps/              # 앱 상세 페이지
│   │   ├── bapjeongne/
│   │   ├── fortune-cookie/
│   │   └── lunch-picker/
│   ├── privacy/           # 개인정보 처리방침
│   ├── team/              # 팀 소개
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지
│   ├── sitemap.xml/       # 사이트맵 생성
│   └── robots.txt/        # robots.txt 생성
├── components/            # React 컴포넌트
│   ├── ads/              # 광고 컴포넌트
│   ├── apps/             # 앱 관련 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   ├── seo/              # SEO 컴포넌트
│   └── ui/               # Shadcn/ui 컴포넌트
├── lib/                  # 유틸리티 & 설정
│   ├── data/            # 앱 데이터
│   ├── seo/             # SEO 설정
│   └── utils.ts         # 공통 유틸리티
├── types/                # TypeScript 타입 정의
├── hooks/                # 커스텀 훅
└── contexts/             # React Context
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

