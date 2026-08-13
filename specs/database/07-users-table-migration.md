# SPEC 07 — Users table migration with enums, RLS, auth trigger, and seed staff user

> **Status:** Implemented
> **Depends on:** SPEC 06
> **Date:** 2026-08-12
> **Objective:** Create the `users` table with Postgres enums (`user_role`, `user_status`), an `AFTER INSERT` trigger on `auth.users` to auto-create domain user rows, Row Level Security policies (staff sees all users in their daycare, parents see only their own row), and seed a staff user for testing via Supabase Auth API.

## Scope

**In:**

- Migration to create Postgres enums: `user_role` (`staff`, `parent`, `admin`) and `user_status` (`pending`, `active`).
- Migration to create `users` table with columns: `id` (uuid PK, FK → `auth.users(id)` ON DELETE CASCADE), `daycare_id` (uuid FK → `daycares(id)`), `role` (`user_role`), `status` (`user_status`, default `active`), `full_name` (text), `avatar_url` (text, nullable), `notify_on_post` (boolean, default `true`), `daily_summary_enabled` (boolean, default `true`), `created_at` / `updated_at` (timestamptz).
- Create `SECURITY DEFINER` function `handle_new_user()` that runs `AFTER INSERT` on `auth.users`, reading `daycare_id`, `role`, and `full_name` from `raw_user_meta_data` to insert into `users`.
- Create trigger `on_auth_user_created` on `auth.users` to call `handle_new_user()`.
- Enable Row Level Security (RLS) on `users` table.
- Create RLS policies:
  - `users_select_policy_staff`: users with `role = 'staff'` or `role = 'admin'` can SELECT all users in their own `daycare_id`.
  - `users_select_policy_parent`: users with `role = 'parent'` can SELECT only their own row (`id = auth.uid()`).
  - `users_insert_policy`: only the trigger (via `SECURITY DEFINER`) can INSERT — no direct user INSERT.
  - `users_update_policy_self`: users can UPDATE only their own row.
  - `users_update_policy_admin`: users with `role = 'admin'` can UPDATE any user in their daycare.
- Seed a staff user for testing: create via Supabase Auth API (signup with email/password + `raw_user_meta_data` containing `daycare_id`, `role`, `full_name`), letting the trigger create the `users` row automatically.
- Apply migrations via `supabase_apply_migration`.
- Run `supabase_get_advisors` (security) to verify RLS policies.

**Out of scope (for future specs):**

- UI for user management (CRUD interface).
- Other tables from the schema (`rooms`, `children`, `parent_children`, `invitations`, `posts`, etc.).
- Admin role assignment or user management UI.
- Soft delete or archival logic for users.
- Push notification devices table.

## Data model

**Enum: `user_role`**

| Value     | Description              |
| --------- | ------------------------ |
| `staff`   | Staff member (teacher)   |
| `parent`  | Parent / guardian        |
| `admin`   | Admin user               |

**Enum: `user_status`**

| Value     | Description              |
| --------- | ------------------------ |
| `pending` | User has been invited but not yet activated |
| `active`  | User is active           |

**Table: `users`**

| Column                    | Type              | Constraints                                      |
| ------------------------- | ----------------- | ------------------------------------------------ |
| `id`                      | `uuid`            | PK, FK → `auth.users(id)` ON DELETE CASCADE      |
| `daycare_id`              | `uuid`            | FK → `daycares(id)`                              |
| `role`                    | `user_role`       | NOT NULL                                         |
| `status`                  | `user_status`     | NOT NULL, default `active`                       |
| `full_name`               | `text`            | NOT NULL                                         |
| `avatar_url`              | `text`            | Nullable                                         |
| `notify_on_post`          | `boolean`         | NOT NULL, default `true`                         |
| `daily_summary_enabled`   | `boolean`         | NOT NULL, default `true`                         |
| `created_at`              | `timestamptz`     | NOT NULL, default `now()`                        |
| `updated_at`              | `timestamptz`     | NOT NULL, default `now()`                        |

**Convención de idioma:** Database objects (tables, columns, enums) in **English**. Seed data values (user names) in **Spanish** to match the UI.

## Implementation plan

1. Create migration file `supabase/migrations/YYYYMMDDHHMMSS_create_user_enums.sql` with:
   - `CREATE TYPE user_role AS ENUM ('staff', 'parent', 'admin');`
   - `CREATE TYPE user_status AS ENUM ('pending', 'active');`

