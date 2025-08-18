-- Enable Row Level Security (RLS) on public tables
-- This addresses warnings about public tables without RLS in PostgREST/Supabase

-- contributors
ALTER TABLE public.contributors ENABLE ROW LEVEL SECURITY;

-- tutoring_records
ALTER TABLE public.tutoring_records ENABLE ROW LEVEL SECURITY; 