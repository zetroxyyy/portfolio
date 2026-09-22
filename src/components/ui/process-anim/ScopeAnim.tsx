'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimProps {
  inView: boolean;
}

export function ScopeAnim({ inView }: AnimProps) {
  const shouldReduceMotion = useReducedMotion();
  const isPlaying = inView && !shouldReduceMotion;

  return (
    <svg
      viewBox="0 0 600 375"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="process-diagram-svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ── PHASE 1: CHAT BUBBLES (CONVERSATION) ── */}
      {/* Bubble 1 (Client, Left) */}
      <motion.g
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.95 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 1, 1, 1, 0, 0, 0],
                y: [10, 0, 0, 0, 30, 30, 10],
                scale: [0.95, 1, 1, 1, 0.6, 0.6, 0.95],
              }
            : { opacity: 0 }
        }
        transition={{
          duration: 6.8,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: 0.6,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.08, 0.28, 0.34, 0.44, 0.94, 1],
        }}
      >
        <rect
          x="100"
          y="45"
          width="210"
          height="40"
          rx="10"
          fill="var(--paper-2)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />
        <rect x="116" y="58" width="130" height="4" rx="2" fill="var(--graphite)" />
        <rect x="116" y="68" width="85" height="4" rx="2" fill="var(--mist)" opacity="0.6" />
      </motion.g>

      {/* Bubble 2 (Developer, Right) */}
      <motion.g
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.95 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 1, 0, 0, 0],
                y: [10, 10, 0, 0, 20, 20, 10],
                scale: [0.95, 0.95, 1, 1, 0.6, 0.6, 0.95],
              }
            : { opacity: 0 }
        }
        transition={{
          duration: 6.8,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: 0.6,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.12, 0.2, 0.34, 0.44, 0.94, 1],
        }}
      >
        <rect
          x="290"
          y="100"
          width="210"
          height="40"
          rx="10"
          fill="var(--fog)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />
        <rect x="306" y="113" width="145" height="4" rx="2" fill="var(--ink)" />
        <rect x="306" y="123" width="95" height="4" rx="2" fill="var(--graphite)" opacity="0.7" />
      </motion.g>

      {/* Bubble 3 (Client, Left) */}
      <motion.g
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.95 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 1, 0, 0, 0],
                y: [10, 10, 0, 0, 10, 10, 10],
                scale: [0.95, 0.95, 1, 1, 0.6, 0.6, 0.95],
              }
            : { opacity: 0 }
        }
        transition={{
          duration: 6.8,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: 0.6,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.22, 0.3, 0.34, 0.44, 0.94, 1],
        }}
      >
        <rect
          x="120"
          y="155"
          width="190"
          height="38"
          rx="10"
          fill="var(--paper-2)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />
        <rect x="136" y="168" width="110" height="4" rx="2" fill="var(--graphite)" />
        <rect x="136" y="178" width="70" height="4" rx="2" fill="var(--mist)" opacity="0.6" />
      </motion.g>

      {/* ── PHASE 2 & 3: CONDENSED SPECIFICATION DOCUMENT ── */}
      <motion.g
        initial={
          shouldReduceMotion
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.85, y: -20 }
        }
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 0, 1, 1, 1, 0],
                scale: [0.85, 0.85, 0.85, 1, 1, 1, 0.85],
                y: [-20, -20, -20, 0, 0, 0, -20],
              }
            : shouldReduceMotion
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0 }
        }
        transition={{
          duration: 6.8,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: 0.6,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.36, 0.42, 0.5, 0.93, 0.97, 1],
        }}
      >
        {/* Document Frame */}
        <rect
          x="165"
          y="42"
          width="270"
          height="285"
          rx="10"
          fill="var(--paper-2)"
          stroke="var(--ink)"
          strokeWidth="1.5"
        />

        {/* Document Header */}
        <text
          x="190"
          y="72"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="10"
          fontWeight="600"
          letterSpacing="0.08em"
          aria-hidden="true"
        >
          PROJECT SPECIFICATION
        </text>
        <line x1="190" y1="84" x2="410" y2="84" stroke="var(--fog)" strokeWidth="1" />

        {/* ── ROW 1: SCOPE ── */}
        <g>
          <text
            x="190"
            y="110"
            fill="var(--mist)"
            fontFamily="var(--font-mono)"
            fontSize="9"
            letterSpacing="0.08em"
            aria-hidden="true"
          >
            01 / SCOPE
          </text>
          {/* Track */}
          <rect x="190" y="118" width="180" height="8" rx="4" fill="var(--fog)" />
          {/* Writing Bar */}
          <motion.rect
            x="190"
            y="118"
            height="8"
            rx="4"
            fill="var(--ink)"
            initial={shouldReduceMotion ? { width: 180 } : { width: 0 }}
            animate={
              isPlaying
                ? {
                    width: [0, 0, 0, 180, 180, 0],
                  }
                : shouldReduceMotion
                  ? { width: 180 }
                  : { width: 0 }
            }
            transition={{
              duration: 6.8,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: 0.6,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.48, 0.52, 0.62, 0.93, 1],
            }}
          />
          {/* Checkmark 1 */}
          <motion.path
            d="M 390 122 L 394 126 L 402 118"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={shouldReduceMotion ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
            animate={
              isPlaying
                ? {
                    opacity: [0, 0, 0, 1, 1, 0],
                    pathLength: [0, 0, 0, 1, 1, 0],
                  }
                : shouldReduceMotion
                  ? { opacity: 1, pathLength: 1 }
                  : { opacity: 0 }
            }
            transition={{
              duration: 6.8,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: 0.6,
              ease: 'easeOut',
              times: [0, 0.6, 0.62, 0.65, 0.93, 1],
            }}
          />
        </g>

        {/* ── ROW 2: TIMELINE ── */}
        <g>
          <text
            x="190"
            y="158"
            fill="var(--mist)"
            fontFamily="var(--font-mono)"
            fontSize="9"
            letterSpacing="0.08em"
            aria-hidden="true"
          >
            02 / TIMELINE
          </text>
          {/* Track */}
          <rect x="190" y="166" width="180" height="8" rx="4" fill="var(--fog)" />
          {/* Writing Bar */}
          <motion.rect
            x="190"
            y="166"
            height="8"
            rx="4"
            fill="var(--ink)"
            initial={shouldReduceMotion ? { width: 180 } : { width: 0 }}
            animate={
              isPlaying
                ? {
                    width: [0, 0, 0, 180, 180, 0],
                  }
                : shouldReduceMotion
                  ? { width: 180 }
                  : { width: 0 }
            }
            transition={{
              duration: 6.8,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: 0.6,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.63, 0.65, 0.73, 0.93, 1],
            }}
          />
          {/* Checkmark 2 */}
          <motion.path
            d="M 390 170 L 394 174 L 402 166"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={shouldReduceMotion ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
            animate={
              isPlaying
                ? {
                    opacity: [0, 0, 0, 1, 1, 0],
                    pathLength: [0, 0, 0, 1, 1, 0],
                  }
                : shouldReduceMotion
                  ? { opacity: 1, pathLength: 1 }
                  : { opacity: 0 }
            }
            transition={{
              duration: 6.8,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: 0.6,
              ease: 'easeOut',
              times: [0, 0.71, 0.73, 0.76, 0.93, 1],
            }}
          />
        </g>

        {/* ── ROW 3: PRICE ── */}
        <g>
          <text
            x="190"
            y="206"
            fill="var(--mist)"
            fontFamily="var(--font-mono)"
            fontSize="9"
            letterSpacing="0.08em"
            aria-hidden="true"
          >
            03 / PRICE
          </text>
          {/* Track */}
          <rect x="190" y="214" width="180" height="8" rx="4" fill="var(--fog)" />
          {/* Writing Bar */}
          <motion.rect
            x="190"
            y="214"
            height="8"
            rx="4"
            fill="var(--ink)"
            initial={shouldReduceMotion ? { width: 180 } : { width: 0 }}
            animate={
              isPlaying
                ? {
                    width: [0, 0, 0, 180, 180, 0],
                  }
                : shouldReduceMotion
                  ? { width: 180 }
                  : { width: 0 }
            }
            transition={{
              duration: 6.8,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: 0.6,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.74, 0.76, 0.84, 0.93, 1],
            }}
          />
          {/* Checkmark 3 */}
          <motion.path
            d="M 390 218 L 394 222 L 402 214"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={shouldReduceMotion ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
            animate={
              isPlaying
                ? {
                    opacity: [0, 0, 0, 1, 1, 0],
                    pathLength: [0, 0, 0, 1, 1, 0],
                  }
                : shouldReduceMotion
                  ? { opacity: 1, pathLength: 1 }
                  : { opacity: 0 }
            }
            transition={{
              duration: 6.8,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: 0.6,
              ease: 'easeOut',
              times: [0, 0.82, 0.84, 0.87, 0.93, 1],
            }}
          />
        </g>

        {/* ── FINAL BADGE: SIGNED & AGREED ── */}
        <motion.g
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 4 }}
          animate={
            isPlaying
              ? {
                  opacity: [0, 0, 0, 1, 1, 0],
                  y: [4, 4, 4, 0, 0, 4],
                }
              : shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0 }
          }
          transition={{
            duration: 6.8,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: 0.6,
            ease: 'easeOut',
            times: [0, 0.85, 0.87, 0.9, 0.93, 1],
          }}
        >
          <rect
            x="190"
            y="255"
            width="120"
            height="22"
            rx="4"
            fill="var(--paper)"
            stroke="var(--ink)"
            strokeWidth="1"
          />
          <text
            x="250"
            y="269"
            textAnchor="middle"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="8"
            fontWeight="600"
            letterSpacing="0.06em"
            aria-hidden="true"
          >
            FIXED &amp; AGREED
          </text>
        </motion.g>
      </motion.g>
    </svg>
  );
}
