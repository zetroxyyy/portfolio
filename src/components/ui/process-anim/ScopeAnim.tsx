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
      {/* 1. Structure: Speaker Labels (permanent, never animated) */}
      <text
        x="28"
        y="28"
        dominantBaseline="middle"
        fill="var(--graphite)"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.04em"
      >
        CLIENT
      </text>
      <text
        x="532"
        y="28"
        textAnchor="end"
        dominantBaseline="middle"
        fill="var(--graphite)"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.04em"
      >
        ZETROXY
      </text>

      {/* 2. Bubble 1 (client, left, y: 60) — squared bottom-left corner */}
      <motion.g variants={bubble1Variants} animate={state} initial="initial">
        <path
          d="M 36 60 H 264 A 8 8 0 0 1 272 68 V 92 A 8 8 0 0 1 264 100 H 28 V 68 A 8 8 0 0 1 36 60 Z"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <text
          x="44"
          y="80"
          dominantBaseline="middle"
          fill="var(--graphite)"
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="0.04em"
        >
          We need a site now, an app later.
        </text>
      </motion.g>

      {/* 3. Bubble 2 (you, right, y: 112) — squared bottom-right corner */}
      <motion.g variants={bubble2Variants} animate={state} initial="initial">
        <path
          d="M 296 112 H 524 A 8 8 0 0 1 532 120 V 152 H 296 A 8 8 0 0 1 288 144 V 120 A 8 8 0 0 1 296 112 Z"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <text
          x="304"
          y="132"
          dominantBaseline="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="0.04em"
        >
          What has to work on day one?
        </text>
      </motion.g>

      {/* 4. Bubble 3 (client, left, y: 164) — squared bottom-left corner */}
      <motion.g variants={bubble3Variants} animate={state} initial="initial">
        <path
          d="M 36 164 H 264 A 8 8 0 0 1 272 172 V 196 A 8 8 0 0 1 264 204 H 28 V 172 A 8 8 0 0 1 36 164 Z"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <text
          x="44"
          y="184"
          dominantBaseline="middle"
          fill="var(--graphite)"
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="0.04em"
          textLength="216"
          lengthAdjust="spacing"
        >
          Sign-ups, and our team editing content.
        </text>
      </motion.g>

      {/* 5. Bubble 4 (you, right, y: 216) — squared bottom-right corner */}
      <motion.g variants={bubble4Variants} animate={state} initial="initial">
        <path
          d="M 296 216 H 524 A 8 8 0 0 1 532 224 V 256 H 296 A 8 8 0 0 1 288 248 V 224 A 8 8 0 0 1 296 216 Z"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <text
          x="304"
          y="236"
          dominantBaseline="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="0.04em"
        >
          Scope, timeline and price by Friday.
        </text>
      </motion.g>

      {/* 6. Agreement bar (y: 260, h: 44) */}
      <motion.g variants={barVariants} animate={state} initial="initial">
        <rect
          x="28"
          y="260"
          width="504"
          height="44"
          rx="8"
          fill="var(--paper)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <text
          x="48"
          y="282"
          dominantBaseline="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="0.04em"
          fontWeight="600"
        >
          SCOPE · TIMELINE · PRICE
        </text>

        {/* 7. Check mark in agreement bar */}
        <motion.path
          d="M 502 282.5 L 506 286.5 L 514 277.5"
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
