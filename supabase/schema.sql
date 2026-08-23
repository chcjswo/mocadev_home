-- 제작 현황판(/board) Supabase 스키마 — 전용 스키마 `board`에 둔다.
-- Supabase 대시보드 > SQL Editor에서 실행한다. 다시 실행해도 안전하다(멱등).
--
-- [API 노출 설정 — 필수] 대시보드 > Project Settings > Data API > Exposed schemas에 `board` 추가.
--   public이 아닌 스키마는 기본으로 API에 노출되지 않아, 이 설정이 없으면 클라이언트 요청이 모두 실패한다.
--   클라이언트는 createClient(..., { db: { schema: 'board' } })로 이 스키마를 쓴다 (src/lib/board/supabase.ts).
--
-- [인증 설정] 대시보드 > Authentication
--   Sign In / Providers > Email: "Confirm email" 켜기 (가입 후 이메일 인증 필수)
--   URL Configuration > Redirect URLs: http://localhost:3000/board, https://<프로덕션 도메인>/board
--   (인증 링크를 누르면 /board로 돌아와 바로 로그인된다)
--
-- [공통 규칙] 모든 테이블은 시스템 정보 컬럼 4개를 가진다.
--   created_at timestamptz not null default now()
--   created_by uuid references board.status_board_users(id)
--   updated_at timestamptz not null default now()   -- set_updated_at 트리거로 자동 갱신
--   updated_by uuid references board.status_board_users(id)
-- created_by/updated_by는 저장하는 쪽(클라이언트)이 auth.uid()로 채운다.

------------------------------------------------------------------------
-- 스키마 생성 + public → board 이전
------------------------------------------------------------------------
create schema if not exists board;

-- API 역할이 스키마를 쓸 수 있어야 한다 (public은 기본 grant가 있지만 새 스키마는 없다).
-- 행 단위 접근 제어는 아래 RLS 정책이 맡는다. anon은 모든 정책에서 제외돼 아무것도 못 읽는다.
grant usage on schema board to anon, authenticated, service_role;
alter default privileges in schema board grant all on tables to anon, authenticated, service_role;
alter default privileges in schema board grant all on sequences to anon, authenticated, service_role;
alter default privileges in schema board grant all on functions to anon, authenticated, service_role;

-- [마이그레이션] public에 있던 테이블·시퀀스를 데이터 그대로 board로 옮긴다.
-- set schema는 인덱스·FK·RLS 정책·트리거·publication 등록을 모두 함께 가져간다.
-- 옛 함수(public.set_updated_at 등)를 가리키던 트리거는 아래에서 새 함수로 다시 만든다.
alter table if exists public.status_board_users set schema board;
alter table if exists public.board set schema board;
alter table if exists public.board_stages set schema board;
alter table if exists public.board_people set schema board;
alter table if exists public.board_event_types set schema board;
alter table if exists public.board_labels set schema board;
alter table if exists public.board_events set schema board;
alter table if exists public.board_projects set schema board;
alter table if exists public.board_project_files set schema board;
alter table if exists public.board_cards set schema board;
alter table if exists public.board_meta set schema board;
alter sequence if exists public.board_card_id_seq set schema board;

-- updated_at 자동 갱신 트리거 함수 (모든 테이블 공용)
create or replace function board.set_updated_at()
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
alter table if exists board.profiles rename to status_board_users;
alter table if exists board.production_board_users rename to status_board_users;

create table if not exists board.status_board_users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  user_type text not null default 'user' check (user_type in ('admin', 'user')),
  created_at timestamptz not null default now(),
  created_by uuid references board.status_board_users(id),
  updated_at timestamptz not null default now(),
  updated_by uuid references board.status_board_users(id)
);

drop trigger if exists profiles_set_updated_at on board.status_board_users; -- 옛 이름 정리
drop trigger if exists production_board_users_set_updated_at on board.status_board_users; -- 옛 이름 정리
drop trigger if exists status_board_users_set_updated_at on board.status_board_users;
create trigger status_board_users_set_updated_at
  before update on board.status_board_users
  for each row execute function board.set_updated_at();

