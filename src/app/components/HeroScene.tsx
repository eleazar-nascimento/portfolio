'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import type { Group } from 'three'

// ---------------------------------------------------------------------------
// Palette (fixed by the task)
// ---------------------------------------------------------------------------
const BRAND_GREEN = '#22c55e' // Tailwind green-500 — code screen (light)
const BRAND_GREEN_DARK = '#34d26b' // brighter green reads better on zinc-950
const HAIR = '#16181d'
const SKIN = '#d8a883'
const JACKET = '#55602f'
const COLLAR = '#1b2430'
const BEZEL = '#16181d'
const DESK = '#3a3a42'
const KEYBOARD = '#2a2d35'
const SCREEN_BASE = '#0b140d' // dark panel behind the glowing code

type Vec3 = [number, number, number]

// ---------------------------------------------------------------------------
// Voxel — a single box, the one building block for the whole diorama
// ---------------------------------------------------------------------------
function Voxel({
  position,
  size,
  color,
  emissive,
  emissiveIntensity = 0,
  rotation,
}: {
  position: Vec3
  size: Vec3
  color: string
  emissive?: string
  emissiveIntensity?: number
  rotation?: Vec3
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        emissive={emissive ?? '#000000'}
        emissiveIntensity={emissive ? emissiveIntensity : 0}
        roughness={0.85}
        metalness={0.05}
      />
    </mesh>
  )
}

// A single scrolling "code line" — thin horizontal bar
type CodeLine = { y: number; x: number; w: number }

// Staggered widths / indents so it reads like indented source code
const CODE_LINES: CodeLine[] = [
  { y: 0.4, x: -0.45, w: 0.7 },
  { y: 0.28, x: -0.3, w: 1.0 },
  { y: 0.16, x: -0.2, w: 0.55 },
  { y: 0.04, x: -0.3, w: 0.85 },
  { y: -0.08, x: -0.4, w: 0.45 },
  { y: -0.2, x: -0.3, w: 0.95 },
  { y: -0.32, x: -0.2, w: 0.6 },
]
const LINE_SPACING = 0.12
const CODE_SPAN = CODE_LINES.length * LINE_SPACING // scroll wrap distance

