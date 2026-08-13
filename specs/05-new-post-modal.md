# SPEC 05 — New post modal on feed (design only)

> **Status:** Approved
> **Depends on:** SPEC 01
> **Date:** 2026-08-12
> **Objective:** Add a visual overlay modal to the feed page (`/`) that opens when clicking the "Nueva publicación" button in the Sidebar, reproducing the form layout from `references/pantallas/crear-publicacion.dc.html` with PARA chips, TIPO chips, DESCRIPCIÓN textarea, and FOTOS placeholders, closing on "Cancelar", click outside, or Escape, with purely visual fields and inert "Publicar" button.

## Scope

**In:**

- Component `app/components/feed/NewPostModal.tsx` — modal overlay reproducing the draft: card with header ("Cancelar" / "Nueva publicación" / "Publicar"), PARA chips (Mateo selected, Sofía, Benjamín, "Toda la sala"), TIPO chips (Comida, Siesta, Actividad, Logro, Ánimo, Foto, Anuncio), DESCRIPCIÓN textarea (pre-filled), FOTOS section (one photo placeholder tile + one dashed "Agregar" tile).
- Modal opens when clicking the existing "Nueva publicación" button in `app/components/feed/Sidebar.tsx`.
- Modal closes on: clicking "Cancelar", clicking outside the card (backdrop), pressing Escape key.
- PARA chips: Mateo appears with dark selected style (dark bg, white text, avatar with initial "M"), Sofía/Benjamín/"Toda la sala" appear with light unselected style (light bg, muted text, avatars with initials).
- TIPO chips: all shown with their respective colored backgrounds matching the draft (Comida=olive, Siesta=purple, Actividad=teal, Logro=green, Ánimo=pink, Foto=coral, Anuncio=blue).
- DESCRIPCIÓN textarea: pre-filled text "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón." matching the draft.
- FOTOS section: one tile with photo placeholder SVG (solid border), one tile with dashed border + "+" icon + "Agregar" text.
- All fields are purely visual (no state management, no validation, no submission) — follows SPEC 01/SPEC 04 pattern.
- "Publicar" button is inert (visual only, no action).
- Hover/transition styles matching the drafts.
- Iconos SVG inline copied from the drafts.

**Out of scope (for future specs):**

- Form validation logic.
- Actual post creation or adding to the feed.
- Persistence or database calls.
- API submission or error states.
- Responsivo mobile — defer to a later spec.
- File picker functionality for "Agregar" photos.
- Chip toggling/selection logic.
- ComposerBox ("Compartí un momento…") integration — deferred.

## Data model

No new data structures introduced. All fields are purely visual with hardcoded/pre-filled values matching the draft. No state management beyond the modal open/close boolean.

**Convención de idioma:** Internal types, props, variables, and file names in **English**. User-visible labels and text in **Spanish** (matching the drafts).

## Implementation plan

1. Create `app/components/feed/NewPostModal.tsx` — modal overlay with backdrop, centered card matching the draft layout:
   - Header bar: "Cancelar" link (left, muted), "Nueva publicación" title (center, Fredoka), "Publicar" link (right, orange/red).
   - PARA section: label "PARA" (uppercase, small, muted), chips row with Mateo (selected, dark bg), Sofía (unselected, light bg + pink avatar), Benjamín (unselected, light bg + green avatar), "Toda la sala" (unselected, plain text).
   - TIPO section: label "TIPO", chips row with 7 colored buttons (Comida, Siesta, Actividad, Logro, Ánimo, Foto, Anuncio).
   - DESCRIPCIÓN section: label "DESCRIPCIÓN", textarea with pre-filled text, rounded border, white bg.
   - FOTOS section: label "FOTOS", two tiles side by side — photo placeholder (solid border, image SVG) and "Agregar" tile (dashed border, "+" SVG, text).
   - Props: `isOpen: boolean`, `onClose: () => void`.
   - Backdrop click closes modal.
   - Escape key handler closes modal (useEffect with cleanup).
