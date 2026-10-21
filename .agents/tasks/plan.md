# Implementation Plan — Voxel "Developer at a Desk" R3F Hero Scene

Goal: fully replace the green distorted-icosahedron blob in
`src/app/components/HeroScene.tsx` with an interactive, procedural voxel /
pixel-art-in-3D scene that reads as a little stylized developer sitting at a
desk, typing code on a glowing monitor. Built entirely from box geometries
grouped into meshes with React Three Fiber. **HARD CONSTRAINT: do not commit —
no `git add`, `git commit`, or any commit. All changes stay as uncommitted
working-tree edits.**

## Context discovered during exploration (read before planning changes)

- Stack: Next.js 14.0.4 (App Router), React 18, TypeScript, npm. `src/app/page.tsx`
  is a **Server Component** (no `'use client'`) and already imports and renders
  `HeroScene` inside the hero's right-column `<div className="shrink-0">`.
- `src/app/components/HeroScene.tsx` already exists and is `'use client'`. It
  currently renders the **wrong** thing: a drei `MeshDistortMaterial`
  icosahedron "blob". This is the sphere the user asked to cancel — it must be
  fully replaced, not kept.
- The R3F stack is **already installed and React-18-compatible** (verified via
  `node_modules`): `@react-three/fiber@8.18.0`, `@react-three/drei@9.122.0`,
  `three@0.160.1`, `@types/three@0.160.0` (devDependency). These are already in
  `package.json`/`package-lock.json` (uncommitted). Do NOT upgrade to fiber v9 /
  drei v10 / three ≥0.17x — those require React 19 and break the build.
- Theme: `next-themes` in `src/app/providers.tsx` (`attribute="class"`,
  `defaultTheme="system"`, `enableSystem`). Read in client components with
  `useTheme()` → `resolvedTheme`. Brand accent is Tailwind green-500 `#22c55e`.
- `src/app/components/Switch.tsx` already contains an uncommitted type-only fix
  (narrowing NextUI `Switch` to avoid a pre-existing TS2590 build error). The
  build depends on this fix. **Do not revert or touch it.**
- Playwright is NOT installed (`node_modules/playwright` absent; `npx playwright`
  prompts to download). So the screenshot verification is optional and must not
  block completion.

## Design decisions (made here, grounded in the codebase)

1. **SSR integration = direct import, no `next/dynamic`.** `page.tsx` is a
   Server Component so `next/dynamic({ ssr: false })` is not allowed there, and a
   client wrapper is unnecessary: `HeroScene` is already `'use client'`, R3F's
   `<Canvas>` only mounts on the client, and nothing touches `window`/`document`
   at module top level (the `prefers-reduced-motion` check lives inside
   `useEffect`). A prior run already confirmed a clean static prerender of `/`.
   Keep the existing direct import in `page.tsx` unchanged.
2. **Camera = orthographic, 3/4 iso-ish front view** for the Crossy-Road / voxel
   look (flat, pixel-art feel, no perspective distortion). Fixed camera; the
   whole scene group rotates toward the pointer instead of moving the camera.
3. **Composition = front-facing icon convention.** The developer sits behind the
   desk facing the viewer; the monitor stands on the desk between developer and
   viewer but shorter than the figure, so the head/hair and shoulders rise above
   the monitor and the emissive green screen faces the viewer (so the code is
   visible). Hands rest on the keyboard on the near edge of the desk. This is the
   universally readable "person at a glowing screen" layout and keeps the code
   screen visible. Exact coordinates below are a working starting point and are
   tunable by the implement/review loop for visual quality.
4. **Everything is box geometry** grouped into a single parent `<group>` so one
   rotation drives the whole scene. Use a small `Voxel` box helper component to
   keep the composition declarative and readable.

Palette (fixed by the task):
- hair `#16181d`
- skin `#d8a883`
- jacket (torso) `#55602f`
- inner turtleneck / collar `#1b2430`
- screen "code" green `#22c55e` (use a slightly brighter `#34d26b` for emissive
  in dark mode so it reads against `zinc-950`)
- no glasses
- desk / monitor bezel / keyboard: neutral darks chosen by implementer
  (suggested: bezel `#16181d`, desk `#3a3a42`, keyboard `#2a2d35`)

---

# Implementation Plan

