'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

interface AnimProps {
  inView: boolean;
  delay?: number;
}

export function YoursAnim({ inView, delay = 0 }: AnimProps) {
  const shouldReduceMotion = useReducedMotion();
  const isPlaying = inView && !shouldReduceMotion;

  // 14.0s total cycle:
  // 0.4s - 1.5s: Card 1 travels x 28 -> 372 (1.1s) & rail fills 0 -> 1/3
  // 1.5s - 1.9s: Check 1 appears (400ms)
  // 2.3s - 3.4s: Card 2 travels x 28 -> 372 (1.1s) & rail fills 1/3 -> 2/3
  // 3.4s - 3.8s: Check 2 appears (400ms)
  // 4.2s - 5.3s: Card 3 travels x 28 -> 372 (1.1s) & rail fills 2/3 -> 1.0
  // 5.3s - 5.7s: Check 3 appears (400ms)
  // 5.7s - 11.5s: Hold (4.5s completely still, rail fully drawn)
  // 11.5s - 12.4s: Fade out (900ms)
  // 12.4s - 14.0s: Rest
  const DURATION = 14.0;

  const card1Variants: Variants = {
    play: {
      x: [28, 28, 372, 372, 372, 28],
      opacity: [0, 1, 1, 1, 0, 0],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        times: [0, 0.0286, 0.1071, 0.8214, 0.8857, 1.0],
        delay,
      },
    },
    static: { x: 372, opacity: 1 },
    initial: { x: 28, opacity: 0 },
  };

  const check1Variants: Variants = {
    play: {
      pathLength: [0, 0, 1, 1, 1, 0],
      opacity: [0, 0, 1, 1, 0, 0],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        times: [0, 0.1071, 0.1357, 0.8214, 0.8857, 1.0],
        delay,
      },
    },
    static: { pathLength: 1, opacity: 1 },
    initial: { pathLength: 0, opacity: 0 },
  };

  const card2Variants: Variants = {
    play: {
      x: [28, 28, 28, 372, 372, 372, 28],
      opacity: [0, 0, 1, 1, 1, 0, 0],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        times: [0, 0.1429, 0.1643, 0.2429, 0.8214, 0.8857, 1.0],
        delay,
      },
    },
    static: { x: 372, opacity: 1 },
    initial: { x: 28, opacity: 0 },
  };

  const check2Variants: Variants = {
    play: {
      pathLength: [0, 0, 1, 1, 1, 0],
      opacity: [0, 0, 1, 1, 0, 0],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        times: [0, 0.2429, 0.2714, 0.8214, 0.8857, 1.0],
        delay,
      },
    },
    static: { pathLength: 1, opacity: 1 },
    initial: { pathLength: 0, opacity: 0 },
  };

  const card3Variants: Variants = {
    play: {
      x: [28, 28, 28, 372, 372, 372, 28],
      opacity: [0, 0, 1, 1, 1, 0, 0],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        times: [0, 0.2786, 0.3000, 0.3786, 0.8214, 0.8857, 1.0],
        delay,
      },
    },
    static: { x: 372, opacity: 1 },
    initial: { x: 28, opacity: 0 },
  };

  const check3Variants: Variants = {
    play: {
      pathLength: [0, 0, 1, 1, 1, 0],
      opacity: [0, 0, 1, 1, 0, 0],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        times: [0, 0.3786, 0.4071, 0.8214, 0.8857, 1.0],
        delay,
      },
    },
    static: { pathLength: 1, opacity: 1 },
    initial: { pathLength: 0, opacity: 0 },
  };

  // Rail fill progress: fills by 1/3 as each card travels across
  const railProgressVariants: Variants = {
    play: {
      pathLength: [0, 0, 0.333, 0.333, 0.667, 0.667, 1.0, 1.0, 1.0, 0],
      opacity: [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        times: [0, 0.0286, 0.1071, 0.1643, 0.2429, 0.3000, 0.3786, 0.8214, 0.8857, 1.0],
        delay,
      },
    },
    static: { pathLength: 1.0, opacity: 1 },
    initial: { pathLength: 0, opacity: 0 },
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
      {/* 1. Structure: zetroxy label */}
      <text
        x="28"
        y="52"
        dominantBaseline="middle"
        fill="var(--graphite)"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.04em"
      >
        zetroxy
      </text>

      {/* 2. Structure: You label */}
      <text
        x="532"
        y="52"
        textAnchor="end"
        dominantBaseline="middle"
        fill="var(--ink)"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.04em"
        fontWeight="600"
      >
        You
      </text>

      {/* 3. Structure & Progress: Rail spanning between endpoints at y 76 */}
      {/* Base 1px --fog rail (always drawn) */}
      <line x1="28" y1="76" x2="532" y2="76" stroke="var(--fog)" strokeWidth="1" />
      {/* Active 1.5px --ink fill tracking handover progress by thirds */}
      <motion.line
        x1="28"
        y1="76"
        x2="532"
        y2="76"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={railProgressVariants}
        animate={state}
        initial="initial"
      />

      {/* 4. Card 1: Admin access (row y: 104, h: 52) */}
      <motion.g variants={card1Variants} animate={state} initial="initial">
        <rect
          x="0"
          y="104"
          width="160"
          height="52"
          rx="8"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <text
          x="70"
          y="130"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="0.04em"
        >
          Admin access
        </text>
      </motion.g>

      {/* 5. Check 1 (row centre y: 130) */}
      <motion.path
        d="M 498 130.5 L 503 134.5 L 510 125.5"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={check1Variants}
        animate={state}
        initial="initial"
      />

      {/* 6. Card 2: Documentation (row y: 172, h: 52) */}
      <motion.g variants={card2Variants} animate={state} initial="initial">
        <rect
          x="0"
          y="172"
          width="160"
          height="52"
          rx="8"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <text
          x="70"
          y="198"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="0.04em"
        >
          Documentation
        </text>
      </motion.g>

      {/* 7. Check 2 (row centre y: 198) */}
      <motion.path
        d="M 498 198.5 L 503 202.5 L 510 193.5"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={check2Variants}
        animate={state}
        initial="initial"
      />

      {/* 8. Card 3: Walkthrough (row y: 240, h: 52) */}
      <motion.g variants={card3Variants} animate={state} initial="initial">
        <rect
          x="0"
          y="240"
          width="160"
          height="52"
          rx="8"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <text
          x="70"
          y="266"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="0.04em"
        >
          Walkthrough
        </text>
      </motion.g>

      {/* 9. Check 3 (row centre y: 266) */}
      <motion.path
        d="M 499 266.5 L 503 270.5 L 509 261.5"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={check3Variants}
        animate={state}
        initial="initial"
      />
    </svg>
  );
}
