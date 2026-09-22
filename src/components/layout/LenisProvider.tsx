'use client';

import Lenis from 'lenis';
import { useEffect, useRef } from 'react';

/**
 * LenisProvider — wraps the app with smooth scroll.
 * Tuned for a "precise, not floaty" feel.
 * Reduced-motion users get native scroll (Lenis disabled).
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    let raf: number;
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    // Expose lenis on window for scroll anchors
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    // Handle initial hash scroll if present on load
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) {
        requestAnimationFrame(() => {
          lenis.scrollTo(el, { offset: -70, immediate: true });
        });
      }
    }

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
