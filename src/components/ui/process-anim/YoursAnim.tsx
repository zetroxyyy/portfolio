'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimProps {
  inView: boolean;
}

export function YoursAnim({ inView }: AnimProps) {
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
      {/* ── ADMIN PANEL (CENTER UPPER) ── */}
      <g>
        <rect
          x="175"
          y="35"
          width="250"
          height="160"
          rx="10"
          fill="var(--paper-2)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />

        {/* Panel Header */}
        <text
          x="195"
          y="56"
          fill="var(--mist)"
          fontFamily="var(--font-mono)"
          fontSize="8.5"
          letterSpacing="0.08em"
          aria-hidden="true"
        >
          ADMIN CONSOLE
        </text>

        {/* Access Status Pill */}
        <motion.g
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0 }
          }
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
            duration: 7,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: 0.6,
            ease: 'easeOut',
            times: [0, 0.5, 0.58, 0.92, 1],
          }}
        >
          <rect x="330" y="45" width="80" height="15" rx="3" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" />
          <text
            x="370"
            y="55"
            textAnchor="middle"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="7"
            fontWeight="600"
            letterSpacing="0.04em"
            aria-hidden="true"
          >
            OWNER ACCESS
          </text>
        </motion.g>

        {/* Four Mock Rows (Brighten from fog to full contrast when key arrives) */}
        {[
          { y: 70, w1: 70, w2: 30 },
          { y: 94, w1: 90, w2: 40 },
          { y: 118, w1: 60, w2: 50 },
          { y: 142, w1: 80, w2: 35 },
        ].map((row, idx) => (
          <g key={idx}>
            {/* Row Container */}
            <motion.rect
              x="195"
              y={row.y}
              width="210"
              height="18"
              rx="3"
              strokeWidth="1"
              initial={
                shouldReduceMotion
                  ? { fill: 'var(--paper)', stroke: 'var(--ink)' }
                  : { fill: 'var(--fog)', stroke: 'var(--hairline)' }
              }
              animate={
                isPlaying
                  ? {
                      fill: [
                        'var(--fog)',
                        'var(--fog)',
                        'var(--paper)',
                        'var(--paper)',
                        'var(--fog)',
                      ],
                      stroke: [
                        'var(--hairline)',
                        'var(--hairline)',
                        'var(--ink)',
                        'var(--ink)',
                        'var(--hairline)',
                      ],
                    }
                  : shouldReduceMotion
                    ? { fill: 'var(--paper)', stroke: 'var(--ink)' }
                    : { fill: 'var(--fog)', stroke: 'var(--hairline)' }
              }
              transition={{
                duration: 7,
                repeat: isPlaying ? Infinity : 0,
                repeatDelay: 0.6,
                ease: [0.16, 1, 0.3, 1],
                times: [0, 0.48, 0.56, 0.92, 1],
              }}
            />

            {/* Row text skeleton */}
            <motion.rect
              x="205"
              y={row.y + 6}
              width={row.w1}
              height="6"
              rx="2"
              initial={
                shouldReduceMotion ? { fill: 'var(--ink)' } : { fill: 'var(--mist)' }
              }
              animate={
                isPlaying
                  ? {
                      fill: [
                        'var(--mist)',
                        'var(--mist)',
                        'var(--ink)',
                        'var(--ink)',
                        'var(--mist)',
                      ],
                    }
                  : shouldReduceMotion
                    ? { fill: 'var(--ink)' }
                    : { fill: 'var(--mist)' }
              }
              transition={{
                duration: 7,
                repeat: isPlaying ? Infinity : 0,
                repeatDelay: 0.6,
                ease: 'easeOut',
                times: [0, 0.48, 0.56, 0.92, 1],
              }}
            />

            <motion.rect
              x="365"
              y={row.y + 6}
              width={row.w2}
              height="6"
              rx="2"
              initial={
                shouldReduceMotion ? { fill: 'var(--graphite)' } : { fill: 'var(--mist)' }
              }
              animate={
                isPlaying
                  ? {
                      fill: [
                        'var(--mist)',
                        'var(--mist)',
                        'var(--graphite)',
                        'var(--graphite)',
                        'var(--mist)',
                      ],
                    }
                  : shouldReduceMotion
                    ? { fill: 'var(--graphite)' }
                    : { fill: 'var(--mist)' }
              }
              transition={{
                duration: 7,
                repeat: isPlaying ? Infinity : 0,
                repeatDelay: 0.6,
                ease: 'easeOut',
                times: [0, 0.48, 0.56, 0.92, 1],
              }}
            />
          </g>
        ))}
      </g>

      {/* ── DEVELOPER FIGURE (LEFT, FADES AND STEPS BACK) ── */}
      <motion.g
        initial={
          shouldReduceMotion
            ? { x: 75, opacity: 0.35 }
            : { x: 105, opacity: 1 }
        }
        animate={
          isPlaying
            ? {
                x: [105, 105, 75, 75, 105],
                opacity: [1, 1, 0.35, 0.35, 1],
              }
            : shouldReduceMotion
              ? { x: 75, opacity: 0.35 }
              : { x: 105, opacity: 1 }
        }
        transition={{
          duration: 7,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: 0.6,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.44, 0.58, 0.92, 1],
        }}
        transform="translate(0, 245)"
      >
        <circle cx="0" cy="-14" r="8" stroke="var(--graphite)" strokeWidth="1.2" fill="var(--paper)" />
        <path d="M -12 10 C -12 -3, 12 -3, 12 10" stroke="var(--graphite)" strokeWidth="1.2" fill="none" />
        <text
          x="0"
          y="26"
          textAnchor="middle"
          fill="var(--mist)"
          fontFamily="var(--font-mono)"
          fontSize="8"
          letterSpacing="0.08em"
          aria-hidden="true"
        >
          DEVELOPER
        </text>
      </motion.g>

      {/* ── CLIENT FIGURE (RIGHT, RECEIVES KEY) ── */}
      <g transform="translate(495, 245)">
        <circle cx="0" cy="-14" r="9" stroke="var(--ink)" strokeWidth="1.5" fill="var(--paper)" />
        <path d="M -13 10 C -13 -4, 13 -4, 13 10" stroke="var(--ink)" strokeWidth="1.5" fill="none" />
        <text
          x="0"
          y="26"
          textAnchor="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="8"
          fontWeight="600"
          letterSpacing="0.08em"
          aria-hidden="true"
        >
          CLIENT
        </text>
      </g>

      {/* ── KEY GLYPH (SLIDES FROM DEV TO CLIENT) ── */}
      <motion.g
        initial={
          shouldReduceMotion
            ? { x: 465, y: 242 }
            : { x: 135, y: 242 }
        }
        animate={
          isPlaying
            ? {
                x: [135, 135, 465, 465, 135],
              }
            : shouldReduceMotion
              ? { x: 465, y: 242 }
              : { x: 135, y: 242 }
        }
        transition={{
          duration: 7,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: 0.6,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.16, 0.52, 0.92, 1],
        }}
      >
        <circle cx="0" cy="0" r="5" stroke="var(--ink)" strokeWidth="1.5" fill="var(--paper)" />
        <line x1="5" y1="0" x2="18" y2="0" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="13" y1="0" x2="13" y2="4" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="17" y1="0" x2="17" y2="3" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
      </motion.g>

      {/* ── 2 WEEKS WARRANTY BADGE & SWEEPING ARC (BOTTOM CENTER) ── */}
      <g transform="translate(300, 260)">
        {/* Background badge circle */}
        <circle cx="0" cy="0" r="32" fill="var(--paper)" stroke="var(--fog)" strokeWidth="1" />

        {/* Sweeping Arc (Circumference = 2 * PI * 32 = 201.06) */}
        <motion.circle
          cx="0"
          cy="0"
          r="32"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="2"
          strokeDasharray="201"
          strokeLinecap="round"
          transform="rotate(-90)"
          initial={
            shouldReduceMotion ? { strokeDashoffset: 0 } : { strokeDashoffset: 201 }
          }
          animate={
            isPlaying
              ? {
                  strokeDashoffset: [201, 201, 0, 0, 201],
                }
              : shouldReduceMotion
                ? { strokeDashoffset: 0 }
                : { strokeDashoffset: 201 }
          }
          transition={{
            duration: 7,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: 0.6,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.58, 0.78, 0.92, 1],
          }}
        />

        {/* Badge Labels */}
        <motion.g
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
            duration: 7,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: 0.6,
            ease: 'easeOut',
            times: [0, 0.58, 0.64, 0.92, 1],
          }}
        >
          <text
            x="0"
            y="-4"
            textAnchor="middle"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="10"
            fontWeight="700"
            letterSpacing="0.04em"
            aria-hidden="true"
          >
            2 WEEKS
          </text>
          <text
            x="0"
            y="10"
            textAnchor="middle"
            fill="var(--mist)"
            fontFamily="var(--font-mono)"
            fontSize="7"
            letterSpacing="0.08em"
            aria-hidden="true"
          >
            WARRANTY
          </text>
        </motion.g>
      </g>
    </svg>
  );
}
