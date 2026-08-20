import type { BoardData, FileKind } from './types';

/** 보드 칸 이름 */
export const LISTS = ['할 일', '진행 중', '검토', '완료'];

/** 라벨·일정 종류 색상 팔레트 */
export const PALETTE = [
  '#6B2D5C',
  '#3F7351',
  '#B3801A',
  '#A63D40',
  '#2F5D7C',
  '#7A5C3E',
  '#4A4E6B',
  '#6E7B33',
  '#9C4F2E',
  '#4C7A78',
];

/** 파일 종류 아이콘 */
export const FKIND: Record<FileKind, string> = {
  folder: '📁',
  image: '🎨',
  build: '⚙',
  doc: '📄',
  link: '🔗',
};

/** 처음 데이터 (원본 프로토타입 그대로) */
export const INITIAL_DATA: BoardData = {
  stages: ['아이디어', '기획', '설계', '제작', '테스트', '완료'],
  people: [
    { id: 'M1', name: '나', me: true },
    { id: 'M2', name: '친구' },
  ],
  etypes: [
    { id: 'T1', name: '일반', color: '#3F7351', mark: 'none' },
    { id: 'T2', name: '공휴일', color: '#A63D40', mark: 'red' },
    { id: 'T3', name: '중요한 일정', color: '#B3801A', mark: 'bg' },
  ],
  labels: [
    { id: 'L1', name: '기획', color: '#6B2D5C' },
    { id: 'L2', name: '개발', color: '#3F7351' },
    { id: 'L3', name: '그림', color: '#B3801A' },
    { id: 'L4', name: '버그', color: '#A63D40' },
    { id: 'L5', name: '조사', color: '#2F5D7C' },
  ],
  events: [
    { id: 'E1', date: '2026-08-15', type: 'T2', title: '광복절', note: '' },
    { id: 'E2', date: '2026-08-18', type: 'T1', title: '친구와 기획 회의', note: '판결 앱 화면 구성' },
    { id: 'E3', date: '2026-08-25', type: 'T3', title: '공모전 발표자료 접수', note: '팀당 4분' },
    { id: 'E4', date: '2026-08-13', type: 'T1', title: '원작 작가 통화', note: '' },
  ],
  projects: [
    {
      id: 'cat',
      name: '냥냥 더비',
      kind: '게임',
      stage: 1,
      due: '2026-09-30',
      files: [
        { id: 'F1', name: '그림 폴더', kind: 'folder', url: 'https://drive.google.com' },
        { id: 'F2', name: '기획서', kind: 'doc', url: 'https://docs.google.com' },
      ],
    },
    { id: 'judge', name: '판결 앱', kind: '앱', stage: 2, due: '2026-08-25', files: [] },
    { id: 'horde', name: '호드 디펜스', kind: '게임', stage: 0, due: '', files: [] },
    { id: 'shin', name: '신세계냥', kind: '게임', stage: 0, due: '2026-08-18', files: [] },
    { id: 'settle', name: '정산 앱', kind: '앱', stage: 3, due: '2026-08-31', files: [] },
  ],
  cards: [
    { id: 1, proj: 'cat', list: 0, text: '경주 규칙 한 장으로 정리', labs: ['L1'], owners: ['M1'], due: '2026-08-14' },
    { id: 2, proj: 'cat', list: 1, text: '레이스 로직 프로토타입', labs: ['L2'], owners: ['M2'], due: '2026-08-22' },
    { id: 3, proj: 'cat', list: 3, text: '고양이 캐릭터 러프 6종', labs: ['L3'], owners: ['M1'], due: '' },
    { id: 4, proj: 'judge', list: 0, text: '판결 문구 톤 샘플 20개', labs: ['L1'], owners: ['M1'], due: '2026-08-16' },
    { id: 5, proj: 'judge', list: 1, text: '대화 붙여넣기 화면', labs: ['L2'], owners: ['M2'], due: '2026-08-18' },
    {
      id: 6,
      proj: 'judge',
      list: 2,
      text: '캐릭터 AI 결합 지점 정하기',
      labs: ['L1', 'L5'],
      owners: ['M1', 'M2'],
      due: '2026-08-12',
    },
    { id: 7, proj: 'horde', list: 0, text: '참고 게임 3종 플레이 노트', labs: ['L5'], owners: ['M2'], due: '' },
    { id: 8, proj: 'shin', list: 0, text: '원작 작가에게 연락', labs: ['L1'], owners: ['M1'], due: '2026-08-12' },
    { id: 9, proj: 'settle', list: 2, text: 'MG 차감 계산 오류', labs: ['L4'], owners: ['M1'], due: '2026-08-11' },
  ],
};
