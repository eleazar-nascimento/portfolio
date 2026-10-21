# Voxel "developer at a desk" R3F hero scene

Replaces the blurred profile photo in the hero's right column with an interactive React Three Fiber diorama: a stylized blocky developer sitting behind a desk, typing on a keyboard in front of a glowing green code monitor. The whole scene is built from `boxGeometry` voxels grouped under one parent that eases its rotation toward the pointer, with a continuous typing bob on the hands, a scrolling code screen, a blinking cursor, theme-aware lighting, and a `prefers-reduced-motion` fallback. Dependencies were pinned to React-18-compatible majors (fiber v8 / drei v9 / three 0.160), and `page.tsx` keeps a plain direct import since `HeroScene` is already a client component.

Watch for: nothing blocking. The old distorted-icosahedron blob is fully gone and the palette, interactivity, theme awareness, and SSR constraints all hold. Two cosmetic LOW nits in the code-screen scroll (sub-line wrap + a dead constant) are the only observations.

**Verdict**: APPROVED

## High-level view

The dependency surface is correct for React 18: fiber `^8.18.0`, drei `^9.122.0`, three `^0.160.1`, `@types/three ^0.160.0`. None of the React-19-only majors (fiber v9/v10, drei v10, three ≥0.17x) were pulled in, and the verification note confirms the resolved tree stays on those versions with a single `react@18.2.0`.

The SSR integration is clean. `HeroScene` is a `'use client'` component, the only `window`/`matchMedia` access lives inside a `useEffect`, and `page.tsx` (a Server Component) imports it directly rather than reaching for `next/dynamic({ ssr: false })`, which wouldn't be allowed there anyway. The theme read is guarded by a `mounted` flag that defaults `isDark` to `true` until after hydration, so the server and first client render agree.

The scene genuinely assembles the requested subject. Every piece is a box: desk slab, keyboard with key ridges, monitor base/neck/bezel, an emissive screen with staggered green code bars and a cursor, and a figure (head, buzzed hair cap plus fringe, olive jacket torso, navy turtleneck collar, two arms angling down to skin-tone hands on the keyboard). The fixed palette is used exactly as specified. The figure sits behind the monitor so the head and shoulders rise above the bezel while the green screen faces the viewer.

Interactivity and motion run through a single `useFrame` with proper smoothing: the group lerps toward `state.pointer` with a delta-clamped step (never snaps), the two hands bob out of phase, the code group scrolls, and the cursor blinks on a ~0.5s cadence. Hover speeds up typing/scroll, and reduced-motion eases everything to a static resting pose.

Lighting is theme-aware with a green monitor glow: low ambient plus a strong green `pointLight` (intensity 2.2) in dark mode, higher ambient plus a soft glow (0.8) in light mode, over a transparent canvas (`gl.alpha`) so the hero background shows through. The responsive hero layout is preserved — only the right `shrink-0` column changed, swapping the `<Image>` for `<HeroScene />` at a 340/360px square.

<details>
<summary>Issues (2)</summary>

1. **Sub-line code scroll** (LOW) — the code group wraps on `% LINE_SPACING` (0.12), so the "streaming code" is really a 0.12-unit oscillating shift that snaps back rather than a continuous scroll. If a real stream is wanted, wrap on the full `CODE_SPAN` with duplicated lines to fill the gap.
2. **Dead constant** (LOW) — `CODE_SPAN` is computed but never referenced; it looks like it was meant to be the scroll wrap distance. Either use it or drop it.

</details>

<details>
<summary>Details</summary>

### Dependency pins hold at React-18 majors (confirmed)

`package.json` adds `@react-three/fiber ^8.18.0`, `@react-three/drei ^9.122.0`, `three ^0.160.1`, and `@types/three ^0.160.0` (dev). The verification note records `npm ls` resolving fiber 8.18.0 / drei 9.122.0 / three 0.160.1 with a single `react@18.2.0`, and explains the `--legacy-peer-deps` install was needed only because of a stray `expo` already in `node_modules` (ERESOLVE on an optional `react-native` peer), not because of the R3F stack. No version was bumped by the install. This satisfies the hard constraint that the scene not drag in a React-19-only major.

### Client component and SSR boundary (confirmed)

`HeroScene.tsx` opens with `'use client'`. The only platform-API access is `window.matchMedia('(prefers-reduced-motion: reduce)')`, and it sits inside a `useEffect` with a `change` listener and cleanup — nothing at module top level touches `window`/`document`, so there's no server-render crash and no need for a dynamic-import escape hatch. `page.tsx` stays a Server Component and imports `HeroScene` directly; it does not use `next/dynamic({ ssr: false })`, which would be illegal in a Server Component. The `mounted` guard defaults `isDark = true` pre-mount, so the first client render matches the server output and the theme only "settles" after hydration.

### The scene reads as a developer at a desk (confirmed)

The composition is a single `<group>` of `Voxel` boxes. The figure (torso `#55602f`, collar `#1b2430`, head `#d8a883`, hair cap + fringe `#16181d`, no glasses) sits at `z ≈ -0.95`, behind a monitor whose bezel top (`y ≈ 1.78`) lands right at the head center (`y = 1.75`), so the head and shoulders clear the monitor while the emissive screen (facing `+z`) stays pointed at the viewer. Two jacket arms angle forward from the shoulders (`rotation.x = -0.5`) down to skin-tone hand boxes resting on the keyboard. The orthographic camera at `[3.2, 3.0, 6]` gives the flat 3/4 iso voxel look. This is the readable "person at a glowing screen" layout the plan called for, and the old `MeshDistortMaterial` icosahedron blob (and its `DistortedBlob`/`DistortMaterialRef` symbols) is entirely removed — no sphere, no distorted material import remains.

