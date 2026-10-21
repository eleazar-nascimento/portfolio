'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import { useTheme } from 'next-themes'
import type { Mesh } from 'three'

// Brand accent (Tailwind green-500)
const BRAND_GREEN = '#22c55e'
// Slightly brighter green reads better against the dark zinc-950 background
const BRAND_GREEN_DARK = '#34d26b'

type DistortMaterialRef = ThreeElements['meshStandardMaterial'] & {
  distort?: number
}

function DistortedBlob({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<Mesh>(null)
  const materialRef = useRef<DistortMaterialRef>(null)
  const [hovered, setHovered] = useState(false)

  // Honour the user's reduced-motion preference
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
    const mesh = meshRef.current
    if (!mesh) return

    // Clamp delta so a long frame (e.g. tab regains focus) can't jump the easing
    const step = Math.min(delta, 0.1)
    const reduced = prefersReducedMotion.current

    if (reduced) {
      // Ease gently back to a resting pose instead of animating continuously
      mesh.rotation.x += (0 - mesh.rotation.x) * step * 2
      mesh.rotation.y += (0 - mesh.rotation.y) * step * 2
    } else {
      // Ease rotation toward the pointer (normalized to [-1, 1] by R3F)
      const targetX = state.pointer.y * 0.35
      const targetY = state.pointer.x * 0.6
      mesh.rotation.x += (targetX - mesh.rotation.x) * step * 3
      mesh.rotation.y += (targetY - mesh.rotation.y) * step * 3
      // A slow idle drift so it feels alive even when the pointer is still
      mesh.rotation.z += step * 0.05
    }

    // Smoothly raise the distortion on hover
    const material = materialRef.current
    if (material && typeof material.distort === 'number') {
      const targetDistort = hovered && !reduced ? 0.55 : 0.3
      material.distort += (targetDistort - material.distort) * step * 3
    }
  })

  return (
    <mesh
      ref={meshRef}
      scale={1.6}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <icosahedronGeometry args={[1, 24]} />
      <MeshDistortMaterial
        // @ts-expect-error drei forwards the ref to the underlying material instance
        ref={materialRef}
        color={isDark ? BRAND_GREEN_DARK : BRAND_GREEN}
        distort={0.3}
        speed={2}
        roughness={0.25}
        metalness={0.35}
      />
    </mesh>
  )
}

export default function HeroScene() {
  // Avoid hydration mismatch: only trust the theme after mount
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  useEffect(() => setMounted(true), [])

  const isDark = mounted ? resolvedTheme === 'dark' : true

  return (
    <div
      className="h-[340px] w-[340px] sm:h-[360px] sm:w-[360px]"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={isDark ? 0.6 : 0.9} />
        <directionalLight position={[3, 3, 4]} intensity={isDark ? 1.4 : 1.1} />
        <pointLight position={[-4, -2, -3]} intensity={isDark ? 0.6 : 0.3} />
        <DistortedBlob isDark={isDark} />
      </Canvas>
    </div>
  )
}
