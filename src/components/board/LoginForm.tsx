'use client';

import Link from 'next/link';
import { useState } from 'react';
import { resendVerification } from './VerifyNotice';

export interface LoginError {
  /** Supabase AuthError.code (예: email_not_confirmed) */
  code?: string;
  message: string;
}

interface LoginFormProps {
  /** 성공 시 null, 실패 시 오류 반환 */
  onLogin: (email: string, password: string) => Promise<LoginError | null>;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<LoginError | null>(null);
  const [busy, setBusy] = useState(false);
  const [resent, setResent] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setResent('');
    setErr(await onLogin(email, password));
    setBusy(false);
  };

  const resend = async () => {
    setBusy(true);
    const msg = await resendVerification(email);
    setResent(msg ? `다시 보내지 못했습니다: ${msg}` : '인증 메일을 다시 보냈습니다. 메일함을 확인해 주세요.');
    setBusy(false);
  };

  const unconfirmed = err?.code === 'email_not_confirmed';

  return (
    <div className="login">
      <section className="panel">
        <h1>제작 현황판</h1>
        <form onSubmit={submit}>
          <div className="f">
            <label>이메일</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
          </div>
          <div className="f">
            <label>비밀번호</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {err && !unconfirmed && <div className="err">로그인하지 못했습니다: {err.message}</div>}
          {unconfirmed && (
            <div className="err">아직 이메일 인증이 끝나지 않았습니다. 메일함의 인증 링크를 눌러 주세요.</div>
          )}
          {resent && <p className="hint">{resent}</p>}
          <div className="dbtn">
            <button type="submit" disabled={busy}>
              로그인
            </button>
            {unconfirmed && (
              <button type="button" className="ghost" onClick={resend} disabled={busy}>
                인증 메일 다시 보내기
              </button>
            )}
          </div>
        </form>
        <p className="alt">
          계정이 없나요? <Link href="/board/signup">회원가입</Link>
        </p>
      </section>
    </div>
  );
}
