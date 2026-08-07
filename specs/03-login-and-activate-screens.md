# SPEC 03 — Login and activate account screens (staff only, design only)

> **State:** Aprobado
> **Depends on:** —
> **Date:** 2026-08-07
> **Objective:** Implement the login (`/login`) and activate account (`/activate`) screens from the reference drafts as separate Next.js routes with purely visual forms, removing the staff/family role picker, with working `<Link>` navigation between the two screens.

## Scope

**In:**

- Route `app/login/page.tsx` rendering the login screen: two-column layout with branded left panel (gradient, logo, tagline) and right panel with login form (email, password, "Iniciar sesión" button, link to activate account).
- Route `app/activate/page.tsx` rendering the activate account screen: centered card with logo, welcome text, child info bar, pre-filled visual fields (invitation code, email, password), photo authorization checkbox, "Activar mi cuenta" button, link back to login.
- Components under `app/components/auth/`:
  - `LoginForm.tsx` — email input, password input, "¿Olvidaste tu contraseña?" link, "Iniciar sesión" button.
  - `ActivateForm.tsx` — invitation code, email, password inputs, photo authorization checkbox, "Activar mi cuenta" button.
  - `BrandPanel.tsx` — left panel with gradient background, decorative circles, logo with sun icon, "OpenDayCare" brand, tagline, footer text.
- Reuse `Avatar` from `app/components/feed/Avatar.tsx` for the child avatar on activate screen.
- Working Next.js `<Link>` navigation between `/login` and `/activate`.
- Hover/transition styles matching the drafts.
- Iconos SVG inline copied from the drafts.
- All form fields are purely visual (no state management, no validation, no submission).

**Out of scope (for future specs):**

- Authentication logic or session management.
- Role picker (staff/family selection) — explicitly removed.
- Form validation or error states.
- Password reset flow ("¿Olvidaste tu contraseña?" is inert).
- Real activation or invitation code validation.
- Database, persistence, or API calls.
- Responsivo mobile — defer to a later spec.

## Data model

No new data structures introduced. All fields are pre-filled visual values matching the draft. No state management needed.

**Convención de idioma:** Internal types, props, variables, and file names in **English**. User-visible labels and text in **Spanish** (matching the drafts).

## Implementation plan

1. Create `app/components/auth/BrandPanel.tsx` — left panel with gradient background, decorative circles, logo with sun icon, "OpenDayCare" brand, tagline "El día de cada niño, compartido con su familia.", description text, and footer "🌿 Guardería Sala Soles".
2. Create `app/components/auth/LoginForm.tsx` — "Iniciar sesión" heading, subtitle, email input (pre-filled `caro@opendaycare.com`), password input (placeholder dots), "¿Olvidaste tu contraseña?" link (inert), "Iniciar sesión" button (visual only), and footer link to activate account.
3. Create `app/login/page.tsx` — two-column layout combining `BrandPanel` and `LoginForm`.
4. Create `app/components/auth/ActivateForm.tsx` — logo icon, "Bienvenida a OpenDayCare" heading, subtitle, child info bar (avatar "M" + "Mateo · Sala Soles"), invitation code input (`7K4P9`), email input (`lucia.fernandez@gmail.com`), password input (pre-filled visual), photo authorization checkbox (checked), "Activar mi cuenta" button (visual only), and footer link to login.
5. Create `app/activate/page.tsx` — centered layout with `ActivateForm`.
6. Verify `npm run lint`, `npx tsc --noEmit`, `npm run build`.
7. Visual comparison against `references/pantallas/login.dc.html` and `references/pantallas/activar-cuenta.dc.html`.

## Acceptance criteria

- [ ] `/login` renders two-column layout matching draft (brand panel + form).
- [ ] Brand panel matches draft (gradient, circles, logo, tagline, footer).
- [ ] Login form has email and password inputs, "¿Olvidaste tu contraseña?" link, and "Iniciar sesión" button.
- [ ] Role picker buttons (Personal/Familia) are **not** present.
- [ ] Login form footer has link to `/activate` ("¿Te invitó la guardería? Activá tu cuenta").
- [ ] `/activate` renders centered card matching draft.
- [ ] Activate form shows child info bar with avatar "M" and "Mateo · Sala Soles".
- [ ] All fields are pre-filled visually (code `7K4P9`, email, password).
- [ ] Photo authorization checkbox is shown as checked.
- [ ] Activate form footer has link to `/login` ("¿Ya tenés cuenta? Iniciar sesión").
- [ ] `<Link>` navigation works between `/login` and `/activate`.
- [ ] All buttons and links are purely visual (no actions, no validation).
- [ ] Shared `Avatar` component reused for child avatar.
- [ ] `npm run lint` passes without errors.
- [ ] `npx tsc --noEmit` passes without errors.
- [ ] `npm run build` passes without errors.

## Decisiones tomadas y descartadas

- **Role picker removed** — user explicitly requested no staff/family selection; login is staff-only.
- **All forms purely visual** — no state, validation, or submission logic (follows SPEC 01 and SPEC 02 pattern).
- **Pre-filled fields as draft values** — email `caro@opendaycare.com` on login, `7K4P9` / `lucia.fernandez@gmail.com` on activate.
- **Working `<Link>` navigation** — only functional interaction between the two screens.
- **Shared Avatar component** — reuse from feed, no duplication.
- **Descartado:** mobile responsive, auth logic, form validation, password reset, real activation.

## Riesgos identificados

- **Pixel-perfect en Tailwind v4**: el draft incluye valores muy específicos (gradientes, radios 14px/15px/18px, sombras custom). Usar `[...]` arbitrarias o `style={{}}` inline para coincidir exactamente.
- **Two-column layout on login**: el draft usa `display:grid;grid-template-columns:1.05fr 1fr` — replicar con Tailwind flex/grid utilities o estilos inline.
- **Checkbox visual**: el draft muestra un checkbox custom con check SVG — replicar visualmente sin input real.
