# SPEC 06 — Daycares table migration with RLS and seed data

> **Status:** Implemented
> **Depends on:** None
> **Date:** 2026-08-12
> **Objective:** Create the `daycares` table in Supabase via migration pattern, enable UUID generation, apply Row Level Security policies, and seed four initial daycare records.

## Scope

**In:**

- Migration file to create `daycares` table with columns: `id` (uuid PK, default `gen_random_uuid()`), `name` (text, not null), `created_at` (timestamptz, default `now()`).
- Ensure `gen_random_uuid()` is available (enable `pgcrypto` extension if not already enabled).
- Enable Row Level Security (RLS) on the `daycares` table.
- Create RLS policies:
  - `daycares_select_policy`: authenticated users can SELECT all daycares.
  - `daycares_insert_policy`: only users with `role = 'admin'` can INSERT.
  - `daycares_update_policy`: only users with `role = 'admin'` can UPDATE.
  - `daycares_delete_policy`: only users with `role = 'admin'` can DELETE.
- Seed data migration to insert four initial daycare records (e.g. "Guardería Sala Soles", "Guardería Lunas", "Guardería Estrellitas", "Guardería Arcoíris").
- Apply migration via `supabase_apply_migration`.
- Verify with `supabase_get_advisors` (security) to catch missing RLS policies.

**Out of scope (for future specs):**

- UI for managing daycares (CRUD interface).
- Other tables from the schema (`users`, `rooms`, `children`, etc.) — each will have their own spec.
- Foreign key relationships from other tables to `daycares`.
- Admin role assignment or user management.
- Soft delete or archival logic for daycares.

## Data model

**Table: `daycares`**

| Column     | Type          | Constraints                        |
| ---------- | ------------- | ---------------------------------- |
| `id`       | `uuid`        | PK, default `gen_random_uuid()`    |
| `name`     | `text`        | NOT NULL                           |
| `created_at` | `timestamptz` | NOT NULL, default `now()`        |

**Convención de idioma:** Database objects (tables, columns, enums) in **English**. Seed data values (daycare names) in **Spanish** to match the UI.

## Implementation plan

1. Enable `pgcrypto` extension (if not already enabled) to ensure `gen_random_uuid()` is available.
2. Create migration file `supabase/migrations/YYYYMMDDHHMMSS_create_daycares_table.sql` with:
   - `CREATE EXTENSION IF NOT EXISTS pgcrypto;`
   - `CREATE TABLE daycares (...)` with columns and constraints.
   - `ALTER TABLE daycares ENABLE ROW LEVEL SECURITY;`
   - RLS policies for SELECT (all authenticated), INSERT/UPDATE/DELETE (admin role only).
3. Create seed data migration `supabase/migrations/YYYYMMDDHHMMSS_seed_daycares.sql` with:
   - `INSERT INTO daycares (name) VALUES (...)` for four daycares.
   - Use `ON CONFLICT DO NOTHING` pattern or check for existing records to avoid duplicates on re-run.
4. Apply migrations via `supabase_apply_migration` (one call per migration file).
5. Run `supabase_get_advisors` with type `security` to verify RLS policies are properly configured.
6. Verify table exists and seed data is present via `supabase_execute_sql` (SELECT count(*) FROM daycares).

## Acceptance criteria

- [x] `pgcrypto` extension is enabled (or `gen_random_uuid()` is available).
- [x] `daycares` table exists in Supabase with correct columns (`id`, `name`, `created_at`).
- [x] `id` column uses `uuid` type with `gen_random_uuid()` default.
- [x] `name` column is `text` and NOT NULL.
- [x] `created_at` column is `timestamptz` with default `now()`.
- [x] RLS is enabled on `daycares` table.
- [x] RLS policy exists for SELECT (authenticated users).
- [x] RLS policies exist for INSERT, UPDATE, DELETE (admin role only).
- [x] Four seed daycare records exist in the table.
- [x] `supabase_get_advisors` (security) returns no warnings about missing RLS on `daycares`.
- [x] Migration files follow Supabase naming convention (timestamp prefix).
- [x] Seed migration is idempotent (safe to re-run without duplicating data).

## Decisiones tomadas y descartadas

- **Migration pattern via `supabase_apply_migration`** — follows project conventions for DDL operations.
- **RLS included in same spec** — security is critical from day one; deferring RLS would leave the table unprotected.
- **Admin-only write access** — only admins should create/update/delete daycares; all authenticated users can read.
- **Seed data in separate migration** — keeps DDL and data migrations separate for clarity and reusability.
- **Four seed daycares in Spanish** — matches the UI language convention from the schema doc.
- **`pgcrypto` extension** — ensures `gen_random_uuid()` is available across Postgres versions.
- **Descartado:** UI CRUD, other tables, foreign keys, soft delete — these belong in future specs.

## Riesgos identificados

- **RLS policy with admin role check**: the policy references `users.role = 'admin'`, but the `users` table may not exist yet. If `users` table is not created, the RLS policy will fail. **Mitigation:** ensure this spec runs after `users` table is created, or use a simpler policy (e.g., check against `auth.users` metadata) for now.
- **Seed data idempotency**: if the migration runs multiple times, it should not duplicate records. **Mitigation:** use `INSERT ... ON CONFLICT DO NOTHING` or check for existing records by name.
- **Extension conflicts**: `pgcrypto` may already be enabled in Supabase by default. **Mitigation:** use `CREATE EXTENSION IF NOT EXISTS` to avoid errors.
