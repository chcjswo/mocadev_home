'use client';

import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { getSupabase } from '@/lib/board/supabase';
import { BoardApp } from './BoardApp';
import { LoginForm } from './LoginForm';

/** 로그인해야 현황판이 보이는 게이트 (미로그인 시 데이터·UI 미노출) */
export function BoardGate() {
  const supabase = getSupabase();
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

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

  return <BoardApp onLogout={() => supabase.auth.signOut()} />;
}
