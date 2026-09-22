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

  const DURATION = 11.5;
  const REPEAT_DELAY = 0.5;

  return (
    <svg
      viewBox="0 0 600 338"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="process-diagram-svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ── 1. PERMANENT LOCAL PLINTH (LEFT) ── */}
      {/* Internal padding: 32 units on all sides (x: 32..568, y: 32..306) */}
      <g>
        <rect
          x="32"
          y="232"
          width="168"
          height="40"
          rx="6"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1.2"
        />
        <text
          x="116"
          y="256"
          textAnchor="middle"
          fill="var(--mist)"
          fontFamily="var(--font-mono)"
          fontSize="9.5"
          fontWeight="600"
          letterSpacing="0.08em"
        >
          LOCAL
        </text>
      </g>

      {/* ── 2. PERMANENT DIRECT TRAJECTORY PATH (ACROSS THE CENTER) ── */}
      {/* Runs directly between LOCAL plinth and PRODUCTION node through canvas center */}
      <path
        d="M 116 150 C 180 84, 250 68, 340 74"
        stroke="var(--fog)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
      />

      {/* ── 3. MOVING THREE-BLOCK STACK (BUILD, DB, ASSETS) ── */}
      <motion.g
        initial={
          shouldReduceMotion
            ? { opacity: 0 }
            : { opacity: 1, x: 48, y: 148, scale: 1 }
        }
        animate={
          isPlaying
            ? {
                opacity: [1, 1, 1, 0, 0, 1],
                x: [48, 48, 280, 336, 48, 48],
                y: [148, 142, 68, 68, 148, 148],
                scale: [1, 1, 0.85, 0.5, 1, 1],
              }
            : shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 1, x: 48, y: 148 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.12, 0.34, 0.40, 0.85, 1],
        }}
      >
        {/* Block 3: ASSETS (Base) */}
        <rect
          x="0"
          y="50"
          width="136"
          height="22"
          rx="4"
          fill="var(--fog)"
          stroke="var(--hairline)"
        />
        <text
          x="68"
          y="64.5"
          textAnchor="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fontWeight="600"
          letterSpacing="0.08em"
        >
          ASSETS
        </text>

        {/* Block 2: DB (Middle) */}
        <rect
          x="0"
          y="25"
          width="136"
          height="22"
          rx="4"
          fill="var(--graphite)"
        />
        <text
          x="68"
          y="39.5"
          textAnchor="middle"
          fill="var(--paper)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fontWeight="600"
          letterSpacing="0.08em"
        >
          DB
        </text>

        {/* Block 1: BUILD (Top) */}
        <rect
          x="0"
          y="0"
          width="136"
          height="22"
          rx="4"
          fill="var(--ink)"
        />
        <text
          x="68"
          y="14.5"
          textAnchor="middle"
          fill="var(--paper)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          BUILD
        </text>
      </motion.g>

      {/* ── 4. PERMANENT PRODUCTION NODE (TOP RIGHT) ── */}
      {/* Position: x=330, y=32, w=238, h=70 */}
      <g>
        <rect
          x="330"
          y="32"
          width="238"
          height="70"
          rx="8"
          fill="var(--paper-2)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />

        {/* Production Node Label */}
        <text
          x="346"
          y="50"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="9.5"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          PRODUCTION
        </text>

        {/* Status Indicator Dot */}
        <circle cx="550" cy="46" r="3.5" fill="var(--ink)" />

        {/* Domain Pill (yourdomain.com) */}
        <g transform="translate(344, 58)">
          <rect
            x="0"
            y="0"
            width="210"
            height="26"
            rx="13"
            fill="var(--paper)"
            stroke="var(--fog)"
            strokeWidth="1"
          />

          {/* Padlock Icon (snaps shut when deployment lands) */}
          <g transform="translate(14, 6)">
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
                times: [0, 0.40, 0.43, 0.85, 1],
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
                times: [0, 0.40, 0.43, 0.85, 1],
              }}
            />

            {/* Lock Body */}
            <rect x="1" y="6" width="10" height="7" rx="1.5" fill="var(--ink)" />
          </g>

          {/* Domain text */}
          <text
            x="36"
            y="17"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fontWeight="600"
            letterSpacing="0.02em"
          >
            yourdomain.com
          </text>
        </g>
      </g>

      {/* ── 5. MOBILE PHONE QA VERIFICATION (BOTTOM RIGHT, INSIDE MARGINS) ── */}
      {/* Position: x=394, y=120, w=134, h=184 (well inside x_max: 568, y_max: 306) */}
      <g>
        {/* Phone Frame (Permanent structure) */}
        <rect
          x="394"
          y="120"
          width="134"
          height="184"
          rx="18"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth="1.5"
        />

        {/* Phone Top Speaker Notch */}
        <rect x="443" y="126" width="36" height="4" rx="2" fill="var(--fog)" />

        {/* ── MINIATURE OF SITE HERO (NEUTRAL) ── */}
        {/* Nav header line */}
        <line x1="406" y1="138" x2="516" y2="138" stroke="var(--hairline)" strokeWidth="0.8" />
        <rect x="406" y="133" width="28" height="3" rx="1.5" fill="var(--ink)" />

        {/* Hero Banner: permitted muted neutral fill */}
        <rect
          x="404"
          y="144"
          width="114"
          height="44"
          rx="4"
          fill="var(--fog)"
          opacity="0.6"
        />

        {/* Hero Title & Subhead Lines */}
        <rect x="404" y="196" width="80" height="6" rx="2" fill="var(--ink)" />
        <rect x="404" y="206" width="102" height="4" rx="2" fill="var(--graphite)" />
        <rect x="404" y="214" width="64" height="4" rx="2" fill="var(--mist)" opacity="0.6" />

        {/* Mini CTA button */}
        <rect x="404" y="226" width="50" height="12" rx="3" fill="var(--ink)" />

        {/* ── PHONE QA VERIFIED BADGE ── */}
        <motion.g
          initial={
            shouldReduceMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.9 }
          }
          animate={
            isPlaying
              ? {
                  opacity: [0, 0, 1, 1, 0],
                  scale: [0.9, 0.9, 1, 1, 0.9],
                }
              : shouldReduceMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0 }
          }
          transition={{
            duration: DURATION,
            delay: isPlaying ? delay : 0,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: REPEAT_DELAY,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.48, 0.54, 0.85, 1],
          }}
          style={{ transformOrigin: '461px 260px' }}
        >
          <rect
            x="400"
            y="252"
            width="122"
            height="24"
            rx="12"
            fill="var(--paper)"
            stroke="var(--ink)"
            strokeWidth="1"
          />
          {/* Checkmark icon */}
          <path
            d="M 414 264 L 417 267 L 423 261"
            stroke="var(--ink)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <text
            x="462"
            y="267"
            textAnchor="middle"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="8.5"
            fontWeight="700"
            letterSpacing="0.04em"
          >
            VERIFIED · 60FPS
          </text>
        </motion.g>
      </g>
    </svg>
  );
}
