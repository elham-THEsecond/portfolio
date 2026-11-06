'use client';

import React, { useState } from 'react';
import { LabItem } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Terminal,
  Copy,
  Check,
  Star,
  Github,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Code2,
  Cpu,
  ShieldAlert,
  Flame,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TerminalCardProps {
  item: LabItem;
  className?: string;
}

export const TerminalCard: React.FC<TerminalCardProps> = ({ item, className }) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item.terminal?.command) return;
    navigator.clipboard.writeText(item.terminal.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryIcon = () => {
    switch (item.category) {
      case 'ai-agent':
        return <Code2 className="w-4 h-4 text-purple-400" />;
      case 'cli-tool':
        return <Terminal className="w-4 h-4 text-cyan-400" />;
      case 'runtime':
        return <ShieldAlert className="w-4 h-4 text-emerald-400" />;
      case 'benchmark':
        return <Flame className="w-4 h-4 text-amber-400" />;
      default:
        return <Cpu className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn(
        'glass-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative border border-white/10 hover:border-white/20 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)] group cursor-pointer',
        item.bentoSize === 'wide' ? 'md:col-span-2' : 'col-span-1',
        className
      )}
    >
      {/* Top Header Row */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-white/5 border border-white/10">
              {getCategoryIcon()}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-mono tracking-tight text-zinc-100 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <span className="text-[11px] font-mono text-zinc-400 px-1.5 py-0.5 rounded bg-white/5 border border-white/5">
                  {item.version}
                </span>
              </div>
              <div className="text-xs font-mono text-zinc-400 capitalize">
                {item.category.replace('-', ' ')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {item.stars && (
              <div className="flex items-center gap-1 text-xs font-mono text-amber-300 bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20">
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                <span>{item.stars}</span>
              </div>
            )}
            <Badge
              variant={item.status === 'active' ? 'status' : 'outline'}
              dotColor={item.status === 'active' ? 'emerald' : 'cyan'}
              className="text-[11px]"
            >
              {item.status}
            </Badge>
          </div>
        </div>

        {/* Tagline & Description */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-zinc-200 leading-snug">{item.tagline}</p>
          <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
        </div>
      </div>

      {/* Terminal Preview Block */}
      <div className="my-5">
        <div className="rounded-xl bg-[#09090d] border border-white/10 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
          {/* Terminal Titlebar */}
          <div className="px-3.5 py-2.5 bg-black/60 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="text-[11px] font-mono text-zinc-400 ml-2">bash</span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-zinc-200 px-2 py-0.5 rounded hover:bg-white/5 transition-colors"
              title="Copy terminal command"
              aria-label="Copy terminal command"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Terminal Command Line */}
          <div className="p-3.5 font-mono text-xs text-zinc-300 flex items-center gap-2 overflow-x-auto">
            <span className="text-cyan-400 font-bold select-none">$</span>
            <span className="text-zinc-100">{item.terminal.command}</span>
          </div>

          {/* Terminal Output stream */}
          <div
            className={cn(
              'px-3.5 pb-3 font-mono text-[11px] text-zinc-400 space-y-1 border-t border-white/5 pt-2 transition-all duration-300',
              isExpanded ? 'block' : 'hidden sm:block'
            )}
          >
            {item.terminal.output.map((line, idx) => (
              <div
                key={idx}
                className={cn(
                  'truncate',
                  line.startsWith('[OK]') || line.startsWith('[REPORT]')
                    ? 'text-emerald-400'
                    : line.startsWith('[STREAM]') || line.startsWith('[GRAPH]')
                    ? 'text-cyan-300'
                    : 'text-zinc-400'
                )}
              >
                {line}
              </div>
            ))}
          </div>
        </div>

        {/* Expand / Collapse Toggle for mobile */}
        <div className="sm:hidden flex justify-center pt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[11px] font-mono text-zinc-400 flex items-center gap-1 hover:text-zinc-200"
          >
            {isExpanded ? (
              <>
                <span>Hide output trace</span>
                <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                <span>Show full output trace</span>
                <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer Tags & Actions */}
      <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {item.tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {item.githubUrl && (
            <Button
              href={item.githubUrl}
              target="_blank"
              variant="outline"
              size="sm"
              icon={<Github className="w-3.5 h-3.5" />}
              aria-label={`View ${item.title} source code on GitHub`}
            >
              GitHub
            </Button>
          )}
          {item.liveUrl && (
            <Button
              href={item.liveUrl}
              target="_blank"
              variant="ghost"
              size="sm"
              icon={<ExternalLink className="w-3.5 h-3.5" />}
              aria-label={`Open ${item.title} live demo`}
            >
              Docs
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