-- 회원가입(auth.users insert) 시 프로필 자동 생성. 이름은 가입 폼의 user metadata에서 가져온다.
-- user_type은 기본값 'user'로만 생성된다. admin 지정은 SQL로 수동:
--   update board.status_board_users set user_type = 'admin' where id = '<uuid>';
create or replace function board.handle_new_user()
returns trigger language plpgsql security definer set search_path = board as $$
begin
  insert into board.status_board_users (id, name, created_by, updated_by)
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
  for each row execute function board.handle_new_user();

-- 이미 만들어진(또는 옮겨 온) 객체에 권한 부여. status_board_users의 insert/update 제한은 바로 아래에서 다시 건다.
grant all on all tables in schema board to anon, authenticated, service_role;
grant all on all sequences in schema board to anon, authenticated, service_role;

alter table board.status_board_users enable row level security;

-- 로그인 사용자는 모든 프로필을 읽고, 본인 프로필만 고칠 수 있다.
drop policy if exists "authenticated can select profiles" on board.status_board_users; -- 옛 이름 정리
drop policy if exists "authenticated can select production_board_users" on board.status_board_users; -- 옛 이름 정리
drop policy if exists "authenticated can select status_board_users" on board.status_board_users;
create policy "authenticated can select status_board_users" on board.status_board_users
  for select to authenticated using (true);

drop policy if exists "owner can update profile" on board.status_board_users;
create policy "owner can update profile" on board.status_board_users
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

-- user_type은 본인이 바꿀 수 없다 (컬럼 단위 권한으로 차단). insert는 트리거만 한다.
revoke insert, update, delete on board.status_board_users from anon, authenticated;
grant update (name, updated_by) on board.status_board_users to authenticated;

------------------------------------------------------------------------
-- board: 현황판 문서
------------------------------------------------------------------------
-- 현황판 데이터(stages/people/etypes/labels/events/projects/cards — 티켓 #8에서
-- 확정한 스키마)는 로그인한 사용자 전원이 공유하는 단일 문서이므로,
-- 한 행짜리 jsonb 문서로 저장한다. 문서 형태는 src/lib/board/types.ts의 BoardData.

