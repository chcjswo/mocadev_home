'use client';

import { useState } from 'react';

interface LoginFormProps {
  /** 성공 시 null, 실패 시 오류 메시지 반환 */
  onLogin: (email: string, password: string) => Promise<string | null>;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr('');
    const msg = await onLogin(email, password);
    if (msg) setErr(msg);
    setBusy(false);
  };

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
          {err && <div className="err">로그인하지 못했습니다: {err}</div>}
          <div className="dbtn">
            <button type="submit" disabled={busy}>
              로그인
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
