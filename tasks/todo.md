# Tasks: 2025+ Interactive 3D Portfolio Implementation

## Phase 1: Project Scaffolding & Design System Tokens

- [x] Task: Initialize Next.js 15 application with Tailwind CSS and TypeScript
  - Acceptance: Clean Next.js 15 project setup under `/home/elham/portfolio` with valid `package.json`, `tsconfig.json`, and dependencies installed (`three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`).
  - Verify: Run `npm run build` to ensure clean initial build with zero errors.
  - Files: `package.json`, `tsconfig.json`, `next.config.ts`, `.gitignore`, `postcss.config.mjs`

- [x] Task: Establish Design System tokens & global obsidian styles
  - Acceptance: `globals.css` configured with obsidian palette tokens (`#050507`), glassmorphic utility classes (`backdrop-blur-xl`, border-white/10 highlights), negative tracking typography rules, and custom scrollbar styles.
  - Verify: Inspect compiled CSS or test server rendering to confirm root CSS variables and utility classes are present.
  - Files: `src/app/globals.css`, `src/app/layout.tsx`

- [x] Task: Create typed data sources for Flutter projects and Systems Lab
  - Acceptance: Typed TypeScript models and real content data files for flagship mobile apps (e.g. Flutter architecture, BLoC/Riverpod, custom shaders, video/demo references) and AI agent / CLI tools.
  - Verify: Run `npx tsc --noEmit` to verify type safety across data exports.
  - Files: `src/types/index.ts`, `src/lib/projects-data.ts`, `src/lib/lab-data.ts`

---

## Phase 2: 3D Viewport Subsystem & Physics Bridge

- [x] Task: Implement device tier and scroll physics hooks
  - Acceptance: `useDeviceTier` hook detects high/medium/low GPU capabilities; `useScrollProgress` hook returns dampened normalized scroll coordinates with interruptible velocity tracking.
  - Verify: Unit test or component mount test confirming hooks return valid numbers and adapt to screen dimensions.
  - Files: `src/hooks/use-device-tier.ts`, `src/hooks/use-scroll-progress.ts`

- [x] Task: Build interactive 3D Smartphone component with dynamic screen material
  - Acceptance: Three.js/R3F procedural device chassis (brushed titanium edges, curved glass, camera bump) that accepts dynamic screen textures (canvas/video/shaders) and dampens tilt on pointer move.
  - Verify: Render canvas standalone; confirm 3D phone model renders with lighting and responds smoothly to cursor hover.
  - Files: `src/components/canvas/PhoneModel.tsx`, `src/components/canvas/ScreenMaterial.tsx`

- [x] Task: Build Canvas container and graceful CSS 3D fallback
  - Acceptance: `Scene.tsx` hosts the R3F Canvas with camera controls and Suspense boundary; `CanvasFallback.tsx` provides an ultra-crisp CSS 3D/video presentation on low-power devices.
  - Verify: Toggle low-tier flag to confirm seamless fallback render without console errors.
  - Files: `src/components/canvas/Scene.tsx`, `src/components/canvas/CanvasFallback.tsx`

---

## Phase 3: Narrative UI Sections

- [x] Task: Implement Hero section with kinetic typography and 3D anchor
  - Acceptance: Hero component featuring display typography with optical negative tracking (`-0.03em`), status badge ("Available for high-impact mobile roles"), quick action buttons, and dock for the 3D phone canvas.
  - Verify: Run `npm run dev` and visually verify Hero layout, responsive typography, and instant touch-down feedback.
  - Files: `src/components/sections/Hero.tsx`, `src/components/ui/Badge.tsx`, `src/components/ui/Button.tsx`

- [x] Task: Implement Flagship Projects section with scroll-driven 3D synchronization
  - Acceptance: Sticky layout where scrolling through Flutter case study cards triggers smooth 3D phone rotation and updates screen textures for each project.
  - Verify: Scroll through Projects section in browser; verify phone rotates between angles (front, isometric tilt, side profile) matching project cards.
  - Files: `src/components/sections/Projects.tsx`, `src/components/ui/ProjectCard.tsx`

- [x] Task: Implement Systems & Lab bento grid
  - Acceptance: Translucent glass bento grid showcasing AI agent frameworks, CLI utilities, and bespoke developer tools with interactive terminal preview blocks and status indicators.
  - Verify: Verify bento cards maintain WCAG AA contrast (≥4.5:1) and cards expand/reveal terminal snippets on click.
  - Files: `src/components/sections/Lab.tsx`, `src/components/ui/TerminalCard.tsx`

- [x] Task: Implement Philosophy & Craft section
  - Acceptance: "The 60fps Standard" narrative highlighting fluid widget composition, state architecture (Riverpod/BLoC), memory discipline, and native platform integration.
  - Verify: Check typography rhythm, spacing tokens (8dp system), and responsive wrapping on mobile.
  - Files: `src/components/sections/Philosophy.tsx`

- [x] Task: Implement Contact command palette & footer
  - Acceptance: Minimalist terminal-style contact block with one-click email copy (with toast confirmation), social links (GitHub, LinkedIn, X), and resume download CTA.
  - Verify: Test email copy action and ensure copy toast triggers with spring animation.
  - Files: `src/components/sections/Contact.tsx`, `src/components/ui/Toast.tsx`

---

## Phase 4: Integration, Polish & Performance Verification

- [x] Task: Assemble main narrative page layout with floating navigation
  - Acceptance: Single-page narrative flow assembled in `src/app/page.tsx` with floating glass pill navbar (`backdrop-filter: blur(20px)`), section indicators, and sound/reduced-motion toggle.
  - Verify: Full page scroll test; all section anchors navigate smoothly with dampened springs.
  - Files: `src/app/page.tsx`, `src/components/ui/Navbar.tsx`

- [x] Task: Implement accessibility, keyboard navigation, and reduced-motion modes
  - Acceptance: Full keyboard focus rings (2px ring with high contrast), skip-to-content link, aria-labels for 3D canvas, and complete fallback animations for `prefers-reduced-motion`.
  - Verify: Tab through entire site with keyboard only; test with `@media (prefers-reduced-motion: reduce)`.
  - Files: `src/app/globals.css`, `src/components/canvas/Scene.tsx`, `src/components/ui/Navbar.tsx`

- [x] Task: Performance audit and production build verification
  - Acceptance: `npm run build` generates optimized static bundle; Lighthouse performance score ≥ 90; WebGL memory properly disposed on unmount.
  - Verify: Run `npm run build` and measure Chrome DevTools FPS (locked at 60fps during scroll).
  - Files: `next.config.ts`, `src/app/layout.tsx`