2. Create migration file `supabase/migrations/YYYYMMDDHHMMSS_create_users_table.sql` with:
   - `CREATE TABLE users (...)` with all columns and constraints.
   - `ALTER TABLE users ENABLE ROW LEVEL SECURITY;`
   - RLS policies:
     - `users_select_policy_staff`: staff/admin can SELECT users where `daycare_id` matches their own.
     - `users_select_policy_parent`: parents can SELECT only where `id = auth.uid()`.
     - `users_insert_policy`: deny direct INSERT (only trigger can insert).
     - `users_update_policy_self`: users can UPDATE their own row.
     - `users_update_policy_admin`: admin can UPDATE any user in their daycare.

3. Create migration file `supabase/migrations/YYYYMMDDHHMMSS_create_auth_user_trigger.sql` with:
   - `CREATE OR REPLACE FUNCTION public.handle_new_user()` as `SECURITY DEFINER`.
   - Function reads `raw_user_meta_data` from `auth.users` for `daycare_id`, `role`, `full_name`.
   - Inserts into `users` with defaults for `status`, `notify_on_post`, `daily_summary_enabled`.
   - `CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();`

4. Apply all three migrations via `supabase_apply_migration` (one call per file).

5. Run `supabase_get_advisors` with type `security` to verify RLS policies.

6. Seed staff user:
   - Use Supabase Auth API to sign up a test user with email, password, and `raw_user_meta_data` containing: `daycare_id` (one of the seeded daycare IDs from SPEC 06), `role: 'staff'`, `full_name: 'Staff Prueba'`.
   - Verify the trigger created the `users` row automatically.
   - Verify the user can be queried via `supabase_execute_sql`.

7. Run `npm run lint`, `npx tsc --noEmit`, `npm run build` to ensure no project regressions.

## Acceptance criteria

- [x] `user_role` enum exists with values `staff`, `parent`, `admin`.
- [x] `user_status` enum exists with values `pending`, `active`.
- [x] `users` table exists with all specified columns and constraints.
- [x] `id` column is FK to `auth.users(id)` with ON DELETE CASCADE.
- [x] `daycare_id` column is FK to `daycares(id)`.
- [x] `role` column uses `user_role` enum, NOT NULL.
- [x] `status` column uses `user_status` enum, NOT NULL, default `active`.
- [x] `notify_on_post` is boolean, default `true`.
- [x] `daily_summary_enabled` is boolean, default `true`.
- [x] `handle_new_user()` function exists as `SECURITY DEFINER`.
- [x] `on_auth_user_created` trigger exists on `auth.users`.
- [x] RLS is enabled on `users` table.
- [x] RLS policy exists for staff/admin to SELECT users in their daycare.
- [x] RLS policy exists for parents to SELECT only their own row.
- [x] RLS policy denies direct INSERT (only trigger can insert).
- [x] RLS policy exists for users to UPDATE their own row.
- [x] RLS policy exists for admin to UPDATE any user in their daycare.
- [x] Test staff user created via Auth API has a corresponding row in `users`.
- [x] `supabase_get_advisors` (security) returns no warnings about missing RLS on `users`.
- [x] Migration files follow Supabase naming convention (timestamp prefix).

## Decisiones tomadas y descartadas

- **Three separate migrations** (enums, table, trigger) — keeps DDL operations granular and easier to debug.
- **`SECURITY DEFINER` function for trigger** — required to insert into `users` from `auth.users` without granting direct INSERT permissions to users.
- **RLS with role-based policies** — staff sees all users in their daycare, parents only see themselves. Admin can update any user in their daycare.
- **Deny direct INSERT** — only the trigger should create `users` rows, ensuring consistency with `auth.users`.
- **Seed via Auth API** — creates a realistic user flow (signup → trigger → domain row), testing the full integration.
- **Enums in separate migration** — must exist before the table can reference them.
- **Descartado:** UI CRUD, other tables, soft delete, devices table — these belong in future specs.

## Riesgos identificados

- **Trigger failure on signup**: if `raw_user_meta_data` does not contain the expected keys (`daycare_id`, `role`, `full_name`), the trigger will fail and the signup will error. **Mitigation:** add NULL checks in the trigger function with sensible defaults or raise a clear error message.
- **RLS policy complexity**: the staff SELECT policy needs to compare `users.daycare_id` with the current user's `daycare_id`. This requires a subquery or join to `auth.uid()`. **Mitigation:** test the policy thoroughly with `supabase_execute_sql` using different user contexts.
- **Circular RLS dependency**: the `users_select_policy_staff` needs to look up the current user's `daycare_id` from the `users` table itself. If RLS is too restrictive, even the lookup may fail. **Mitigation:** ensure the policy allows the user to read their own row first, then use that `daycare_id` for the broader query.
- **Auth API seed requires network**: creating the test user via Auth API requires the Supabase project to be accessible. **Mitigation:** use the project's publishable key and service role key appropriately.
