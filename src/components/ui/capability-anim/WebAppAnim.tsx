'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimProps {
  active: boolean;
  inView: boolean;
}

export function WebAppAnim({ active, inView }: AnimProps) {
  const shouldReduceMotion = useReducedMotion();
  const isPlaying = active && inView && !shouldReduceMotion;

  // Paths:
  // Left path from Customer panel (185, 140) to Database (270, 240)
  const leftPath = 'M 185 140 C 185 200, 240 240, 270 240';
  // Right path from Database (330, 240) to Admin panel (415, 140)
  const rightPath = 'M 330 240 C 360 240, 415 200, 415 140';

  return (
    <svg
      viewBox="0 0 600 338"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="capability-diagram-svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ── CONNECTING PATHS ── */}
      <path
        d={leftPath}
        stroke="var(--fog)"
        strokeWidth="1.75"
        strokeDasharray="4 4"
        fill="none"
      />
      <path
        d={rightPath}
        stroke="var(--fog)"
        strokeWidth="1.75"
        strokeDasharray="4 4"
        fill="none"
      />

      {/* ── CUSTOMER PANEL (LEFT) ── */}
      <g>
        <rect
          x="75"
          y="65"
          width="170"
          height="120"
          rx="10"
          fill="var(--paper-2)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />
        {/* Header bar */}
        <text
          x="90"
          y="88"
          fill="var(--mist)"
          fontFamily="var(--font-mono)"
          fontSize="10"
          letterSpacing="0.08em"
          aria-hidden="true"
        >
          CUSTOMER
        </text>
        <circle cx="230" cy="85" r="3.5" fill="var(--fog)" />

        {/* Mock UI: slot select */}
        <rect x="90" y="102" width="140" height="12" rx="3" fill="var(--paper)" />
        <rect x="94" y="106" width="60" height="4" rx="2" fill="var(--fog)" />

        {/* Mock UI: date row */}
        <rect x="90" y="122" width="140" height="12" rx="3" fill="var(--paper)" />
        <rect x="94" y="126" width="45" height="4" rx="2" fill="var(--fog)" />

        {/* Action Button */}
        <rect
          x="90"
          y="146"
          width="140"
          height="24"
          rx="4"
          fill="var(--paper)"
          stroke="var(--hairline)"
          strokeWidth="1"
        />
        <text
          x="125"
          y="161"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="8.5"
          letterSpacing="0.05em"
          fontWeight="500"
          aria-hidden="true"
        >
          CONFIRM BOOKING
        </text>
      </g>

      {/* ── DATABASE CYLINDER (CENTER BOTTOM) ── */}
      <g transform="translate(260, 205)">
        {/* Pulse aura */}
        <motion.ellipse
          cx="40"
          cy="35"
          rx="45"
          ry="30"
          fill="none"
          stroke="var(--project-accent)"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isPlaying
              ? {
                  opacity: [0, 0, 0.75, 0, 0],
                  scale: [0.95, 0.95, 1.15, 1.25, 1.25],
                }
              : shouldReduceMotion
                ? { opacity: 0.4, scale: 1.05 }
                : { opacity: 0 }
          }
          transition={{
            duration: 5,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: 0.4,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.3, 0.38, 0.48, 1],
          }}
        />

        {/* Cylinder body */}
        <path
          d="M 5 20 L 5 45 C 5 56, 75 56, 75 45 L 75 20 Z"
          fill="var(--paper-2)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />
        {/* Middle dividing ridge */}
        <path
          d="M 5 32 C 5 43, 75 43, 75 32"
          fill="none"
          stroke="var(--fog)"
          strokeWidth="1.2"
        />
        {/* Bottom dividing ridge */}
        <path
          d="M 5 45 C 5 56, 75 56, 75 45"
          fill="none"
          stroke="var(--fog)"
          strokeWidth="1.2"
        />
        {/* Top rim */}
        <ellipse
          cx="40"
          cy="20"
          rx="35"
          ry="12"
          fill="var(--paper)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />

        {/* Label */}
        <text
          x="40"
          y="76"
          textAnchor="middle"
          fill="var(--mist)"
          fontFamily="var(--font-mono)"
          fontSize="9.5"
          letterSpacing="0.08em"
          aria-hidden="true"
        >
          POSTGRESQL
        </text>
      </g>

      {/* ── ADMIN PANEL (RIGHT) ── */}
      <g>
        <rect
          x="355"
          y="65"
          width="170"
          height="120"
          rx="10"
          fill="var(--paper-2)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />
        {/* Header bar */}
        <text
          x="370"
          y="88"
          fill="var(--mist)"
          fontFamily="var(--font-mono)"
          fontSize="10"
          letterSpacing="0.08em"
          aria-hidden="true"
        >
          ADMIN
        </text>
        <circle cx="510" cy="85" r="3.5" fill="var(--project-accent)" />

        {/* Existing Row 1 */}
        <rect x="370" y="102" width="140" height="15" rx="3" fill="var(--paper)" />
        <rect x="375" y="107" width="45" height="4" rx="2" fill="var(--fog)" />
        <rect x="475" y="107" width="28" height="4" rx="2" fill="var(--fog)" />

        {/* Existing Row 2 */}
        <rect x="370" y="122" width="140" height="15" rx="3" fill="var(--paper)" />
        <rect x="375" y="127" width="55" height="4" rx="2" fill="var(--fog)" />
        <rect x="475" y="127" width="28" height="4" rx="2" fill="var(--fog)" />

        {/* Incoming live booking row (Slides in) */}
        <motion.g
          initial={
            shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: -6 }
          }
          animate={
            isPlaying
              ? {
                  opacity: [0, 0, 0, 1, 1, 1],
                  y: [-6, -6, -6, 0, 0, -6],
                }
              : shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0 }
          }
          transition={{
            duration: 5,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: 0.4,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.6, 0.65, 0.75, 0.95, 1],
          }}
        >
          <rect
            x="370"
            y="142"
            width="140"
            height="18"
            rx="3"
            fill="var(--paper)"
            stroke="var(--project-accent)"
            strokeWidth="1"
          />
          <rect
            x="370"
            y="142"
            width="3"
            height="18"
            rx="1"
            fill="var(--project-accent)"
          />
          <text
            x="378"
            y="154"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="8"
            fontWeight="500"
            letterSpacing="0.04em"
            aria-hidden="true"
          >
            NEW BOOKING #412
          </text>
          <circle cx="498" cy="151" r="2.5" fill="var(--project-accent)" />
        </motion.g>
      </g>

      {/* ── TRAVELING DOT 1: CUSTOMER -> DB ── */}
      <motion.circle
        r="4.5"
        fill="var(--project-accent)"
        initial={
          shouldReduceMotion
            ? { opacity: 0 }
            : { opacity: 0, cx: 185, cy: 140 }
        }
        animate={
          isPlaying
            ? {
                opacity: [0, 1, 1, 0, 0],
                cx: [185, 185, 230, 270, 270],
                cy: [140, 140, 205, 240, 240],
              }
            : { opacity: 0 }
        }
        transition={{
          duration: 5,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: 0.4,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.05, 0.2, 0.32, 1],
        }}
      />

      {/* ── TRAVELING DOT 2: DB -> ADMIN ── */}
      <motion.circle
        r="4.5"
        fill="var(--project-accent)"
        initial={
          shouldReduceMotion
            ? { opacity: 1, cx: 415, cy: 140 }
            : { opacity: 0, cx: 330, cy: 240 }
        }
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 1, 0, 0],
                cx: [330, 330, 330, 380, 415, 415],
                cy: [240, 240, 240, 195, 140, 140],
              }
            : shouldReduceMotion
              ? { opacity: 1, cx: 415, cy: 140 }
              : { opacity: 0 }
        }
        transition={{
          duration: 5,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: 0.4,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.38, 0.42, 0.55, 0.65, 1],
        }}
      />
    </svg>
  );
}
