'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getSupabase } from '@/lib/board/supabase';

/** 인증 메일 재발송 */
export async function resendVerification(email: string): Promise<string | null> {
  const supabase = getSupabase();
  if (!supabase) return 'Supabase 환경 변수가 없습니다.';
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: { emailRedirectTo: `${window.location.origin}/board` },
  });
  return error ? error.message : null;
}

/** 가입 직후 "인증 메일을 보냈습니다" 안내 화면 */
export function VerifyNotice({ email }: { email: string }) {
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const resend = async () => {
    setBusy(true);
    const err = await resendVerification(email);
    setMsg(err ? `다시 보내지 못했습니다: ${err}` : '인증 메일을 다시 보냈습니다.');
    setBusy(false);
  };

  return (
    <div className="login">
      <section className="panel">
        <h1>인증 메일을 보냈습니다</h1>
        <p className="hint">
          <b>{email}</b>로 인증 메일을 보냈습니다. 메일함을 확인하고 인증 링크를 눌러 주세요.
          <br />
          인증이 끝나면 로그인할 수 있습니다.
        </p>
        {msg && <p className="hint">{msg}</p>}
        <div className="dbtn">
          <button type="button" className="ghost" onClick={resend} disabled={busy}>
            인증 메일 다시 보내기
          </button>
        </div>
        <p className="alt">
          <Link href="/board">로그인으로</Link>
        </p>
      </section>
    </div>
  );
}
