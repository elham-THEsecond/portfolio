'use client';

import React from 'react';
import { LAB_ITEMS } from '@/lib/lab-data';
import { TerminalCard } from '@/components/ui/TerminalCard';
import { Badge } from '@/components/ui/Badge';
import { Terminal, Sparkles, Cpu } from 'lucide-react';

export const Lab: React.FC = () => {
  return (
    <section
      id="lab"
      aria-label="Systems Lab and Developer Tooling"
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-purple-600/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="pill">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              Systems Lab & AI Tooling
            </Badge>
            <Badge variant="outline" className="text-zinc-400">
              Open-Source Utilities
            </Badge>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-100">
            Developer tools & autonomous{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              codebase intelligence.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            From Dart VM frame-profiling CLIs and AST knowledge graph generators to multi-engine
            binary deconstruction suites. Engineered to eliminate latency, reveal hidden god-nodes,
            and inspect mobile internals.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LAB_ITEMS.map((item) => (
            <TerminalCard key={item.id} item={item} />
          ))}

          {/* Interactive Lab Callout Bento Tile */}
          <div className="glass-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-cyan-500/20 bg-gradient-to-b from-cyan-950/20 to-black shadow-[0_12px_40px_-12px_rgba(34,211,238,0.15)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </span>
                <span className="text-[11px] font-mono text-cyan-300 font-semibold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                  RESEARCH & LAB
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold font-mono tracking-tight text-zinc-100">
                  AST & Reverse Engineering
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed pt-2">
                  Actively exploring graph-theoretic code representations, LLM-driven architectural
                  refactoring, and hardware-accelerated shader pipelines for Next-Gen Flutter Impeller.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5 text-zinc-300">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Zero-Latency Focus</span>
              </div>
              <a
                href="/demo"
                className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
              >
                <span>Live Shader Demo</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
