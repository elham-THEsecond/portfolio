# Implementation Plan: 2025+ Interactive 3D Portfolio

**Design System & Principles Foundation:**
This plan synthesizes **Apple Design** (fluid physics, interruptible springs, 1:1 direct manipulation, materials & depth hierarchy, optical typography) with **UI/UX Pro Max** (dark obsidian tech aesthetic, strict WCAG 4.5:1 contrast, 60fps main-thread budget, token-driven architecture, and SVG vector iconography).

---

## 1. Architecture & Component Graph

```
[Design System & Tokens (globals.css, tailwind.config)]
                         │
        ┌────────────────┴────────────────┐
        ▼                                 ▼
[3D Viewport Subsystem]          [Narrative UI Layer]
  - Scene.tsx (R3F Canvas)         - Hero.tsx (Kinetic Title & CTAs)
  - PhoneModel.tsx (Device Canvas) - Projects.tsx (Scroll-synced Showcase)
  - ScreenMaterial.tsx (Textures)  - Lab.tsx (AI & CLI Bento Grid)
  - CanvasFallback.tsx (CSS 3D)    - Philosophy.tsx (60fps & Craft)
        │                          - Contact.tsx (Terminal / Palette)
        │                                 │
        └───────────────┬─────────────────┘
                        ▼
            [Scroll & Gesture Bridge]
              - useScrollProgress (dampened)
              - useDeviceTier (GPU detection)
              - useSpringInteraction (pointer physics)
```

### Component Dependencies:
1. **Foundation:** Next.js 15 scaffolding + Tailwind CSS + Design tokens + Type definitions.
2. **Gesture & Physics Core:** Custom hooks (`useDeviceTier`, `useScrollProgress`, spring utilities).
3. **3D Canvas Subsystem:** Canvas container with camera damping, lighting, 3D smartphone chassis, dynamic screen texture switcher, and CSS 3D fallback.
4. **Narrative Sections:**
   - **Hero:** Negative-tracking kinetic typography + floating 3D phone anchor.
   - **Projects (Flutter Focus):** Scroll-driven project stages synchronizing 3D phone rotation and app screen textures.
   - **Lab (AI / Systems Bento):** Translucent glass cards with terminal aesthetic for CLI tools and local AI agents.
   - **Philosophy & Contact:** Interactive craft manifesto and keyboard/command-palette contact prompt.
5. **Polishing & Performance Auditing:** Lighthouse score audit, frame-rate profiling (60fps), reduced-motion verification, responsive breakpoint testing (375px to 4K).

---

## 2. Design System & Interaction Specifications

### A. Material & Depth (Apple Design §12)
- **Base Background:** Deep Obsidian `#050507` / `#09090b`.
- **Glass Surfaces:** `background: rgba(255, 255, 255, 0.03)`, `backdrop-filter: blur(20px) saturate(180%)`.
- **Light Catching Rim:** `border-t: 1px solid rgba(255, 255, 255, 0.15)` on cards and floating bars to emulate physical specular reflection.
- **Hierarchy:** Heavy blur on sticky floating navigation (`blur(24px)`), medium blur on bento cards (`blur(16px)`), solid high-contrast foreground text (`#f4f4f5`).

### B. Motion & Physics (Apple Design §4 & §5)
- **Critically Damped Defaults:** `damping: 1.0, response: 0.35s` for menus, cards, and modal states (zero unwanted oscillation).
- **Momentum & Throw:** `damping: 0.8, response: 0.4s` for pointer drag release and 3D gyroscope tilt.
- **Interruptibility:** Gesture listeners track live pointer velocity and animate strictly from the element's current presentation value (no hard cuts or locked inputs).
- **Reduced Motion:** If `prefers-reduced-motion` is active, 3D model auto-rotation and heavy parallax are replaced with gentle cross-fades and static 2.5D representations.

