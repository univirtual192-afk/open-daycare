<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Stack versions (newer than training data)
- Next.js **16.3.0**, React **19.2.8**, TypeScript ^5, Tailwind **v4**, ESLint **9** flat config. Do not trust memorized APIs — verify against `node_modules/next/dist/docs/` or use the Context7 MCP.
- Tailwind v4 via `@tailwindcss/postcss`; `app/globals.css` uses `@import "tailwindcss";` and `@theme inline { ... }`. There is **no** `tailwind.config.js` — theme keys live in `globals.css`.

## Commands
- `npm run dev` — dev server at http://localhost:3000
- `npm run build` — production build
- `npm run lint` — ESLint (flat config; no positional args needed)
- No dedicated typecheck script. Run TS check with: `npx tsc --noEmit` (tsconfig has `noEmit: true`)
- Verification order before committing: `lint` -> `tsc --noEmit` -> `build`

## Path alias
- `@/*` maps to repo root (e.g. `@/app/page.tsx`). Prefer relative imports inside `app/`.

## Reference materials (do not edit)
- `references/pantallas/*.dc.html` — design drafts for each screen (login, feed, ninos, post-detail, etc.).
- `references/screenshots/*.png` — visual references matching the drafts.
Treat these as the visual spec; the app should reproduce their layout/content.

## MCPs
- **Playwright**: anything Playwright-related (screenshots, traces, console logs, snapshots) must be saved under `.playwright-mcp/` (gitignored). The MCP is configured in `opencode.json`.
- **Context7**: use to pull up-to-date framework docs (Next.js, Tailwind, React, etc.) instead of relying on memory.
- **Supabase**: use for database operations, migrations, edge functions, logs, advisors, and schema management. Always prefer `apply_migration` for DDL operations. Run `get_advisors` after schema changes to catch missing RLS policies or security issues.

## Skills
- **Spec Driven Development**: `spec` and `spec-impl` are installed (see `skills-lock.json` + `.agents/skills/`). Use `spec` to design a spec for new features before coding, then `spec-impl` to implement an approved spec on its own branch.
- **Supabase**: load when doing ANY task involving Supabase (Database, Auth, Edge Functions, Realtime, Storage, RLS, migrations, CLI, MCP). Includes security checklist, debugging guides, and schema workflow patterns.
- **Supabase Postgres Best Practices**: load before writing or changing anything that lives in Postgres (tables, columns, schema design, migrations, RLS policies, indexes, triggers, functions, queries). Covers query performance, connection management, security, schema design, concurrency, and monitoring.

## Agents - Subagentes personalizados
- **spec-verifier** (`.opencode/agent/spec-verifier.md`): verifica los criterios de aceptación de un spec. Lee el spec, revisa código, ejecuta comandos (lint, tsc, build), usa Playwright para validar UI y compara screenshots. Marca los checkboxes `[x]` / `[ ]` según el resultado.

## Comandos de verificación
- `npx tsc --noEmit` — chequeo de tipos TypeScript
- Verification order before committing: `lint` -> `tsc --noEmit` -> `build`

## Reglas de codigo

- Usar codigo limpio, nombres, funciones y variables, etc. en ingles