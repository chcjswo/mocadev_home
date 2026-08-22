'use client';

import Link from 'next/link';
import { useState } from 'react';
import { resendVerification } from '@/lib/board/supabase';

/** 가입 직후 "인증 메일을 보냈습니다" 안내 화면 */
export function VerifyNotice({ email }: { email: string }) {
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const resend = async () => {
    setBusy(true);
    setMsg(await resendVerification(email));
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
