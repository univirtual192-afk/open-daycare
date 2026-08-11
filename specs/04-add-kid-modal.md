# SPEC 04 — Add kid modal on /kids (design only)

> **Status:** Implementado
> **Depends on:** SPEC 02
> **Date:** 2026-08-07
> **Objective:** Add a visual overlay modal to the `/kids` page that opens when clicking "Agregar niño", reproducing the form layout from `references/pantallas/agregar-nino.dc.html` with required/optional field indicators, closing on "Cancelar", click outside, or Escape, with purely visual fields and inert "Guardar" button.

## Scope

**In:**

- Component `app/components/kids/AddKidModal.tsx` — modal overlay reproducing the draft: card with header ("Cancelar" / "Agregar niño" / "Guardar"), form fields (full name, birth date, room dropdown, allergies, medical notes), with required indicators on name/birth date/room and optional labels on allergies/medical notes.
- Modal opens when clicking the existing "Agregar niño" button on `/kids/page.tsx`.
- Modal closes on: clicking "Cancelar", clicking outside the card, pressing Escape key.
- Visual indicators for required fields (e.g. asterisk `*` or "OBLIGATORIO" label) and optional fields (e.g. "(opcional)").
- Birth date input shows placeholder `dd/mm/aaaa` matching the draft format.
- Room dropdown shows multiple rooms (e.g. "Soles", "Lunas", "Estrellas") with "Soles" as default selected, matching the draft's dropdown visual with chevron icon.
- All fields are purely visual (no state management, no validation, no submission) — follows SPEC 01/SPEC 02/SPEC 03 pattern.
- "Guardar" button is inert (visual only, no action).
- Hover/transition styles matching the drafts.
- Iconos SVG inline copied from the drafts.

**Out of scope (for future specs):**

- Form validation logic (required field enforcement, date format validation).
- Actual kid creation or adding to the list.
- Persistence or database calls.
- API submission or error states.
- Responsivo mobile — defer to a later spec.
- Edit functionality for existing kids.

## Data model

No new data structures introduced. All fields are purely visual with placeholder/pre-filled values matching the draft. No state management beyond the modal open/close boolean.

**Convención de idioma:** Internal types, props, variables, and file names in **English**. User-visible labels and text in **Spanish** (matching the drafts).

## Implementation plan

1. Create `app/components/kids/AddKidModal.tsx` — modal overlay with backdrop, centered card matching the draft layout:
   - Header bar: "Cancelar" link (left), "Agregar niño" title (center), "Guardar" link (right, orange).
   - Full name input with "NOMBRE COMPLETO *" label and placeholder "Ej. Martina López".
   - Birth date input with "FECHA DE NACIMIENTO *" label and placeholder `dd/mm/aaaa`.
   - Room dropdown with "SALA *" label, showing "Soles" selected with chevron SVG.
   - Allergies input with "ALERGIAS (ETIQUETAS) (opcional)" label and placeholder "Ej. Maní, Lactosa".
   - Medical notes textarea with "NOTAS MÉDICAS (opcional)" label and placeholder "Indicaciones, medicación, contactos…".
   - Props: `isOpen: boolean`, `onClose: () => void`.
   - Backdrop click closes modal.
   - Escape key handler closes modal.
2. Modify `app/kids/page.tsx`:
   - Add `useState<boolean>` for modal open state.
   - Wire "Agregar niño" button `onClick` to set state `true`.
   - Render `<AddKidModal isOpen={open} onClose={() => setOpen(false)} />`.
3. Verify `npm run lint`, `npx tsc --noEmit`, `npm run build`.
4. Visual comparison against `references/pantallas/agregar-nino.dc.html`.

## Acceptance criteria

- [x] Clicking "Agregar niño" button on `/kids` opens the modal overlay.
- [x] Modal card matches draft layout (header, fields, spacing, colors, border-radius).
- [x] Header shows "Cancelar" (left), "Agregar niño" (center), "Guardar" (right, orange).
- [x] Full name field has label "NOMBRE COMPLETO *" and placeholder "Ej. Martina López".
- [x] Birth date field has label "FECHA DE NACIMIENTO *" and placeholder `dd/mm/aaaa`.
- [x] Room dropdown has label "SALA *", shows "Soles" selected, includes chevron SVG icon.
- [x] Allergies field has label "ALERGIAS (ETIQUETAS) (opcional)" and placeholder "Ej. Maní, Lactosa".
- [x] Medical notes textarea has label "NOTAS MÉDICAS (opcional)" and placeholder "Indicaciones, medicación, contactos…".
- [x] Required fields (name, birth date, room) show visual required indicator (`*`).
- [x] Optional fields (allergies, medical notes) show "(opcional)" indicator.
- [x] Clicking "Cancelar" closes the modal.
- [x] Clicking outside the modal card (on backdrop) closes the modal.
- [x] Pressing Escape key closes the modal.
- [x] "Guardar" button is inert (no action, no validation, no submission).
- [x] All form fields are purely visual (no state, no validation logic).
- [x] `npm run lint` passes without errors.
- [x] `npx tsc --noEmit` passes without errors.
- [x] `npm run build` passes without errors.

## Decisiones tomadas y descartadas

- **Modal overlay, not separate route** — user explicitly requested modal on `/kids` page despite draft being a standalone page.
- **All fields purely visual** — no validation, no state management, no submission logic (follows SPEC 01, SPEC 02, SPEC 03 pattern).
- **Required/optional indicators are visual only** — asterisks and "(opcional)" labels shown, but no enforcement logic.
- **Three close mechanisms** — "Cancelar" link, backdrop click, Escape key for UX convenience.
- **Room dropdown with multiple rooms** — "Soles", "Lunas", "Estrellas" as options, "Soles" default.
- **Descartado:** validation logic, actual kid creation, persistence, mobile responsive, edit functionality.

## Riesgos identificados

- **Modal z-index and layering**: ensure modal renders above the sidebar and all page content. Use a high `z-index` (e.g. `z-50` or higher) for the backdrop and card.
- **Escape key handler**: must be attached only when modal is open and removed on close to avoid interfering with other keyboard shortcuts. Use `useEffect` with cleanup.
- **Pixel-perfect en Tailwind v4**: el draft incluye valores muy específicos (radios 14px/24px, sombras custom, bordes 1.5px). Usar `[...]` arbitrarias o `style={{}}` inline para coincidir exactamente.
- **Backdrop click vs card click**: ensure click on the card itself does not trigger close — only clicks on the backdrop area.
