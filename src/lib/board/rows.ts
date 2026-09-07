import type { BoardData, EventMark, FileKind, ProjectKind } from './types';

/** 정규화 테이블 row 타입 (supabase/schema.sql의 board_* 테이블 컬럼과 1:1) */

export interface StageRow {
  position: number;
  name: string;
}

export interface PersonRow {
  id: string;
  name: string;
  position: number;
}

export interface EventTypeRow {
  id: string;
  name: string;
  color: string;
  mark: EventMark;
  position: number;
}

export interface LabelRow {
  id: string;
  name: string;
  color: string;
  position: number;
}

export interface EventRow {
  id: string;
  date: string;
  type_id: string;
  title: string;
  note: string;
  position: number;
}

export interface ProjectRow {
  id: string;
  name: string;
  kind: ProjectKind;
  stage: number;
  due: string;
  position: number;
}

export interface ProjectFileRow {
  id: string;
  project_id: string;
  name: string;
  kind: FileKind;
  url: string;
  position: number;
}

export interface CardRow {
  id: number;
  project_id: string;
  list: number;
  text: string;
  due: string;
  labs: string[];
  owners: string[];
  position: number;
  /** 조회 시 board_users 조인으로 붙는 작성자. 쓰기 row에는 없다 */
  creator?: { email_id: string } | null;
}

export interface BoardRows {
  stages: StageRow[];
  people: PersonRow[];
  etypes: EventTypeRow[];
  labels: LabelRow[];
  events: EventRow[];
  projects: ProjectRow[];
  files: ProjectFileRow[];
  cards: CardRow[];
}

/** 한 테이블에 실행할 row 단위 쓰기 작업. updates.set에는 바뀐 컬럼만 담긴다. */
export interface TableOps<R, K> {
  inserts: R[];
  updates: { id: K; set: Partial<R> }[];
  deletes: K[];
}

export interface BoardOps {
  stages: TableOps<StageRow, number>;
  people: TableOps<PersonRow, string>;
  etypes: TableOps<EventTypeRow, string>;
  labels: TableOps<LabelRow, string>;
  events: TableOps<EventRow, string>;
  projects: TableOps<ProjectRow, string>;
  files: TableOps<ProjectFileRow, string>;
  cards: TableOps<CardRow, number>;
}

function diffTable<R extends object, K extends string | number>(
  prev: R[],
  next: R[],
  key: (r: R) => K,
): TableOps<R, K> {
  const prevBy = new Map(prev.map((r) => [key(r), r]));
  const ops: TableOps<R, K> = { inserts: [], updates: [], deletes: [] };
  for (const row of next) {
    const old = prevBy.get(key(row));
    if (!old) {
      ops.inserts.push(row);
      continue;
    }
    const set: Partial<R> = {};
    for (const col of Object.keys(row) as (keyof R)[]) {
      if (JSON.stringify(row[col]) !== JSON.stringify(old[col])) set[col] = row[col];
    }
    if (Object.keys(set).length) ops.updates.push({ id: key(row), set });
  }
  const nextKeys = new Set(next.map(key));
  for (const row of prev) if (!nextKeys.has(key(row))) ops.deletes.push(key(row));
  return ops;
}

/** 두 문서를 비교해 테이블별 row 단위 쓰기 작업을 만든다. me 플래그 차이는 무시된다. */
export function diffBoard(prev: BoardData, next: BoardData): BoardOps {
  const a = boardToRows(prev);
  const b = boardToRows(next);
  return {
    stages: diffTable(a.stages, b.stages, (r) => r.position),
    people: diffTable(a.people, b.people, (r) => r.id),
    etypes: diffTable(a.etypes, b.etypes, (r) => r.id),
    labels: diffTable(a.labels, b.labels, (r) => r.id),
    events: diffTable(a.events, b.events, (r) => r.id),
    projects: diffTable(a.projects, b.projects, (r) => r.id),
    files: diffTable(a.files, b.files, (r) => r.id),
    cards: diffTable(a.cards, b.cards, (r) => r.id),
  };
}

/** 실행할 작업이 하나라도 있는지 */
export function hasOps(ops: BoardOps): boolean {
  return Object.values(ops).some((t) => t.inserts.length || t.updates.length || t.deletes.length);
}

const byPos = <T extends { position: number }>(rows: T[]) =>
  [...rows].sort((a, b) => a.position - b.position);

/** 테이블 row 목록에서 BoardData 문서를 복원한다. 각 배열은 position 순으로 정렬된다.
 *  meId가 가리키는 사람에게 me 플래그를 붙인다 (없거나 사라진 id면 아무에게도 안 붙인다). */
export function rowsToBoard(rows: BoardRows, meId: string | null): BoardData {
  return {
    stages: byPos(rows.stages).map((s) => s.name),
    people: byPos(rows.people).map((p) => ({
      id: p.id,
      name: p.name,
      ...(p.id === meId ? { me: true } : {}),
    })),
    etypes: byPos(rows.etypes).map((t) => ({
      id: t.id,
      name: t.name,
      color: t.color,
      mark: t.mark,
    })),
    labels: byPos(rows.labels).map((l) => ({ id: l.id, name: l.name, color: l.color })),
    events: byPos(rows.events).map((e) => ({
      id: e.id,
      date: e.date,
      type: e.type_id,
      title: e.title,
      note: e.note,
    })),
    projects: byPos(rows.projects).map((p) => ({
      id: p.id,
      name: p.name,
      kind: p.kind,
      stage: p.stage,
      due: p.due,
      files: byPos(rows.files.filter((f) => f.project_id === p.id)).map((f) => ({
        id: f.id,
        name: f.name,
        kind: f.kind,
        url: f.url,
      })),
    })),
    cards: byPos(rows.cards).map((c) => ({
      id: c.id,
      proj: c.project_id,
      list: c.list,
      text: c.text,
      labs: c.labs,
      owners: c.owners,
      due: c.due,
      ...(c.creator?.email_id ? { creator: c.creator.email_id } : {}),
    })),
  };
}

/** BoardData 문서를 테이블 row 목록으로 평탄화한다. 배열 순서는 position에 담는다.
 *  people의 me 플래그는 보는 사람마다 다른 로컬 값이라 row에 넣지 않는다. */
export function boardToRows(d: BoardData): BoardRows {
  return {
    stages: d.stages.map((name, i) => ({ position: i, name })),
    people: d.people.map((p, i) => ({ id: p.id, name: p.name, position: i })),
    etypes: d.etypes.map((t, i) => ({
      id: t.id,
      name: t.name,
      color: t.color,
      mark: t.mark,
      position: i,
    })),
    labels: d.labels.map((l, i) => ({ id: l.id, name: l.name, color: l.color, position: i })),
    events: d.events.map((e, i) => ({
      id: e.id,
      date: e.date,
      type_id: e.type,
      title: e.title,
      note: e.note,
      position: i,
    })),
    projects: d.projects.map((p, i) => ({
      id: p.id,
      name: p.name,
      kind: p.kind,
      stage: p.stage,
      due: p.due,
      position: i,
    })),
    files: d.projects.flatMap((p) =>
      p.files.map((f, i) => ({
        id: f.id,
        project_id: p.id,
        name: f.name,
        kind: f.kind,
        url: f.url,
        position: i,
      })),
    ),
    cards: d.cards.map((c, i) => ({
      id: c.id,
      project_id: c.proj,
      list: c.list,
      text: c.text,
      due: c.due,
      labs: c.labs,
      owners: c.owners,
      position: i,
    })),
  };
}
