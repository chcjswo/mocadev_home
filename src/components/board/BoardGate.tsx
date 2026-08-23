'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { INITIAL_DATA } from '@/lib/board/data';
import { diffBoard, hasOps, rowsToBoard } from '@/lib/board/rows';
import { getSupabase } from '@/lib/board/supabase';
import {
  EMPTY_BOARD,
  applyOps,
  fetchBoardRows,
  fetchLastSaved,
  isEmptyRows,
  touchMeta,
} from '@/lib/board/sync';
import type { BoardData } from '@/lib/board/types';
import { BoardApp } from './BoardApp';
import { LoginForm } from './LoginForm';

/** 마지막으로 저장한 사람·시각 (헤더 표시용) */
export interface LastSaved {
  name: string;
  at: string;
}

/** me(나) 표시는 보는 사람마다 다르므로 DB가 아니라 이 브라우저에만 저장한다 */
const ME_KEY = 'board_me';

function readMe(): string | null {
  try {
    return window.localStorage.getItem(ME_KEY);
  } catch {
    return null;
  }
}

function writeMe(id: string | null) {
  try {
    if (id) window.localStorage.setItem(ME_KEY, id);
    else window.localStorage.removeItem(ME_KEY);
  } catch {
    /* 저장 못 해도 동작에는 지장 없음 */
  }
}

