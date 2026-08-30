'use client';

import { useScroll, useSpring } from 'framer-motion';

/**
 * Returns a spring-smoothed scroll progress (0–1) for the whole page.
 */
export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return { raw: scrollYProgress, smooth: smoothProgress };
}
