# SPEC 01 — Feed (Home `/`) sin persistencia

**State:** Draft
**Depends on:** —
**Date:** 2026-08-06

**Objective:** Implementar la plantilla `references/pantallas/feed.dc.html` como la página home (`/`) del app Next.js 16, reproduciendo el estilo idénticamente, sin autenticación ni base de datos, con datos hardcodeados y componentes descompuestos.

## Scope

**Incluido:**
- Página `app/page.tsx` renderizando el feed (header de saludo, caja "compartí un momento", lista de publicaciones).
- Sidebar lateral con logo "OpenDaycare / Sala Soles", botón "Nueva publicación", navegación (Feed activo + Niños/Avisos/Mi cuenta) y tarjeta de usuario "Caro Giménez".
- Componentes bajo `app/components/feed/`:
  - `Sidebar.tsx`
  - `FeedHeader.tsx`
  - `ComposerBox.tsx`
  - `PostCard.tsx`
  - `PostBadge.tsx` (LOGRO/ACTIVIDAD/ANUNCIO)
  - `PostActions.tsx` (likes, comentarios, editar)
  - `PhotoPlaceholder.tsx` (placeholder de foto en post de actividad)
  - `Avatar.tsx` (reusable, iniciales + color de fondo)
- Datos de las 3 publicaciones hardcodeados en el componente (array en `app/page.tsx`).
- Carga de fuentes Fredoka y Nunito con `next/font/google`.
- Hover/click visuales simulados (estados de hover en enlaces y botones, sin handler real).
- Iconos SVG inline copiados del draft.

**No incluido:**
- Autenticación.
- Base de datos / persistencia.
- Navegación funcional a Niños, Avisos, Mi cuenta, crear-publicación, detalle-publicación (enlaces visuales inertes).
- Acciones reales de like, comentar, editar o publicar (sin handler).
- Responsivo mobile (diferir a spec posterior). El layout reproduction se basa en el draft desktop.

## Data model

No introduce nuevas estructuras de datos persistentes. El array de publicaciones está hardcodeado en `app/page.tsx` con esta forma:

```ts
type PostType = "logro" | "actividad" | "anuncio";

interface FeedPost {
  id: string;
  author: string;        // "Mateo" | "Anuncio general"
  initial: string;       // "M" | icon para anuncio
  avatarBg: string;      // "#A9D9E8" | "#CCD8F4"
  avatarColor: string;   // "#1F7A93" | "#4E72C8"
  time: string;          // "14:20"
  publishedBy: string;   // "publicado por vos"
  type: PostType;
  audience: string;     // "familia de Mateo" | "toda la sala"
  content: string;       // texto del post
  likes: number;
  comments: number;
  hasPhoto?: boolean;
  photoLabel?: string;   // "Foto · pintando con témperas"
}
```

## Implementation plan

1. Configurar `next/font/google` para Fredoka y Nunito en `app/layout.tsx`, exponiéndolas para usar en `globals.css` y componentes.
2. Agregar tokens de color del draft (paleta cálido `#F6ECDF`, `#FFFDF9`, `#ECE0D0`, acentos `#F4977E`, `#D9583C`, etc.) como variables en `app/globals.css` dentro del bloque `@theme inline`.
3. Crear `app/components/feed/Avatar.tsx` con props `initial`, `bg`, `color`.
4. Crear `app/components/feed/PostBadge.tsx` con props `type`, mapea a color de fondo/dot/label (LOGRO↔verde, ACTIVIDAD↔azul, ANUNCIO↔lila).
5. Crear `app/components/feed/PostActions.tsx` con props `likes`, `comments` (SVG inline de corazón y comentario).
6. Crear `app/components/feed/PhotoPlaceholder.tsx` con SVG de imagen y `label` opcional.
7. Crear `app/components/feed/PostCard.tsx` que compone Avatar + PostBadge + contenido + PhotoPlaceholder (condicional) + PostActions.
8. Crear `app/components/feed/ComposerBox.tsx` (la caja "Compartí un momento…" con avatar C y botón cámara).
9. Crear `app/components/feed/FeedHeader.tsx` (eyebrow "GUARDERÍA · SALA SOLES", título "Buenas, Caro", sub "12 niños · martes 17 jun").
10. Crear `app/components/feed/Sidebar.tsx` con logo, botón Nueva publicación, nav (Feed activo + 3 items inertes) y tarjeta de usuario con logout.
11. En `app/page.tsx` definir el array hardcodeado de 3 FeedPost y renderizar: layout flex full-height con `Sidebar` + `<main>` que contiene `FeedHeader`, `ComposerBox`, separador "PUBLICADO HOY" y la lista de `PostCard`.
12. Verificar `npm run lint`, `npx tsc --noEmit`, `npm run build` sin errores.
13. Comparación visual contra `references/screenshots/feed.png` (si existe) o el draft `.dc.html` abierto en navegador.

