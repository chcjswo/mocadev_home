-- 제작 현황판(/board) Supabase 스키마
-- Supabase 대시보드 > SQL Editor에서 실행한다. 다시 실행해도 안전하다(멱등).
--
-- [인증 설정] 대시보드 > Authentication
--   Sign In / Providers > Email: "Confirm email" 켜기 (가입 후 이메일 인증 필수)
--   URL Configuration > Redirect URLs: http://localhost:3000/board, https://<프로덕션 도메인>/board
--   (인증 링크를 누르면 /board로 돌아와 바로 로그인된다)
--
-- [공통 규칙] 모든 테이블은 시스템 정보 컬럼 4개를 가진다.
--   created_at timestamptz not null default now()
--   created_by uuid references public.status_board_users(id)
--   updated_at timestamptz not null default now()   -- set_updated_at 트리거로 자동 갱신
--   updated_by uuid references public.status_board_users(id)
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
-- status_board_users: auth.users 1:1 프로필 (이름, 유저 타입)
------------------------------------------------------------------------
-- [마이그레이션] 옛 이름(profiles, production_board_users)이 남아 있으면 데이터를 유지한 채 이름만 바꾼다.
alter table if exists public.profiles rename to status_board_users;
alter table if exists public.production_board_users rename to status_board_users;

create table if not exists public.status_board_users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  user_type text not null default 'user' check (user_type in ('admin', 'user')),
  created_at timestamptz not null default now(),
  created_by uuid references public.status_board_users(id),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.status_board_users(id)
);

drop trigger if exists profiles_set_updated_at on public.status_board_users; -- 옛 이름 정리
drop trigger if exists production_board_users_set_updated_at on public.status_board_users; -- 옛 이름 정리
drop trigger if exists status_board_users_set_updated_at on public.status_board_users;
create trigger status_board_users_set_updated_at
  before update on public.status_board_users
  for each row execute function public.set_updated_at();

-- 회원가입(auth.users insert) 시 프로필 자동 생성. 이름은 가입 폼의 user metadata에서 가져온다.
-- user_type은 기본값 'user'로만 생성된다. admin 지정은 SQL로 수동:
--   update public.status_board_users set user_type = 'admin' where id = '<uuid>';
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.status_board_users (id, name, created_by, updated_by)
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

alter table public.status_board_users enable row level security;

-- 로그인 사용자는 모든 프로필을 읽고, 본인 프로필만 고칠 수 있다.
drop policy if exists "authenticated can select profiles" on public.status_board_users; -- 옛 이름 정리
drop policy if exists "authenticated can select production_board_users" on public.status_board_users; -- 옛 이름 정리
drop policy if exists "authenticated can select status_board_users" on public.status_board_users;
create policy "authenticated can select status_board_users" on public.status_board_users
  for select to authenticated using (true);

drop policy if exists "owner can update profile" on public.status_board_users;
create policy "owner can update profile" on public.status_board_users
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

-- user_type은 본인이 바꿀 수 없다 (컬럼 단위 권한으로 차단). insert는 트리거만 한다.
revoke insert, update on public.status_board_users from authenticated;
grant update (name, updated_by) on public.status_board_users to authenticated;

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

-- 시스템 컬럼 (기존 행이 있어도 데이터 유실 없이 추가된다. 기존 행의 created_by/updated_by는 null)
alter table public.board add column if not exists created_at timestamptz not null default now();
alter table public.board add column if not exists created_by uuid;
alter table public.board add column if not exists updated_by uuid;
alter table public.board drop constraint if exists board_created_by_fkey;
alter table public.board add constraint board_created_by_fkey
  foreign key (created_by) references public.status_board_users(id);
alter table public.board drop constraint if exists board_updated_by_fkey;
alter table public.board add constraint board_updated_by_fkey
  foreign key (updated_by) references public.status_board_users(id);

drop trigger if exists board_set_updated_at on public.board;
create trigger board_set_updated_at
  before update on public.board
  for each row execute function public.set_updated_at();

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

