-- 제작 현황판(/board) Supabase 스키마
-- Supabase 대시보드 > SQL Editor에서 실행한다.
--
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
create policy "authenticated can select" on public.board
  for select to authenticated using (true);

create policy "authenticated can insert" on public.board
  for insert to authenticated with check (true);

create policy "authenticated can update" on public.board
  for update to authenticated using (true) with check (true);
