# R3F Interactive Hero — Verification Note

Iteration: FIRST (no `r3f-review.json` present at start).

## What was built
- New client component `src/app/components/HeroScene.tsx`:
  - `'use client'`, renders an `@react-three/fiber` `<Canvas>` filling a fixed
    square wrapper (340px, 360px at `sm`). Camera at `[0,0,4]`, `fov: 45`,
    `dpr={[1,2]}`, `gl={{ alpha: true, antialias: true }}`, transparent background.
  - A distorted `icosahedronGeometry` mesh with drei `MeshDistortMaterial`,
    base color Tailwind green-500 `#22c55e` (slightly brighter `#34d26b` in dark
    theme for contrast against `zinc-950`).
  - Lighting: `ambientLight` + `directionalLight` + `pointLight`, intensities
    adjusted per theme so it reads on both `bg-white` and `dark:bg-zinc-950`.
  - Interactivity via `useFrame`: mesh rotation eases (lerp) toward
    `state.pointer` ([-1,1]); distortion smoothly increases on hover
    (`onPointerOver`/`onPointerOut`). Includes a slow idle drift. No snapping.
  - Theme awareness via `useTheme()` from next-themes with a `mounted`
    (useState + useEffect) guard; defaults to dark values until mounted to avoid
    hydration mismatch.
  - Respects `prefers-reduced-motion`: eases to a resting pose and skips idle
    drift / hover distortion boost when the user prefers reduced motion.
- Integration in `src/app/page.tsx`: the hero `<div className="shrink-0">` now
  wraps `<HeroScene />` instead of the NextUI `<Image>`. Responsive hero layout
  (`flex-col-reverse ... sm:flex-row sm:justify-between`) and the left text
  column are unchanged.
- Direct import approach chosen (option a): `HeroScene` is a client component;
  R3F's `<Canvas>` only mounts client-side and nothing touches
  `window`/`document` at module top level, so SSR is safe without
  `next/dynamic`. Confirmed by a clean static prerender of `/`.

## Dependencies installed (React 18 compatible)
Resolved versions (from `npm ls`):
- `@react-three/fiber@8.18.0`
- `@react-three/drei@9.122.0`
- `three@0.160.1`
- `@types/three@0.160.0` (devDependency)
- `react@18.2.0` / `react-dom@18.2.0` — all R3F deps dedupe onto React 18.
No v9 fiber / v10 drei (those require React 19). `npm install` exit 0.

## Pre-existing unrelated build error (fixed to unblock verification)
On arrival, `npm run build` on this branch was ALREADY failing with a single
TypeScript error unrelated to this task:

    src/app/components/Switch.tsx(14,9): error TS2590:
    Expression produces a union type that is too complex to represent.

Verified it is pre-existing and not caused by the R3F install: the type
environment is identical to HEAD (`typescript@5.3.3`, `@types/react@18.2.46`,
`@nextui-org/react@2.2.9` all unchanged), and `tsc --noEmit` reported this as
the ONLY error, in a file this task does not touch. It is a known NextUI Switch
polymorphic-prop limitation.

Fix applied (minimal, type-only, zero runtime/behavior change): narrowed the
imported `Switch` to a plain `(props: SwitchProps) => JSX.Element` alias so TS
no longer expands the oversized prop union. No visual or behavioral change.

## Commands run and results
- `npm install @react-three/fiber@^8 @react-three/drei@^9 three@^0.160.0`
  and `npm install -D @types/three@^0.160.0` → exit 0.
- `npx tsc --noEmit` → exit 0, no errors (after Switch fix).
- `npm run build` → exit 0. `✓ Compiled successfully`, 12/12 static pages
  generated, `/` prerendered as static (`○`). No SSR/hydration errors related
  to the Canvas or theme usage. `/` First Load JS ~503 kB (three.js weight,
  expected).
- `npm run lint` → exit 0, `✔ No ESLint warnings or errors`.
- `npm run dev` was NOT run (long-running), per instructions.
