'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimProps {
  active: boolean;
  inView: boolean;
}

export function ShipHandoverAnim({ active, inView }: AnimProps) {
  const shouldReduceMotion = useReducedMotion();
  const isPlaying = active && inView && !shouldReduceMotion;

  const rows = [
    { label: '01 / BUILD & TESTS', y: 80, timeStart: 0, timeEnd: 0.18, checkTime: 0.2 },
    { label: '02 / DOMAIN + DNS + SSL', y: 145, timeStart: 0.22, timeEnd: 0.4, checkTime: 0.42 },
    { label: '03 / HANDOVER & CREDENTIALS', y: 210, timeStart: 0.44, timeEnd: 0.62, checkTime: 0.64 },
  ];

  return (
    <svg
      viewBox="0 0 600 338"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="capability-diagram-svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ── 3 PROGRESS STAGES ── */}
      {rows.map((row, idx) => (
        <g key={idx}>
          {/* Stage Mono Label */}
          <text
            x="75"
            y={row.y}
            fill="var(--mist)"
            fontFamily="var(--font-mono)"
            fontSize="9"
            letterSpacing="0.08em"
            aria-hidden="true"
          >
            {row.label}
          </text>

          {/* Progress Bar Background Track */}
          <rect
            x="75"
            y={row.y + 8}
            width="340"
            height="10"
            rx="5"
            fill="var(--paper-2)"
            stroke="var(--fog)"
            strokeWidth="1.2"
          />

          {/* Active Filling Progress Bar */}
          <motion.rect
            x="75"
            y={row.y + 8}
            height="10"
            rx="5"
            fill="var(--project-accent)"
            initial={shouldReduceMotion ? { width: 340 } : { width: 0 }}
            animate={
              isPlaying
                ? {
                    width: [0, 0, 340, 340, 340, 0],
                  }
                : shouldReduceMotion
                  ? { width: 340 }
                  : { width: 0 }
            }
            transition={{
              duration: 5.2,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: 0.4,
              ease: [0.16, 1, 0.3, 1],
              times: [0, row.timeStart, row.timeEnd, 0.88, 0.96, 1],
            }}
          />

          {/* Completion Checkmark Badge */}
          <g transform={`translate(435, ${row.y + 13})`}>
            {/* Outer Circle */}
            <motion.circle
              cx="0"
              cy="0"
              r="9"
              stroke="var(--fog)"
              strokeWidth="1.2"
              fill="var(--paper)"
              initial={
                shouldReduceMotion
                  ? { stroke: 'var(--project-accent)', fill: 'var(--paper)' }
                  : { stroke: 'var(--fog)', fill: 'var(--paper)' }
              }
              animate={
                isPlaying
                  ? {
                      stroke: [
                        'var(--fog)',
                        'var(--fog)',
                        'var(--project-accent)',
                        'var(--project-accent)',
                        'var(--fog)',
                      ],
                    }
                  : shouldReduceMotion
                    ? { stroke: 'var(--project-accent)' }
                    : { stroke: 'var(--fog)' }
              }
              transition={{
                duration: 5.2,
                repeat: isPlaying ? Infinity : 0,
                repeatDelay: 0.4,
                ease: 'easeInOut',
                times: [0, row.checkTime, row.checkTime + 0.04, 0.88, 1],
              }}
            />

            {/* Checkmark tick */}
            <motion.path
              d="M -3.5 0 L -1 2.5 L 3.5 -2.5"
              fill="none"
              stroke="var(--project-accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={
                shouldReduceMotion ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }
              }
              animate={
                isPlaying
                  ? {
                      opacity: [0, 0, 1, 1, 0],
                      pathLength: [0, 0, 1, 1, 0],
                    }
                  : shouldReduceMotion
                    ? { opacity: 1, pathLength: 1 }
                    : { opacity: 0, pathLength: 0 }
              }
              transition={{
                duration: 5.2,
                repeat: isPlaying ? Infinity : 0,
                repeatDelay: 0.4,
                ease: [0.16, 1, 0.3, 1],
                times: [0, row.checkTime, row.checkTime + 0.05, 0.88, 1],
              }}
            />
          </g>
        </g>
      ))}

      {/* ── RECIPIENT: OWNER ── */}
      <g transform="translate(515, 205)">
        {/* Head */}
        <circle
          cx="0"
          cy="-18"
          r="9"
          stroke="var(--graphite)"
          strokeWidth="1.5"
          fill="var(--paper)"
        />
        {/* Shoulders */}
        <path
          d="M -16 12 C -16 -4, 16 -4, 16 12"
          stroke="var(--graphite)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Handover Arrival Aura */}
        <motion.circle
          cx="0"
          cy="-4"
          r="24"
          fill="none"
          stroke="var(--project-accent)"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isPlaying
              ? {
                  opacity: [0, 0, 0.7, 0, 0],
                  scale: [0.8, 0.8, 1.25, 1.4, 0.8],
                }
              : shouldReduceMotion
                ? { opacity: 0.3, scale: 1.1 }
                : { opacity: 0 }
          }
          transition={{
            duration: 5.2,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: 0.4,
            ease: 'easeOut',
            times: [0, 0.74, 0.79, 0.88, 1],
          }}
        />

        {/* Owner Label */}
        <text
          x="0"
          y="28"
          textAnchor="middle"
          fill="var(--mist)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="0.08em"
          aria-hidden="true"
        >
          OWNER
        </text>
      </g>

      {/* ── KEY GLYPH (SLIDES FROM ROW 3 TO OWNER) ── */}
      <motion.g
        initial={
          shouldReduceMotion
            ? { opacity: 1, x: 504, y: 223 }
            : { opacity: 0, x: 440, y: 223 }
        }
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 0, 1, 1, 1, 0],
                x: [440, 440, 440, 450, 504, 504, 440],
              }
            : shouldReduceMotion
              ? { opacity: 1, x: 504, y: 223 }
              : { opacity: 0, x: 440, y: 223 }
        }
        transition={{
          duration: 5.2,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: 0.4,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.64, 0.65, 0.68, 0.78, 0.88, 1],
        }}
      >
        {/* Key Bow (Ring) */}
        <circle
          cx="0"
          cy="0"
          r="5"
          stroke="var(--project-accent)"
          strokeWidth="1.5"
          fill="var(--paper)"
        />
        {/* Key Shaft */}
        <line
          x1="5"
          y1="0"
          x2="18"
          y2="0"
          stroke="var(--project-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Key Bits */}
        <line
          x1="13"
          y1="0"
          x2="13"
          y2="4"
          stroke="var(--project-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="17"
          y1="0"
          x2="17"
          y2="3"
          stroke="var(--project-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </motion.g>
    </svg>
  );
}
