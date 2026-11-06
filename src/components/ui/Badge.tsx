'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'status' | 'outline' | 'pill' | 'accent' | 'matrix';
  dotColor?: 'emerald' | 'cyan' | 'blue' | 'amber' | 'purple';
  dotPulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'status',
  dotColor = 'emerald',
  dotPulse = true,
  className,
  ...props
}) => {
  const dotColorClass = {
    emerald: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]',
    cyan: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]',
    blue: 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]',
    amber: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]',
    purple: 'bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]',
  }[dotColor];

  const variantStyles = {
    status:
      'glass-pill text-zinc-300 text-xs font-mono py-1 px-3.5 inline-flex items-center gap-2 rounded-full border border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.4)]',
    outline:
      'bg-zinc-900/60 backdrop-blur-md text-zinc-400 text-xs font-mono py-0.5 px-2.5 inline-flex items-center gap-1.5 rounded-md border border-white/10',
    pill: 'bg-white/5 text-zinc-300 text-xs py-1 px-3 inline-flex items-center gap-1.5 rounded-full border border-white/10',
    accent:
      'bg-cyan-500/10 text-cyan-300 text-xs font-mono py-0.5 px-2.5 inline-flex items-center gap-1.5 rounded-md border border-cyan-500/25',
    matrix:
      'bg-emerald-500/10 text-emerald-400 text-xs font-mono py-0.5 px-2.5 inline-flex items-center gap-1.5 rounded-md border border-emerald-500/25',
  }[variant];

  return (
    <span className={cn(variantStyles, className)} {...props}>
      {variant === 'status' && (
        <span className="relative flex h-2 w-2">
          {dotPulse && (
            <span
              className={cn(
                'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                dotColorClass
              )}
            />
          )}
          <span className={cn('relative inline-flex rounded-full h-2 w-2', dotColorClass)} />
        </span>
      )}
      {children}
    </span>
  );
};
