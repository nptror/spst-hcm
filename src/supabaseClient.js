import { createClient } from '@supabase/supabase-js'

// Cấu hình từ Project Settings -> API trên Supabase Dashboard.
// Tạo file .env (sao chép từ .env.example) và điền URL + anon key thực tế.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null

if (!isSupabaseConfigured) {
    console.warn(
        'Thiếu VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY trong file .env — trò chơi vẫn chạy nhưng bỏ qua lưu lên Supabase.'
    )
}
