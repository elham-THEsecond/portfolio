'use client';

import React from 'react';
import { WebGLShader } from '@/components/ui/web-gl-shader';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { Button } from '@/components/ui/Button';
import { Scene } from '@/components/canvas/Scene';
import { PROJECTS } from '@/lib/projects-data';
import { Terminal, FileText, Sparkles, Cpu } from 'lucide-react';

export const Hero: React.FC = () => {
  const flagshipProject = PROJECTS[0]; // Pulse Telemetry

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background WebGL Chromatic Aberration Shader */}
      <WebGLShader className="absolute inset-0 w-full h-full block pointer-events-none -z-10 opacity-70" />

      {/* Ambient Radial Vignette */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,#050507_90%] pointer-events-none -z-10" />

      {/* Double-Framed Demo Hero Container */}
      <div className="relative border border-[#27272a] p-2.5 sm:p-3.5 w-full mx-auto max-w-6xl rounded-3xl backdrop-blur-2xl bg-black/60 shadow-[0_32px_100px_-20px_rgba(0,0,0,0.95)] z-10">
        <main className="relative border border-[#27272a] rounded-2xl py-12 px-6 sm:px-10 overflow-hidden glass-panel flex flex-col items-center text-center">
          {/* Top Tech Stack Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 mb-6">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Flutter 3.x • Impeller Shaders • C++ FFI • 120Hz</span>
          </div>

          {/* Master Headline with negative optical tracking */}
          <h1 className="mb-4 text-white text-center text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter md:text-[clamp(2.5rem,7.5vw,6.5rem)] leading-none select-none">
            Design is Everything
          </h1>

          {/* Subtitle */}
          <p className="text-white/70 max-w-2xl mx-auto px-4 text-center text-sm sm:text-base md:text-lg leading-relaxed">
            Lead Flutter & Mobile Systems Engineer. Unleashing fluid 120Hz interaction through custom
            Impeller GLSL shaders, Dart Isolates, and physical direct manipulation.
          </p>

          {/* Status Indicator from Demo */}
          <div className="my-7 flex items-center justify-center gap-2">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <p className="text-xs sm:text-sm font-mono text-emerald-400">
              Available for High-Impact Mobile Roles
            </p>
          </div>

          {/* Action CTAs featuring LiquidButton */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
            <a href="#projects" className="inline-block">
              <LiquidButton
                className="text-white border border-white/20 rounded-full px-8 py-3 text-sm sm:text-base font-semibold shadow-[0_0_24px_rgba(255,255,255,0.12)] hover:shadow-[0_0_36px_rgba(34,211,238,0.35)]"
                size="xl"
              >
                {"Explore Architecture"}
              </LiquidButton>
            </a>

            <Button
              href="#lab"
              variant="secondary"
              size="lg"
              icon={<Terminal className="w-4 h-4 text-cyan-400" />}
              className="rounded-full"
            >
              Systems Lab & AST
            </Button>

            <Button
              href="/assets/Elham_Mobile_Engineer_Resume.pdf"
              target="_blank"
              variant="outline"
              size="lg"
              icon={<FileText className="w-4 h-4 text-zinc-400" />}
              className="rounded-full"
            >
              Resume
            </Button>
          </div>

          {/* Interactive 3D Smartphone Viewport Showcase */}
          <div className="w-full max-w-4xl relative flex flex-col items-center justify-center mb-10">
            {/* Viewport Frame with Ambient Halo */}
            <div className="relative w-full h-[460px] sm:h-[540px] md:h-[600px] flex items-center justify-center">
              {/* Radial glow directly behind the 3D phone */}
              <div className="absolute w-80 h-80 rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />

              {/* 3D Scene */}
              <div className="w-full h-full relative">
                <Scene
                  targetRotation={flagshipProject.phoneTransform.rotation}
                  targetPosition={flagshipProject.phoneTransform.position}
                  targetScale={flagshipProject.phoneTransform.scale}
                  activeProjectId={flagshipProject.slug}
                  screenContent={flagshipProject.screenContent}
                  interactive={true}
                />
              </div>

              {/* Floating Live Telemetry Chip */}
              <div className="absolute bottom-4 left-4 sm:left-12 glass-panel py-2 px-3.5 rounded-xl flex items-center gap-2.5 z-20 pointer-events-none shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                <div className="text-left font-mono">
                  <div className="text-[10px] text-zinc-400">PULSE // IMPELLER SHADER</div>
                  <div className="text-xs font-semibold text-zinc-100">120Hz ProMotion Sync</div>
                </div>
              </div>

              {/* Floating Direct Manipulation Tip */}
              <div className="absolute top-4 right-4 sm:right-12 glass-pill py-1.5 px-3 rounded-full flex items-center gap-1.5 z-20 pointer-events-none text-[11px] font-mono text-zinc-400">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Direct Tilt 1:1</span>
              </div>
            </div>
          </div>

          {/* Key Metrics Bar */}
          <div className="pt-8 w-full border-t border-white/[0.08]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-zinc-100 flex items-center justify-center gap-1">
                  <span className="text-cyan-400">8.2</span>ms
                </div>
                <div className="text-xs text-zinc-400 font-sans">120Hz Frame Budget</div>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-zinc-100">
                  0.01%
                </div>
                <div className="text-xs text-zinc-400 font-sans">Production Crash Rate</div>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-zinc-100">
                  5.2K/s
                </div>
                <div className="text-xs text-zinc-400 font-sans">Zero-Alloc Stream Decodes</div>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-zinc-100">
                  10M+
                </div>
                <div className="text-xs text-zinc-400 font-sans">Offline GIS Geo-Points</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};
