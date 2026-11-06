'use client';

import React, { useState, useRef } from 'react';
import { ScreenContent } from '@/types';
import { Activity, Sliders, TrendingUp, Navigation, Battery, Wifi } from 'lucide-react';

interface CanvasFallbackProps {
  screenContent: ScreenContent;
  projectId?: string;
  className?: string;
}

/**
 * Ultra-crisp CSS 3D hardware-accelerated fallback container for low-power devices,
 * battery-saver mode, or environments lacking full WebGL hardware acceleration.
 * Provides identical visual fidelity and direct-manipulation tilt at locked 60fps.
 */
export const CanvasFallback: React.FC<CanvasFallbackProps> = ({
  screenContent,
  projectId = 'pulse-telemetry',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -y * 14, // tilt up/down
      y: x * 16, // tilt left/right
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const accent = screenContent.accentColor || '#22d3ee';

  const renderIcon = () => {
    switch (screenContent.icon) {
      case 'Activity':
        return <Activity className="w-5 h-5" style={{ color: accent }} />;
      case 'Sliders':
        return <Sliders className="w-5 h-5" style={{ color: accent }} />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" style={{ color: accent }} />;
      case 'Navigation':
        return <Navigation className="w-5 h-5" style={{ color: accent }} />;
      default:
        return <Activity className="w-5 h-5" style={{ color: accent }} />;
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center p-4 select-none perspective-[1200px] ${className}`}
      role="img"
      aria-label={`Interactive 3D preview of ${screenContent.title}`}
    >
      {/* Background Ambient Glow Behind Phone */}
      <div
        className="absolute w-72 h-96 rounded-full blur-[90px] opacity-25 pointer-events-none transition-colors duration-700"
        style={{ background: accent }}
      />

      {/* Phone Chassis Container with 3D transform */}
      <div
        className="relative w-[300px] h-[610px] rounded-[48px] p-[10px] bg-[#27272a] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.12)] transition-transform duration-200 ease-out preserve-3d"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1, 1, 1)`,
        }}
      >
        {/* Specular Rim Highlight */}
        <div className="absolute inset-0 rounded-[48px] pointer-events-none border-t border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />

        {/* Inner Phone Screen Enclosure */}
        <div className="relative w-full h-full rounded-[40px] bg-[#050507] overflow-hidden flex flex-col justify-between border border-white/10 shadow-[inset_0_0_24px_rgba(0,0,0,0.9)]">
          {/* Dynamic Island Pill */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20 flex items-center justify-between px-3 border border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#18181b]" />
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-[#09090b] border border-white/10" />
            </div>
          </div>

          {/* Status Bar */}
          <div className="pt-3 px-6 flex justify-between items-center text-[11px] font-mono text-zinc-400 z-10">
            <span>09:41</span>
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          {/* Screen Content Body */}
          <div className="flex-1 px-5 pt-8 pb-3 flex flex-col justify-between overflow-hidden">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span
                  className="text-[11px] font-mono uppercase tracking-wider font-semibold"
                  style={{ color: accent }}
                >
                  {screenContent.title}
                </span>
                {renderIcon()}
              </div>
              <h4 className="text-sm font-semibold text-zinc-100 tracking-tight">
                {screenContent.mockupData.headerTitle}
              </h4>
              <p className="text-[11px] font-mono text-zinc-400">{screenContent.subtitle}</p>
            </div>

            {/* Interactive Visualizer Surface */}
            <div className="my-2 h-36 rounded-xl bg-zinc-950/70 border border-white/5 relative overflow-hidden flex items-center justify-center">
              {/* Radial backdrop */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `radial-gradient(circle at center, ${accent} 0%, transparent 70%)`,
                }}
              />

              {/* Waveform / Visualizer Animation */}
              {projectId.includes('pulse') ? (
                <svg className="w-full h-24 overflow-visible px-2" viewBox="0 0 280 80">
                  <path
                    d="M 0 40 L 40 40 L 50 30 L 60 40 L 75 40 L 85 8 L 95 72 L 105 40 L 120 40 L 130 32 L 145 40 L 180 40 L 190 30 L 200 40 L 215 40 L 225 10 L 235 70 L 245 40 L 280 40"
                    fill="none"
                    stroke={accent}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  />
                  <line
                    x1="0"
                    y1="40"
                    x2="280"
                    y2="40"
                    stroke="rgba(255,255,255,0.08)"
                    strokeDasharray="4 4"
                  />
                </svg>
              ) : projectId.includes('aura') ? (
                <div className="relative flex items-center justify-center w-full h-full">
                  <div
                    className="absolute w-24 h-24 rounded-full border border-purple-500/30 animate-ping"
                    style={{ animationDuration: '3s' }}
                  />
                  <div className="absolute w-16 h-16 rounded-full border border-purple-500/50" />
                  <div
                    className="w-4 h-4 rounded-full shadow-[0_0_16px_rgba(168,85,247,0.8)]"
                    style={{ background: accent }}
                  />
                </div>
              ) : (
                <div className="w-full px-3 py-2 space-y-1.5 font-mono text-[10px]">
                  <div className="flex justify-between text-emerald-400">
                    <span>94,820.50</span>
                    <span className="w-16 h-2 bg-emerald-500/20 rounded-sm" />
                  </div>
                  <div className="flex justify-between text-emerald-400/80">
                    <span>94,815.00</span>
                    <span className="w-24 h-2 bg-emerald-500/30 rounded-sm" />
                  </div>
                  <div className="flex justify-between text-rose-400/80">
                    <span>94,830.00</span>
                    <span className="w-20 h-2 bg-rose-500/30 rounded-sm" />
                  </div>
                  <div className="flex justify-between text-rose-400">
                    <span>94,835.50</span>
                    <span className="w-28 h-2 bg-rose-500/20 rounded-sm" />
                  </div>
                </div>
              )}
            </div>

            {/* Metrics Chips */}
            <div className="grid grid-cols-3 gap-1.5 mb-2">
              {screenContent.mockupData.metrics.map((m, idx) => (
                <div key={idx} className="bg-white/[0.03] border border-white/5 rounded-lg p-1.5">
                  <div className="text-[9px] text-zinc-400 truncate">{m.label}</div>
                  <div className="text-[11px] font-mono font-bold text-zinc-100 truncate">
                    {m.val}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Events Feed */}
            <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2 space-y-1 text-[10px] font-mono">
              <div className="text-[9px] text-zinc-400 uppercase tracking-wider mb-1">
                Telemetry Log
              </div>
              {screenContent.mockupData.recentEvents.slice(0, 2).map((ev, idx) => (
                <div key={idx} className="flex items-center gap-1.5 truncate">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      background:
                        ev.status === 'ok' ? '#10b981' : ev.status === 'sync' ? accent : '#f59e0b',
                    }}
                  />
                  <span className="text-zinc-300 truncate">{ev.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Home Indicator Bar */}
          <div className="pb-2 flex justify-center">
            <div className="w-28 h-1 bg-white/40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