- [ ] 1. Confirm the React-18-compatible R3F stack is installed (it already is;
      this is the exact command the task requires, and it is effectively a
      confirmation / lockfile refresh — do NOT bump major versions).
      Command: `npm install @react-three/fiber@^8 @react-three/drei@^9 three@^0.160 && npm install -D @types/three@^0.160`
      Files: package.json, package-lock.json (should remain at fiber 8.x /
      drei 9.x / three 0.160.x).
      Verify: `npm ls @react-three/fiber @react-three/drei three` prints
      `@react-three/fiber@8.18.0`, `@react-three/drei@9.122.0`, `three@0.160.1`
      (exit 0, no `UNMET`/`invalid`). Confirm React is still 18:
      `npm ls react` shows a single `react@18.x`.

- [ ] 2. Rewrite the shell of `src/app/components/HeroScene.tsx`: remove ALL blob
      code (`MeshDistortMaterial`, `icosahedronGeometry`, `DistortedBlob`, the
      `DistortMaterialRef` type). Keep `'use client'`, the `mounted` + `useTheme`
      hydration guard (default `isDark = true` until mounted), the fixed square
      wrapper `className="h-[340px] w-[340px] sm:h-[360px] sm:w-[360px]"` with
      `aria-hidden="true"`, and a transparent `<Canvas>` with `dpr={[1,2]}` and
      `gl={{ alpha: true, antialias: true }}`. Switch the Canvas to an
      **orthographic** camera for the voxel look, e.g.
      `orthographic camera={{ zoom: 95, position: [3.2, 3.0, 6], near: -50, far: 100 }}`
      aimed at roughly `[0, 0.9, 0]`. Render a single `<DeveloperDesk isDark={isDark} />`
      placeholder (add the component in the next step) so the file still compiles.
      Also define the palette constants at module top.
      Files: src/app/components/HeroScene.tsx
      Verify: `npm run build` exits 0 (`✓ Compiled successfully`) with no
      reference to the removed blob symbols; `npm run lint` reports no
      warnings/errors.

- [ ] 3. Add a `Voxel` box helper and the static `DeveloperDesk` composition in
      the same file. `Voxel` wraps `<mesh position=... scale=...><boxGeometry /><meshStandardMaterial color=.../></mesh>`
      (accept `position`, `size` (→ boxGeometry args), `color`, optional
      `emissive`/`emissiveIntensity`, and forwarded ref). `DeveloperDesk` is a
      single parent `<group ref={groupRef}>` containing all boxes. Build the
      figure, desk, monitor, and keyboard from boxes (approximate sizes/positions
      — a working starting point, tune for looks):
        - Desk slab: size `[3.2, 0.25, 1.4]` at `[0, 0, 0.1]` (desk color).
        - Keyboard slab: size `[1.6, 0.12, 0.5]` at `[0, 0.19, 0.55]` (keyboard
          color), optionally a couple of thin key-row ridges on top.
        - Monitor stand base `[0.5, 0.08, 0.3]` at `[0, 0.17, -0.1]`; neck
          `[0.12, 0.4, 0.12]` at `[0, 0.4, -0.1]`; bezel/frame `[1.9, 1.25, 0.12]`
          at `[0, 1.15, -0.15]` (bezel color `#16181d`). Screen panel comes in
          step 4.
        - Figure behind monitor: torso/jacket `[1.3, 1.0, 0.7]` at `[0, 0.75, -0.95]`
          (jacket `#55602f`); turtleneck/collar `[0.5, 0.25, 0.5]` at `[0, 1.3, -0.95]`
          (`#1b2430`); head `[0.62, 0.62, 0.6]` at `[0, 1.75, -0.95]` (skin
          `#d8a883`); hair cap `[0.68, 0.3, 0.66]` at `[0, 2.02, -0.95]` plus a
          short front fringe box, both hair `#16181d`. No glasses.
        - Two arms reaching from the shoulders down to the keyboard: for each,
          a forearm box (~`[0.22, 0.22, 1.0]`, jacket color, rotated on X so it
          angles from shoulder `~[±0.5, 1.1, -0.6]` forward/down toward the
          keyboard) ending in a small hand box (~`[0.28, 0.14, 0.3]`, skin color)
          resting on the keyboard near `[±0.4, 0.3, 0.55]`. Give each hand (or
          forearm) group its own ref for the typing animation in step 5.
      Files: src/app/components/HeroScene.tsx
      Verify: `npm run build` exits 0; `npm run lint` clean. (Visual correctness —
      that it reads as a dev at a desk — is assessed by the review loop.)

