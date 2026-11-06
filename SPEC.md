# Spec: 2025+ Modern Interactive 3D Portfolio

## Objective
Build a distinctive, ultra-modern personal portfolio website for Elham that showcases mastery in **Flutter & mobile engineering**, fluid interaction design, and an active interest in **AI systems, CLI tooling, and bespoke developer utilities**.

The portfolio breaks away from standard resume sites by utilizing a tactile, physics-driven **3D smartphone device viewport** as the core anchor. As visitors scroll and interact, the 3D phone model dynamically updates to present real Flutter app showcases, animations, and architecture case studies, paired with a sleek developer "Lab" bento grid.

### Primary User Stories:
- **As a technical founder or mobile engineering lead**, I want to immediately see interactive proof of Elham's elite UI/UX craft, state management, and 60fps performance discipline so that I can confidently reach out for high-impact roles.
- **As an ambitious peer or developer**, I want to explore Elham's projects, AI tooling, and design philosophy so that I can learn from their approach and connect.
- **As a mobile visitor**, I want a lightweight, snappy experience with touch-optimized 3D/haptic interactions that don't lag or drain battery.

---

## Tech Stack
- **Framework:** Next.js 15+ (App Router, React 19, TypeScript 5+)
- **3D Graphics & Canvas:** Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Animation & Micro-interactions:** Framer Motion / Motion, Lucide React (icons)
- **Styling & Design Tokens:** Tailwind CSS v4, Lucide icons, custom GLSL shaders
- **Deployment & Edge:** Vercel / Cloudflare Pages static export with edge asset delivery

---

## Commands
- **Dev Server:** `npm run dev`
- **Build Production:** `npm run build`
- **Start Production:** `npm run start`
- **Lint Code:** `npm run lint`
- **Typecheck:** `npx tsc --noEmit`
- **Test:** `npm test`

---

## Project Structure
```
portfolio/
├── docs/
│   └── intent/
│       └── portfolio.md            # Confirmed statement of intent
├── public/
│   ├── models/
│   │   └── device.glb              # Optimized 3D phone glTF/GLB model (draco compressed)
│   ├── demos/                      # High-res Flutter screen captures / videos
│   └── assets/                     # Icons, static previews, resume PDF
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with fonts & metadata
│   │   ├── page.tsx                # Main single-page narrative flow
│   │   └── globals.css             # Dark theme design tokens & Tailwind utilities
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── Scene.tsx           # Global Three.js R3F Canvas with camera & lights
│   │   │   ├── PhoneModel.tsx      # Interactive 3D phone with screen video texture
│   │   │   └── CanvasFallback.tsx  # CSS 3D fallback for low-power devices
│   │   ├── sections/
│   │   │   ├── Hero.tsx            # Kinetic typography, intro, and floating 3D anchor
│   │   │   ├── Projects.tsx        # Scroll-linked mobile showcase syncing with 3D model
│   │   │   ├── Lab.tsx             # Bento grid for AI agents, CLI tools & utilities
│   │   │   ├── Philosophy.tsx      # 60fps standard, architecture, & craft
│   │   │   └── Contact.tsx         # Minimalist command palette / terminal footer
│   │   └── ui/                     # Reusable glass cards, badges, buttons, tooltips
│   ├── hooks/
│   │   ├── use-device-tier.ts      # Detects GPU tier / low-power mode for 3D scaling
│   │   └── use-scroll-progress.ts  # Smooth scroll coordinates for 3D camera tracks
│   ├── lib/
│   │   ├── projects-data.ts        # Typed project metadata, stack tags, & metrics
│   │   └── lab-data.ts             # AI agent / CLI tools metadata
│   └── types/
│       └── index.ts                # TypeScript interfaces for projects, lab, & 3D state
├── SPEC.md                         # This specification
├── tsconfig.json
└── package.json
```

---

## Code Style

### Architectural Conventions
- **Server vs. Client Components:** Page shell and static copy are Server Components by default; interactive canvas and animated widgets explicitly declare `'use client'`.
- **3D Optimization:** Three.js objects must be strictly cleaned up in `useEffect` or Drei managed lifecycle. Textures use compressed formats (WebP / WebM) and Draco mesh compression (< 200KB geometry).
- **Graceful Degradation:** Use `useDeviceTier()`: high-end desktop gets dynamic glass shaders & shadows; mobile/low-end gets simplified unlit materials or CSS 3D fallback.

### Sample Component Style
```tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';

interface PhoneModelProps {
  currentProjectIndex: number;
  isHovered: boolean;
}

export function PhoneModel({ currentProjectIndex, isHovered }: PhoneModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/device.glb');

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Smooth target rotation based on scroll & pointer
    const targetY = isHovered ? (state.pointer.x * Math.PI) / 8 : 0;
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetY,
      4,
      delta
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}
```

---

## Testing Strategy
- **Type Checking:** Strict TypeScript with `npx tsc --noEmit` on every build.
- **Component Tests:** Vitest + React Testing Library for data mapping, responsive visibility, and interactive UI components.
- **Visual & Performance Budget Auditing:**
  - Lighthouse performance score > 90 on desktop and mobile.
  - Core Web Vitals: LCP < 2.0s, CLS < 0.05, FID/INP < 100ms.
  - Stable 60 FPS verified with Chrome DevTools Performance Profiler.

---

## Boundaries

### Always
- Keep 3D assets lightweight (total initial model payload < 500KB).
- Provide immediate visual content (hero text and layout) before the 3D scene finishes loading via Suspense and ambient skeleton.
- Ensure 100% responsiveness on phone viewports (360px width to 4K ultrawide).
- Respect `prefers-reduced-motion` media query by disabling auto-rotation and heavy parallax.

### Ask First
- Adding external npm dependencies over 50KB.
- Changing primary color palette tokens or typography choices.
- Introducing multi-page routing instead of a tight narrative single-page structure.

### Never
- Never block initial page render waiting for Three.js assets to load.
- Never use uncompressed 3D models or raw 4K textures.
- Never autoplay loud audio or intrusive unprompted modal takeovers.
- Never sacrifice accessibility (all text must meet WCAG AA contrast standards).

---

## Success Criteria
1. **Initial Load:** First Contentful Paint (FCP) < 1.2s; 3D viewport stream-in without freezing the main thread.
2. **Smooth Interactions:** Zero jank or dropped frames during 3D device rotation and scroll transitions.
3. **Showcase Clarity:** Mobile engineering work (Flutter architecture, state management, UI polish) is immediately understandable in < 30 seconds of skimming.
4. **Lab Section:** Highlights AI agent experimentation and personal tooling with interactive depth.
5. **Call-to-Action:** Direct, friction-free way to copy email, download resume, and access GitHub / LinkedIn.

---

## Open Questions
- None blocking. Ready for implementation planning.