2. Modify `app/page.tsx`:
   - Add `useState<boolean>` for modal open state.
   - Pass `onNewPostClick` callback to `Sidebar` via new prop.
   - Render `<NewPostModal isOpen={open} onClose={() => setOpen(false)} />` alongside existing layout.
3. Modify `app/components/feed/Sidebar.tsx`:
   - Add optional `onNewPostClick?: () => void` prop.
   - Wire "Nueva publicación" button `onClick` to call `onNewPostClick` if provided.
4. Verify `npm run lint`, `npx tsc --noEmit`, `npm run build`.
5. Visual comparison against `references/pantallas/crear-publicacion.dc.html`.

## Acceptance criteria

- [ ] Clicking "Nueva publicación" button in the Sidebar opens the modal overlay.
- [ ] Modal card matches draft layout (header, sections, spacing, colors, border-radius).
- [ ] Header shows "Cancelar" (left, muted), "Nueva publicación" (center, Fredoka), "Publicar" (right, orange/red).
- [ ] PARA section has label "PARA" and 4 chips: Mateo (selected, dark bg + avatar "M"), Sofía (unselected + avatar "S"), Benjamín (unselected + avatar "B"), "Toda la sala" (unselected, plain).
- [ ] TIPO section has label "TIPO" and 7 colored chips: Comida (olive), Siesta (purple), Actividad (teal), Logro (green), Ánimo (pink), Foto (coral), Anuncio (blue).
- [ ] DESCRIPCIÓN section has label "DESCRIPCIÓN" and textarea with pre-filled text matching the draft.
- [ ] FOTOS section has label "FOTOS" and two tiles: photo placeholder (solid border, image SVG) and "Agregar" (dashed border, "+" SVG, text).
- [ ] Clicking "Cancelar" closes the modal.
- [ ] Clicking outside the modal card (on backdrop) closes the modal.
- [ ] Pressing Escape key closes the modal.
- [ ] "Publicar" button is inert (no action, no validation, no submission).
- [ ] All form fields are purely visual (no state, no validation logic, no chip toggling).
- [ ] `npm run lint` passes without errors.
- [ ] `npx tsc --noEmit` passes without errors.
- [ ] `npm run build` passes without errors.

## Decisiones tomadas y descartadas

- **Modal overlay, not separate route** — follows SPEC 04 pattern; modal opens from existing Sidebar button.
- **All fields purely visual** — no validation, no state management, no submission logic (follows SPEC 01/SPEC 04 pattern).
- **Chips are hardcoded** — PARA chips show Mateo as selected, TIPO chips all shown with colors but no selection logic. No toggling.
- **Textarea pre-filled** — matches the draft's pre-filled text for visual fidelity.
- **FOTOS section inert** — "Agregar" tile is visual only, no file picker.
- **Trigger only from Sidebar** — ComposerBox ("Compartí un momento…") integration deferred to a later spec.
- **Three close mechanisms** — "Cancelar" link, backdrop click, Escape key for UX convenience.
- **State lifted to page level** — modal open state managed in `app/page.tsx`, passed to Sidebar via callback prop, avoids z-index issues with modal inside Sidebar DOM tree.
- **Descartado:** validation logic, actual post creation, persistence, mobile responsive, chip toggling, file picker, ComposerBox integration.

## Riesgos identificados

- **Modal z-index and layering**: ensure modal renders above the sidebar and all page content. Use a high `z-index` (e.g. `z-50` or higher) for the backdrop and card.
- **Escape key handler**: must be attached only when modal is open and removed on close to avoid interfering with other keyboard shortcuts. Use `useEffect` with cleanup.
- **Pixel-perfect en Tailwind v4**: el draft incluye valores muy específicos (radios 14px/24px, sombras custom, bordes 1.5px, colores específicos para cada chip TIPO). Usar `[...]` arbitrarias o `style={{}}` inline para coincidir exactamente.
- **Backdrop click vs card click**: ensure click on the card itself does not trigger close — only clicks on the backdrop area.
