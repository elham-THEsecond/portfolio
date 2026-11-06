'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { ScreenContent } from '@/types';

interface ScreenMaterialProps {
  screenContent: ScreenContent;
  projectId?: string;
  isInteractive?: boolean;
}

const CANVAS_WIDTH = 512;
const CANVAS_HEIGHT = 1024;

export const ScreenMaterial: React.FC<ScreenMaterialProps> = ({
  screenContent,
  projectId = 'pulse-telemetry',
}) => {
  const timeRef = useRef<number>(0);
  const lastDrawRef = useRef<number>(0);

  // Initialize offscreen canvas once
  const canvas = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const c = document.createElement('canvas');
    c.width = CANVAS_WIDTH;
    c.height = CANVAS_HEIGHT;
    return c;
  }, []);

  // Initialize CanvasTexture with proper color space and filtering
  const texture = useMemo(() => {
    if (!canvas) return null;
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    return tex;
  }, [canvas]);

  // Clean up texture on unmount
  useEffect(() => {
    return () => {
      texture?.dispose();
    };
  }, [texture]);

  // Animation draw loop inside useFrame
  useFrame((_, delta) => {
    if (!canvas || !texture) return;

    timeRef.current += delta;
    const now = performance.now();

    // Throttle canvas texture re-rasterization to ~45-60 fps for efficiency
    if (now - lastDrawRef.current < 16) return;
    lastDrawRef.current = now;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const t = timeRef.current;
    const accent = screenContent.accentColor || '#22d3ee';

    // 1. Clear background with obsidian gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    bgGrad.addColorStop(0, '#09090d');
    bgGrad.addColorStop(0.5, '#050507');
    bgGrad.addColorStop(1, '#020204');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Accent ambient glow orb at center
    const radial = ctx.createRadialGradient(
      CANVAS_WIDTH / 2,
      380,
      20,
      CANVAS_WIDTH / 2,
      380,
      280
    );
    radial.addColorStop(0, `${accent}22`);
    radial.addColorStop(0.7, `${accent}05`);
    radial.addColorStop(1, 'transparent');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 100, CANVAS_WIDTH, 560);

    // 2. Status Bar (09:41, Cellular, Wifi, Battery)
    ctx.fillStyle = '#ffffff';
    ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Geist", sans-serif';
    ctx.fillText('09:41', 40, 52);

    // Cellular & Battery icons
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    // Battery pill
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 2;
    ctx.strokeRect(CANVAS_WIDTH - 76, 36, 32, 16);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(CANVAS_WIDTH - 74, 38, 22, 12);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillRect(CANVAS_WIDTH - 44, 41, 3, 6);

    // 3. Header & Dynamic Title
    ctx.fillStyle = accent;
    ctx.font = '700 14px "Geist Mono", monospace';
    ctx.fillText(screenContent.title, 40, 110);

    ctx.fillStyle = '#f4f4f5';
    ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Geist", sans-serif';
    ctx.fillText(screenContent.mockupData.headerTitle, 40, 142);

    ctx.fillStyle = 'rgba(161, 161, 170, 0.8)';
    ctx.font = '14px "Geist Mono", monospace';
    ctx.fillText(screenContent.subtitle, 40, 168);

    // 4. Interactive Visualizer Surface according to Project Archetype
    if (projectId.includes('pulse') || screenContent.type === 'shader') {
      // PULSE TELEMETRY: ECG Waveform with glow
      // Background subtle grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 40; x < CANVAS_WIDTH - 40; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 210);
        ctx.lineTo(x, 480);
        ctx.stroke();
      }
      for (let y = 210; y < 480; y += 24) {
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(CANVAS_WIDTH - 40, y);
        ctx.stroke();
      }

      // Live waveform
      ctx.save();
      ctx.strokeStyle = accent;
      ctx.lineWidth = 3;
      ctx.shadowColor = accent;
      ctx.shadowBlur = 12;

      ctx.beginPath();
      const waveWidth = CANVAS_WIDTH - 80;
      const centerY = 345;

      for (let x = 0; x <= waveWidth; x += 3) {
        const globalX = 40 + x;
        const phase = (x / waveWidth) * 4.0 - t * 1.5;
        const normPhase = ((phase % 1) + 1) % 1;

        // Simulate P-Q-R-S-T cardiac waveform mathematically
        let dy = 0;
        if (normPhase > 0.15 && normPhase < 0.25) {
          // P wave
          dy = Math.sin((normPhase - 0.15) * 10 * Math.PI) * 14;
        } else if (normPhase >= 0.32 && normPhase < 0.35) {
          // Q dip
          dy = -Math.sin((normPhase - 0.32) * 33 * Math.PI) * 18;
        } else if (normPhase >= 0.35 && normPhase < 0.42) {
          // R spike
          dy = Math.sin((normPhase - 0.35) * 14.28 * Math.PI) * 95;
        } else if (normPhase >= 0.42 && normPhase < 0.46) {
          // S dip
          dy = -Math.sin((normPhase - 0.42) * 25 * Math.PI) * 28;
        } else if (normPhase >= 0.55 && normPhase < 0.72) {
          // T wave
          dy = Math.sin((normPhase - 0.55) * 5.88 * Math.PI) * 26;
        }

        const y = centerY - dy;
        if (x === 0) ctx.moveTo(globalX, y);
        else ctx.lineTo(globalX, y);
      }
      ctx.stroke();
      ctx.restore();

      // Sweeping lead scanline
      const sweepX = 40 + (((t * 120) % waveWidth) + waveWidth) % waveWidth;
      const scanGrad = ctx.createLinearGradient(sweepX - 40, 0, sweepX, 0);
      scanGrad.addColorStop(0, 'transparent');
      scanGrad.addColorStop(1, `${accent}88`);
      ctx.fillStyle = scanGrad;
      ctx.fillRect(sweepX - 40, 210, 40, 270);
    } else if (projectId.includes('aura')) {
      // AURA SPATIAL SYNTH: Polyphonic Matrix & Soundwaves
      const cx = CANVAS_WIDTH / 2;
      const cy = 345;

      // Concentric resonant rings
      for (let r = 1; r <= 4; r++) {
        const radius = r * 38 + Math.sin(t * 2 + r) * 6;
        ctx.strokeStyle = `${accent}${Math.floor(25 + r * 15).toString(16)}`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Orbital polyphonic nodes
      const nodeCount = 8;
      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2 + t * 0.4 * (i % 2 === 0 ? 1 : -0.7);
        const dist = 75 + Math.sin(t * 3 + i) * 35;
        const nx = cx + Math.cos(angle) * dist;
        const ny = cy + Math.sin(angle) * dist;

        ctx.strokeStyle = `${accent}44`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        ctx.save();
        ctx.fillStyle = accent;
        ctx.shadowColor = accent;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(nx, ny, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Bottom audio frequency spectrum
      const barCount = 24;
      const barWidth = 12;
      const startX = 50;
      for (let b = 0; b < barCount; b++) {
        const height = Math.abs(Math.sin(t * 4 + b * 0.4)) * 50 + 8;
        const bx = startX + b * 17;
        const by = 470 - height;
        ctx.fillStyle = `${accent}cc`;
        ctx.fillRect(bx, by, barWidth, height);
      }
    } else if (projectId.includes('vertex')) {
      // VERTEX TERMINAL: Crypto Orderbook L2 & Candlestick Tape
      // Price Banner
      ctx.fillStyle = '#10b981';
      ctx.font = '700 28px "Geist Mono", monospace';
      ctx.fillText('$94,820.50', 40, 235);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.7)';
      ctx.font = '14px "Geist Mono", monospace';
      ctx.fillText('▲ +4.24% • 24H HIGH $96,100', 40, 260);

      // Orderbook Depth bars
      const rowCount = 7;
      const startY = 280;
      for (let i = 0; i < rowCount; i++) {
        const y = startY + i * 26;
        const isBid = i < 4;
        const color = isBid ? '#10b981' : '#ef4444';
        const depth = Math.min(Math.abs(Math.sin(t * 1.5 + i * 0.8)) * 160 + 30, 200);

        ctx.fillStyle = `${color}18`;
        ctx.fillRect(CANVAS_WIDTH - 40 - depth, y, depth, 20);

        ctx.fillStyle = color;
        ctx.font = '13px "Geist Mono", monospace';
        const price = (94820 - (i - 2) * 12.5).toFixed(1);
        ctx.fillText(price, 45, y + 15);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.textAlign = 'right';
        ctx.fillText((Math.sin(i * 3 + t) * 1.4 + 2.1).toFixed(3), CANVAS_WIDTH - 45, y + 15);
        ctx.textAlign = 'left';
      }
    } else {
      // KITE SPATIAL GIS: Drone Radar & Waypoints
      const cx = CANVAS_WIDTH / 2;
      const cy = 345;

      // Radar rings
      ctx.strokeStyle = `${accent}33`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 110, 0, Math.PI * 2);
      ctx.arc(cx, cy, 75, 0, Math.PI * 2);
      ctx.arc(cx, cy, 40, 0, Math.PI * 2);
      ctx.stroke();

      // Radar sweep line
      const sweepAngle = t * 1.8;
      ctx.save();
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.shadowColor = accent;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweepAngle) * 110, cy + Math.sin(sweepAngle) * 110);
      ctx.stroke();
      ctx.restore();

      // Drone coordinates
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px "Geist Mono", monospace';
      ctx.fillText('UAV-01: 37.7749° N, 122.4194° W', 40, 480);
    }

    // 5. Metrics Cards Row (Glassmorphic look)
    const cardY = 515;
    const cardWidth = (CANVAS_WIDTH - 80 - 16) / 3;
    const cardHeight = 72;

    screenContent.mockupData.metrics.forEach((m, idx) => {
      const x = 40 + idx * (cardWidth + 8);
      // Card bg
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.fillRect(x, cardY, cardWidth, cardHeight);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.strokeRect(x, cardY, cardWidth, cardHeight);

      // Label
      ctx.fillStyle = 'rgba(161, 161, 170, 0.9)';
      ctx.font = '11px -apple-system, sans-serif';
      ctx.fillText(m.label, x + 10, cardY + 22);

      // Value
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 15px "Geist Mono", monospace';
      ctx.fillText(m.val, x + 10, cardY + 50);
    });

    // 6. Recent Event Logs (Terminal / Audit Feed)
    const logY = 615;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
    ctx.fillRect(40, logY, CANVAS_WIDTH - 80, 280);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.strokeRect(40, logY, CANVAS_WIDTH - 80, 280);

    ctx.fillStyle = 'rgba(161, 161, 170, 0.6)';
    ctx.font = '11px "Geist Mono", monospace';
    ctx.fillText('SYSTEM // REAL-TIME EVENT STREAM', 54, logY + 26);

    screenContent.mockupData.recentEvents.forEach((ev, idx) => {
      const ey = logY + 58 + idx * 70;
      // Status dot
      ctx.fillStyle = ev.status === 'ok' ? '#10b981' : ev.status === 'sync' ? accent : '#f59e0b';
      ctx.beginPath();
      ctx.arc(58, ey - 4, 4, 0, Math.PI * 2);
      ctx.fill();

      // Event Name
      ctx.fillStyle = '#f4f4f5';
      ctx.font = '600 13px -apple-system, sans-serif';
      ctx.fillText(ev.name, 72, ey);

      // Detail
      ctx.fillStyle = 'rgba(161, 161, 170, 0.75)';
      ctx.font = '11px "Geist Mono", monospace';
      ctx.fillText(ev.detail, 72, ey + 20);
    });

    // 7. Home Indicator Pill at bottom
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    const homeW = 140;
    const homeH = 5;
    const homeX = (CANVAS_WIDTH - homeW) / 2;
    const homeY = CANVAS_HEIGHT - 32;
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(homeX, homeY, homeW, homeH, 3);
    } else {
      ctx.rect(homeX, homeY, homeW, homeH);
    }
    ctx.fill();

    // Mark texture as needing upload to GPU
    texture.needsUpdate = true;
  });

  if (!texture) return null;

  return (
    <meshStandardMaterial
      map={texture}
      emissiveMap={texture}
      emissive={new THREE.Color('#ffffff')}
      emissiveIntensity={0.35}
      roughness={0.12}
      metalness={0.05}
    />
  );
};
