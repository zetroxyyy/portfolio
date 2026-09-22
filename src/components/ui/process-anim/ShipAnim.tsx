'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimProps {
  inView: boolean;
  delay?: number;
}

export function ShipAnim({ inView, delay = 0 }: AnimProps) {
  const shouldReduceMotion = useReducedMotion();
  const isPlaying = inView && !shouldReduceMotion;

  // 14.0s total cycle (0-6s build-up, 6-11.5s 5.5s hold, 11.5-12.3s fade, 12.3-14s rest)
  const DURATION = 14.0;
  const REPEAT_DELAY = 0;

  return (
    <svg
      viewBox="0 0 600 338"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="process-diagram-svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ── 1. PERMANENT LOCAL PANEL ── */}
      {/* x: 32, y: 104, w: 150, h: 130, label centred at y: 122 */}
      <rect
        x="32"
        y="104"
        width="150"
        height="130"
        rx="6"
        fill="var(--paper)"
        stroke="var(--fog)"
        strokeWidth="1"
      />
      <text
        x="107"
        y="122"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--graphite)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fontWeight="600"
        letterSpacing="0.04em"
      >
        LOCAL
      </text>

      {/* ── 2. PERMANENT TRAVEL PATH ── */}
      {/* 182 -> 330, 169 -> 120, gentle curve, roughly horizontal */}
      <path
        d="M 182 169 C 232 160, 280 135, 330 120"
        stroke="var(--fog)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
      />

      {/* ── 3. THREE BLOCKS TRAVELLING (BUILD, DB, ASSETS) ── */}
      {/* Block 1: BUILD (starts x 48, y 142, w 118, h 24) -> travels to x 390, y 82 inside PRODUCTION */}
      <motion.g
        initial={
          shouldReduceMotion
            ? { x: 342, y: -60, opacity: 1, scale: 0.9 }
            : { x: 0, y: 0, opacity: 1, scale: 1 }
        }
        animate={
          isPlaying
            ? {
                x: [0, 0, 342, 342, 342, 0],
                y: [0, 0, -60, -60, -60, 0],
                scale: [1, 1, 0.9, 0.9, 0.9, 1],
                opacity: [1, 1, 1, 1, 0, 0],
              }
            : shouldReduceMotion
              ? { x: 342, y: -60, opacity: 1, scale: 0.9 }
              : { x: 0, y: 0, opacity: 1 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.08, 0.16, 0.82, 0.88, 1],
        }}
      >
        <rect
          x="48"
          y="142"
          width="118"
          height="24"
          rx="4"
          fill="var(--ink)"
        />
        <text
          x="107"
          y="154"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--paper)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fontWeight="700"
          letterSpacing="0.04em"
        >
          BUILD
        </text>
      </motion.g>

      {/* Block 2: DB (starts x 48, y 172, w 118, h 24) -> travels to x 342, y -60 inside PRODUCTION */}
      <motion.g
        initial={
          shouldReduceMotion
            ? { x: 342, y: -90, opacity: 1, scale: 0.9 }
            : { x: 0, y: 0, opacity: 1, scale: 1 }
        }
        animate={
          isPlaying
            ? {
                x: [0, 0, 342, 342, 342, 0],
                y: [0, 0, -90, -90, -90, 0],
                scale: [1, 1, 0.9, 0.9, 0.9, 1],
                opacity: [1, 1, 1, 1, 0, 0],
              }
            : shouldReduceMotion
              ? { x: 342, y: -90, opacity: 1, scale: 0.9 }
              : { x: 0, y: 0, opacity: 1 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.16, 0.24, 0.82, 0.88, 1],
        }}
      >
        <rect
          x="48"
          y="172"
          width="118"
          height="24"
          rx="4"
          fill="var(--graphite)"
        />
        <text
          x="107"
          y="184"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--paper)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fontWeight="600"
          letterSpacing="0.04em"
        >
          DB
        </text>
      </motion.g>

      {/* Block 3: ASSETS (starts x 48, y 202, w 118, h 24) -> travels to x 342, y -120 inside PRODUCTION */}
      <motion.g
        initial={
          shouldReduceMotion
            ? { x: 342, y: -120, opacity: 1, scale: 0.9 }
            : { x: 0, y: 0, opacity: 1, scale: 1 }
        }
        animate={
          isPlaying
            ? {
                x: [0, 0, 342, 342, 342, 0],
                y: [0, 0, -120, -120, -120, 0],
                scale: [1, 1, 0.9, 0.9, 0.9, 1],
                opacity: [1, 1, 1, 1, 0, 0],
              }
            : shouldReduceMotion
              ? { x: 342, y: -120, opacity: 1, scale: 0.9 }
              : { x: 0, y: 0, opacity: 1 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.24, 0.32, 0.82, 0.88, 1],
        }}
      >
        <rect
          x="48"
          y="202"
          width="118"
          height="24"
          rx="4"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <text
          x="107"
          y="214"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fontWeight="600"
          letterSpacing="0.04em"
        >
          ASSETS
        </text>
      </motion.g>

      {/* ── 4. PERMANENT PRODUCTION PANEL ── */}
      {/* x: 330, y: 72, w: 238, h: 96, label centred at y: 90 */}
      <rect
        x="330"
        y="72"
        width="238"
        height="96"
        rx="6"
        fill="var(--paper)"
        stroke="var(--fog)"
        strokeWidth="1"
      />
      <text
        x="449"
        y="90"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--ink)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fontWeight="700"
        letterSpacing="0.04em"
      >
        PRODUCTION
      </text>

      {/* Domain pill: x: 346, y: 112, w: 206, h: 28; padlock at x 358, yourdomain.com at x 376 */}
      <rect
        x="346"
        y="112"
        width="206"
        height="28"
        rx="14"
        fill="var(--paper-2)"
        stroke="var(--fog)"
        strokeWidth="1"
      />
      {/* Padlock Icon (snaps shut once all three arrive at t=0.32) */}
      <g transform="translate(358, 120)">
        {/* Shackle: Open state */}
        <motion.path
          d="M 3 6 L 3 3 A 3 3 0 0 1 9 3 L 9 5"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 1 }}
          animate={
            isPlaying
              ? {
                  opacity: [1, 1, 0, 0, 1],
                }
              : { opacity: 0 }
          }
          transition={{
            duration: DURATION,
            delay: isPlaying ? delay : 0,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: REPEAT_DELAY,
            times: [0, 0.31, 0.33, 0.85, 1],
          }}
        />

        {/* Shackle: Closed state (snapped shut) */}
        <motion.path
          d="M 3 6 L 3 3 A 3 3 0 0 1 9 3 L 9 6"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={
            isPlaying
              ? {
                  opacity: [0, 0, 1, 1, 0],
                }
              : shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0 }
          }
          transition={{
            duration: DURATION,
            delay: isPlaying ? delay : 0,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: REPEAT_DELAY,
            times: [0, 0.31, 0.33, 0.85, 1],
          }}
        />

        {/* Lock Body */}
        <rect x="1" y="6" width="10" height="7" rx="1.5" fill="var(--ink)" />
      </g>

      {/* yourdomain.com at x: 376, centre y: 126 */}
      <text
        x="376"
        y="126"
        dominantBaseline="middle"
        fill="var(--ink)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fontWeight="600"
        letterSpacing="0.04em"
      >
        yourdomain.com
      </text>

      {/* ── 5. PERMANENT PHONE FRAME ── */}
      {/* x: 330, y: 190, w: 96, h: 116, radius 10 */}
      <rect
        x="330"
        y="190"
        width="96"
        height="116"
        rx="10"
        fill="var(--paper)"
        stroke="var(--ink)"
        strokeWidth="1.5"
      />
      {/* Phone top speaker bar */}
      <rect x="366" y="195" width="24" height="3" rx="1.5" fill="var(--fog)" />

      {/* Phone screen content: x 340, y 202, w 76, h 92 (banner band, two lines, one button) */}
      <motion.g
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 1, 0, 0],
              }
            : shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          times: [0, 0.34, 0.38, 0.82, 0.88, 1],
        }}
      >
        {/* Banner band */}
        <rect
          x="340"
          y="202"
          width="76"
          height="32"
          rx="3"
          fill="var(--fog)"
          opacity="0.6"
        />
        {/* Two lines */}
        <rect x="340" y="242" width="52" height="5" rx="2" fill="var(--ink)" />
        <rect x="340" y="251" width="68" height="4" rx="2" fill="var(--graphite)" />
        {/* One button */}
        <rect x="340" y="263" width="36" height="10" rx="2" fill="var(--ink)" />
      </motion.g>

      {/* ── 6. VERIFIED LABEL ── */}
      {/* x: 442, centre y: 248, left-aligned */}
      <motion.g
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 1, 0, 0],
              }
            : shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          times: [0, 0.38, 0.42, 0.82, 0.88, 1],
        }}
      >
        <path
          d="M 442 248 L 446 252 L 452 244"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="458"
          y="248"
          dominantBaseline="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fontWeight="700"
          letterSpacing="0.04em"
        >
          VERIFIED · 60FPS
        </text>
      </motion.g>
    </svg>
  );
}
