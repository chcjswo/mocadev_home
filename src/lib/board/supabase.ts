import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

/** 브라우저용 Supabase 클라이언트 (환경 변수가 없으면 null — 설정 안내 화면용) */
export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!client) client = createClient(url, key);
  return client;
}

/** 회원가입 인증 메일 재발송. 사용자에게 보여줄 결과 메시지를 돌려준다. */
export async function resendVerification(email: string): Promise<string> {
  const supabase = getSupabase();
  if (!supabase) return 'Supabase 환경 변수가 없습니다.';
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: { emailRedirectTo: `${window.location.origin}/board` },
  });
  return error ? `다시 보내지 못했습니다: ${error.message}` : '인증 메일을 다시 보냈습니다. 메일함을 확인해 주세요.';
}
