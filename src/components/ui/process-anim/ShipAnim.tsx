'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

interface AnimProps {
  inView: boolean;
  delay?: number;
}

export function ShipAnim({ inView, delay = 0 }: AnimProps) {
  const shouldReduceMotion = useReducedMotion();
  const isPlaying = inView && !shouldReduceMotion;

  // 14.0s total cycle:
  // 0.0s - 1.2s: preview.zetroxy.me visible, padlock open
  // 1.2s - 1.6s: preview.zetroxy.me fades out (400ms)
  // 1.6s - 1.8s: 200ms gap (both opacity 0)
  // 1.8s - 2.2s: yourdomain.com fades in (400ms), padlock closes
  // 2.6s - 3.3s: Check 1 (SSL certificate) draws (700ms)
  // 3.3s - 4.0s: Check 2 (Search metadata) draws (700ms)
  // 4.0s - 4.7s: Check 3 (Mobile verified) draws (700ms)
  // 4.7s - 11.5s: Hold (4.5s completely still)
  // 11.5s - 12.4s: Fade out (900ms)
  // 12.4s - 14.0s: Rest
  const DURATION = 14.0;

  // Preview domain: 0 -> 1.2s visible, 1.2s -> 1.6s fade out, 0 afterwards
  const previewDomainVariants: Variants = {
    play: {
      opacity: [1, 1, 0, 0, 0, 1],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        times: [0, 0.0857, 0.1143, 0.8857, 0.999, 1.0],
        delay,
      },
    },
    static: { opacity: 0 },
    initial: { opacity: 1 },
  };

  // Real domain: 0 -> 1.8s hidden, 1.8s -> 2.2s fade in, 2.2s -> 11.5s visible, 11.5s -> 12.4s fade out
  const realDomainVariants: Variants = {
    play: {
      opacity: [0, 0, 1, 1, 0, 0],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        times: [0, 0.1286, 0.1571, 0.8214, 0.8857, 1.0],
        delay,
      },
    },
    static: { opacity: 1 },
    initial: { opacity: 0 },
  };

  // Padlock shackle: open (offset up-left) until 1.8s, closes 1.8s -> 2.0s, stays closed until 11.5s
  const shackleVariants: Variants = {
    play: {
      x: [-2, -2, 0, 0, -2, -2],
      y: [-3, -3, 0, 0, -3, -3],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        times: [0, 0.1286, 0.1429, 0.8214, 0.8857, 1.0],
        delay,
      },
    },
    static: { x: 0, y: 0 },
    initial: { x: -2, y: -3 },
  };

  // Check 1: draws 2.6s -> 3.3s (700ms)
  const check1Variants: Variants = {
    play: {
      pathLength: [0, 0, 1, 1, 1, 0],
      opacity: [0, 0, 1, 1, 0, 0],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        times: [0, 0.1857, 0.2357, 0.8214, 0.8857, 1.0],
        delay,
      },
    },
    static: { pathLength: 1, opacity: 1 },
    initial: { pathLength: 0, opacity: 0 },
  };

  // Check 2: draws 3.3s -> 4.0s (700ms)
  const check2Variants: Variants = {
    play: {
      pathLength: [0, 0, 1, 1, 1, 0],
      opacity: [0, 0, 1, 1, 0, 0],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        times: [0, 0.2357, 0.2857, 0.8214, 0.8857, 1.0],
        delay,
      },
    },
    static: { pathLength: 1, opacity: 1 },
    initial: { pathLength: 0, opacity: 0 },
  };

  // Check 3: draws 4.0s -> 4.7s (700ms)
  const check3Variants: Variants = {
    play: {
      pathLength: [0, 0, 1, 1, 1, 0],
      opacity: [0, 0, 1, 1, 0, 0],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        times: [0, 0.2857, 0.3357, 0.8214, 0.8857, 1.0],
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
      {/* 1. Address bar */}
      <rect
        x="28"
        y="48"
        width="504"
        height="52"
        rx="26"
        fill="var(--paper-2)"
        stroke="var(--fog)"
        strokeWidth="1"
      />

      {/* 2. Padlock at x: 52, y: 62, w: 18, h: 24 */}
      <g>
        {/* Shackle: open by default, snaps down into sockets when closed */}
        <motion.path
          d="M 57 71 V 66 A 4 4 0 0 1 65 66 V 71"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={shackleVariants}
          animate={state}
          initial="initial"
        />
        {/* Padlock Body */}
        <rect
          x="53"
          y="71"
          width="16"
          height="13"
          rx="2.5"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth="1.5"
        />
        {/* Keyhole dot */}
        <circle cx="61" cy="77.5" r="1.25" fill="var(--ink)" />
      </g>

      {/* 3. Outgoing Domain Label: preview.zetroxy.me */}
      <motion.text
        x="88"
        y="74"
        dominantBaseline="middle"
        fill="var(--graphite)"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.04em"
        variants={previewDomainVariants}
        animate={state}
        initial="initial"
      >
        preview.zetroxy.me
      </motion.text>

      {/* 4. Incoming Domain Label: yourdomain.com */}
      <motion.text
        x="88"
        y="74"
        dominantBaseline="middle"
        fill="var(--ink)"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.04em"
        fontWeight="600"
        variants={realDomainVariants}
        animate={state}
        initial="initial"
      >
        yourdomain.com
      </motion.text>

      {/* 5. Check row 1: SSL certificate */}
      <g>
        <text
          x="48"
          y="168"
          dominantBaseline="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="0.04em"
        >
          SSL certificate
        </text>
        <line x1="28" y1="188" x2="532" y2="188" stroke="var(--fog)" strokeWidth="1" />
        <motion.path
          d="M 502 168.5 L 506 172.5 L 514 163.5"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={check1Variants}
          animate={state}
          initial="initial"
        />
      </g>

      {/* 6. Check row 2: Search metadata */}
      <g>
        <text
          x="48"
          y="216"
          dominantBaseline="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="0.04em"
        >
          Search metadata
        </text>
        <line x1="28" y1="236" x2="532" y2="236" stroke="var(--fog)" strokeWidth="1" />
        <motion.path
          d="M 502 216.5 L 506 220.5 L 514 211.5"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={check2Variants}
          animate={state}
          initial="initial"
        />
      </g>

      {/* 7. Check row 3: Mobile verified */}
      <g>
        <text
          x="48"
          y="264"
          dominantBaseline="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="0.04em"
        >
          Mobile verified
        </text>
        <motion.path
          d="M 502 264.5 L 506 268.5 L 514 259.5"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={check3Variants}
          animate={state}
          initial="initial"
        />
      </g>
    </svg>
  );
}