// ---------------------------------------------------------------------------
// DeveloperDesk — the whole procedural voxel scene in one rotating group
// ---------------------------------------------------------------------------
function DeveloperDesk({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<Group>(null)
  const leftHandRef = useRef<Group>(null)
  const rightHandRef = useRef<Group>(null)
  const codeRef = useRef<Group>(null)
  const cursorRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)

  const screenGreen = isDark ? BRAND_GREEN_DARK : BRAND_GREEN

  // Honour the user's reduced-motion preference (checked only on the client)
  const prefersReducedMotion = useRef(false)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.current = query.matches
    const onChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion.current = event.matches
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return

    // Clamp delta so a long frame (tab regains focus) can't jump the easing
    const step = Math.min(delta, 0.1)
    const reduced = prefersReducedMotion.current

    // --- Parent group eases its rotation toward the pointer (never snaps) ---
    const targetY = reduced ? 0 : state.pointer.x * 0.3
    const targetX = reduced ? 0 : state.pointer.y * -0.2
    group.rotation.y += (targetY - group.rotation.y) * step * 3
    group.rotation.x += (targetX - group.rotation.x) * step * 3

    if (reduced) {
      // Keep a static, complete pose: no typing, scroll, or blink
      if (leftHandRef.current) leftHandRef.current.position.y = 0
      if (rightHandRef.current) rightHandRef.current.position.y = 0
      if (cursorRef.current) cursorRef.current.visible = true
      return
    }

    const t = state.clock.elapsedTime
    const speed = hovered ? 9 : 6
    const amp = 0.045

    // --- Typing bob: two hands slightly out of phase ---
    if (leftHandRef.current) {
      leftHandRef.current.position.y = Math.max(0, Math.sin(t * speed)) * amp
    }
    if (rightHandRef.current) {
      rightHandRef.current.position.y =
        Math.max(0, Math.sin(t * speed + Math.PI)) * amp
    }

    // --- Code streams upward and wraps so it looks like scrolling source ---
    if (codeRef.current) {
      const scrollSpeed = hovered ? 0.5 : 0.3
      codeRef.current.position.y =
        (codeRef.current.position.y + step * scrollSpeed) % LINE_SPACING
    }

    // --- Blinking cursor on a ~0.5s cadence ---
    if (cursorRef.current) {
      cursorRef.current.visible = Math.floor(t * 2) % 2 === 0
    }
  })

  return (
    <group
      ref={groupRef}
      position={[0, -0.6, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* ---- Desk ---- */}
      <Voxel position={[0, 0, 0.1]} size={[3.2, 0.25, 1.4]} color={DESK} />

      {/* ---- Keyboard ---- */}
      <Voxel position={[0, 0.19, 0.55]} size={[1.6, 0.12, 0.5]} color={KEYBOARD} />
      <Voxel position={[0, 0.26, 0.45]} size={[1.5, 0.04, 0.1]} color="#3b3f4a" />
      <Voxel position={[0, 0.26, 0.58]} size={[1.5, 0.04, 0.1]} color="#3b3f4a" />
      <Voxel position={[0, 0.26, 0.71]} size={[1.5, 0.04, 0.1]} color="#3b3f4a" />

      {/* ---- Monitor ---- */}
      <Voxel position={[0, 0.17, -0.1]} size={[0.5, 0.08, 0.3]} color={BEZEL} />
      <Voxel position={[0, 0.4, -0.1]} size={[0.12, 0.4, 0.12]} color={BEZEL} />
      <Voxel position={[0, 1.15, -0.15]} size={[1.9, 1.25, 0.12]} color={BEZEL} />

      {/* Screen base panel (just in front of the bezel, facing the viewer) */}
      <Voxel
        position={[0, 1.15, -0.08]}
        size={[1.7, 1.05, 0.04]}
        color={SCREEN_BASE}
        emissive={screenGreen}
        emissiveIntensity={isDark ? 0.35 : 0.2}
      />

      {/* Scrolling code lines, clipped visually by sitting on the screen face */}
      <group position={[0, 1.15, -0.05]}>
        <group ref={codeRef}>
          {CODE_LINES.map((line, i) => (
            <Voxel
              key={i}
              position={[line.x, line.y, 0]}
              size={[line.w, 0.07, 0.01]}
              color={screenGreen}
              emissive={screenGreen}
              emissiveIntensity={isDark ? 1.4 : 0.9}
            />
          ))}
        </group>
        {/* Blinking cursor at the end of a line */}
        <group ref={cursorRef} position={[0.2, -0.08, 0]}>
          <Voxel
            position={[0, 0, 0]}
            size={[0.06, 0.09, 0.01]}
            color={screenGreen}
            emissive={screenGreen}
            emissiveIntensity={isDark ? 1.6 : 1.0}
          />
        </group>
      </group>

      {/* ---- Figure (sits behind the desk, facing the viewer) ---- */}
      {/* Torso / jacket */}
      <Voxel position={[0, 0.75, -0.95]} size={[1.3, 1.0, 0.7]} color={JACKET} />
      {/* Turtleneck collar peeking at the neck */}
      <Voxel position={[0, 1.3, -0.95]} size={[0.5, 0.25, 0.5]} color={COLLAR} />
      {/* Head */}
      <Voxel position={[0, 1.75, -0.95]} size={[0.62, 0.62, 0.6]} color={SKIN} />
      {/* Hair cap (short / buzzed) + front fringe, no glasses */}
      <Voxel position={[0, 2.02, -0.95]} size={[0.68, 0.3, 0.66]} color={HAIR} />
      <Voxel position={[0, 1.92, -0.63]} size={[0.68, 0.12, 0.08]} color={HAIR} />

      {/* ---- Arms reaching from shoulders to the keyboard ---- */}
      {/* Left arm */}
      <Voxel
        position={[-0.5, 0.75, -0.35]}
        size={[0.22, 0.22, 1.0]}
        color={JACKET}
        rotation={[-0.5, 0, 0]}
      />
      <group ref={leftHandRef}>
        <Voxel position={[-0.4, 0.3, 0.55]} size={[0.28, 0.14, 0.3]} color={SKIN} />
      </group>
      {/* Right arm */}
      <Voxel
        position={[0.5, 0.75, -0.35]}
        size={[0.22, 0.22, 1.0]}
        color={JACKET}
        rotation={[-0.5, 0, 0]}
      />
      <group ref={rightHandRef}>
        <Voxel position={[0.4, 0.3, 0.55]} size={[0.28, 0.14, 0.3]} color={SKIN} />
      </group>
    </group>
  )
}

// ---------------------------------------------------------------------------
// HeroScene — transparent canvas, theme-aware lighting, orthographic voxel view
// ---------------------------------------------------------------------------
export default function HeroScene() {
  // Avoid hydration mismatch: only trust the theme after mount
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  useEffect(() => setMounted(true), [])

  const isDark = mounted ? resolvedTheme === 'dark' : true
  const screenGreen = isDark ? BRAND_GREEN_DARK : BRAND_GREEN

  return (
    <div
      className="h-[340px] w-[340px] sm:h-[360px] sm:w-[360px]"
      aria-hidden="true"
    >
      <Canvas
        orthographic
        camera={{ zoom: 95, position: [3.2, 3.0, 6], near: -50, far: 100 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={isDark ? 0.5 : 0.9} />
        <directionalLight
          position={[3, 5, 4]}
          intensity={isDark ? 0.8 : 1.1}
        />
        {/* Green monitor glow lighting the developer's face / desk */}
        <pointLight
          position={[0, 1.15, 0.6]}
          color={screenGreen}
          intensity={isDark ? 2.2 : 0.8}
          distance={6}
          decay={2}
        />
        <DeveloperDesk isDark={isDark} />
      </Canvas>
    </div>
  )
}
