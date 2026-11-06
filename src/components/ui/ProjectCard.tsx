'use client';

import React from 'react';
import { Project } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  ExternalLink,
  Github,
  Cpu,
  Layers,
  Zap,
  CheckCircle2,
  Activity,
  Sliders,
  TrendingUp,
  Navigation,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  onSelect?: () => void;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isActive,
  onSelect,
  index,
}) => {
  const accent = project.screenContent.accentColor;

  const renderIcon = () => {
    switch (project.screenContent.icon) {
      case 'Activity':
        return <Activity className="w-5 h-5" style={{ color: accent }} />;
      case 'Sliders':
        return <Sliders className="w-5 h-5" style={{ color: accent }} />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" style={{ color: accent }} />;
      case 'Navigation':
        return <Navigation className="w-5 h-5" style={{ color: accent }} />;
      default:
        return <Cpu className="w-5 h-5" style={{ color: accent }} />;
    }
  };

  return (
    <div
      onClick={onSelect}
      className={cn(
        'glass-panel rounded-2xl p-6 sm:p-8 transition-all duration-300 relative cursor-pointer border',
        isActive
          ? 'border-white/25 shadow-[0_16px_48px_-8px_rgba(0,0,0,0.7),0_0_24px_rgba(255,255,255,0.06)] scale-[1.01]'
          : 'border-white/5 hover:border-white/15 opacity-85 hover:opacity-100'
      )}
      style={{
        borderTopColor: isActive ? accent : undefined,
      }}
    >
      {/* Top Metadata Row */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5">
            0{index + 1}
          </span>
          <Badge variant="outline" className="text-zinc-300">
            {project.category.toUpperCase()}
          </Badge>
          <span className="text-xs font-mono text-zinc-400">• {project.year}</span>
        </div>

        <div className="flex items-center gap-2">
          {renderIcon()}
          {isActive && (
            <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-white/10 text-zinc-200">
              Active Viewport
            </span>
          )}
        </div>
      </div>

      {/* Title & Tagline */}
      <div className="space-y-1.5 mb-5">
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 group-hover:text-white">
          {project.title}
        </h3>
        <p className="text-sm sm:text-base font-medium text-cyan-400 font-mono">
          {project.tagline}
        </p>
        <p className="text-sm text-zinc-400 leading-relaxed pt-1">{project.description}</p>
      </div>

      {/* Engineering Architecture Breakdown */}
      <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3.5 mb-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-zinc-400">State:</span>
            <span className="font-semibold text-zinc-200">
              {project.architecture.stateManagement}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-zinc-400">Engine:</span>
            <span className="font-semibold text-zinc-200">
              {project.architecture.renderEngine}
            </span>
          </div>
        </div>

        {/* Patterns List */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
            Critical Systems Patterns
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.architecture.keyPatterns.map((pattern, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-xs text-zinc-300">
                <CheckCircle2
                  className="w-3.5 h-3.5 shrink-0 mt-0.5"
                  style={{ color: accent }}
                />
                <span className="leading-snug">{pattern}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Budget */}
        <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-xs font-mono">
          <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-zinc-400">Budget:</span>
          <span className="text-zinc-200 font-medium truncate">
            {project.architecture.performanceBudget}
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        {project.metrics.map((metric, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between"
          >
            <div className="text-lg sm:text-xl font-bold font-mono text-zinc-100">
              {metric.value}
            </div>
            <div className="text-[11px] text-zinc-400 font-sans mt-0.5">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Tags & Action Links */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/5">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {project.links.github && (
            <Button
              href={project.links.github}
              target="_blank"
              variant="ghost"
              size="sm"
              icon={<Github className="w-3.5 h-3.5" />}
              aria-label={`View ${project.title} on GitHub`}
            >
              Code
            </Button>
          )}
          {project.links.live && (
            <Button
              href={project.links.live}
              target="_blank"
              variant="outline"
              size="sm"
              icon={<ExternalLink className="w-3.5 h-3.5" />}
              iconPosition="right"
              aria-label={`Open ${project.title} live preview`}
            >
              Preview
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
