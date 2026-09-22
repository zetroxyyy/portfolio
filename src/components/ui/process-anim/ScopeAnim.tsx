'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

interface AnimProps {
  inView: boolean;
  delay?: number;
}

export function ScopeAnim({ inView, delay = 0 }: AnimProps) {
  const shouldReduceMotion = useReducedMotion();
  const isPlaying = inView && !shouldReduceMotion;

  // 14.0s total cycle:
  // 0.0s - 0.6s: Bubble 1
  // 0.9s - 1.5s: Bubble 2
  // 1.8s - 2.4s: Bubble 3
  // 2.7s - 3.3s: Bubble 4
  // 3.8s - 4.5s: Agreement bar
  // 4.8s - 5.5s: Check draws
  // 7.0s - 11.5s: Hold (4.5s completely still)
  // 11.5s - 12.4s: Fade out (900ms)
  // 12.4s - 14.0s: Rest
  const DURATION = 14.0;

  const bubble1Variants: Variants = {
    play: {
      opacity: [0, 0, 1, 1, 0, 0],
      y: [8, 8, 0, 0, 0, 8],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        times: [0, 0.001, 0.0428, 0.8214, 0.8857, 1.0],
        delay,
      },
    },
    static: { opacity: 1, y: 0 },
    initial: { opacity: 0, y: 8 },
  };

  const bubble2Variants: Variants = {
    play: {
      opacity: [0, 0, 1, 1, 0, 0],
      y: [8, 8, 0, 0, 0, 8],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        times: [0, 0.0643, 0.1071, 0.8214, 0.8857, 1.0],
        delay,
      },
    },
    static: { opacity: 1, y: 0 },
    initial: { opacity: 0, y: 8 },
  };

  const bubble3Variants: Variants = {
    play: {
      opacity: [0, 0, 1, 1, 0, 0],
      y: [8, 8, 0, 0, 0, 8],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        times: [0, 0.1286, 0.1714, 0.8214, 0.8857, 1.0],
        delay,
      },
    },
    static: { opacity: 1, y: 0 },
    initial: { opacity: 0, y: 8 },
  };

  const bubble4Variants: Variants = {
    play: {
      opacity: [0, 0, 1, 1, 0, 0],
      y: [8, 8, 0, 0, 0, 8],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        times: [0, 0.1929, 0.2357, 0.8214, 0.8857, 1.0],
        delay,
      },
    },
    static: { opacity: 1, y: 0 },
    initial: { opacity: 0, y: 8 },
  };

  const barVariants: Variants = {
    play: {
      opacity: [0, 0, 1, 1, 0, 0],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        times: [0, 0.2714, 0.3214, 0.8214, 0.8857, 1.0],
        delay,
      },
    },
    static: { opacity: 1 },
    initial: { opacity: 0 },
  };

  const checkVariants: Variants = {
    play: {
      pathLength: [0, 0, 1, 1, 1, 0],
      opacity: [0, 0, 1, 1, 0, 0],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        times: [0, 0.3429, 0.3929, 0.8214, 0.8857, 1.0],
        delay,
      },
    },
    static: { pathLength: 1, opacity: 1 },
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
      {/* 1. Structure: Vertical guideline rail (never animated) */}
      <line
        x1="280"
        y1="28"
        x2="280"
        y2="244"
        stroke="var(--fog)"
        strokeWidth="1"
        strokeDasharray="2 3"
        opacity="0.4"
      />

      {/* 2. Bubble 1 (client, left) */}
      <motion.g variants={bubble1Variants} animate={state} initial="initial">
        <path
          d="M 36 40 H 260 A 8 8 0 0 1 268 48 V 72 A 8 8 0 0 1 260 80 H 28 V 48 A 8 8 0 0 1 36 40 Z"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <text
          x="44"
          y="60"
          dominantBaseline="middle"
          fill="var(--graphite)"
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="0.04em"
        >
          What should it do?
        </text>
      </motion.g>

      {/* 3. Bubble 2 (you, right) */}
      <motion.g variants={bubble2Variants} animate={state} initial="initial">
        <path
          d="M 300 92 H 524 A 8 8 0 0 1 532 100 V 132 H 300 A 8 8 0 0 1 292 124 V 100 A 8 8 0 0 1 300 92 Z"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <text
          x="308"
          y="112"
          dominantBaseline="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="0.04em"
        >
          Bookings, and an admin panel.
        </text>
      </motion.g>

      {/* 4. Bubble 3 (client, left) */}
      <motion.g variants={bubble3Variants} animate={state} initial="initial">
        <path
          d="M 36 144 H 260 A 8 8 0 0 1 268 152 V 176 A 8 8 0 0 1 260 184 H 28 V 152 A 8 8 0 0 1 36 144 Z"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <text
          x="44"
          y="164"
          dominantBaseline="middle"
          fill="var(--graphite)"
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="0.04em"
        >
          Who updates the content?
        </text>
      </motion.g>

      {/* 5. Bubble 4 (you, right) */}
      <motion.g variants={bubble4Variants} animate={state} initial="initial">
        <path
          d="M 300 196 H 524 A 8 8 0 0 1 532 204 V 236 H 300 A 8 8 0 0 1 292 228 V 204 A 8 8 0 0 1 300 196 Z"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <text
          x="308"
          y="216"
          dominantBaseline="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="0.04em"
        >
          Your team. No developer needed.
        </text>
      </motion.g>

      {/* 6. Agreement bar */}
      <motion.g variants={barVariants} animate={state} initial="initial">
        <rect
          x="28"
          y="252"
          width="504"
          height="44"
          rx="8"
          fill="var(--paper)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <text
          x="48"
          y="274"
          dominantBaseline="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="0.04em"
          fontWeight="600"
        >
          SCOPE AGREED
        </text>

        {/* 7. Check mark in agreement bar */}
        <motion.path
          d="M 502 274.5 L 506 278.5 L 514 269.5"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={checkVariants}
          animate={state}
          initial="initial"
        />
      </motion.g>
    </svg>
  );
}
