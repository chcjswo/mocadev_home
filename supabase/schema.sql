-- 제작 현황판(/board) Supabase 스키마
-- Supabase 대시보드 > SQL Editor에서 실행한다. 다시 실행해도 안전하다(멱등).
--
-- [공통 규칙] 모든 테이블은 시스템 정보 컬럼 4개를 가진다.
--   created_at timestamptz not null default now()
--   created_by uuid references public.profiles(id)
--   updated_at timestamptz not null default now()   -- set_updated_at 트리거로 자동 갱신
--   updated_by uuid references public.profiles(id)
-- created_by/updated_by는 저장하는 쪽(클라이언트)이 auth.uid()로 채운다.

-- updated_at 자동 갱신 트리거 함수 (모든 테이블 공용)
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

------------------------------------------------------------------------
-- profiles: auth.users 1:1 프로필 (이름, 유저 타입)
------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  user_type text not null default 'user' check (user_type in ('admin', 'user')),
  created_at timestamptz not null default now(),
  created_by uuid references public.profiles(id),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id)
);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- 회원가입(auth.users insert) 시 프로필 자동 생성. 이름은 가입 폼의 user metadata에서 가져온다.
-- user_type은 기본값 'user'로만 생성된다. admin 지정은 SQL로 수동:
--   update public.profiles set user_type = 'admin' where id = '<uuid>';
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name, created_by, updated_by)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data->>'name'), ''), split_part(new.email, '@', 1)),
    new.id,
    new.id
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;

-- 로그인 사용자는 모든 프로필을 읽고, 본인 프로필만 고칠 수 있다.
drop policy if exists "authenticated can select profiles" on public.profiles;
create policy "authenticated can select profiles" on public.profiles
  for select to authenticated using (true);

drop policy if exists "owner can update profile" on public.profiles;
create policy "owner can update profile" on public.profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

-- user_type은 본인이 바꿀 수 없다 (컬럼 단위 권한으로 차단). insert는 트리거만 한다.
revoke insert, update on public.profiles from authenticated;
grant update (name, updated_by) on public.profiles to authenticated;

------------------------------------------------------------------------
-- board: 현황판 문서
------------------------------------------------------------------------
-- 현황판 데이터(stages/people/etypes/labels/events/projects/cards — 티켓 #8에서
-- 확정한 스키마)는 로그인한 사용자 전원이 공유하는 단일 문서이므로,
-- 한 행짜리 jsonb 문서로 저장한다. 문서 형태는 src/lib/board/types.ts의 BoardData.

create table if not exists public.board (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.board enable row level security;

-- 로그인(authenticated)한 사용자만 읽고 쓸 수 있다. anon은 아무것도 못 한다.
drop policy if exists "authenticated can select" on public.board;
create policy "authenticated can select" on public.board
  for select to authenticated using (true);

drop policy if exists "authenticated can insert" on public.board;
create policy "authenticated can insert" on public.board
  for insert to authenticated with check (true);

drop policy if exists "authenticated can update" on public.board;
create policy "authenticated can update" on public.board
  for update to authenticated using (true) with check (true);