/** 로그인해야 현황판이 보이는 게이트. 데이터는 Supabase 정규화 테이블(board_*)에서 읽고 쓴다. */
export function BoardGate() {
  const supabase = getSupabase();
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [board, setBoard] = useState<BoardData | null>(null);
  const [userName, setUserName] = useState('');
  const [lastSaved, setLastSaved] = useState<LastSaved | null>(null);
  const [loadErr, setLoadErr] = useState('');
  const [saveErr, setSaveErr] = useState(false);
  const saveTimer = useRef<number | null>(null);
  const pending = useRef<BoardData | null>(null);
  /** 마지막으로 DB에 반영된 문서 — 다음 저장 때 diff의 기준 */
  const lastSynced = useRef<BoardData | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  const uid = session?.user.id ?? null;
  const email = session?.user.email ?? '';

  /* 로그인하면 정규화 테이블에서 현황판을 읽고, 비어 있으면 초기 데이터로 시딩.
     session 객체는 토큰 갱신마다 새로 만들어지므로 사용자 id 기준으로만 다시 읽는다. */
  useEffect(() => {
    if (!supabase || !uid) {
      setBoard(null);
      setLoadErr('');
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const { data: me } = await supabase
          .from('status_board_users')
          .select('name')
          .eq('id', uid)
          .maybeSingle();
        if (cancelled) return;
        setUserName(me?.name ?? email ?? '');
        let rows = await fetchBoardRows(supabase);
        if (cancelled) return;
        if (isEmptyRows(rows)) {
          let seedErr: unknown = null;
          try {
            await applyOps(supabase, diffBoard(EMPTY_BOARD, INITIAL_DATA), uid);
            await touchMeta(supabase, uid);
          } catch (e) {
            seedErr = e; // 다른 사용자가 방금 시딩했으면 아래에서 그쪽 데이터를 읽는다
          }
          rows = await fetchBoardRows(supabase);
          if (cancelled) return;
          if (isEmptyRows(rows) && seedErr) throw seedErr;
        }
        const doc = rowsToBoard(rows, readMe());
        lastSynced.current = doc;
        setBoard(doc);
        const saved = await fetchLastSaved(supabase);
        if (!cancelled) setLastSaved(saved);
      } catch (e) {
        if (!cancelled) setLoadErr(e instanceof Error ? e.message : String(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [supabase, uid, email]);

  /* 대기 중인 변경을 즉시 저장 (로그아웃·페이지 이탈 시 유실 방지).
     마지막으로 반영된 문서와 diff해서 바뀐 row(의 바뀐 컬럼)만 쓴다. */
  const flush = useCallback(async () => {
    if (saveTimer.current) {
      window.clearTimeout(saveTimer.current);
      saveTimer.current = null;
    }
    const d = pending.current;
    if (!d || !supabase || !uid) return;
    pending.current = null;
    writeMe(d.people.find((p) => p.me)?.id ?? null);
    const prev = lastSynced.current;
    if (!prev) return;
    const ops = diffBoard(prev, d);
    if (!hasOps(ops)) {
      lastSynced.current = d;
      setSaveErr(false);
      return;
    }
    try {
      await applyOps(supabase, ops, uid);
      const at = await touchMeta(supabase, uid);
      // 메타 갱신까지 끝난 뒤에 기준을 옮긴다 — 중간에 실패하면 다음 저장 때 전부 재시도 (쓰기는 멱등)
      lastSynced.current = d;
      setSaveErr(false);
      setLastSaved({ name: userName, at });
    } catch {
      setSaveErr(true);
      // 반영 못 한 문서를 되살려서 다음 저장 때 다시 diff되게 한다
      if (!pending.current) pending.current = d;
    }
  }, [supabase, uid, userName]);

  /* 새 카드 번호는 DB 시퀀스에서 발급 — 로컬 max+1 계산은 동시 생성 시 겹친다 */
  const allocCardId = useCallback(async () => {
    if (!supabase) throw new Error('Supabase가 설정되지 않았습니다');
    const { data, error } = await supabase.rpc('board_next_card_id');
    if (error) throw new Error(error.message);
    return data as number;
  }, [supabase]);

  /* 편집할 때마다 디바운스해서 DB에 저장 */
  const persist = useCallback(
    (d: BoardData) => {
      pending.current = d;
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
      saveTimer.current = window.setTimeout(() => void flush(), 600);
    },
    [flush],
  );

  useEffect(() => {
    const h = () => void flush();
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [flush]);

  /* 다른 브라우저·사용자가 저장한 내용을 받아온다.
     내 미저장 편집을 먼저 내보낸 뒤 DB를 다시 읽어 화면과 diff 기준을 함께 바꾼다
     (기준만 바꾸면 다음 편집 때 남의 변경을 되돌려 쓰게 된다). */
  const refreshing = useRef(false);
  const refresh = useCallback(async () => {
    if (!supabase || !lastSynced.current || refreshing.current) return;
    refreshing.current = true;
    try {
      await flush();
      if (pending.current) return; // 저장 실패분이 남아 있으면 덮어쓰지 않는다
      const [rows, saved] = await Promise.all([fetchBoardRows(supabase), fetchLastSaved(supabase)]);
      if (pending.current) return; // 읽는 사이에 생긴 편집을 덮어쓰지 않는다 — 저장 후 Realtime으로 다시 온다
      const doc = rowsToBoard(rows, readMe());
      lastSynced.current = doc;
      setBoard(doc);
      setLastSaved(saved);
    } catch {
      /* 다음 기회(포커스·Realtime)에 다시 시도 */
    } finally {
      refreshing.current = false;
    }
  }, [supabase, flush]);

  /* 탭으로 돌아올 때 + DB가 저장될 때(board_meta 갱신 Realtime) 재조회 */
  useEffect(() => {
    if (!supabase || !uid) return;
    const onVisible = () => {
      if (document.visibilityState === 'visible') void refresh();
    };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', onVisible);
    let timer: number | null = null;
    const channel = supabase
      .channel('board-meta')
      .on('postgres_changes', { event: '*', schema: 'board', table: 'board_meta' }, () => {
        if (timer) window.clearTimeout(timer);
        timer = window.setTimeout(() => void refresh(), 300);
      })
      .subscribe();
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', onVisible);
      if (timer) window.clearTimeout(timer);
      supabase.removeChannel(channel);
    };
  }, [supabase, uid, refresh]);

  if (!supabase) {
    return (
      <div className="login">
        <section className="panel">
          <h1>제작 현황판</h1>
          <p className="hint">
            Supabase 환경 변수가 설정되지 않았습니다.
            <br />
            <code>.env.local</code>에 <code>NEXT_PUBLIC_SUPABASE_URL</code>과{' '}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>를 넣어 주세요.
          </p>
        </section>
      </div>
    );
  }

  if (!ready) return null;

  if (!session) {
    return (
      <LoginForm
        onLogin={async (email, password) => {
          const { error } = await supabase.auth.signInWithPassword({ email, password });
          return error ? { code: error.code, message: error.message } : null;
        }}
      />
    );
  }

  if (loadErr) {
    return (
      <div className="login">
        <section className="panel">
          <h1>제작 현황판</h1>
          <p className="hint">
            현황판 데이터를 불러오지 못했습니다: {loadErr}
            <br />
            Supabase에서 <code>supabase/schema.sql</code>을 실행했는지 확인해 주세요.
          </p>
          <div className="dbtn">
            <button onClick={() => supabase.auth.signOut()}>로그아웃</button>
          </div>
        </section>
      </div>
    );
  }

  if (!board) return null;

  return (
    <>
      {saveErr && <div className="savebar">저장하지 못했습니다 — 네트워크 연결을 확인해 주세요.</div>}
      <BoardApp
        initialData={board}
        userName={userName}
        lastSaved={lastSaved}
        onDataChange={persist}
        allocCardId={allocCardId}
        onLogout={async () => {
          await flush();
          supabase.auth.signOut();
        }}
      />
    </>
  );
}
