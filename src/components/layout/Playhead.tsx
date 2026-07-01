'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * Playhead — the "Runtime" signature element.
 * A hairline vertical scrubber on the left edge of the viewport that reflects
 * scroll progress, like a video timeline. Monochrome + cobalt active head.
 *
 * Rendered in the root layout so it persists across all pages.
 */
export function Playhead() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className="playhead"
      aria-hidden="true"
      role="presentation"
    >
      {/* Track line */}
      <div className="playhead__track" />

      {/* Fill bar — grows with scroll */}
      <motion.div
        className="playhead__fill"
        style={{ scaleY, transformOrigin: 'top' }}
      />

      {/* Active playhead head — cobalt signal dot at the current position */}
      <PlayheadHead progress={scrollYProgress} />

      {/* Timecode display */}
      <TimecodeText progress={scrollYProgress} />
    </div>
  );
}

type MotionValue = ReturnType<typeof useScroll>['scrollYProgress'];

function PlayheadHead({ progress }: { progress: MotionValue }) {
  const top = useTransform(progress, [0, 1], ['2rem', 'calc(100% - 2rem)']);
  return (
    <motion.div
      className="playhead__head"
      style={{ top }}
    />
  );
}

function TimecodeText({ progress }: { progress: MotionValue }) {
  const smoothed = useSpring(progress, { stiffness: 60, damping: 20 });
  const displayed = useTransform(smoothed, (v: number) => {
    const total = 240;
    const seconds = Math.floor(v * total);
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  });

  return (
    <motion.span
      className="playhead__timecode"
      aria-hidden="true"
    >
      {displayed}
    </motion.span>
  );
}