------------------------------------------------------------------------
-- 정규화 테이블 (#17): jsonb 단일 문서를 엔티티별 테이블로 분리
------------------------------------------------------------------------
-- 클라이언트 모델(src/lib/board/types.ts의 BoardData)을 그대로 매핑한다.
-- 배열 순서는 position 컬럼으로 보존한다.
-- 기존 board 테이블은 전환 검증이 끝날 때까지 백업 겸 유지한다(제거는 별도 이슈).

-- 공정 단계. 클라이언트 모델이 이름 배열(string[])이고 프로젝트가 배열 인덱스로
-- 참조하므로, 별도 id 없이 position 자체가 식별자다.
create table if not exists public.board_stages (
  position int primary key,
  name text not null,
  created_at timestamptz not null default now(),
  created_by uuid references public.status_board_users(id),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.status_board_users(id)
);

-- 담당자. me 플래그는 보는 사람마다 다르므로 DB에 저장하지 않는다(클라이언트 로컬).
create table if not exists public.board_people (
  id text primary key,
  name text not null,
  position int not null,
  created_at timestamptz not null default now(),
  created_by uuid references public.status_board_users(id),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.status_board_users(id)
);

-- 일정 종류
create table if not exists public.board_event_types (
  id text primary key,
  name text not null,
  color text not null,
  mark text not null default 'none' check (mark in ('none', 'red', 'bg')),
  position int not null,
  created_at timestamptz not null default now(),
  created_by uuid references public.status_board_users(id),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.status_board_users(id)
);

-- 카드 라벨
create table if not exists public.board_labels (
  id text primary key,
  name text not null,
  color text not null,
  position int not null,
  created_at timestamptz not null default now(),
  created_by uuid references public.status_board_users(id),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.status_board_users(id)
);

-- 일정. 종류를 지우면 그 종류의 일정도 함께 지워진다(클라이언트 동작과 동일).
create table if not exists public.board_events (
  id text primary key,
  date text not null,
  type_id text not null references public.board_event_types(id) on delete cascade,
  title text not null,
  note text not null default '',
  position int not null,
  created_at timestamptz not null default now(),
  created_by uuid references public.status_board_users(id),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.status_board_users(id)
);

-- 프로젝트. due는 클라이언트 모델과 같게 '' 허용 문자열(YYYY-MM-DD)로 둔다.
create table if not exists public.board_projects (
  id text primary key,
  name text not null,
  kind text not null check (kind in ('앱', '게임')),
  stage int not null default 0,
  due text not null default '',
  position int not null,
  created_at timestamptz not null default now(),
  created_by uuid references public.status_board_users(id),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.status_board_users(id)
);

-- 프로젝트 파일 링크
create table if not exists public.board_project_files (
  id text primary key,
  project_id text not null references public.board_projects(id) on delete cascade,
  name text not null,
  kind text not null check (kind in ('folder', 'image', 'build', 'doc', 'link')),
  url text not null,
  position int not null,
  created_at timestamptz not null default now(),
  created_by uuid references public.status_board_users(id),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.status_board_users(id)
);

-- 칸반 카드. labs/owners는 조인 테이블 대신 배열 + GIN 인덱스(규모 대비 단순함 우선).
-- 프로젝트를 지우면 카드도 함께 지워진다(클라이언트 동작과 동일).
create table if not exists public.board_cards (
  id bigint primary key,
  project_id text not null references public.board_projects(id) on delete cascade,
  list int not null default 0,
  text text not null,
  due text not null default '',
  labs text[] not null default '{}',
  owners text[] not null default '{}',
  position int not null,
  created_at timestamptz not null default now(),
  created_by uuid references public.status_board_users(id),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.status_board_users(id)
);

-- 마지막 저장자·시각 표시용 한 행짜리 메타. 저장할 때마다 upsert된다.
create table if not exists public.board_meta (
  id text primary key,
  created_at timestamptz not null default now(),
  created_by uuid references public.status_board_users(id),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.status_board_users(id)
);

-- 인덱스
create index if not exists board_cards_project_id_idx on public.board_cards (project_id);
create index if not exists board_cards_owners_idx on public.board_cards using gin (owners);
create index if not exists board_events_date_idx on public.board_events (date);
create index if not exists board_project_files_project_id_idx on public.board_project_files (project_id);

-- updated_at 트리거 + RLS (로그인 사용자만 읽기/쓰기, anon 차단)
do $$
declare
  t text;
begin
  foreach t in array array[
    'board_stages', 'board_people', 'board_event_types', 'board_labels',
    'board_events', 'board_projects', 'board_project_files', 'board_cards', 'board_meta'
  ] loop
    execute format('drop trigger if exists %I on public.%I', t || '_set_updated_at', t);
    execute format(
      'create trigger %I before update on public.%I for each row execute function public.set_updated_at()',
      t || '_set_updated_at', t
    );
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "authenticated can select" on public.%I', t);
    execute format('create policy "authenticated can select" on public.%I for select to authenticated using (true)', t);
    execute format('drop policy if exists "authenticated can insert" on public.%I', t);
    execute format(
      'create policy "authenticated can insert" on public.%I for insert to authenticated with check (true)', t
    );
    execute format('drop policy if exists "authenticated can update" on public.%I', t);
    execute format(
      'create policy "authenticated can update" on public.%I for update to authenticated using (true) with check (true)',
      t
    );
    execute format('drop policy if exists "authenticated can delete" on public.%I', t);
    execute format('create policy "authenticated can delete" on public.%I for delete to authenticated using (true)', t);
  end loop;
end;
$$;
