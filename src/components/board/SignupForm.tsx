'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSupabase } from '@/lib/board/supabase';
import { VerifyNotice } from './VerifyNotice';

/** 회원가입 화면: 이메일·이름·비밀번호만 받는다. 프로필은 DB 트리거가 만든다. */
export function SignupForm() {
  const router = useRouter();
  const supabase = getSupabase();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  /** 가입 후 이메일 인증 대기 중인 주소 */
  const [sentTo, setSentTo] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setErr('');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name: name.trim() }, emailRedirectTo: `${window.location.origin}/board` },
    });
    if (error) {
      setErr(error.message);
      setBusy(false);
      return;
    }
    // 이메일 인증이 켜져 있으면 세션 없이 돌아온다 → 인증 안내 화면
    if (data.session) router.replace('/board');
    else setSentTo(email);
  };

  if (sentTo) return <VerifyNotice email={sentTo} />;

  return (
    <div className="login">
      <section className="panel">
        <h1>회원가입</h1>
        {supabase ? (
          <form onSubmit={submit}>
            <div className="f">
              <label>이메일</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
            </div>
            <div className="f">
              <label>이름</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required maxLength={40} />
            </div>
            <div className="f">
              <label>비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
            {err && <div className="err">가입하지 못했습니다: {err}</div>}
            <div className="dbtn">
              <button type="submit" disabled={busy}>
                가입하기
              </button>
            </div>
          </form>
        ) : (
          <p className="hint">Supabase 환경 변수가 설정되지 않았습니다.</p>
        )}
        <p className="alt">
          이미 계정이 있나요? <Link href="/board">로그인</Link>
        </p>
      </section>
    </div>
  );
}
