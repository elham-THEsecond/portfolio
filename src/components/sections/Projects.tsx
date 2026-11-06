'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '@/lib/projects-data';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Scene } from '@/components/canvas/Scene';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Layers } from 'lucide-react';

export const Projects: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll synchronization using IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
              setActiveIndex(index);
            }
          });
        },
        {
          root: null,
          threshold: [0.4, 0.7],
          rootMargin: '-15% 0px -25% 0px',
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const activeProject = PROJECTS[activeIndex] || PROJECTS[0];

  return (
    <section
      id="projects"
      aria-label="Flagship Mobile Projects"
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-15 pointer-events-none transition-colors duration-1000"
        style={{ background: activeProject.screenContent.accentColor }}
      />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="pill">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Flagship Architecture
            </Badge>
            <Badge variant="outline" className="text-zinc-400">
              Scroll-Synchronized 3D Viewport
            </Badge>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-100">
            Engineered for zero-jank at{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              production scale.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Real-world mobile production systems built on Flutter 3.x, custom Impeller GLSL fragment
            shaders, C++ audio synthesis, and zero-allocation isolate workers.
          </p>
        </div>

        {/* 2-Column Sticky Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start relative">
          {/* Left Column: Sticky 3D Smartphone Viewport */}
          <div className="lg:col-span-5 hidden lg:block sticky top-28 self-start">
            <div className="relative w-full h-[620px] rounded-3xl glass-panel p-4 flex flex-col items-center justify-center overflow-hidden border border-white/10 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.8)]">
              {/* Top viewport header badge */}
              <div className="absolute top-4 left-5 right-5 flex items-center justify-between z-20 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ background: activeProject.screenContent.accentColor }}
                  />
                  <span className="text-zinc-300 font-semibold uppercase tracking-wider">
                    {activeProject.slug}
                  </span>
                </div>
                <span className="text-zinc-400 text-[11px] font-mono">
                  {activeProject.architecture.performanceBudget}
                </span>
              </div>

              {/* 3D Scene Viewport */}
              <div className="w-full h-full relative">
                <Scene
                  targetRotation={activeProject.phoneTransform.rotation}
                  targetPosition={activeProject.phoneTransform.position}
                  targetScale={activeProject.phoneTransform.scale}
                  activeProjectId={activeProject.slug}
                  screenContent={activeProject.screenContent}
                  interactive={true}
                />
              </div>

              {/* Bottom interactive hint */}
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between z-20 text-[11px] font-mono text-zinc-400 pt-2 border-t border-white/5">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>3D Physics Synchronized</span>
                </div>
                <div className="flex items-center gap-1">
                  {PROJECTS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === activeIndex
                          ? 'w-5 bg-cyan-400'
                          : 'bg-zinc-700 hover:bg-zinc-500'
                      }`}
                      aria-label={`Jump to project 0${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Scrolling Case Studies */}
          <div className="lg:col-span-7 space-y-12">
            {/* Mobile-only Sticky 3D Mini Viewport preview banner */}
            <div className="lg:hidden w-full h-[480px] rounded-2xl glass-panel p-2 relative overflow-hidden mb-8">
              <Scene
                targetRotation={activeProject.phoneTransform.rotation}
                targetPosition={activeProject.phoneTransform.position}
                targetScale={activeProject.phoneTransform.scale}
                activeProjectId={activeProject.slug}
                screenContent={activeProject.screenContent}
                interactive={true}
              />
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-xs font-mono text-zinc-400 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <span>{activeProject.title}</span>
                <span className="text-cyan-400">Tap card to inspect</span>
              </div>
            </div>

            {/* Case Studies Cards List */}
            {PROJECTS.map((project, idx) => (
              <div
                key={project.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
              >
                <ProjectCard
                  project={project}
                  isActive={activeIndex === idx}
                  onSelect={() => setActiveIndex(idx)}
                  index={idx}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
