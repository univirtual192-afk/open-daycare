# SPEC 06 — Authentication and route protection (email/password with Supabase)

> **State:** Approved
> **Depends on:** SPEC 03
> **Date:** 2026-08-13
> **Objective:** Replace the visual-only login form with real Supabase email/password authentication and add middleware-based route protection that redirects unauthenticated users to `/login`.

## Scope

**In:**

- Real Supabase email/password sign-in on `/login` using `@supabase/ssr` client helpers.
- Sign-out action that clears the session and redirects to `/login`.
- Middleware-based route protection: all routes except `/login`, `/activate`, `_next/static`, `_next/image`, and `favicon.ico` require an active session.
- Session refresh in middleware using `supabase.auth.getSession()`.
- Auth error handling on the login form (invalid credentials, network errors).
- Loading state on the "Iniciar sesión" button during sign-in.
- Redirect authenticated users away from `/login` and `/activate` to `/` (home feed).
- Database already has `users` table, `user_role`/`user_status` enums, and `handle_new_user` trigger — no new migrations needed.

**Out of scope (for future specs):**

- Password reset flow ("¿Olvidaste tu contraseña?").
- User registration / sign-up (accounts are created via invitation only).
- Account activation logic (`/activate` remains visual-only for now).
- Session persistence across browser restarts (handled by Supabase cookies).
- Mobile responsive adjustments.
- Role-based access control beyond "authenticated vs unauthenticated".

## Data model

No new tables or columns introduced. The existing `users` table (SPEC 03 migrations) links to `auth.users` via `id uuid REFERENCES auth.users(id)`. Authentication uses Supabase's built-in `auth.users` table — no custom auth tables needed.

**Existing structures reused:**

- `auth.users` — Supabase-managed auth table (email, password hash, session).
- `public.users` — application profile table (role, status, daycare_id, etc.).
- `user_role` enum: `'staff'`, `'parent'`, `'admin'`.
- `user_status` enum: `'pending'`, `'active'`.

## Implementation plan

1. **Update `utils/supabase/middleware.ts`** — add session refresh and route protection logic:
   - Call `supabase.auth.getSession()` to refresh the session.
   - Define protected routes matcher (all routes except `/login`, `/activate`, and static assets).
   - If user is unauthenticated and tries to access a protected route, redirect to `/login`.
   - If user is authenticated and tries to access `/login` or `/activate`, redirect to `/`.

2. **Create `proxy.ts`** at project root (replaces deprecated `middleware.ts` in Next.js 16):
   - Import session logic from `utils/supabase/middleware.ts`.
   - Export a named `proxy(request: NextRequest)` function that returns `NextResponse`.
   - Export `config` with matcher pattern to exclude static assets, images, and favicon.
   - Next.js 16 requires `proxy.ts` at root (or `src/`); `middleware.ts` convention is deprecated.

3. **Update `app/login/page.tsx`** — replace visual-only form with real auth:
   - Add `'use server'` server action for `signInWithEmail(email, password)`.
   - Call `supabase.auth.signInWithPassword({ email, password })`.
   - On success, redirect to `/`.
   - On error, return error message to display on the form.
   - Add loading state during sign-in.

4. **Update `app/components/auth/LoginForm.tsx`** — wire up real form submission:
   - Replace inert button with form `onSubmit` that calls the server action.
   - Display error messages from failed sign-in attempts.
   - Show loading spinner/disabled state during submission.
   - Keep "¿Olvidaste tu contraseña?" link inert (out of scope).

5. **Create `app/actions/auth.ts`** — server actions for authentication:
   - `signInWithEmail(email: string, password: string)` — calls `supabase.auth.signInWithPassword`.
   - `signOut()` — calls `supabase.auth.signOut` and redirects to `/login`.
   - Use `utils/supabase/server.ts` to create the Supabase client.

6. **Add sign-out button** — somewhere accessible (e.g., header or user menu) that calls the `signOut` server action.

7. **Verify `npm run lint`, `npx tsc --noEmit`, `npm run build`**.

8. **Test manually**:
   - Unauthenticated user visits `/` → redirected to `/login`.
   - Valid credentials on `/login` → redirected to `/`.
   - Invalid credentials on `/login` → error message displayed.
   - Authenticated user visits `/login` → redirected to `/`.
   - Sign-out → redirected to `/login`.

## Acceptance criteria

- [ ] `proxy.ts` exists at project root and protects all routes except `/login`, `/activate`, and static assets.
- [ ] Unauthenticated user accessing any protected route is redirected to `/login`.
- [ ] Authenticated user accessing `/login` or `/activate` is redirected to `/`.
- [ ] Session is refreshed on every navigation via middleware.
- [ ] Login form calls `supabase.auth.signInWithPassword` with email and password.
- [ ] Successful login redirects to `/` (home feed).
- [ ] Failed login displays an error message on the form (e.g., "Invalid email or password").
- [ ] Login button shows loading state during sign-in (disabled + spinner).
- [ ] `signOut()` server action exists and clears the session.
- [ ] Sign-out redirects to `/login`.
- [ ] No new database migrations required (uses existing `auth.users` + `public.users`).
- [ ] `npm run lint` passes without errors.
- [ ] `npx tsc --noEmit` passes without errors.
- [ ] `npm run build` passes without errors.

## Decisiones tomadas y descartadas

- **Email/password only** — user explicitly requested no social logins, magic links, or OTP. Supabase's `signInWithPassword` is the only auth method used.
- **proxy.ts en lugar de middleware.ts** — Next.js 16 deprecó `middleware.ts` y lo renombró a `proxy.ts`. El archivo debe estar en la raíz del proyecto (o bajo `src/`) y exportar una función `proxy(request: NextRequest)`.
- **Server actions for auth** — using Next.js server actions (`'use server'`) instead of client-side API calls keeps credentials server-side and follows the project's existing pattern.
- **No new migrations** — the database already has `users` table, enums, and trigger from previous specs. Supabase's `auth.users` table is managed by Supabase itself.
- **Redirect authenticated users from `/login`** — prevents logged-in users from seeing the login screen again.
- **Descartado:** password reset, user registration, role-based access control, mobile responsive — deferred to future specs.

## Riesgos identificados

- **Cookie handling in proxy**: Supabase SSR requires careful cookie management (`getAll`/`setAll`). The existing `utils/supabase/middleware.ts` already has this pattern — ensure it is extended correctly with session refresh and used from `proxy.ts`.
- **Infinite redirect loops**: If proxy logic is incorrect (e.g., protecting `/login` itself), users could get stuck in a redirect loop. Test thoroughly with both authenticated and unauthenticated states.
- **Next.js 16 deprecation warning**: If `middleware.ts` is created instead of `proxy.ts`, the build will show a deprecation warning. Use `npx @next/codemod@canary middleware-to-proxy .` to auto-migrate if needed.
- **Server Component vs Client Component auth**: Server Components cannot call `supabase.auth.getSession()` directly — they must use the cookie-based client from `utils/supabase/server.ts`. Client Components need the browser client from `utils/supabase/client.ts`. Keep this separation clear.
- **Error messages in Spanish**: User-facing error messages must be in Spanish (matching the app's language), but internal code/variables remain in English.
