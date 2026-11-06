'use client';

import React from 'react';
import { ToastProvider } from '@/components/ui/Toast';
import { Navbar } from '@/components/ui/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Lab } from '@/components/sections/Lab';
import { Philosophy } from '@/components/sections/Philosophy';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <ToastProvider>
      {/* Skip to Main Content Link for Keyboard & Screen Reader Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-cyan-400 text-zinc-950 font-bold font-mono rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      {/* Floating Glass Pill Navigation Bar */}
      <Navbar />

      {/* Single-Page Narrative Flow */}
      <main id="main-content" className="relative flex flex-col w-full overflow-x-hidden">
        {/* Hero Section */}
        <Hero />

        {/* Flagship Projects Section with Scroll-Synchronized 3D Viewport */}
        <Projects />

        {/* Systems Lab & AI Developer Tooling Bento Grid */}
        <Lab />

        {/* The 60fps Standard & Engineering Philosophy */}
        <Philosophy />

        {/* Terminal Contact Command Palette & Footer */}
        <Contact />
      </main>
    </ToastProvider>
  );
}