### C. Typography & Optics (Apple Design §15 & UI/UX Pro Max)
- **Display Headings:** `-0.03em` negative letter-spacing, line-height `1.05`, bold weight (`font-semibold` / `font-bold`).
- **Body & Captions:** `0em` tracking, line-height `1.6`, high contrast (`#f4f4f5` on dark surface ≥ 4.5:1 ratio).
- **Code & Metrics:** Tabular figures (`font-mono font-variant-numeric: tabular-nums`) for technical metrics and terminal cards.

---

## 3. Implementation Order & Milestones

1. **Phase 1: Project Scaffolding & Design Foundation**
   - Initialize Next.js 15 app with TypeScript, Tailwind CSS, Lucide React, and Three.js / R3F dependencies.
   - Configure design tokens (obsidian colors, glass classes, spring configs, typography scale).
   - Establish content data structures (`projects-data.ts`, `lab-data.ts`).

2. **Phase 2: 3D Viewport & Physics Bridge**
   - Build `Scene.tsx` with optimized lighting, shadow maps, and responsive camera projection.
   - Implement `PhoneModel.tsx` with procedural materials (brushed titanium rim, ceramic back, sapphire camera lenses, screen canvas).
   - Create screen texture switcher and `CanvasFallback.tsx` for low-tier hardware.
   - Wire up pointer tracking and velocity-based damping.

3. **Phase 3: Narrative UI Sections**
   - Build `Hero.tsx` with entrance choreography and 3D device link.
   - Build `Projects.tsx` with sticky scroll tracking syncing project steps to 3D phone screen/angle changes.
   - Build `Lab.tsx` bento grid for AI agent and CLI tools showcasing interactive terminal previews.
   - Build `Philosophy.tsx` highlighting the 60fps standard and Flutter architecture.
   - Build `Contact.tsx` command palette / quick copy footer.

4. **Phase 4: Fluid Motion, Accessibility & Performance Optimization**
   - Fine-tune spring transitions, tap-down response (instant `scale(0.98)` feedback), and focus rings.
   - Implement `prefers-reduced-motion` and `prefers-contrast` adaptations.
   - Conduct memory leak checks on WebGL contexts and Draco model loading.
   - Run Lighthouse audit (FCP < 1.2s, LCP < 2.0s, CLS < 0.05).

---

## 4. Risks & Mitigation Strategies

| Risk | Impact | Mitigation |
|------|--------|------------|
| 3D canvas causes frame drops on low-end laptops/mobile | High | Integrate `useDeviceTier` hook. Lower pixel ratio to 1.0 or fall back to CSS 3D / optimized WebM video for low-power GPUs. |
| Model download delays hero render | High | Load R3F canvas inside React `Suspense` with an ambient glow placeholder; hero text renders instantly (zero layout shift). |
| Scroll synchronization jank between HTML and Three.js | Medium | Use `requestAnimationFrame` + `MathUtils.damp` to interpolate target camera/rotation angles rather than raw 1:1 scroll events. |
| Dark mode contrast violations | Medium | Verify all text colors against obsidian backgrounds using WCAG AA 4.5:1 minimums (e.g., `#f4f4f5` for body, `#a1a1aa` for secondary). |

---

## 5. Verification Checkpoints

- **Checkpoint 1 (Scaffold & Build):** `npm run build` succeeds without TypeScript or ESLint warnings.
- **Checkpoint 2 (3D FPS):** 3D phone renders at steady 60fps in Chrome DevTools Performance monitor during continuous mouse drag.
- **Checkpoint 3 (Scroll Sync):** Scrolling through the Projects section smoothly rotates the 3D phone to 3 distinct angles and cross-fades screen textures.
- **Checkpoint 4 (Accessibility & A11y):** Full keyboard tab navigation works; focus indicators are visible; `prefers-reduced-motion` switches off 3D rotations.
- **Checkpoint 5 (Lighthouse):** Lighthouse Performance score ≥ 90, Accessibility ≥ 95.
