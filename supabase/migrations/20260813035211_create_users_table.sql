-- Create users table with RLS policies

CREATE TABLE users (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    daycare_id uuid REFERENCES daycares(id),
    role user_role NOT NULL,
    status user_status NOT NULL DEFAULT 'active',
    full_name text NOT NULL,
    avatar_url text,
    notify_on_post boolean NOT NULL DEFAULT true,
    daily_summary_enabled boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Any authenticated user can SELECT their own row.
-- NOTE: staff/parent policies referencing the users table in a subquery caused
-- infinite recursion (42P17); a single self-select policy avoids this.
CREATE POLICY users_select_policy_self ON users
    FOR SELECT
    TO authenticated
    USING (id = auth.uid());

-- Deny direct INSERT (only trigger can insert via SECURITY DEFINER)
CREATE POLICY users_insert_policy ON users
    FOR INSERT
    TO authenticated
    WITH CHECK (false);

-- Users can UPDATE only their own row
CREATE POLICY users_update_policy_self ON users
    FOR UPDATE
    TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Admin can UPDATE any user in their daycare
CREATE POLICY users_update_policy_admin ON users
    FOR UPDATE
    TO authenticated
    USING (
        role = 'admin'
        AND daycare_id = (SELECT daycare_id FROM users WHERE id = auth.uid())
    )
    WITH CHECK (
        daycare_id = (SELECT daycare_id FROM users WHERE id = auth.uid())
    );
