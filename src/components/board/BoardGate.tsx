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

/** 로그인해야 현황판이 보이는 게이트. 데이터는 Supabase board 테이블에서 읽고 쓴다. */
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

  /* 로그인하면 정규화 테이블에서 현황판을 읽고, 비어 있으면 초기 데이터로 시딩 */
  useEffect(() => {
    if (!supabase || !session) {
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
          .eq('id', session.user.id)
          .maybeSingle();
        if (cancelled) return;
        setUserName(me?.name ?? session.user.email ?? '');
        const uid = session.user.id;
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
  }, [supabase, session]);

  /* 대기 중인 변경을 즉시 저장 (로그아웃·페이지 이탈 시 유실 방지).
     마지막으로 반영된 문서와 diff해서 바뀐 row(의 바뀐 컬럼)만 쓴다. */
  const flush = useCallback(async () => {
    if (saveTimer.current) {
      window.clearTimeout(saveTimer.current);
      saveTimer.current = null;
    }
    const d = pending.current;
    if (!d || !supabase || !session) return;
    pending.current = null;
    writeMe(d.people.find((p) => p.me)?.id ?? null);
    const prev = lastSynced.current;
    if (!prev) return;
    const ops = diffBoard(prev, d);
    if (!hasOps(ops)) {
      lastSynced.current = d;
      return;
    }
    try {
      await applyOps(supabase, ops, session.user.id);
      lastSynced.current = d;
      const at = await touchMeta(supabase, session.user.id);
      setSaveErr(false);
      setLastSaved({ name: userName, at });
    } catch {
      setSaveErr(true);
      // 반영 못 한 문서를 되살려서 다음 저장 때 다시 diff되게 한다
      if (!pending.current) pending.current = d;
    }
  }, [supabase, session, userName]);

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
      {saveErr && (
        <div className="savebar">저장하지 못했습니다 — 네트워크 연결을 확인해 주세요.</div>
      )}
      <BoardApp
        initialData={board}
        userName={userName}
        lastSaved={lastSaved}
        onDataChange={persist}
        onLogout={async () => {
          await flush();
          supabase.auth.signOut();
        }}
      />
    </>
  );
}
