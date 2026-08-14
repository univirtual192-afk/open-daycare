-- Fix users SELECT RLS policies to avoid infinite recursion (42P17)
-- The previous staff/parent SELECT policies referenced the users table in a
-- subquery (e.g. `daycare_id = (SELECT daycare_id FROM users WHERE id = auth.uid())`),
-- which caused Postgres to raise "infinite recursion detected in policy for
-- relation users" and PostgREST to return HTTP 500 on any SELECT.

DROP POLICY IF EXISTS users_select_policy_staff ON users;
DROP POLICY IF EXISTS users_select_policy_parent ON users;

DROP POLICY IF EXISTS users_select_policy_self ON users;
CREATE POLICY users_select_policy_self ON users
    FOR SELECT
    TO authenticated
    USING (id = auth.uid());