## Acceptance criteria

- [ ] Al visitar `http://localhost:3000/` se renderiza el feed completo del draft.
- [ ] El sidebar izquierdo coincide pixel-perfect con el draft (logo, botón, nav, tarjeta de usuario con avatar "C" y botón logout).
- [ ] Existe el saludo "Buenas, Caro" con eyebrow "GUARDERÍA · SALA SOLES" y sub "12 niños · martes 17 jun".
- [ ] La caja "Compartí un momento…" con avatar C y botón cámara está presente.
- [ ] Se renderizan exactamente 3 posts: 1 LOGRO (verde, Mateo, sin foto), 1 ACTIVIDAD (azul, Mateo, con placeholder de foto), 1 ANUNCIO (lila, "Anuncio general", sin foto).
- [ ] Cada post muestra Avatar, badge de tipo, línea "Para: …", contenido, contador de likes y comentarios.
- [ ] Los enlaces del sidebar que no son Feed son inertes (no navegan, no rompen).
- [ ] Los botones Nueva publicación / Compartí un momento / Editar / like / comentario tienen estados hover visuales pero no ejecutan nada.
- [ ] Las fuentes Fredoka (títulos) y Nunito (cuerpo) cargan vía next/font sin FOUC.
- [ ] `npm run lint` pasa sin errores.
- [ ] `npx tsc --noEmit` pasa sin errores.
- [ ] `npm run build` pasa sin errores.

## Decisiones tomadas y descartadas

- **Sidebar sin navegación real**: los items Niños/Avisos/Mi cuenta son visuales inertes (decisión del usuario) — estado deliberado de esta primera entrega, no un TODO.
- **Datos hardcodeados en el componente** (array dentro de `app/page.tsx`) en lugar de archivo `data/` separado — el usuario indicó que prefiere descomponer en componentes, no en capas de datos.
- **Fuentes con next/font/google** en lugar de `<link>` a Google Fonts — optimización nativa de Next 16 y sin layout shift.
- **SVG inline copiados del draft** en lugar de `lucide-react` — coincidencia pixel-perfect y sin dependencia nueva.
- **Descartado:** responsivo mobile — defer a spec posterior; el layout actual reproduce el draft desktop.
- **Descartado:** cualquier lógica de like/comentario/publicar — fuera de scope ("solo el estilo").

## Riesgos identificados

- **Pixel-perfect en Tailwind v4**: el draft incluye valores muy específicos (radios 14px/18px/20px, paddings 20px 22px, sombras con offset custom). Hay que mapear todo a utilidades arbitrarias `[...]` o estilos inline; alcanzarlo con clases predeterminadas puede desviar. Mitigación: usar `style={{}}` inline para coincidir exactamente con el draft cuando las utilidades no cubran el valor.
- **next/font y Fredoka weight set**: Fredoka solo necesita `400;500;600;700`. Cargar pesos inexistentes rompe el build. Mitigación: declarar exactamente esos pesos.
- **Idioma hardcodeado**: el header dice "martes 17 jun" — sin lógica de fecha. Es intencional (sin DB), pero queda como deuda visual si el día real difiere.