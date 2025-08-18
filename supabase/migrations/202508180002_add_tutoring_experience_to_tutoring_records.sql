-- Add tutoring_experience to tutoring_records (non-negative, nullable)
-- Safe to re-run: guarded with IF NOT EXISTS

ALTER TABLE public.tutoring_records
  ADD COLUMN IF NOT EXISTS tutoring_experience INTEGER CHECK (tutoring_experience >= 0); 