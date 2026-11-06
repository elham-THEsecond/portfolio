'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { PhoneModel } from './PhoneModel';
import { CanvasFallback } from './CanvasFallback';
import { useDeviceTier } from '@/hooks/use-device-tier';
import { ScreenContent } from '@/types';

export interface SceneProps {
  targetRotation?: [number, number, number];
  targetPosition?: [number, number, number];
  targetScale?: number;
  activeProjectId?: string;
  screenContent: ScreenContent;
  interactive?: boolean;
  className?: string;
}

/**
 * 3D Viewport Scene orchestrator with device tier awareness and graceful degradation.
 * Renders WebGL Three.js canvas on high/medium hardware, or drops down to CSS 3D fallback
 * on low-power devices, reduced-motion preferences, or environments without WebGL.
 */
export const Scene: React.FC<SceneProps> = ({
  targetRotation = [0.08, -0.25, 0.04],
  targetPosition = [0, 0, 0],
  targetScale = 1,
  activeProjectId = 'pulse-telemetry',
  screenContent,
  interactive = true,
  className = '',
}) => {
  const { tier, canRun3D, dpr, prefersReducedMotion } = useDeviceTier();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR Safe Hydration Guard: Render fallback on server to ensure deterministic HTML
  if (!mounted) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
        <CanvasFallback
          screenContent={screenContent}
          projectId={activeProjectId}
          className="w-full h-full"
        />
      </div>
    );
  }

  // Graceful degradation for low tier or reduced motion
  if (!canRun3D || tier === 'low' || prefersReducedMotion) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
        <CanvasFallback
          screenContent={screenContent}
          projectId={activeProjectId}
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full ${className}`}
      role="region"
      aria-label="Interactive 3D device preview"
    >
      <Suspense
        fallback={
          <CanvasFallback
            screenContent={screenContent}
            projectId={activeProjectId}
            className="w-full h-full"
          />
        }
      >
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 40 }}
          dpr={dpr}
          gl={{
            antialias: tier === 'high',
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full"
        >
          {/* Studio Lighting Hierarchy */}
          <ambientLight intensity={0.55} />
          {/* Main Key Rim Light */}
          <directionalLight position={[4, 5, 4]} intensity={1.5} />
          {/* Cool Blue Fill Light */}
          <directionalLight position={[-4, -3, -2]} intensity={0.45} color="#38bdf8" />
          {/* Dynamic Ambient Accent Backlight */}
          <pointLight
            position={[0, 0, -2]}
            intensity={1.2}
            color={screenContent.accentColor || '#22d3ee'}
          />

          {/* Interactive Procedural 3D Phone Chassis */}
          <PhoneModel
            targetRotation={targetRotation}
            targetPosition={targetPosition}
            targetScale={targetScale}
            activeProjectId={activeProjectId}
            screenContent={screenContent}
            interactive={interactive}
          />

          {/* Contact Shadows grounding the device */}
          <ContactShadows
            position={[0, -1.95, 0]}
            opacity={0.45}
            scale={5.5}
            blur={2.4}
            far={3.5}
            color="#000000"
          />
        </Canvas>
      </Suspense>
    </div>
  );
};
