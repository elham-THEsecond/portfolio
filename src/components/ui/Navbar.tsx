'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '#hero' },
  { label: 'Architecture', href: '#projects' },
  { label: 'Systems Lab', href: '#lab' },
  { label: 'Craft Manifesto', href: '#philosophy' },
  { label: 'Shader Demo', href: '/demo' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section tracking
      const sections = ['hero', 'projects', 'lab', 'philosophy', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleReducedMotion = () => {
    const nextState = !reducedMotion;
    setReducedMotion(nextState);
    if (typeof document !== 'undefined') {
      if (nextState) {
        document.documentElement.classList.add('reduce-motion');
      } else {
        document.documentElement.classList.remove('reduce-motion');
      }
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div
        className={cn(
          'glass-pill pointer-events-auto rounded-full py-2 px-3 sm:px-4 flex items-center justify-between gap-3 sm:gap-6 max-w-4xl w-full transition-all duration-300 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.7)]',
          isScrolled ? 'bg-zinc-950/85 border-white/20' : 'bg-zinc-950/70 border-white/10'
        )}
      >
        {/* Brand Monogram */}
        <a
          href="#hero"
          className="flex items-center gap-2 text-zinc-100 hover:text-white group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full px-2 py-1"
          aria-label="Elham - Return to Top"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span className="font-mono text-xs font-bold tracking-wider text-zinc-100 group-hover:text-cyan-300 transition-colors">
            ELHAM <span className="text-zinc-500 font-normal">{'// 120Hz'}</span>
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav
          className="hidden md:flex items-center gap-1 text-xs font-mono"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3 py-1.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400',
                  isActive
                    ? 'bg-white/10 text-zinc-100 font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action Icons & Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Reduced Motion Toggle Button */}
          <button
            onClick={toggleReducedMotion}
            className={cn(
              'p-1.5 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 text-xs font-mono hidden sm:flex items-center gap-1.5 px-2.5',
              reducedMotion
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-white/5 text-zinc-400 hover:text-zinc-200 border-white/10'
            )}
            title={reducedMotion ? 'Enable Full 3D Motion' : 'Enable Reduced Motion'}
            aria-label={reducedMotion ? 'Enable Full 3D Motion' : 'Enable Reduced Motion'}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px]">{reducedMotion ? 'Static' : '60/120fps'}</span>
          </button>

          {/* Contact CTA */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-[0_2px_12px_rgba(255,255,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-zinc-300 hover:text-white bg-white/5 border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden fixed inset-x-4 top-20 glass-panel p-5 rounded-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col gap-2 font-mono text-sm z-50 bg-[#09090d]/95 backdrop-blur-2xl">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-white/10 text-zinc-200 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}

          <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                toggleReducedMotion();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-mono text-zinc-400 hover:text-zinc-200 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{reducedMotion ? 'Switch to 120Hz 3D Mode' : 'Switch to Reduced Motion'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
