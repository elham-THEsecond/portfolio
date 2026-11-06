'use client';

import { useState, useEffect } from 'react';
import { DeviceTier } from '@/types';

export interface DeviceCapabilities {
  tier: DeviceTier;
  isMobile: boolean;
  isLowPower: boolean;
  dpr: number;
  fpsTarget: 30 | 60 | 120;
  canRun3D: boolean;
  prefersReducedMotion: boolean;
  gpuRenderer?: string;
  hardwareConcurrency?: number;
}

const DEFAULT_CAPABILITIES: DeviceCapabilities = {
  tier: 'high',
  isMobile: false,
  isLowPower: false,
  dpr: 1.5,
  fpsTarget: 60,
  canRun3D: true,
  prefersReducedMotion: false,
};

/**
 * Assesses hardware and GPU capabilities to assign a device performance tier.
 * Enables selective degradation on low-power or mobile chipsets to guarantee 60fps locked.
 */
function analyzeDevice(): DeviceCapabilities {
  if (typeof window === 'undefined') {
    return DEFAULT_CAPABILITIES;
  }

  // 1. Reduced motion preference
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 2. Mobile detection
  const ua = navigator.userAgent || '';
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isTouchDevice =
    'ontouchstart' in window || navigator.maxTouchPoints > 0 || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
  const isMobile = isMobileUA || (isTouchDevice && window.innerWidth < 840);

  // 3. Hardware metrics
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const navWithMemory = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  const deviceMemory = navWithMemory.deviceMemory || 8;
  const isSaveData = Boolean(navWithMemory.connection?.saveData);

  // 4. WebGL GPU Analysis
  let canRun3D = false;
  let gpuRenderer = 'unknown';
  let isSoftwareGPU = false;
  let isHighEndGPU = false;

  try {
    const canvas = document.createElement('canvas');
    const gl =
      (canvas.getContext('webgl2') as WebGL2RenderingContext | null) ||
      (canvas.getContext('webgl') as WebGLRenderingContext | null) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

    if (gl) {
      canRun3D = true;
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        gpuRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
      } else {
        gpuRenderer = gl.getParameter(gl.RENDERER) || '';
      }

      const lowerRenderer = gpuRenderer.toLowerCase();
      // Detect software / fallback rasterizers
      isSoftwareGPU =
        lowerRenderer.includes('swiftshader') ||
        lowerRenderer.includes('llvmpipe') ||
        lowerRenderer.includes('software') ||
        lowerRenderer.includes('mesa offscreen');

      // Detect high-end desktop & modern mobile GPUs
      isHighEndGPU =
        lowerRenderer.includes('apple') ||
        lowerRenderer.includes('nvidia') ||
        lowerRenderer.includes('geforce') ||
        lowerRenderer.includes('rtx') ||
        lowerRenderer.includes('gtx') ||
        lowerRenderer.includes('radeon') ||
        lowerRenderer.includes('adreno (tm) 7') ||
        lowerRenderer.includes('adreno (tm) 8') ||
        lowerRenderer.includes('mali-g7') ||
        lowerRenderer.includes('mali-g9');
    }
  } catch {
    canRun3D = false;
    isSoftwareGPU = true;
  }

  // 5. Tier classification logic
  let tier: DeviceTier = 'medium';
  let isLowPower = isSaveData || isSoftwareGPU;

  if (!canRun3D || isSoftwareGPU || deviceMemory < 3 || hardwareConcurrency < 3) {
    tier = 'low';
    isLowPower = true;
  } else if (
    !isMobile &&
    isHighEndGPU &&
    hardwareConcurrency >= 6 &&
    deviceMemory >= 6 &&
    !prefersReducedMotion
  ) {
    tier = 'high';
  } else if (isMobile) {
    // Modern high-end mobile (Apple A15+ / Snapdragon 8 Gen 2+)
    if (isHighEndGPU && hardwareConcurrency >= 8 && deviceMemory >= 6) {
      tier = 'high';
    } else if (deviceMemory < 4 || hardwareConcurrency < 4) {
      tier = 'low';
      isLowPower = true;
    } else {
      tier = 'medium';
    }
  } else {
    tier = 'medium';
  }

  // 6. Device pixel ratio clamping (protect fill-rate budget)
  const rawDpr = window.devicePixelRatio || 1;
  let dpr = 1;
  if (tier === 'high') {
    dpr = Math.min(rawDpr, 2.0);
  } else if (tier === 'medium') {
    dpr = Math.min(rawDpr, 1.5);
  } else {
    dpr = 1.0;
  }

  // 7. Target frame rate
  let fpsTarget: 30 | 60 | 120 = 60;
  if (tier === 'low') {
    fpsTarget = 30;
  } else if (tier === 'high' && !isMobile) {
    fpsTarget = 120;
  } else {
    fpsTarget = 60;
  }

  return {
    tier,
    isMobile,
    isLowPower,
    dpr,
    fpsTarget,
    canRun3D: canRun3D && !isSoftwareGPU,
    prefersReducedMotion,
    gpuRenderer,
    hardwareConcurrency,
  };
}

/**
 * React hook returning live hardware capabilities and device performance tier.
 * SSR safe: initializes with neutral baseline and re-evaluates on mount.
 */
export function useDeviceTier(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>(DEFAULT_CAPABILITIES);

  useEffect(() => {
    const caps = analyzeDevice();
    setCapabilities(caps);

    // Listen for reduced motion changes
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handleChange = () => {
        setCapabilities(analyzeDevice());
      };

      mediaQuery.addEventListener?.('change', handleChange);
      return () => mediaQuery.removeEventListener?.('change', handleChange);
    }
  }, []);

  return capabilities;
}
