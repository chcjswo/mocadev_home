'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { INITIAL_DATA } from '@/lib/board/data';
import { getSupabase } from '@/lib/board/supabase';
import type { BoardData } from '@/lib/board/types';
import { BoardApp } from './BoardApp';
import { LoginForm } from './LoginForm';

const BOARD_ID = 'main';

/** 로그인해야 현황판이 보이는 게이트. 데이터는 Supabase board 테이블에서 읽고 쓴다. */
export function BoardGate() {
  const supabase = getSupabase();
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [board, setBoard] = useState<BoardData | null>(null);
  const [loadErr, setLoadErr] = useState('');
  const [saveErr, setSaveErr] = useState(false);
  const saveTimer = useRef<number | null>(null);
  const pending = useRef<BoardData | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  /* 로그인하면 DB에서 현황판 문서를 읽고, 없으면 초기 데이터로 시딩 */
  useEffect(() => {
    if (!supabase || !session) {
      setBoard(null);
      setLoadErr('');
      return;
    }
    let cancelled = false;
    (async () => {
      const { data: row, error } = await supabase.from('board').select('data').eq('id', BOARD_ID).maybeSingle();
      if (cancelled) return;
      if (error) {
        setLoadErr(error.message);
        return;
      }
      if (row) {
        setBoard(row.data as BoardData);
        return;
      }
      const { error: insErr } = await supabase.from('board').insert({ id: BOARD_ID, data: INITIAL_DATA });
      if (cancelled) return;
      if (insErr && insErr.code === '23505') {
        // 다른 사용자가 방금 시딩함 — 그쪽 문서를 읽는다
        const { data: row2, error: err2 } = await supabase.from('board').select('data').eq('id', BOARD_ID).single();
        if (cancelled) return;
        if (err2) setLoadErr(err2.message);
        else setBoard(row2.data as BoardData);
        return;
      }
      if (insErr) {
        setLoadErr(insErr.message);
        return;
      }
      setBoard(INITIAL_DATA);
    })();
    return () => {
      cancelled = true;
    };
  }, [supabase, session]);

  /* 대기 중인 변경을 즉시 저장 (로그아웃·페이지 이탈 시 유실 방지) */
  const flush = useCallback(async () => {
    if (saveTimer.current) {
      window.clearTimeout(saveTimer.current);
      saveTimer.current = null;
    }
    const d = pending.current;
    if (!d || !supabase) return;
    pending.current = null;
    const { error } = await supabase
      .from('board')
      .upsert({ id: BOARD_ID, data: d, updated_at: new Date().toISOString() });
    setSaveErr(!!error);
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
          return error ? error.message : null;
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
        onDataChange={persist}
        onLogout={async () => {
          await flush();
          supabase.auth.signOut();
        }}
      />
    </>
  );
}