create table if not exists board.board (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- 시스템 컬럼 (기존 행이 있어도 데이터 유실 없이 추가된다. 기존 행의 created_by/updated_by는 null)
alter table board.board add column if not exists created_at timestamptz not null default now();
alter table board.board add column if not exists created_by uuid;
alter table board.board add column if not exists updated_by uuid;
alter table board.board drop constraint if exists board_created_by_fkey;
alter table board.board add constraint board_created_by_fkey
  foreign key (created_by) references board.status_board_users(id);
alter table board.board drop constraint if exists board_updated_by_fkey;
alter table board.board add constraint board_updated_by_fkey
  foreign key (updated_by) references board.status_board_users(id);

drop trigger if exists board_set_updated_at on board.board;
create trigger board_set_updated_at
  before update on board.board
  for each row execute function board.set_updated_at();

alter table board.board enable row level security;

-- 로그인(authenticated)한 사용자만 읽고 쓸 수 있다. anon은 아무것도 못 한다.
drop policy if exists "authenticated can select" on board.board;
create policy "authenticated can select" on board.board
  for select to authenticated using (true);

drop policy if exists "authenticated can insert" on board.board;
create policy "authenticated can insert" on board.board
  for insert to authenticated with check (true);

drop policy if exists "authenticated can update" on board.board;
create policy "authenticated can update" on board.board
  for update to authenticated using (true) with check (true);

------------------------------------------------------------------------
-- 정규화 테이블 (#17): jsonb 단일 문서를 엔티티별 테이블로 분리
------------------------------------------------------------------------
-- 클라이언트 모델(src/lib/board/types.ts의 BoardData)을 그대로 매핑한다.
-- 배열 순서는 position 컬럼으로 보존한다.
-- 기존 board 테이블은 전환 검증이 끝날 때까지 백업 겸 유지한다(제거는 별도 이슈).

-- 공정 단계. 클라이언트 모델이 이름 배열(string[])이고 프로젝트가 배열 인덱스로
-- 참조하므로, 별도 id 없이 position 자체가 식별자다.
create table if not exists board.board_stages (
  position int primary key,
  name text not null,
  created_at timestamptz not null default now(),
  created_by uuid references board.status_board_users(id),
  updated_at timestamptz not null default now(),
  updated_by uuid references board.status_board_users(id)
);

-- 담당자. me 플래그는 보는 사람마다 다르므로 DB에 저장하지 않는다(클라이언트 로컬).
create table if not exists board.board_people (
  id text primary key,
  name text not null,
  position int not null,
  created_at timestamptz not null default now(),
  created_by uuid references board.status_board_users(id),
  updated_at timestamptz not null default now(),
  updated_by uuid references board.status_board_users(id)
);

-- 일정 종류
create table if not exists board.board_event_types (
  id text primary key,
  name text not null,
  color text not null,
  mark text not null default 'none' check (mark in ('none', 'red', 'bg')),
  position int not null,
  created_at timestamptz not null default now(),
  created_by uuid references board.status_board_users(id),
  updated_at timestamptz not null default now(),
  updated_by uuid references board.status_board_users(id)
);

-- 카드 라벨
create table if not exists board.board_labels (
  id text primary key,
  name text not null,
  color text not null,
  position int not null,
  created_at timestamptz not null default now(),
  created_by uuid references board.status_board_users(id),
  updated_at timestamptz not null default now(),
  updated_by uuid references board.status_board_users(id)
);

-- 일정. 종류를 지우면 그 종류의 일정도 함께 지워진다(클라이언트 동작과 동일).
create table if not exists board.board_events (
  id text primary key,
  date text not null,
  type_id text not null references board.board_event_types(id) on delete cascade,
  title text not null,
  note text not null default '',
  position int not null,
  created_at timestamptz not null default now(),
  created_by uuid references board.status_board_users(id),
  updated_at timestamptz not null default now(),
  updated_by uuid references board.status_board_users(id)
);

-- 프로젝트. due는 클라이언트 모델과 같게 '' 허용 문자열(YYYY-MM-DD)로 둔다.
create table if not exists board.board_projects (
  id text primary key,
  name text not null,
  kind text not null check (kind in ('앱', '게임')),
  stage int not null default 0,
  due text not null default '',
  position int not null,
  created_at timestamptz not null default now(),
  created_by uuid references board.status_board_users(id),
  updated_at timestamptz not null default now(),
  updated_by uuid references board.status_board_users(id)
);

-- 프로젝트 파일 링크
create table if not exists board.board_project_files (
  id text primary key,
  project_id text not null references board.board_projects(id) on delete cascade,
  name text not null,
  kind text not null check (kind in ('folder', 'image', 'build', 'doc', 'link')),
  url text not null,
  position int not null,
  created_at timestamptz not null default now(),
  created_by uuid references board.status_board_users(id),
  updated_at timestamptz not null default now(),
  updated_by uuid references board.status_board_users(id)
);

-- 칸반 카드. labs/owners는 조인 테이블 대신 배열 + GIN 인덱스(규모 대비 단순함 우선).
-- 프로젝트를 지우면 카드도 함께 지워진다(클라이언트 동작과 동일).
create table if not exists board.board_cards (
  id bigint primary key,
  project_id text not null references board.board_projects(id) on delete cascade,
  list int not null default 0,
  text text not null,
  due text not null default '',
  labs text[] not null default '{}',
  owners text[] not null default '{}',
  position int not null,
  created_at timestamptz not null default now(),
  created_by uuid references board.status_board_users(id),
  updated_at timestamptz not null default now(),
  updated_by uuid references board.status_board_users(id)
);

-- 마지막 저장자·시각 표시용 한 행짜리 메타. 저장할 때마다 upsert된다.
create table if not exists board.board_meta (
  id text primary key,
  created_at timestamptz not null default now(),
  created_by uuid references board.status_board_users(id),
  updated_at timestamptz not null default now(),
  updated_by uuid references board.status_board_users(id)
);

-- 저장할 때마다 board_meta가 갱신되므로, 이 한 테이블만 Realtime으로 구독하면
-- 다른 브라우저·사용자의 변경을 새로고침 없이 받아올 수 있다.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'board' and tablename = 'board_meta'
  ) then
    alter publication supabase_realtime add table board.board_meta;
  end if;
end $$;

-- 카드 번호는 DB가 발급한다. 클라이언트가 로컬 max+1로 계산하면 두 사용자가 동시에
-- 카드를 만들 때 같은 번호가 나와 나중 저장이 먼저 만든 카드를 덮어쓴다.
-- 시퀀스 nextval은 동시 호출에도 중복이 없다. JSON 가져오기처럼 명시적 id가
-- 들어오는 경로가 있으므로, 이미 쓰인 번호는 건너뛴다.
create sequence if not exists board.board_card_id_seq;

create or replace function board.board_next_card_id()
returns bigint language plpgsql security definer set search_path = board as $$
declare
  v bigint;
begin
  loop
    v := nextval('board.board_card_id_seq');
    exit when not exists (select 1 from board.board_cards where id = v);
  end loop;
  return v;
end;
$$;

revoke execute on function board.board_next_card_id() from public, anon;
grant execute on function board.board_next_card_id() to authenticated;

-- 인덱스
create index if not exists board_cards_project_id_idx on board.board_cards (project_id);
create index if not exists board_cards_owners_idx on board.board_cards using gin (owners);
create index if not exists board_events_date_idx on board.board_events (date);
create index if not exists board_project_files_project_id_idx on board.board_project_files (project_id);

-- updated_at 트리거 + RLS (로그인 사용자만 읽기/쓰기, anon 차단)
do $$
declare
  t text;
begin
  foreach t in array array[
    'board_stages', 'board_people', 'board_event_types', 'board_labels',
    'board_events', 'board_projects', 'board_project_files', 'board_cards', 'board_meta'
  ] loop
    execute format('drop trigger if exists %I on board.%I', t || '_set_updated_at', t);
    execute format(
      'create trigger %I before update on board.%I for each row execute function board.set_updated_at()',
      t || '_set_updated_at', t
    );
    execute format('alter table board.%I enable row level security', t);
    execute format('drop policy if exists "authenticated can select" on board.%I', t);
    execute format('create policy "authenticated can select" on board.%I for select to authenticated using (true)', t);
    execute format('drop policy if exists "authenticated can insert" on board.%I', t);
    execute format(
      'create policy "authenticated can insert" on board.%I for insert to authenticated with check (true)', t
    );
    execute format('drop policy if exists "authenticated can update" on board.%I', t);
    execute format(
      'create policy "authenticated can update" on board.%I for update to authenticated using (true) with check (true)',
      t
    );
    execute format('drop policy if exists "authenticated can delete" on board.%I', t);
    execute format('create policy "authenticated can delete" on board.%I for delete to authenticated using (true)', t);
  end loop;
end;
$$;

------------------------------------------------------------------------
-- 마이그레이션 (#17): 기존 board.data jsonb 문서 → 정규화 테이블
------------------------------------------------------------------------
-- 새 테이블이 모두 비어 있을 때만 실행된다(멱등). do 블록은 한 트랜잭션이라
-- 중간에 실패하면 아무것도 이관되지 않는다.

do $$
declare
  doc jsonb;
  writer uuid;
  next_card_id bigint;
begin
  if exists (select 1 from board.board_stages limit 1)
     or exists (select 1 from board.board_projects limit 1)
     or exists (select 1 from board.board_cards limit 1) then
    return; -- 이미 이관됐거나 새 테이블을 쓰는 중
  end if;

  select data, updated_by into doc, writer from board.board where id = 'main';
  if doc is null then
    return; -- 이관할 문서 없음 (새 설치 — 첫 로그인 때 클라이언트가 시딩한다)
  end if;

  insert into board.board_stages (position, name, created_by, updated_by)
  select o.ord::int - 1, o.val, writer, writer
  from jsonb_array_elements_text(doc->'stages') with ordinality as o(val, ord);

  -- me 플래그는 보는 사람마다 다른 값이라 이관하지 않는다
  insert into board.board_people (id, name, position, created_by, updated_by)
  select p.val->>'id', p.val->>'name', p.ord::int - 1, writer, writer
  from jsonb_array_elements(doc->'people') with ordinality as p(val, ord);

  insert into board.board_event_types (id, name, color, mark, position, created_by, updated_by)
  select t.val->>'id', t.val->>'name', t.val->>'color', coalesce(t.val->>'mark', 'none'),
         t.ord::int - 1, writer, writer
  from jsonb_array_elements(doc->'etypes') with ordinality as t(val, ord);

  insert into board.board_labels (id, name, color, position, created_by, updated_by)
  select l.val->>'id', l.val->>'name', l.val->>'color', l.ord::int - 1, writer, writer
  from jsonb_array_elements(doc->'labels') with ordinality as l(val, ord);

  -- 종류가 지워져 걸 곳이 없는 일정은 건너뛴다 (클라이언트도 대체 표시만 하던 데이터)
  insert into board.board_events (id, date, type_id, title, note, position, created_by, updated_by)
  select e.val->>'id', e.val->>'date', e.val->>'type', coalesce(e.val->>'title', ''),
         coalesce(e.val->>'note', ''), e.ord::int - 1, writer, writer
  from jsonb_array_elements(doc->'events') with ordinality as e(val, ord)
  where exists (select 1 from board.board_event_types x where x.id = e.val->>'type');

  insert into board.board_projects (id, name, kind, stage, due, position, created_by, updated_by)
  select p.val->>'id', p.val->>'name', p.val->>'kind', coalesce((p.val->>'stage')::int, 0),
         coalesce(p.val->>'due', ''), p.ord::int - 1, writer, writer
  from jsonb_array_elements(doc->'projects') with ordinality as p(val, ord);

  insert into board.board_project_files (id, project_id, name, kind, url, position, created_by, updated_by)
  select f.val->>'id', p.val->>'id', f.val->>'name', f.val->>'kind',
         coalesce(f.val->>'url', ''), f.ord::int - 1, writer, writer
  from jsonb_array_elements(doc->'projects') as p(val),
       jsonb_array_elements(coalesce(p.val->'files', '[]'::jsonb)) with ordinality as f(val, ord);

  -- 숫자 id 카드는 id를 그대로 보존한다. 프로젝트가 지워져 걸 곳이 없는 카드는 건너뛴다.
  insert into board.board_cards (id, project_id, list, text, due, labs, owners, position, created_by, updated_by)
  select (c.val->>'id')::bigint, c.val->>'proj', coalesce((c.val->>'list')::int, 0),
         coalesce(c.val->>'text', ''), coalesce(c.val->>'due', ''),
         array(select jsonb_array_elements_text(c.val->'labs')),
         array(select jsonb_array_elements_text(c.val->'owners')),
         c.ord::int - 1, writer, writer
  from jsonb_array_elements(doc->'cards') with ordinality as c(val, ord)
  where c.val->>'id' ~ '^[0-9]{1,15}$'
    and exists (select 1 from board.board_projects x where x.id = c.val->>'proj');

  -- 옛 JSON 가져오기로 숫자가 아닌 id가 섞인 카드는 새 숫자 id를 받는다 (유실 방지)
  select coalesce(max(id), 99) into next_card_id from board.board_cards;

  insert into board.board_cards (id, project_id, list, text, due, labs, owners, position, created_by, updated_by)
  select next_card_id + row_number() over (order by c.ord), c.val->>'proj',
         coalesce((c.val->>'list')::int, 0), coalesce(c.val->>'text', ''), coalesce(c.val->>'due', ''),
         array(select jsonb_array_elements_text(c.val->'labs')),
         array(select jsonb_array_elements_text(c.val->'owners')),
         c.ord::int - 1, writer, writer
  from jsonb_array_elements(doc->'cards') with ordinality as c(val, ord)
  where not (c.val->>'id' ~ '^[0-9]{1,15}$')
    and exists (select 1 from board.board_projects x where x.id = c.val->>'proj');

  insert into board.board_meta (id, created_by, updated_by)
  values ('main', writer, writer)
  on conflict (id) do nothing;
end;
$$;

-- 카드 번호 시퀀스를 현재 최댓값 뒤로 맞춘다 (이관·기존 데이터 반영, 뒤로는 안 돌아간다).
-- 99가 바닥이므로 첫 발급 번호는 100부터다.
select setval('board.board_card_id_seq',
  greatest(coalesce((select max(id) from board.board_cards), 99),
           (select last_value from board.board_card_id_seq)));

-- public에 남은 옛 함수 정리 (트리거는 위에서 모두 board.* 함수로 다시 만들었다)
drop function if exists public.handle_new_user();
drop function if exists public.set_updated_at();
drop function if exists public.board_next_card_id();
