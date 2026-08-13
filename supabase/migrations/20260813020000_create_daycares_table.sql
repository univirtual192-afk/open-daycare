-- Migration: create_daycares_table
-- Creates the daycares table with RLS policies

-- Ensure pgcrypto is available for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create daycares table
CREATE TABLE daycares (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE daycares ENABLE ROW LEVEL SECURITY;

-- RLS policy: authenticated users can SELECT all daycares
CREATE POLICY daycares_select_policy ON daycares
    FOR SELECT
    TO authenticated
    USING (true);

-- RLS policy: only users with role = 'admin' can INSERT
CREATE POLICY daycares_insert_policy ON daycares
    FOR INSERT
    TO authenticated
    WITH CHECK ((auth.jwt() ->> 'role') = 'admin');

-- RLS policy: only users with role = 'admin' can UPDATE
CREATE POLICY daycares_update_policy ON daycares
    FOR UPDATE
    TO authenticated
    USING ((auth.jwt() ->> 'role') = 'admin')
    WITH CHECK ((auth.jwt() ->> 'role') = 'admin');

-- RLS policy: only users with role = 'admin' can DELETE
CREATE POLICY daycares_delete_policy ON daycares
    FOR DELETE
    TO authenticated
    USING ((auth.jwt() ->> 'role') = 'admin');