- [ ] 4. Add the emissive green "code" screen with scrolling code lines and a
      blinking cursor. Add a screen panel box `[1.7, 1.05, 0.04]` at
      `[0, 1.15, -0.08]` (just in front of the bezel, facing the viewer) with a
      dark base and green emissive. On the screen surface (z slightly greater
      than the panel face, e.g. `z ≈ -0.05`), place a `<group ref={codeRef}>` of
      several thin horizontal "code line" boxes (e.g. size `[varying 0.4–1.3, 0.07, 0.01]`,
      staggered x to look like indented code), green emissive
      (`#34d26b` dark / `#22c55e` light), higher `emissiveIntensity`. Add a small
      cursor box (`[0.06, 0.09, 0.01]`) with its own ref at the end of one line.
      Leave the scroll/blink animation to step 5 (static placement here).
      Files: src/app/components/HeroScene.tsx
      Verify: `npm run build` exits 0; `npm run lint` clean.

- [ ] 5. Add interactivity and motion in a single `useFrame` inside
      `DeveloperDesk`, plus hover + reduced-motion handling. Specifically:
        - Parent group eases its rotation toward the pointer:
          `targetY = state.pointer.x * 0.3`, `targetX = state.pointer.y * -0.2`
          (keep within roughly ±0.2–0.35 rad), using frame-rate-independent
          damping (lerp with `delta` clamped via `Math.min(delta, 0.1)`, or
          `three/src/math/MathUtils` `damp`). No snapping.
        - Continuous typing bob on the two hand/forearm refs: small vertical
          offset `Math.sin(t * speed) * amp` with the two hands **out of phase**
          (second uses `t * speed + Math.PI`), `amp ≈ 0.03–0.05`.
        - Code screen: scroll `codeRef.position.y` upward over time and wrap
          (modulo the line spacing) so lines appear to stream; blink the cursor
          by toggling its `visible` (or emissiveIntensity) on a ~0.5s cadence
          derived from `state.clock`.
        - Hover: `onPointerOver`/`onPointerOut` on the group set a `hovered`
          state that modestly increases the typing/scroll speed.
        - `prefers-reduced-motion`: detect via
          `window.matchMedia('(prefers-reduced-motion: reduce)')` inside a
          `useEffect` (store in a ref, subscribe to `change`). When reduced: ease
          the group to its resting pose and skip the hand bob, code scroll,
          cursor blink, and hover speed-up (render a static but complete scene).
      Files: src/app/components/HeroScene.tsx
      Verify: `npm run build` exits 0; `npm run lint` clean.

- [ ] 6. Make the lighting theme-aware with a green monitor glow. In `HeroScene`
      (which already knows `isDark`), set: an `ambientLight` (lower intensity in
      dark, e.g. `~0.5`; higher/softer in light, e.g. `~0.9`); a `directionalLight`
      key light from the front-top; and a **green-tinted** `pointLight` (or
      `spotLight`) positioned at/near the screen (`~[0, 1.15, 0.4]`) pointing at
      the developer's face, color `#34d26b`, stronger intensity in dark mode and
      softer in light mode, so the screen appears to light the face. Pass `isDark`
      into `DeveloperDesk` so the screen/code emissive color also switches
      (`#34d26b` dark / `#22c55e` light). Keep the Canvas background transparent.
      Files: src/app/components/HeroScene.tsx
      Verify: `npm run build` exits 0; `npm run lint` reports no warnings/errors.

- [ ] 7. Full verification pass. Run the project's real build and lint and
      confirm the hero still renders with the new scene and no hydration errors.
      Do NOT run `npm run dev` in the foreground.
      Files: none (verification only).
      Verify (all required, in order):
        1. `npx tsc --noEmit` → exit 0, no errors (confirms types incl. three /
           drei; the pre-existing `Switch.tsx` fix must remain in place).
        2. `npm run build` → exit 0, `✓ Compiled successfully`, `/` prerendered
           with no SSR/hydration errors from the Canvas or `useTheme`.
        3. `npm run lint` → exit 0, `✔ No ESLint warnings or errors`.
      Optional (do not block completion): if Playwright is available, capture a
      light- and dark-mode screenshot of the hero to sanity-check the visual.
      Playwright is NOT currently installed — only attempt this if
      `npx playwright --version` succeeds without a download prompt; otherwise
      skip it and note it was skipped.

## Notes / assumptions

- All geometry sizes and positions above are a concrete, buildable starting
  point. The implement/review loop should tune them so the result clearly reads
  as "a stylized pixel-art developer typing at a PC"; the fixed constraints are
  the palette, the box-geometry voxel aesthetic, the visible green code screen,
  the interactivity, theme awareness, and the React-18 dependency pins.
- Keep the whole scene inside the one client component `HeroScene.tsx`; no new
  files are needed. `page.tsx`'s direct import stays unchanged.
- Do not commit anything.
