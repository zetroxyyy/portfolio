'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

interface AnimProps {
  inView: boolean;
  delay?: number;
}

export function BuildAnim({ inView, delay = 0 }: AnimProps) {
  const shouldReduceMotion = useReducedMotion();
  const isPlaying = inView && !shouldReduceMotion;

  // 14.0s total cycle:
  // 0.0s - 0.7s: Line 1 types in (w: 0 -> 300)
  // 0.7s - 1.0s: Caret jumps to line 2 (300ms gap)
  // 1.0s - 1.7s: Line 2 types in (w: 0 -> 260)
  // 1.7s - 2.0s: Caret jumps to line 3 (300ms gap)
  // 2.0s - 2.7s: Line 3 types in (w: 0 -> 330)
  // 2.7s - 3.0s: Caret jumps to line 4 (300ms gap)
  // 3.0s - 3.7s: Line 4 types in (w: 0 -> 220)
  // 3.7s - 4.0s: Caret jumps to line 5 (300ms gap)
  // 4.0s - 4.7s: Line 5 types in (w: 0 -> 290)
  // 4.7s - 11.5s: Hold (4.5s completely still, caret blinks at end of line 5)
  // 11.5s - 12.4s: Fade out (900ms)
  // 12.4s - 14.0s: Rest
  const DURATION = 14.0;

  const line1Variants: Variants = {
    play: {
      width: [0, 300, 300, 300, 0, 0],
      opacity: [1, 1, 1, 1, 0, 0],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'linear' as const,
        times: [0, 0.05, 0.8214, 0.8214, 0.8857, 1.0],
        delay,
      },
    },
    static: { width: 300, opacity: 1 },
    initial: { width: 0, opacity: 0 },
  };

  const line2Variants: Variants = {
    play: {
      width: [0, 0, 260, 260, 260, 0, 0],
      opacity: [0, 1, 1, 1, 1, 0, 0],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'linear' as const,
        times: [0, 0.0714, 0.1214, 0.8214, 0.8214, 0.8857, 1.0],
        delay,
      },
    },
    static: { width: 260, opacity: 1 },
    initial: { width: 0, opacity: 0 },
  };

  const line3Variants: Variants = {
    play: {
      width: [0, 0, 330, 330, 330, 0, 0],
      opacity: [0, 1, 1, 1, 1, 0, 0],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'linear' as const,
        times: [0, 0.1429, 0.1929, 0.8214, 0.8214, 0.8857, 1.0],
        delay,
      },
    },
    static: { width: 330, opacity: 1 },
    initial: { width: 0, opacity: 0 },
  };

  const line4Variants: Variants = {
    play: {
      width: [0, 0, 220, 220, 220, 0, 0],
      opacity: [0, 1, 1, 1, 1, 0, 0],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'linear' as const,
        times: [0, 0.2143, 0.2643, 0.8214, 0.8214, 0.8857, 1.0],
        delay,
      },
    },
    static: { width: 220, opacity: 1 },
    initial: { width: 0, opacity: 0 },
  };

  const line5Variants: Variants = {
    play: {
      width: [0, 0, 290, 290, 290, 0, 0],
      opacity: [0, 1, 1, 1, 1, 0, 0],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'linear' as const,
        times: [0, 0.2857, 0.3357, 0.8214, 0.8214, 0.8857, 1.0],
        delay,
      },
    },
    static: { width: 290, opacity: 1 },
    initial: { width: 0, opacity: 0 },
  };

  const caretVariants: Variants = {
    play: {
      x: [
        96, 396,
        112, 372,
        112, 442,
        96, 316,
        96, 386,
        386, 386,
      ],
      y: [
        90, 90,
        122, 122,
        154, 154,
        186, 186,
        218, 218,
        218, 218,
      ],
      opacity: [
        1, 1,
        1, 1,
        1, 1,
        1, 1,
        1, 1,
        0, 1, 0, 1, 0, 1, 0, 1, 0,
        0, 0,
      ],
      transition: {
        x: {
          duration: DURATION,
          repeat: Infinity,
          ease: 'linear' as const,
          times: [0, 0.05, 0.0714, 0.1214, 0.1429, 0.1929, 0.2143, 0.2643, 0.2857, 0.3357, 0.8214, 1.0],
          delay,
        },
        y: {
          duration: DURATION,
          repeat: Infinity,
          ease: 'linear' as const,
          times: [0, 0.05, 0.0714, 0.1214, 0.1429, 0.1929, 0.2143, 0.2643, 0.2857, 0.3357, 0.8214, 1.0],
          delay,
        },
        opacity: {
          duration: DURATION,
          repeat: Infinity,
          ease: 'linear' as const,
          times: [
            0, 0.3357,
            0.3358, 0.3714,
            0.4071, 0.4429,
            0.4786, 0.5143,
            0.5500, 0.5857,
            0.6214, 0.6571, 0.6929, 0.7286, 0.7643, 0.8000, 0.8100, 0.8214, 0.8300,
            0.8857, 1.0,
          ],
          delay,
        },
      },
    },
    static: { x: 386, y: 218, opacity: 1 },
    initial: { x: 96, y: 90, opacity: 0 },
  };

  const state = isPlaying ? 'play' : shouldReduceMotion ? 'static' : 'initial';

  return (
    <svg
      viewBox="0 0 560 315"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="process-diagram-svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* 1. Structure: Editor frame */}
      <rect
        x="28"
        y="28"
        width="504"
        height="259"
        rx="8"
        fill="var(--paper)"
        stroke="var(--fog)"
        strokeWidth="1"
      />

      {/* 2. Structure: Tab bar divider & tab title */}
      <line x1="28" y1="64" x2="532" y2="64" stroke="var(--fog)" strokeWidth="1" />
      <text
        x="48"
        y="46"
        dominantBaseline="middle"
        fill="var(--graphite)"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.04em"
      >
        booking.ts
      </text>

      {/* 3. Structure: Gutter divider & line numbers 1 to 5 */}
      <line x1="76" y1="64" x2="76" y2="287" stroke="var(--fog)" strokeWidth="1" />
      <text
        x="64"
        y="96"
        textAnchor="end"
        dominantBaseline="middle"
        fill="var(--mist)"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.04em"
      >
        1
      </text>
      <text
        x="64"
        y="128"
        textAnchor="end"
        dominantBaseline="middle"
        fill="var(--mist)"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.04em"
      >
        2
      </text>
      <text
        x="64"
        y="160"
        textAnchor="end"
        dominantBaseline="middle"
        fill="var(--mist)"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.04em"
      >
        3
      </text>
      <text
        x="64"
        y="192"
        textAnchor="end"
        dominantBaseline="middle"
        fill="var(--mist)"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.04em"
      >
        4
      </text>
      <text
        x="64"
        y="224"
        textAnchor="end"
        dominantBaseline="middle"
        fill="var(--mist)"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.04em"
      >
        5
      </text>

      {/* 4. Code line 1 */}
      <motion.rect
        x={96}
        y={92}
        height={8}
        rx={4}
        fill="var(--graphite)"
        variants={line1Variants}
        animate={state}
        initial="initial"
      />

      {/* 5. Code line 2 */}
      <motion.rect
        x={112}
        y={124}
        height={8}
        rx={4}
        fill="var(--graphite)"
        variants={line2Variants}
        animate={state}
        initial="initial"
      />

      {/* 6. Code line 3 */}
      <motion.rect
        x={112}
        y={156}
        height={8}
        rx={4}
        fill="var(--graphite)"
        variants={line3Variants}
        animate={state}
        initial="initial"
      />

      {/* 7. Code line 4 */}
      <motion.rect
        x={96}
        y={188}
        height={8}
        rx={4}
        fill="var(--graphite)"
        variants={line4Variants}
        animate={state}
        initial="initial"
      />

      {/* 8. Code line 5 */}
      <motion.rect
        x={96}
        y={220}
        height={8}
        rx={4}
        fill="var(--graphite)"
        variants={line5Variants}
        animate={state}
        initial="initial"
      />

      {/* 9. Caret: 2 units wide in --ink, moves with typed line and blinks at end of line 5 */}
      <motion.rect
        width={2}
        height={12}
        rx={1}
        fill="var(--ink)"
        variants={caretVariants}
        animate={state}
        initial="initial"
      />
    </svg>
  );
}
