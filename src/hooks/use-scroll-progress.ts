'use client';

import { useState, useEffect, useRef } from 'react';

export interface ScrollProgressState {
  /** Raw normalized scroll progress [0, 1] */
  progress: number;
  /** Critically damped smooth progress [0, 1] */
  smoothProgress: number;
  /** Raw scroll offset in pixels */
  scrollY: number;
  /** Critically damped smooth scroll offset in pixels */
  smoothScrollY: number;
  /** Instantaneous velocity (normalized units per second) */
  velocity: number;
  /** Direction: 1 for scrolling down, -1 for up, 0 when idle */
  direction: 1 | -1 | 0;
  /** True while active scroll interactions are underway */
  isScrolling: boolean;
}

export interface ScrollPhysicsOptions {
  /** Optional target element ref; defaults to window scroll */
  targetRef?: React.RefObject<HTMLElement | null>;
  /** Damping ratio: 1.0 is critically damped (zero overshoot) */
  damping?: number;
  /** Spring response time in seconds (Apple-style default: 0.35s) */
  response?: number;
}

const INITIAL_STATE: ScrollProgressState = {
  progress: 0,
  smoothProgress: 0,
  scrollY: 0,
  smoothScrollY: 0,
  velocity: 0,
  direction: 0,
  isScrolling: false,
};

/**
 * High-precision scroll hook featuring critically damped spring physics (damping: 1.0, response: 0.35s)
 * and interruptible velocity tracking. Powers synchronized 3D canvas tilts and narrative transitions.
 */
export function useScrollProgress(options: ScrollPhysicsOptions = {}): ScrollProgressState {
  const { targetRef, damping = 1.0, response = 0.35 } = options;

  const [state, setState] = useState<ScrollProgressState>(INITIAL_STATE);

  // Mutable animation state references to avoid stale closures in requestAnimationFrame
  const currentPosRef = useRef({
    progress: 0,
    smoothProgress: 0,
    scrollY: 0,
    smoothScrollY: 0,
    velocity: 0,
    direction: 0 as 1 | -1 | 0,
    isScrolling: false,
  });

  const lastTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const scrollIdleTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Angular frequency: omega = 2 * PI / response
    const omega = (2 * Math.PI) / Math.max(response, 0.05);
    const zeta = damping;

    const getScrollMetrics = () => {
      if (targetRef && targetRef.current) {
        const el = targetRef.current;
        const scrollY = el.scrollTop;
        const maxScroll = Math.max(el.scrollHeight - el.clientHeight, 1);
        const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
        return { scrollY, progress, maxScroll };
      } else {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 1;
        const winHeight = window.innerHeight || 1;
        const maxScroll = Math.max(docHeight - winHeight, 1);
        const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
        return { scrollY, progress, maxScroll };
      }
    };

    // Initialize metrics on mount
    const initial = getScrollMetrics();
    currentPosRef.current.progress = initial.progress;
    currentPosRef.current.smoothProgress = initial.progress;
    currentPosRef.current.scrollY = initial.scrollY;
    currentPosRef.current.smoothScrollY = initial.scrollY;
    setState((prev) => ({
      ...prev,
      progress: initial.progress,
      smoothProgress: initial.progress,
      scrollY: initial.scrollY,
      smoothScrollY: initial.scrollY,
    }));

    let isRunning = false;

    // Physics step using stable implicit Euler formulation
    const tick = (now: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = now;
      }
      const rawDt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      // Clamp dt to avoid instability on long pauses or tab-out
      const dt = Math.min(Math.max(rawDt, 0.001), 0.064);

      const pos = currentPosRef.current;
      const target = pos.progress;
      const current = pos.smoothProgress;
      const diff = target - current;

      // Implicit integration for critically damped spring
      const f = 1.0 + 2.0 * dt * zeta * omega;
      const oo = omega * omega;
      const det = f + dt * dt * oo;

      pos.velocity = (pos.velocity + dt * oo * diff) / det;
      pos.smoothProgress = current + dt * pos.velocity;

      // Smooth scrollY derived proportionally
      const { maxScroll } = getScrollMetrics();
      pos.smoothScrollY = pos.smoothProgress * maxScroll;

      // Check whether spring has settled
      const settled = Math.abs(diff) < 0.0001 && Math.abs(pos.velocity) < 0.0001;

      if (settled) {
        pos.smoothProgress = target;
        pos.smoothScrollY = pos.scrollY;
        pos.velocity = 0;
        isRunning = false;
        rafIdRef.current = null;
      }

      setState({
        progress: pos.progress,
        smoothProgress: pos.smoothProgress,
        scrollY: pos.scrollY,
        smoothScrollY: pos.smoothScrollY,
        velocity: pos.velocity,
        direction: pos.direction,
        isScrolling: pos.isScrolling,
      });

      if (!settled) {
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };

    const startAnimationLoop = () => {
      if (!isRunning) {
        isRunning = true;
        lastTimeRef.current = performance.now();
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };

    const handleScroll = () => {
      const { scrollY, progress } = getScrollMetrics();
      const pos = currentPosRef.current;

      const delta = scrollY - pos.scrollY;
      if (Math.abs(delta) > 0.5) {
        pos.direction = delta > 0 ? 1 : -1;
      }

      pos.scrollY = scrollY;
      pos.progress = progress;
      pos.isScrolling = true;

      if (scrollIdleTimerRef.current) {
        clearTimeout(scrollIdleTimerRef.current);
      }
      scrollIdleTimerRef.current = setTimeout(() => {
        currentPosRef.current.isScrolling = false;
        currentPosRef.current.direction = 0;
        setState((prev) => ({ ...prev, isScrolling: false, direction: 0 }));
      }, 150);

      startAnimationLoop();
    };

    const targetEl = targetRef?.current || window;
    targetEl.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      targetEl.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (scrollIdleTimerRef.current) {
        clearTimeout(scrollIdleTimerRef.current);
      }
    };
  }, [targetRef, damping, response]);

  return state;
}
