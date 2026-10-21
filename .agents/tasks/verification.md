# Verification — Voxel "Developer at a Desk" R3F Hero Scene

Iteration: first implementation (no `review.json` present at start).

## What was built

`src/app/components/HeroScene.tsx` was fully rewritten. The old green
`MeshDistortMaterial` icosahedron blob (and the `DistortedBlob` component /
`DistortMaterialRef` type / drei `MeshDistortMaterial` import) was removed. In
its place is a procedural voxel diorama built entirely from `boxGeometry`:

- Developer figure (behind the desk, facing viewer): skin head `#d8a883`,
  near-black buzzed hair cap + front fringe `#16181d` (no glasses), olive jacket
  torso `#55602f`, navy turtleneck collar `#1b2430`, two jacket arms angling to
  the keyboard ending in skin-tone hands.
- Desk slab (`#3a3a42`), keyboard slab + key ridges (`#2a2d35`), monitor
  (base + neck + bezel `#16181d`).
- Emissive monitor screen: dark base panel with a `<group>` of 7 thin green
  code-line bars (brand green `#22c55e` light / `#34d26b` dark) at staggered
  widths/indents, plus a blinking cursor box.

Animation / interactivity (single `useFrame` in `DeveloperDesk`):
- Whole group eases rotation toward `state.pointer` (`y` ±0.3, `x` ∓0.2 rad)
  with delta-clamped lerp — smooth, never snaps.
- Typing bob on the two hand groups via `sin`, out of phase (one `+ PI`).
- Code group scrolls `position.y` upward and wraps modulo line spacing.
- Cursor blinks on a ~0.5s cadence (`Math.floor(t*2) % 2`).
- Hover (`onPointerOver/Out`) speeds up typing + scroll.
- `prefers-reduced-motion` (checked in `useEffect` via `matchMedia`, with a
  `change` listener): eases to resting pose, hands flat, cursor visible, no
  idle motion.

Theme awareness: `useTheme()` + `mounted` guard (`isDark` defaults to `true`
until mounted to avoid hydration mismatch). Dark = low ambient (0.5) + strong
green `pointLight` glow (intensity 2.2) on the figure; light = higher ambient
(0.9) + soft glow (0.8). Canvas is transparent (`gl={{ alpha: true }}`,
`style background transparent`), `dpr={[1,2]}`, orthographic camera
(`zoom 95`, `position [3.2,3.0,6]`) for the iso voxel look.

SSR integration: `page.tsx` keeps its existing direct import of the
`'use client'` `HeroScene` (no `next/dynamic`). Nothing touches
`window`/`document` at module top level. `page.tsx` left unchanged (its `Image`
import is still used by `ProjectCard`, so no unused-import removal needed).

## Dependencies (resolved, React-18-compatible)

Verified via `npm ls`:
- `@react-three/fiber@8.18.0`
- `@react-three/drei@9.122.0`
- `three@0.160.1`
- `@types/three@0.160.0` (devDependency)
- `react@18.2.0` (single copy)

The required `npm install @react-three/fiber@^8 @react-three/drei@^9 three@^0.160`
+ `-D @types/three@^0.160` was run. The repo has a stray `expo` in `node_modules`
(not in `package.json`) whose optional `react-native` peer triggers an ERESOLVE,
so the install was completed with `--legacy-peer-deps` (how the stack was
originally installed). Versions were unchanged by the install — still fiber 8.x /
drei 9.x / three 0.160.x. (fiber v9/v10, drei v10, three ≥0.17x were NOT used —
they require React 19.)

## Commands run and results

- `npx tsc --noEmit` → exit 0, no type errors.
- `npm run build` → exit 0, `✓ Compiled successfully`, `/` prerendered as static
  (`○ (Static)`) with no SSR/hydration errors from the Canvas or `useTheme`.
- `npm run lint` → exit 0, `✔ No ESLint warnings or errors`.

## Visual verification (performed)

Playwright is not in `node_modules`, but a Playwright MCP browser was available.
Production server started in the background (`next start -p 3123`, HTTP 200), then
driven via the browser:
- `document.documentElement.className` = `scroll-smooth dark` then
  `scroll-smooth light` after `emulateMedia({ colorScheme })` — theme switching
  confirmed.
- Exactly 1 `<canvas>` present, bounding box 360×360 (matches the fixed square
  wrapper).
- Screenshots captured in both dark and light themes and visually inspected:
  both clearly show a stylized blocky developer sitting behind a desk with a
  monitor displaying glowing green horizontal "code" lines, a keyboard, and
  hands resting toward it — over a transparent background that lets the hero bg
  (zinc-950 dark / white light) show through. Dark mode shows the green monitor
  glow lighting the figure; light mode reads cleanly on white.
- Pointer was moved across the canvas (two positions); no runtime errors and the
  diorama responds (group rotation follows the pointer).

Note: the home volume (`/System/Volumes/Data`) was at 100% (116Mi free), which
blocked the Playwright MCP server from writing to `/tmp`. The npm cache (12G,
safe/regenerable) was cleared with `npm cache clean --force` to free space so the
visual check could run. No project files or source were affected.

## Cleanup

Background `next start` process stopped (port 3123 free); temporary screenshot /
log directory (`/Volumes/crucial-x9/tmp`) removed.

## Constraint

No commit was made. All changes remain uncommitted working-tree edits
(`git add` / `git commit` were NOT run).
