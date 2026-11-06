'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'left',
      href,
      target,
      rel,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: 'text-xs py-2 px-3.5 gap-1.5 rounded-lg',
      md: 'text-sm py-2.5 px-4.5 gap-2 rounded-xl',
      lg: 'text-base py-3 px-6 gap-2.5 rounded-xl font-medium',
    }[size];

    const variantStyles = {
      primary:
        'bg-zinc-100 hover:bg-white text-zinc-950 font-semibold shadow-[0_4px_20px_rgba(255,255,255,0.18)] hover:shadow-[0_6px_28px_rgba(255,255,255,0.28)] border border-white/80 active:scale-[0.975]',
      secondary:
        'glass-pill text-zinc-100 hover:text-white font-medium hover:border-white/20 active:scale-[0.975]',
      outline:
        'bg-transparent border border-white/15 hover:border-white/30 text-zinc-300 hover:text-white hover:bg-white/[0.04] active:scale-[0.975]',
      ghost:
        'bg-transparent hover:bg-white/[0.06] text-zinc-400 hover:text-zinc-100 active:scale-[0.975]',
      glow:
        'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] active:scale-[0.975]',
    }[variant];

    const baseStyles =
      'inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950';

    if (href) {
      return (
        <a
          href={href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : rel}
          className={cn(baseStyles, sizeStyles, variantStyles, className)}
        >
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, sizeStyles, variantStyles, className)}
        {...props}
      >
        {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
