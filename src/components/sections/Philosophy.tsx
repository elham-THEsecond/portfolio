'use client';

import React from 'react';
import { PHILOSOPHY_PILLARS } from '@/lib/lab-data';
import { Badge } from '@/components/ui/Badge';
import { Compass, Zap, Cpu, Layers, Terminal } from 'lucide-react';

export const Philosophy: React.FC = () => {
  const getPillarIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Zap className="w-4 h-4 text-cyan-400" />;
      case 1:
        return <Compass className="w-4 h-4 text-purple-400" />;
      case 2:
        return <Layers className="w-4 h-4 text-emerald-400" />;
      case 3:
        return <Cpu className="w-4 h-4 text-blue-400" />;
      default:
        return <Terminal className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <section
      id="philosophy"
      aria-label="Engineering Philosophy and Craft"
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-emerald-500/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="pill">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              Engineering Manifesto
            </Badge>
            <Badge variant="outline" className="text-zinc-400">
              The 60fps Standard
            </Badge>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-100">
            Craft is not decorative.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              It is the architecture.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Four uncompromised engineering tenets governing every line of code, gesture interaction,
            and state graph in production.
          </p>
        </div>

        {/* 4 Pillars Grid (2x2 on lg) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PHILOSOPHY_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="glass-panel rounded-2xl p-7 sm:p-9 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all duration-300 relative group shadow-[0_16px_48px_-12px_rgba(0,0,0,0.6)]"
            >
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl font-mono font-bold text-zinc-600 group-hover:text-cyan-400/80 transition-colors">
                      {pillar.number}
                    </span>
                    <span className="p-2 rounded-lg bg-white/5 border border-white/10">
                      {getPillarIcon(idx)}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-white/5 text-zinc-300 border border-white/10">
                    {pillar.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-zinc-100 group-hover:text-white">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-mono font-medium text-cyan-400 pt-0.5">
                    {pillar.subtitle}
                  </div>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed pt-2">
                  {pillar.manifesto}
                </p>
              </div>

              {/* Technical Execution Rule */}
              <div className="mt-6 pt-5 border-t border-white/5 space-y-3">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Hard Technical Constraint</span>
                  </div>
                  <div className="text-xs font-mono text-zinc-300 leading-relaxed">
                    {pillar.technicalRule}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {pillar.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-zinc-400 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
