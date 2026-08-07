# SPEC 02 — Kids list and child profile screens (design only)

> **Status:** Aprobado
> **Depends on:** —
> **Date:** 2026-08-07
> **Objective:** Implement the "Niños" list (`/kids`) and "Perfil Niño" detail (`/kids/[id]`) screens from the reference drafts as separate Next.js routes with hardcoded data, matching the visual design pixel-for-pixel, with purely visual search and placeholder child profile content.

## Scope

**In:**

- Route `app/kids/page.tsx` rendering the "Niños" list screen: page header with "GESTIÓN" eyebrow, "Niños" title, "Agregar niño" button, search bar, "SALA SOLES" section header, and a 2-column grid of kid cards.
- Route `app/kids/[id]/page.tsx` rendering the "Perfil Niño" detail screen: back link to `/kids`, child avatar + name + age/room, "Editar" button, allergies/notes box, info rows (birth date, room, admission), "Resumen del día" button, and "Padres vinculados" card.
- Components under `app/components/kids/`:
  - `KidsSearchBar.tsx` — visual search input with magnifier icon.
  - `KidCard.tsx` — kid card with avatar, name, age, linked parents count, optional allergy/"VINCULAR" badge.
  - `KidProfileHeader.tsx` — avatar, name, age/room subtitle, "Editar" button.
  - `AllergyBox.tsx` — allergy/notes alert box with icon.
  - `InfoRows.tsx` — key-value rows (birth date, room, admission).
  - `ParentLinkCard.tsx` — linked parent row with avatar, name, role, status badge (ACTIVA/PENDIENTE).
  - `LinkedParentsSection.tsx` — container for parents + "Vincular otro padre" link.
  - `DaySummaryButton.tsx` — dark "Resumen del día" button.
- Reuse `Avatar` from `app/components/feed/Avatar.tsx` (shared component).
- Hardcoded kid data array in `app/kids/page.tsx`.
- Working Next.js `<Link>` navigation between `/kids` and `/kids/[id]`.
- Hover/transition styles matching the draft.
- Iconos SVG inline copied from the drafts.

**Out of scope (for future specs):**

- "Agregar niño" form / edit functionality (inert button).
- Real search filtering (search bar is purely visual).
- "Resumen del día" functionality (inert button).
- "Vincular padre" flow (inert link).
- CRUD operations, persistence, or database.
- Responsivo mobile — defer to a later spec.
- Profile content beyond placeholders.

## Data model

No persistent data. Hardcoded kid array:

```ts
interface Kid {
  id: string;
  name: string;
  age: number;
  room: string;
  initial: string;
  avatarBg: string;
  avatarColor: string;
  linkedParents: number;
  allergyBadge?: string;
  needsVincular?: boolean;
}

interface KidProfile extends Kid {
  birthDate: string;
  admissionDate: string;
  allergies: string;
  parents: ParentLink[];
}

interface ParentLink {
  name: string;
  role: string;
  initial: string;
  avatarBg: string;
  avatarColor: string;
  status: "active" | "pending";
}
```

**Convención de idioma:** Internal types, props, variables, and file names in **English**. User-visible labels (badges "ACTIVA"/"PENDIENTE", "VINCULAR", "MANÍ", "LACTOSA", section headers "GESTIÓN", "SALA SOLES", "PADRES VINCULADOS") in **Spanish**.

## Implementation plan

1. Create `app/kids/page.tsx` with 8 hardcoded kids, header, search bar, section header, 2-column grid of `KidCard`.
2. Create `app/components/kids/KidsSearchBar.tsx` — purely visual.
3. Create `app/components/kids/KidCard.tsx` — reuses shared `Avatar`, links to `/kids/[id]`.
4. Create `app/kids/[id]/page.tsx` — reads `id`, renders full profile layout.
5. Create `app/components/kids/KidProfileHeader.tsx`.
6. Create `app/components/kids/AllergyBox.tsx`.
7. Create `app/components/kids/InfoRows.tsx`.
8. Create `app/components/kids/DaySummaryButton.tsx`.
9. Create `app/components/kids/ParentLinkCard.tsx`.
10. Create `app/components/kids/LinkedParentsSection.tsx`.
11. Verify `lint`, `tsc --noEmit`, `build`.
12. Visual comparison against drafts.

## Acceptance criteria

- [ ] `/kids` renders full list matching draft (header, search, 8 cards in 2-column grid).
- [ ] Kid cards show correct badges (allergy, VINCULAR, or chevron).
- [ ] Kid cards have hover lift effect.
- [ ] Clicking a card navigates to `/kids/[id]`.
- [ ] `/kids/[id]` renders profile matching draft (avatar, name, allergy box, info rows, parents).
- [ ] Parent status badges show ACTIVA (green) / PENDIENTE (yellow).
- [ ] Shared `Avatar` component reused.
- [ ] `lint`, `tsc --noEmit`, `build` pass.

## Decisiones tomadas y descartadas

- **Search bar purely visual** — user confirmed no filter logic.
- **Profile content as placeholder** — hardcoded data, structure only.
- **Shared Avatar component** — reuse from feed, no duplication.
- **Working Next.js navigation** — `<Link>` functional, data hardcoded, buttons inert.
- **Hardcoded data in page components** — follows SPEC 01 pattern.
- **Descartado:** mobile responsive, CRUD, persistence, all button logic.

## Riesgos identificados

- **Pixel-perfect en Tailwind v4**: usar `[...]` arbitrarias o `style={{}}` inline para valores específicos del draft.
- **Dynamic route `[id]` with hardcoded data**: usar `find()` con fallback "Not found" o redirect a `/kids`.