The palette matches the spec exactly: hair/bezel `#16181d`, skin `#d8a883`, jacket `#55602f`, collar `#1b2430`, with the code screen on brand green `#22c55e` (light) / `#34d26b` (dark).

### Motion is smoothed, not snapped (confirmed)

```
group.rotation.y += (targetY - group.rotation.y) * step * 3
group.rotation.x += (targetX - group.rotation.x) * step * 3
```

`step = Math.min(delta, 0.1)` clamps the easing so a stalled frame (tab regains focus) can't jump the pose. `targetY = pointer.x * 0.3`, `targetX = pointer.y * -0.2` keep the sway within a small range. Both hands bob with `Math.max(0, Math.sin(t*speed)) * 0.045`, the right hand offset by `+ Math.PI` so they tap out of phase. Hover bumps `speed` 6 → 9 and scroll 0.3 → 0.5. Reduced-motion eases rotation toward `0`, flattens the hands, forces the cursor visible, and returns early to skip bob/scroll/blink — a complete static scene rather than a frozen mid-animation frame. Both the required mouse interactivity and the continuous typing animation are present and damped.

### Code-screen scroll is a sub-line jitter (LOW)

The scrolling code group advances with:

```
codeRef.current.position.y = (codeRef.current.position.y + step * scrollSpeed) % LINE_SPACING
```

Because it wraps on `LINE_SPACING` (0.12) rather than the full `CODE_SPAN`, the entire line block only ever drifts up by at most one line-spacing before snapping back to 0, with no duplicate lines filling the vacated space. The net effect is a small continuous shimmer rather than a convincing stream of code. The `CODE_SPAN` constant (`CODE_LINES.length * LINE_SPACING`) is computed and never used, which strongly suggests the wrap distance was meant to be `CODE_SPAN` with the lines tiled to loop seamlessly. Purely cosmetic and well inside the "tunable visual quality" latitude the plan grants; not blocking. The accompanying comment claims the lines are "clipped visually by sitting on the screen face," but there's no actual clipping — given the tiny (≤0.12) travel the lines won't visibly spill past the bezel, so this is harmless in practice.

### Theme-aware lighting and transparent canvas (confirmed)

The canvas is transparent (`gl={{ alpha: true, antialias: true }}` plus `style background transparent`), so the hero's `bg-white dark:bg-zinc-950` shows through. Lighting switches on `isDark`: ambient 0.5 vs 0.9, directional 0.8 vs 1.1, and a green `pointLight` at `[0, 1.15, 0.6]` colored with `screenGreen` at intensity 2.2 (dark) vs 0.8 (light), so the monitor appears to cast green light on the figure and desk. The screen/code emissive color also flips with the theme. The verification note's dark/light screenshots confirm the glow and the transparent background render as intended.

### Hero layout preserved (confirmed)

The uncommitted `page.tsx` change is narrow: the right-column `<div className="shrink-0">` swaps its blurred profile `<Image>` for `<HeroScene />`, and the now-unused `profile` import is dropped. The surrounding hero wrapper (`flex w-full max-w-[1100px] flex-col-reverse items-center gap-12 sm:flex-row sm:justify-between`) and the entire left text column are untouched. `HeroScene` renders at `h-[340px] w-[340px] sm:h-[360px] sm:w-[360px]` with `aria-hidden="true"`, matching the ~340–360px square the prior photo occupied.

### No commit was made (confirmed)

`git log` shows `HEAD` at the pre-existing `5c5e4c4` (= `origin/nova-sessao`); no new commit was created, honoring the user's explicit "não commite." Some task files happen to be in the staging area (a leftover `git add` state), but staging is not committing and all edits remain in the working tree. Worth a quick `git restore --staged` tidy-up before any future real commit, but it does not violate the constraint.

### Verification evidence (confirmed present)

The verification note records `npx tsc --noEmit` (exit 0), `npm run build` (exit 0, `✓ Compiled successfully`, `/` prerendered static with no hydration errors), and `npm run lint` (`✔ No ESLint warnings or errors`). Visual verification was performed via an available Playwright MCP browser against `next start`: exactly one 360×360 canvas, theme class toggling confirmed, dark/light screenshots inspected (blocky dev + green code monitor over a transparent background), and pointer movement producing group rotation with no runtime errors. Per the task I did not re-run build/lint/install and relied on this recorded evidence. (One caveat: lint is reported clean despite the unused `CODE_SPAN` module constant; if a stricter `no-unused-vars` run flags it, that's the LOW nit above, not a new issue.)

</details>

<details>
<summary>File map</summary>

- `src/app/components/HeroScene.tsx` — new voxel developer-at-desk scene (full replacement of the old blob); client component with useFrame interactivity, theme-aware lighting, reduced-motion fallback.
- `src/app/page.tsx` — right hero column swaps profile `<Image>` for `<HeroScene />`; drops unused `profile` import; layout otherwise unchanged.
- `package.json` — adds `@react-three/fiber ^8.18.0`, `@react-three/drei ^9.122.0`, `three ^0.160.1`, `@types/three ^0.160.0`.
- `package-lock.json` / `yarn.lock` — lockfile updates for the above.

Full uncommitted diff: `git diff HEAD` (plus staged entries via `git diff --staged`).

</details>
