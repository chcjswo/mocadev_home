import type { SupabaseClient } from '@supabase/supabase-js';
import type { BoardOps, BoardRows } from './rows';
import type { BoardData } from './types';

/** 시딩할 때 diffBoard의 기준으로 쓰는 빈 문서 */
export const EMPTY_BOARD: BoardData = {
  stages: [],
  people: [],
  etypes: [],
  labels: [],
  events: [],
  projects: [],
  cards: [],
};

const META_ID = 'main';

/** 테이블 이름과 pk 컬럼 (stages는 position이 곧 식별자) */
const TABLES: Record<keyof BoardOps, { table: string; key: string; cols: string }> = {
  stages: { table: 'board_stages', key: 'position', cols: 'position, name' },
  people: { table: 'board_people', key: 'id', cols: 'id, name, position' },
  etypes: { table: 'board_event_types', key: 'id', cols: 'id, name, color, mark, position' },
  labels: { table: 'board_labels', key: 'id', cols: 'id, name, color, position' },
  events: { table: 'board_events', key: 'id', cols: 'id, date, type_id, title, note, position' },
  projects: { table: 'board_projects', key: 'id', cols: 'id, name, kind, stage, due, position' },
  files: {
    table: 'board_project_files',
    key: 'id',
    cols: 'id, project_id, name, kind, url, position',
  },
  cards: {
    table: 'board_cards',
    key: 'id',
    cols: 'id, project_id, list, text, due, labs, owners, position',
  },
};

const TABLE_KEYS = Object.keys(TABLES) as (keyof BoardOps)[];

/** FK 방향에 맞춘 insert 순서 (부모 → 자식) */
const INSERT_TIERS: (keyof BoardOps)[][] = [
  ['stages', 'people', 'etypes', 'labels'],
  ['projects'],
  ['events', 'files', 'cards'],
];

/** delete 순서 (자식 → 부모) */
const DELETE_TIERS: (keyof BoardOps)[][] = [
  ['cards', 'files', 'events'],
  ['projects', 'labels', 'etypes', 'people'],
  ['stages'],
];

async function run(queries: PromiseLike<{ error: { message: string } | null }>[]) {
  const results = await Promise.all(queries);
  const failed = results.find((r) => r.error);
  if (failed?.error) throw new Error(failed.error.message);
}

/** 8개 테이블을 병렬로 읽어 온다 */
export async function fetchBoardRows(supabase: SupabaseClient): Promise<BoardRows> {
  const results = await Promise.all(
    TABLE_KEYS.map((k) => supabase.from(TABLES[k].table).select(TABLES[k].cols)),
  );
  const failed = results.find((r) => r.error);
  if (failed?.error) throw new Error(failed.error.message);
  const rows = Object.fromEntries(TABLE_KEYS.map((k, i) => [k, results[i].data ?? []]));
  return rows as unknown as BoardRows;
}

export function isEmptyRows(rows: BoardRows): boolean {
  return Object.values(rows).every((r) => r.length === 0);
}

/** diffBoard가 만든 작업을 실행한다.
 *  insert(부모→자식) → update → delete(자식→부모) 순서.
 *  delete를 마지막에 두는 이유: 예컨대 일정의 종류를 바꾸면서 옛 종류를 지우는 경우,
 *  종류를 먼저 지우면 DB cascade가 일정까지 지워 버린다. */
export async function applyOps(
  supabase: SupabaseClient,
  ops: BoardOps,
  uid: string,
): Promise<void> {
  // upsert인 이유: 저장이 중간에 실패한 뒤 재시도해도(또는 두 사용자가 동시에 시딩해도) 안전하게 수렴한다
  for (const tier of INSERT_TIERS) {
    await run(
      tier
        .filter((k) => ops[k].inserts.length)
        .map((k) =>
          supabase
            .from(TABLES[k].table)
            .upsert(ops[k].inserts.map((r) => ({ ...r, created_by: uid, updated_by: uid }))),
        ),
    );
  }
  await run(
    TABLE_KEYS.flatMap((k) =>
      ops[k].updates.map((u) =>
        supabase
          .from(TABLES[k].table)
          .update({ ...u.set, updated_by: uid })
          .eq(TABLES[k].key, u.id),
      ),
    ),
  );
  for (const tier of DELETE_TIERS) {
    await run(
      tier
        .filter((k) => ops[k].deletes.length)
        .map((k) => supabase.from(TABLES[k].table).delete().in(TABLES[k].key, ops[k].deletes)),
    );
  }
}

/** 저장 표시용 메타를 갱신하고 저장 시각을 돌려준다 */
export async function touchMeta(supabase: SupabaseClient, uid: string): Promise<string> {
  const { data, error } = await supabase
    .from('board_meta')
    .upsert({ id: META_ID, updated_by: uid })
    .select('updated_at')
    .single<{ updated_at: string }>();
  if (error) throw new Error(error.message);
  return data.updated_at;
}

/** 마지막 저장자·시각 (아직 없으면 null) */
export async function fetchLastSaved(
  supabase: SupabaseClient,
): Promise<{ name: string; at: string } | null> {
  const { data, error } = await supabase
    .from('board_meta')
    .select('updated_at, updater:status_board_users!board_meta_updated_by_fkey(name)')
    .eq('id', META_ID)
    .maybeSingle<{ updated_at: string; updater: { name: string } | null }>();
  if (error) throw new Error(error.message);
  return data ? { name: data.updater?.name ?? '알 수 없음', at: data.updated_at } : null;
}
