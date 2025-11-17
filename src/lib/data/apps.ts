import { AppContent } from '@/types/app';
import { StructuredDataProps } from '@/types/seo';
import { seoConfig } from '@/lib/seo/config';

export const apps: AppContent[] = [
  {
    slug: 'bapjeongne',
    name: '밥정너',
    tagline: '주변 맛집을 랜덤으로 추천해 주는 점심 파트너',
    description:
      '현재 위치와 먹고 싶은 분위기를 기준으로 3분 안에 점심 고민을 끝냅니다. 팀 회식이나 혼밥 모두 밥정너가 제안해요.',
    heroImage:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80',
    theme: {
      accent: '#7C3AED',
      gradientFrom: '#ede9fe',
      gradientTo: '#c7d2fe',
    },
    icon: '🍱',
    tags: ['랜덤 추천', '위치 기반', 'iOS/Android'],
    storeLinks: [
      {
        platform: 'ios',
        url: 'https://apps.apple.com/kr/app/id0000000000',
        label: 'App Store',
        badge: 'iOS 다운로드',
      },
      {
        platform: 'android',
        url: 'https://play.google.com/store/apps/details?id=com.mocadev.bapjeongne',
        label: 'Google Play',
        badge: 'Android 다운로드',
      },
    ],
    features: [
      {
        title: '취향 기반 필터',
        description: '거리·예산·식사 분위기를 슬라이더로 조절하면 즉시 필터가 적용됩니다.',
        icon: '🎯',
      },
      {
        title: '원터치 랜덤 추천',
        description: '추천 결과가 마음에 들지 않으면 스와이프 한 번으로 새로운 식당을 받아보세요.',
        icon: '🔄',
      },
      {
        title: '팀 공유 링크',
        description: '추천 결과를 링크로 공유해 팀원들과 간단히 투표할 수 있습니다.',
        icon: '🤝',
      },
    ],
    usage: [
      {
        title: '1. 먹고 싶은 범위 지정',
        description: '현재 위치를 기준으로 최대 3km까지 거리·예산 범위를 설정합니다.',
      },
      {
        title: '2. 랜덤 추천 받기',
        description: 'AI 추천 엔진이 조건에 맞는 식당을 랜덤으로 3곳 제안합니다.',
      },
      {
        title: '3. 지도 길찾기 또는 공유',
        description: '원하는 식당을 선택하면 지도 길찾기 혹은 카카오톡 공유가 가능합니다.',
      },
    ],
    screenshots: [
      {
        src: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=80',
        alt: '식당 추천 화면',
        caption: '조건에 맞는 식당을 3곳 제안합니다.',
      },
      {
        src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80',
        alt: '필터 설정 화면',
        caption: '예산·분위기·거리 필터를 직관적으로 조절할 수 있어요.',
      },
      {
        src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=900&q=80',
        alt: '공유 화면',
        caption: '추천 결과를 링크로 공유해 투표를 받을 수 있습니다.',
      },
    ],
    qna: [
      {
        question: '추천 식당 데이터는 어디에서 오나요?',
        answer: '카카오/네이버 장소 데이터와 자체 큐레이션한 맛집 DB를 조합해 제공합니다.',
      },
      {
        question: '내가 추가한 식당만 볼 수 있나요?',
        answer:
          '개인 찜 리스트를 만들 수 있으며, 랜덤 추천 시 내 리스트만 선택하는 옵션을 제공합니다.',
      },
      {
        question: '광고가 나오나요?',
        answer: '앱 내부 광고는 최소화했으며 추천 리스트에 광고 상위 노출은 없습니다.',
      },
    ],
    updates: [
      {
        version: 'v2.1.0',
        date: '2025-08-12',
        summary: '검색 속도 32% 개선 및 공유용 미리보기 이미지 업데이트',
      },
      {
        version: 'v2.0.0',
        date: '2025-05-02',
        summary: '팀 투표 링크 기능과 위치 권한 최소 수집 정책을 적용했습니다.',
      },
    ],
    summary: {
      problem:
        '점심시간마다 “뭐 먹지?” 고민으로 회의 시간이 지연되고 주변 식당 탐색 시간이 낭비되었습니다.',
      solution:
        '취향 기반 필터와 랜덤 알고리즘을 결합해 3분 내에 식당을 확정할 수 있는 경험을 제공합니다.',
      metrics: [
        { label: '월간 추천 수', value: '42K+' },
        { label: '평균 확정 시간', value: '2.7분' },
        { label: '공유 링크 클릭률', value: '63%' },
      ],
    },
  },
  {
    slug: 'fortune-cookie',
    name: '포춘쿠키',
    tagline: '쿠키를 톡! 오늘의 메시지가 도착합니다',
    description:
      '포춘쿠키를 클릭해 하루의 방향을 잡아보세요. 텍스트 애니메이션과 잔잔한 사운드로 감성적인 경험을 제공합니다.',
    heroImage:
      'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=1400&q=80',
    theme: {
      accent: '#ec4899',
      gradientFrom: '#ffe4e6',
      gradientTo: '#fde68a',
    },
    icon: '🥠',
    tags: ['감성 메시지', '데일리 루틴', '오프라인 모드'],
    storeLinks: [
      {
        platform: 'ios',
        url: 'https://apps.apple.com/kr/app/id0000000001',
        label: 'App Store',
        badge: 'iOS 다운로드',
      },
      {
        platform: 'android',
        url: 'https://play.google.com/store/apps/details?id=com.mocadev.fortunecookie',
        label: 'Google Play',
        badge: 'Android 다운로드',
      },
    ],
    features: [
      {
        title: '테마별 포춘 카드',
        description: '마음, 커리어, 관계 세 가지 테마로 메시지를 선택할 수 있어요.',
        icon: '🌈',
      },
      {
        title: '오디오 포춘',
        description: '짧은 ASMR 사운드와 함께 메시지가 재생됩니다.',
        icon: '🎧',
      },
      {
        title: '저장 & 공유',
        description: '마음에 드는 문장을 라이브러리에 저장하거나 SNS 카드로 공유하세요.',
        icon: '✨',
      },
    ],
    usage: [
      {
        title: '1. 오늘의 테마 선택',
        description: '마음 · 커리어 · 관계 중에서 집중하고 싶은 영역을 고릅니다.',
      },
      {
        title: '2. 쿠키 깨기',
        description: '쿠키를 터치하면 애니메이션과 함께 메시지가 나타납니다.',
      },
      {
        title: '3. 저장하거나 공유',
        description: '좋은 문장은 즐겨찾기로 저장, 혹은 인스타 스토리 카드로 공유하세요.',
      },
    ],
    screenshots: [
      {
        src: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?auto=format&fit=crop&w=900&q=80',
        alt: '포춘쿠키 메인',
        caption: '테마별 포춘쿠키를 선택하는 메인 화면',
      },
      {
        src: 'https://images.unsplash.com/photo-1492799801644-5c5b710bdd3e?auto=format&fit=crop&w=900&q=80',
        alt: '메시지 카드',
        caption: '감성적인 일러스트와 함께 메시지를 제공합니다.',
      },
      {
        src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
        alt: '공유 기능',
        caption: 'SNS에 바로 공유할 수 있는 정사각형 카드',
      },
    ],
    qna: [
      {
        question: '메시지는 어디에서 나오나요?',
        answer: '모카데브가 직접 작성한 500+ 문장과 GPT 기반 문장을 검수 후 제공하고 있습니다.',
      },
      {
        question: '오프라인에서도 사용할 수 있나요?',
        answer:
          '네, 최근 20개의 메시지는 오프라인 캐시로 제공되어 지하철에서도 사용할 수 있습니다.',
      },
      {
        question: '푸시 알림 빈도는 조절되나요?',
        answer: '하루 1회 기본, 원하는 시간대를 직접 설정할 수 있습니다.',
      },
    ],
    messageExamples: [
      '새로운 시작은 늘 작은 용기에서 태어납니다.',
      '오늘의 노력은 미래의 너에게 편지가 됩니다.',
      '혼자라는 느낌이 들 때일수록 마음을 가볍게 적어보세요.',
      '네가 상상한 장면은 이미 현실로 향하는 중입니다.',
    ],
    summary: {
      problem:
        '바쁜 일상 속에서 감정 정리와 가벼운 위로가 필요하지만 한 문장조차 찾기 어려웠습니다.',
      solution:
        '감각적인 애니메이션과 맞춤 메시지를 통해 스스로를 다독이는 짧은 루틴을 제공합니다.',
      metrics: [
        { label: '일일 열람 수', value: '58K' },
        { label: '저장된 메시지', value: '120K+' },
        { label: '재방문 비율', value: '71%' },
      ],
    },
  },
  {
    slug: 'lunch-picker',
    name: '점심 뭐 먹지',
    tagline: '스케줄 기반 푸시로 점심 고민을 자동화',
    description:
      '팀 식사 스케줄을 등록하고 식당을 미리 정해두면, 요일별로 자동 푸시가 떠서 빠르게 확정할 수 있습니다.',
    heroImage:
      'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?auto=format&fit=crop&w=1400&q=80',
    theme: {
      accent: '#0ea5e9',
      gradientFrom: '#cffafe',
      gradientTo: '#dbeafe',
    },
    icon: '📅',
    tags: ['푸시 알림', '스케줄', '팀 협업'],
    storeLinks: [
      {
        platform: 'ios',
        url: 'https://apps.apple.com/kr/app/id0000000002',
        label: 'App Store',
        badge: 'iOS 다운로드',
      },
      {
        platform: 'android',
        url: 'https://play.google.com/store/apps/details?id=com.mocadev.lunchpicker',
        label: 'Google Play',
        badge: 'Android 다운로드',
      },
    ],
    features: [
      {
        title: '스케줄러 연동',
        description: 'Google Calendar와 연동해 점심 약속을 자동으로 가져옵니다.',
        icon: '📆',
      },
      {
        title: '푸시 기반 추천',
        description: '알림이 오면 앱을 열지 않고도 제안된 식당을 확인할 수 있습니다.',
        icon: '🔔',
      },
      {
        title: '선호도 학습',
        description: '선택된 식당 로그를 학습해 다음 추천을 더 정교하게 만듭니다.',
        icon: '📊',
      },
    ],
    usage: [
      {
        title: '1. 식당 데이터 등록',
        description: '식당 이름, 거리, 태그(한식/카페 등)를 등록합니다.',
      },
      {
        title: '2. 점심 스케줄 가져오기',
        description: '캘린더를 연동하거나 직접 요일·시간대를 입력합니다.',
      },
      {
        title: '3. 알림에서 바로 확정',
        description: '푸시 알림에서 마음에 드는 식당을 선택하여 팀에게 공유합니다.',
      },
    ],
    screenshots: [
      {
        src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80',
        alt: '스케줄 등록 화면',
        caption: '요일별로 원하는 시간대와 팀을 설정합니다.',
      },
      {
        src: 'https://images.unsplash.com/photo-1506812574058-fc75fa93fead?auto=format&fit=crop&w=900&q=80',
        alt: '푸시 알림',
        caption: '알림에서 바로 식당을 확정할 수 있는 액션 버튼 제공',
      },
      {
        src: 'https://images.unsplash.com/photo-1506086679524-493c64fdfaa6?auto=format&fit=crop&w=900&q=80',
        alt: '통계 화면',
        caption: '최근 30일간의 점심 로그와 선호도를 차트로 보여줍니다.',
      },
    ],
    qna: [
      {
        question: '푸시 알림이 너무 자주 오진 않나요?',
        answer:
          '각 요일별로 한 번만 알림이 발송되며, 회의 일정과 겹칠 경우 자동으로 시간대를 조정합니다.',
      },
      {
        question: '위치 정보는 어떻게 사용되나요?',
        answer: '선택한 사무실 주소를 기준으로 거리를 계산하며, 실시간 위치는 수집하지 않습니다.',
      },
      {
        question: '팀원과 리스트를 공유할 수 있나요?',
        answer: '네, 팀 스페이스를 만들면 식당 목록과 로그를 함께 관리할 수 있습니다.',
      },
    ],
    testimonials: [
      {
        name: '정유라',
        role: '스타트업 PM',
        quote: '푸시가 오면 바로 한 곳을 선택하는 루틴이 생겨 회의 준비 시간이 늘어났어요.',
      },
      {
        name: '김도현',
        role: '개발 리드',
        quote: '팀별로 별도 리스트를 만들어 관리할 수 있어 점심 회의가 10분 안에 끝납니다.',
      },
    ],
    summary: {
      problem: '팀 단위 점심 일정이 많지만 매번 동일한 논쟁으로 시간이 낭비되었습니다.',
      solution:
        '스케줄과 식당 DB를 한 화면에서 관리하며, 푸시에서 바로 확정할 수 있도록 UX를 설계했습니다.',
      metrics: [
        { label: '연동된 팀 수', value: '180+' },
        { label: '알림 확정률', value: '74%' },
        { label: '재구매 의사', value: '4.8/5' },
      ],
    },
  },
];

export const getAppBySlug = (slug: AppContent['slug']): AppContent => {
  const app = apps.find((item) => item.slug === slug);
  if (!app) {
    throw new Error(`App not found: ${slug}`);
  }
  return app;
};

export const getAllApps = () => apps;

export const getAppStructuredData = (app: AppContent): StructuredDataProps[] => [
  {
    type: 'SoftwareApplication',
    data: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: app.name,
      description: app.description,
      image: app.heroImage.startsWith('http')
        ? app.heroImage
        : `${seoConfig.siteUrl}${app.heroImage}`,
      operatingSystem: 'iOS, Android',
      applicationCategory: 'LifestyleApplication',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'KRW',
      },
      url: `${seoConfig.siteUrl}/apps/${app.slug}`,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '120',
      },
      creator: {
        '@type': 'Person',
        name: 'MokaDev',
      },
    },
  },
];
