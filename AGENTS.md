# AGENTS.md

## Routes

- A route file that has child routes is a layout and must render `<Outlet />`; the page shown at its own path lives in a sibling `*.index.tsx` leaf (e.g. `blog.tsx` + `blog.index.tsx` + `blog.$slug.tsx`). Why: without the Outlet, child URLs like `/blog/eleicoes-2026` silently render the parent's content.
- Head metadata for a listing page belongs on its `*.index.tsx` leaf, never on the parent layout, so it does not leak into child pages.

## Assets

- Binary media the app serves goes through `lovable-assets` and stays in the repo only as a `.asset.json` pointer; the favicon is the sole exception (real file in `public/`).

## Verification

- After edits, check `bunx tsgo --noEmit` and `/tmp/observability/build-errors.log`, then confirm the changed flow in the running preview.
