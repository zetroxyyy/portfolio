'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="scroll-progress-wrap" aria-hidden="true">
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX, transformOrigin: '0% 50%' }}
      />
    </div>
  );
}
