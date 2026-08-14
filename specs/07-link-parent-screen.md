# SPEC 07 — Vincular padre modal (design only)

> **Status:** Implemented
> **Depends on:** SPEC 02
> **Date:** 2026-08-13
> **Objective:** Make the "Vincular otro padre" button in the kid profile open a modal overlay reproducing the draft from `references/pantallas/vincular-padre.dc.html`, with a purely visual form, single-select parentesco chips, a fixed invitation code, and an inert "Enviar invitación" button.

## Scope

**In:**

- New component `app/components/kids/LinkParentModal.tsx` — modal overlay reproducing the draft: header "Vincular padre" + subtitle "a {childName}", blue info box, NOMBRE DEL PADRE/MADRE input, EMAIL input, PARENTESCO chips (Mamá/Papá/Tutor), CÓDIGO DE INVITACIÓN box (fixed `7K4P9`, "Vence en 7 días"), inert "Enviar invitación" button.
- Modal opens when clicking "Vincular otro padre" in `LinkedParentsSection.tsx` (currently a `href="#"` link).
- Modal closes on: clicking the close (X) button, clicking outside the card (backdrop), pressing Escape key.
- Close (X) button in the header just closes the modal (no navigation needed — the profile stays underneath).
- Parentesco chips: single-select visual toggle, Mamá selected by default (blue style).
- Kid profiles extracted to a shared module so the child name resolves dynamically.

**Out of scope (for future specs):**

- Real invitation creation, DB tables (`invitations`, `parent_children`), email sending.
- Code generation/expiry logic.
- Activation flow integration (SPEC 03 `/activate` remains visual).
- Form validation and error states.
- Mobile responsive.
- Editing/removing linked parents.

## Data model

No new data structures or DB changes. Minor refactor: extract the `KidProfile` type + `PROFILES` constant from `app/kids/[id]/page.tsx` into a shared module (e.g. `app/data/kids.ts`) reused by the profile and other kid-related routes.

**Convención de idioma:** Internal types/props/files in English; user-visible text in Spanish (matching drafts).

## Implementation plan

1. Extract kid profiles into a shared module (`app/data/kids.ts`: `KidProfile` type, `PROFILES`, lookup helper); update `app/kids/[id]/page.tsx` to import it.
2. Create `app/components/kids/LinkParentModal.tsx` — modal overlay (backdrop + centered card) with `isOpen` / `onClose` / `childName` props, matching the draft layout. Header close (X) button, backdrop click, and Escape close the modal. Chip state (`useState`, Mamá default, single-select).
3. Modify `LinkedParentsSection.tsx` — convert to client component, replace the "Vincular otro padre" link with a button that opens the modal; pass `childName` prop.
4. Update `app/kids/[id]/page.tsx` — pass `childName={profile.name}` to `LinkedParentsSection`.
5. Verify `npm run lint`, `npx tsc --noEmit`, `npm run build`.
6. Manual: open modal from Mateo profile; verify layout, chips, close mechanisms; visual comparison vs `vincular-padre.dc.html`.

## Acceptance criteria

- [x] Clicking "Vincular otro padre" on the kid profile opens the modal overlay.
- [x] Modal card matches the draft (header, subtitle "a {child name}", info box, fields, spacing, colors, border-radius).
- [x] Header shows "Vincular padre" (Fredoka) and subtitle "a {child name}".
- [x] Info box shows "Le enviaremos un correo con un código para que active su cuenta. Solo verá el feed de {child name}."
- [x] NOMBRE input placeholder "Ej. Diego Fernández"; EMAIL input placeholder "correo@ejemplo.com".
- [x] PARENTESCO chips single-select; Mamá selected by default (blue style); only one selected at a time.
- [x] CÓDIGO DE INVITACIÓN box shows fixed `7K4P9` and "Vence en 7 días".
- [x] "Enviar invitación" button is inert.
- [x] Close (X) button closes the modal.
- [x] Clicking on the backdrop (outside the card) closes the modal.
- [x] Pressing Escape closes the modal.
- [x] `npm run lint`, `npx tsc --noEmit`, `npm run build` pass.

## Decisiones tomadas y descartadas

- **Design-only** — reproduces the modal visually; "Enviar invitación" inert (matches SPEC 03/04/05 pattern). Real invitation logic (BD + email) deserves its own functional spec.
- **Modal overlay, no ruta** — follows the SPEC 04/05 pattern; the draft is a full screen but a modal keeps the user on the kid profile, matching how "Agregar niño" and "Nueva publicación" behave. Decisión confirmada por el usuario (se revirtió la ruta propia inicial).
- **Código fijo `7K4P9`** — faithful to the draft; no generation logic.
- **Chips single-select visual** — Mamá default, toggleable, no persistence.
- **Shared kid data module** — avoids duplicating PROFILES; needed to resolve the child name dynamically.
- **Tres mecanismos de cierre** — botón X, click fuera del modal y Escape (convención de SPEC 04/05).
- **Descartado:** functional invitations, DB tables, email, code generation, activation integration, mobile responsive, form validation.

## Riesgos identificados

- **Modal z-index and layering** — ensure the modal renders above the sidebar and all page content; use a high `z-index` for backdrop and card.
- **Escape key handler** — attach only when open and remove on close (useEffect with cleanup) to avoid interfering with other shortcuts.
- **Backdrop click vs card click** — only clicks on the backdrop close the modal; clicks on the card itself must not.
- **Refactor de datos compartidos** — extracting PROFILES must not break `/kids/[id]`; run the existing pages after the change.
- **Código fijo vs "Vence en 7 días"** — the hardcoded code contradicts the expiry text; acceptable since design-only, resolved in the functional spec.
