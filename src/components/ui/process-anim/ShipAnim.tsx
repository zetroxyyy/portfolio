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

  const DURATION = 7.2;
  const REPEAT_DELAY = 0.6;

  return (
    <svg
      viewBox="0 0 600 338"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="process-diagram-svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ── LOCAL PLINTH (BOTTOM LEFT) ── */}
      {/* Target ~88% canvas width, plinth sits at x=36, y=254 */}
      <g>
        <rect
          x="36"
          y="254"
          width="154"
          height="38"
          rx="6"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1.2"
        />
        <text
          x="113"
          y="277"
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

      {/* ── DEPLOYMENT TRAJECTORY PATH (ACROSS THE CANVAS) ── */}
      {/* Cuts across center of canvas from (113, 210) to (350, 56) */}
      <path
        d="M 113 210 C 150 120, 230 65, 350 56"
        stroke="var(--fog)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
      />

      {/* ── MOVING THREE-BLOCK STACK (BUILD, DB, ASSETS) ── */}
      <motion.g
        initial={
          shouldReduceMotion
            ? { opacity: 0 }
            : { opacity: 1, x: 49, y: 176, scale: 1 }
        }
        animate={
          isPlaying
            ? {
                opacity: [1, 1, 1, 0, 0, 1],
                x: [49, 49, 290, 345, 49, 49],
                y: [176, 170, 56, 56, 176, 176],
                scale: [1, 1, 0.85, 0.5, 1, 1],
              }
            : shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 1, x: 49, y: 176 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.1, 0.36, 0.44, 0.94, 1],
        }}
      >
        {/* Block 3: ASSETS (Base) */}
        <rect
          x="0"
          y="46"
          width="128"
          height="20"
          rx="4"
          fill="var(--fog)"
          stroke="var(--hairline)"
        />
        <text
          x="64"
          y="59"
          textAnchor="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="8"
          fontWeight="600"
          letterSpacing="0.08em"
        >
          ASSETS
        </text>

        {/* Block 2: DB (Middle) */}
        <rect
          x="0"
          y="23"
          width="128"
          height="20"
          rx="4"
          fill="var(--graphite)"
        />
        <text
          x="64"
          y="36"
          textAnchor="middle"
          fill="var(--paper)"
          fontFamily="var(--font-mono)"
          fontSize="8"
          fontWeight="600"
          letterSpacing="0.08em"
        >
          DB
        </text>

        {/* Block 1: BUILD (Top) */}
        <rect
          x="0"
          y="0"
          width="128"
          height="20"
          rx="4"
          fill="var(--ink)"
        />
        <text
          x="64"
          y="13"
          textAnchor="middle"
          fill="var(--paper)"
          fontFamily="var(--font-mono)"
          fontSize="8"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          BUILD
        </text>
      </motion.g>

      {/* ── VERCEL · PRODUCTION NODE (TOP RIGHT) ── */}
      {/* x=334, y=24, w=230, h=66 */}
      <g>
        <rect
          x="334"
          y="24"
          width="230"
          height="66"
          rx="8"
          fill="var(--paper-2)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />

        {/* Production Node Label */}
        <text
          x="350"
          y="42"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          VERCEL · PRODUCTION
        </text>

        {/* Status Indicator */}
        <circle cx="546" cy="38" r="3.5" fill="var(--ink)" />

        {/* Domain Pill (thedreamadventure.com) */}
        <g transform="translate(348, 50)">
          <rect
            x="0"
            y="0"
            width="202"
            height="26"
            rx="13"
            fill="var(--paper)"
            stroke="var(--fog)"
            strokeWidth="1"
          />

          {/* Padlock Icon (snaps shut when deployment lands) */}
          <g transform="translate(12, 6)">
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
                times: [0, 0.44, 0.46, 0.94, 1],
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
                times: [0, 0.44, 0.46, 0.94, 1],
              }}
            />

            {/* Lock Body */}
            <rect x="1" y="6" width="10" height="7" rx="1.5" fill="var(--ink)" />
          </g>

          {/* Domain text */}
          <text
            x="32"
            y="17"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="8.5"
            fontWeight="600"
            letterSpacing="0.02em"
          >
            thedreamadventure.com
          </text>
        </g>
      </g>

      {/* ── MOBILE PHONE QA VERIFICATION (BOTTOM RIGHT) ── */}
      {/* Position: x=420, y=106, w=128, h=200 */}
      <g>
        {/* Phone Frame */}
        <rect
          x="420"
          y="106"
          width="128"
          height="198"
          rx="18"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth="1.5"
        />

        {/* Phone Top Speaker Notch */}
        <rect x="466" y="113" width="36" height="4" rx="2" fill="var(--fog)" />

        {/* ── MINIATURE OF THE SITE'S OWN HERO ── */}
        {/* Nav header line */}
        <line x1="432" y1="126" x2="536" y2="126" stroke="var(--hairline)" strokeWidth="0.8" />
        <rect x="432" y="121" width="28" height="3" rx="1.5" fill="var(--ink)" />

        {/* Hero Banner: permitted muted neutral fill */}
        <rect
          x="430"
          y="132"
          width="108"
          height="48"
          rx="4"
          fill="var(--fog)"
          opacity="0.6"
        />

        {/* Hero Title & Subhead Lines */}
        <rect x="430" y="188" width="78" height="6" rx="2" fill="var(--ink)" />
        <rect x="430" y="198" width="98" height="4" rx="2" fill="var(--graphite)" />
        <rect x="430" y="206" width="60" height="4" rx="2" fill="var(--mist)" opacity="0.6" />

        {/* Mini CTA button */}
        <rect x="430" y="218" width="46" height="12" rx="3" fill="var(--ink)" />
        <text
          x="453"
          y="227"
          textAnchor="middle"
          fill="var(--paper)"
          fontFamily="var(--font-mono)"
          fontSize="6"
          fontWeight="600"
        >
          EXPLORE
        </text>

        {/* ── PHONE QA VERIFIED BADGE ── */}
        {/* Enters at ~0.54, stays on hold */}
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
            times: [0, 0.52, 0.58, 0.94, 1],
          }}
          style={{ transformOrigin: '484px 260px' }}
        >
          <rect
            x="428"
            y="248"
            width="112"
            height="24"
            rx="12"
            fill="var(--paper)"
            stroke="var(--ink)"
            strokeWidth="1"
          />
          {/* Checkmark icon */}
          <path
            d="M 440 260 L 443 263 L 449 257"
            stroke="var(--ink)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <text
            x="480"
            y="263"
            textAnchor="middle"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="7.5"
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
