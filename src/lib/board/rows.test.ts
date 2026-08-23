import { describe, expect, it } from 'vitest';
import { boardToRows, diffBoard, hasOps, rowsToBoard } from './rows';
import type { BoardData } from './types';

/** 테스트용 문서 (기대값은 모두 손으로 쓴 리터럴) */
const doc: BoardData = {
  stages: ['기획', '제작'],
  people: [
    { id: 'M1', name: '나', me: true },
    { id: 'M2', name: '친구' },
  ],
  etypes: [{ id: 'T1', name: '일반', color: '#111111', mark: 'none' }],
  labels: [{ id: 'L1', name: '개발', color: '#222222' }],
  events: [{ id: 'E1', date: '2026-08-20', type: 'T1', title: '회의', note: '' }],
  projects: [
    {
      id: 'p1',
      name: '앱 하나',
      kind: '앱',
      stage: 1,
      due: '2026-09-01',
      files: [{ id: 'F1', name: '기획서', kind: 'doc', url: 'https://x' }],
    },
    { id: 'p2', name: '게임 하나', kind: '게임', stage: 0, due: '', files: [] },
  ],
  cards: [
    { id: 1, proj: 'p1', list: 0, text: '할 일', labs: ['L1'], owners: ['M1'], due: '' },
    { id: 2, proj: 'p2', list: 1, text: '진행', labs: [], owners: ['M2'], due: '2026-08-30' },
  ],
};

describe('boardToRows', () => {
  it('문서를 테이블 row로 평탄화하고 배열 순서를 position에 담는다', () => {
    const rows = boardToRows(doc);
    expect(rows.stages).toEqual([
      { position: 0, name: '기획' },
      { position: 1, name: '제작' },
    ]);
    expect(rows.people).toEqual([
      { id: 'M1', name: '나', position: 0 },
      { id: 'M2', name: '친구', position: 1 },
    ]);
    expect(rows.etypes).toEqual([
      { id: 'T1', name: '일반', color: '#111111', mark: 'none', position: 0 },
    ]);
    expect(rows.labels).toEqual([{ id: 'L1', name: '개발', color: '#222222', position: 0 }]);
    expect(rows.events).toEqual([
      { id: 'E1', date: '2026-08-20', type_id: 'T1', title: '회의', note: '', position: 0 },
    ]);
    expect(rows.projects).toEqual([
      { id: 'p1', name: '앱 하나', kind: '앱', stage: 1, due: '2026-09-01', position: 0 },
      { id: 'p2', name: '게임 하나', kind: '게임', stage: 0, due: '', position: 1 },
    ]);
    expect(rows.files).toEqual([
      { id: 'F1', project_id: 'p1', name: '기획서', kind: 'doc', url: 'https://x', position: 0 },
    ]);
    expect(rows.cards).toEqual([
      {
        id: 1,
        project_id: 'p1',
        list: 0,
        text: '할 일',
        due: '',
        labs: ['L1'],
        owners: ['M1'],
        position: 0,
      },
      {
        id: 2,
        project_id: 'p2',
        list: 1,
        text: '진행',
        due: '2026-08-30',
        labs: [],
        owners: ['M2'],
        position: 1,
      },
    ]);
  });
});

describe('rowsToBoard', () => {
  it('row를 position 순으로 정렬해 문서를 복원한다 (me는 meId 인자로 표시)', () => {
    const rows = boardToRows(doc);
    // DB에서 정렬 없이 온 상황을 흉내내 순서를 뒤집는다
    const shuffled = {
      stages: [...rows.stages].reverse(),
      people: [...rows.people].reverse(),
      etypes: [...rows.etypes].reverse(),
      labels: [...rows.labels].reverse(),
      events: [...rows.events].reverse(),
      projects: [...rows.projects].reverse(),
      files: [...rows.files].reverse(),
      cards: [...rows.cards].reverse(),
    };
    expect(rowsToBoard(shuffled, 'M1')).toEqual(doc);
  });

  it('meId가 없거나 사라진 사람이면 아무에게도 me를 붙이지 않는다', () => {
    const restored = rowsToBoard(boardToRows(doc), 'M999');
    expect(restored.people).toEqual([
      { id: 'M1', name: '나' },
      { id: 'M2', name: '친구' },
    ]);
    expect(rowsToBoard(boardToRows(doc), null).people).toEqual([
      { id: 'M1', name: '나' },
      { id: 'M2', name: '친구' },
    ]);
  });
});

describe('diffBoard', () => {
  it('같은 문서면 아무 작업도 내지 않는다 (me 변경도 저장 대상이 아니다)', () => {
    expect(hasOps(diffBoard(doc, doc))).toBe(false);
    const meMoved: BoardData = {
      ...doc,
      people: [
        { id: 'M1', name: '나' },
        { id: 'M2', name: '친구', me: true },
      ],
    };
    expect(hasOps(diffBoard(doc, meMoved))).toBe(false);
  });
});

describe('diffBoard 쓰기 작업', () => {
  it('카드 내용만 바꾸면 그 카드의 바뀐 컬럼만 update로 낸다', () => {
    const next: BoardData = {
      ...doc,
      cards: doc.cards.map((c) => (c.id === 1 ? { ...c, text: '고친 할 일', list: 2 } : c)),
    };
    const ops = diffBoard(doc, next);
    expect(ops.cards).toEqual({
      inserts: [],
      updates: [{ id: 1, set: { text: '고친 할 일', list: 2 } }],
      deletes: [],
    });
    expect(ops.projects.updates).toEqual([]);
    expect(ops.stages.updates).toEqual([]);
  });

  it('프로젝트를 지우면 프로젝트·딸린 카드가 delete로 나오고, 새 라벨은 insert로 나온다', () => {
    const next: BoardData = {
      ...doc,
      labels: [...doc.labels, { id: 'L2', name: '버그', color: '#333333' }],
      projects: doc.projects.filter((p) => p.id !== 'p2'),
      cards: doc.cards.filter((c) => c.proj !== 'p2'),
    };
    const ops = diffBoard(doc, next);
    expect(ops.projects.deletes).toEqual(['p2']);
    expect(ops.cards.deletes).toEqual([2]);
    expect(ops.labels.inserts).toEqual([{ id: 'L2', name: '버그', color: '#333333', position: 1 }]);
  });

  it('중간 항목을 지우면 뒤 항목들의 position이 당겨진다', () => {
    const next: BoardData = {
      ...doc,
      people: doc.people.filter((p) => p.id !== 'M1'),
      cards: doc.cards.map((c) => ({ ...c, owners: c.owners.filter((o) => o !== 'M1') })),
    };
    const ops = diffBoard(doc, next);
    expect(ops.people.deletes).toEqual(['M1']);
    expect(ops.people.updates).toEqual([{ id: 'M2', set: { position: 0 } }]);
    expect(ops.cards.updates).toEqual([{ id: 1, set: { owners: [] } }]);
  });

  it('단계는 position이 식별자라 이름 바꿈은 update, 줄어든 꼬리는 delete로 나온다', () => {
    const renamed: BoardData = { ...doc, stages: ['기획!', '제작'] };
    expect(diffBoard(doc, renamed).stages).toEqual({
      inserts: [],
      updates: [{ id: 0, set: { name: '기획!' } }],
      deletes: [],
    });
    const shrunk: BoardData = { ...doc, stages: ['기획'] };
    expect(diffBoard(doc, shrunk).stages).toEqual({ inserts: [], updates: [], deletes: [1] });
  });
});
