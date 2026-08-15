-- Tạo bảng game_sessions trên Supabase
-- Chạy file này trong Supabase Dashboard -> SQL Editor -> New query -> Run

create table if not exists public.game_sessions (
    id uuid primary key default gen_random_uuid(),
    student_name text not null,
    progress integer default 0,
    energy integer default 100,
    money integer default 320000,
    trait_can integer default 0,
    trait_kiem integer default 0,
    trait_liem integer default 0,
    trait_chinh integer default 0,
    primary_title text,
    hidden_achievements jsonb default '[]'::jsonb,
    decisions jsonb default '[]'::jsonb,
    created_at timestamptz not null default now()
);

-- Bật Row Level Security
alter table public.game_sessions enable row level security;

-- Cho phép INSERT (anonymously) từ ứng dụng web - đủ để ghi điểm số
create policy "Cho phep insert an danh" on public.game_sessions
    for insert to anon
    with check (true);

-- Cho phép SELECT (đọc bảng xếp hạng)
create policy "Cho phep select an danh" on public.game_sessions
    for select to anon
    using (true);
