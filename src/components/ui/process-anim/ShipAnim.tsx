'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimProps {
  inView: boolean;
}

export function ShipAnim({ inView }: AnimProps) {
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
      {/* ── LOCAL PLINTH (BOTTOM LEFT) ── */}
      <g>
        <rect
          x="70"
          y="270"
          width="140"
          height="24"
          rx="5"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1.2"
        />
        <text
          x="140"
          y="285"
          textAnchor="middle"
          fill="var(--mist)"
          fontFamily="var(--font-mono)"
          fontSize="8.5"
          letterSpacing="0.08em"
          aria-hidden="true"
        >
          LOCAL BUILD
        </text>
      </g>

      {/* ── DEPLOYMENT TRAJECTORY PATH ── */}
      <path
        d="M 140 235 C 140 135, 230 75, 340 75"
        stroke="var(--fog)"
        strokeWidth="1.75"
        strokeDasharray="4 4"
        fill="none"
      />

      {/* ── MOVING THREE-FILE STACK ── */}
      <motion.g
        initial={
          shouldReduceMotion
            ? { opacity: 0 }
            : { opacity: 1, x: 95, y: 215, scale: 1 }
        }
        animate={
          isPlaying
            ? {
                opacity: [1, 1, 1, 0, 0, 1],
                x: [95, 95, 305, 350, 95, 95],
                y: [215, 205, 75, 75, 215, 215],
                scale: [1, 1, 0.85, 0.5, 1, 1],
              }
            : shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 1, x: 95, y: 215 }
        }
        transition={{
          duration: 7,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: 0.6,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.1, 0.38, 0.44, 0.94, 1],
        }}
      >
        {/* Block 3 (Base) */}
        <rect x="0" y="26" width="90" height="12" rx="3" fill="var(--fog)" stroke="var(--hairline)" />
        {/* Block 2 (Middle) */}
        <rect x="0" y="13" width="90" height="12" rx="3" fill="var(--graphite)" />
        {/* Block 1 (Top) */}
        <rect x="0" y="0" width="90" height="12" rx="3" fill="var(--ink)" />
      </motion.g>

      {/* ── PRODUCTION CLOUD NODE (TOP RIGHT) ── */}
      <g>
        <rect
          x="330"
          y="50"
          width="200"
          height="52"
          rx="8"
          fill="var(--paper-2)"
          stroke="var(--ink)"
          strokeWidth="1.5"
        />
        {/* Cloud/Server Rack Lines */}
        <line x1="346" y1="62" x2="380" y2="62" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="505" cy="62" r="3" fill="var(--ink)" />
        <text
          x="346"
          y="84"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fontWeight="600"
          letterSpacing="0.08em"
          aria-hidden="true"
        >
          PRODUCTION SERVER
        </text>
        <text
          x="508"
          y="84"
          textAnchor="end"
          fill="var(--mist)"
          fontFamily="var(--font-mono)"
          fontSize="8"
          letterSpacing="0.05em"
          aria-hidden="true"
        >
          LIVE
        </text>
      </g>

      {/* ── DOMAIN PILL + SNAPPING PADLOCK ── */}
      <motion.g
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 1, 0],
                y: [8, 8, 0, 0, 8],
              }
            : shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0 }
        }
        transition={{
          duration: 7,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: 0.6,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.42, 0.5, 0.92, 1],
        }}
      >
        <rect
          x="330"
          y="118"
          width="200"
          height="30"
          rx="15"
          fill="var(--paper)"
          stroke="var(--fog)"
          strokeWidth="1.2"
        />

        {/* Padlock Icon */}
        <g transform="translate(348, 133)">
          {/* Padlock Shackle */}
          <motion.path
            d="M -3.5 -3 L -3.5 -8 C -3.5 -12, 3.5 -12, 3.5 -8 L 3.5 -3"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.4"
            strokeLinecap="round"
            initial={shouldReduceMotion ? { y: 0 } : { y: -4 }}
            animate={
              isPlaying
                ? {
                    y: [-4, -4, 0, 0, -4],
                  }
                : shouldReduceMotion
                  ? { y: 0 }
                  : { y: -4 }
            }
            transition={{
              duration: 7,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: 0.6,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.48, 0.54, 0.92, 1],
            }}
          />
          {/* Padlock Body */}
          <rect x="-5.5" y="-3" width="11" height="9" rx="2" fill="var(--ink)" />
        </g>

        {/* Domain Name */}
        <text
          x="368"
          y="137"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fontWeight="600"
          letterSpacing="0.04em"
          aria-hidden="true"
        >
          clientdomain.com
        </text>

        <rect x="480" y="125" width="38" height="16" rx="3" fill="var(--fog)" />
        <text
          x="499"
          y="136"
          textAnchor="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="7"
          fontWeight="600"
          letterSpacing="0.04em"
          aria-hidden="true"
        >
          SSL
        </text>
      </motion.g>

      {/* ── PHONE OUTLINE & MOBILE QA CHECKMARK ── */}
      <motion.g
        initial={
          shouldReduceMotion
            ? { opacity: 1, x: 380, y: 168 }
            : { opacity: 0, x: 420, y: 168 }
        }
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 1, 0],
                x: [420, 420, 380, 380, 420],
              }
            : shouldReduceMotion
              ? { opacity: 1, x: 380, y: 168 }
              : { opacity: 0 }
        }
        transition={{
          duration: 7,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: 0.6,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.54, 0.64, 0.92, 1],
        }}
      >
        {/* Phone Frame */}
        <rect
          x="0"
          y="0"
          width="100"
          height="160"
          rx="18"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth="1.5"
        />
        {/* Screen */}
        <rect
          x="6"
          y="6"
          width="88"
          height="148"
          rx="13"
          fill="var(--paper-2)"
        />
        {/* Notch */}
        <rect x="36" y="11" width="28" height="4" rx="2" fill="var(--fog)" />

        {/* QA Verified Stamp / Checkmark inside Phone */}
        <g transform="translate(50, 75)">
          <motion.circle
            cx="0"
            cy="0"
            r="18"
            fill="var(--paper)"
            stroke="var(--ink)"
            strokeWidth="1.5"
            initial={shouldReduceMotion ? { scale: 1 } : { scale: 0.7 }}
            animate={
              isPlaying
                ? {
                    scale: [0.7, 0.7, 1, 1, 0.7],
                  }
                : shouldReduceMotion
                  ? { scale: 1 }
                  : { scale: 0.7 }
            }
            transition={{
              duration: 7,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: 0.6,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.66, 0.72, 0.92, 1],
            }}
          />
          {/* Checkmark */}
          <motion.path
            d="M -7 0 L -2 5 L 7 -4"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={
              isPlaying
                ? {
                    pathLength: [0, 0, 1, 1, 0],
                  }
                : shouldReduceMotion
                  ? { pathLength: 1 }
                  : { pathLength: 0 }
            }
            transition={{
              duration: 7,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: 0.6,
              ease: 'easeOut',
              times: [0, 0.72, 0.78, 0.92, 1],
            }}
          />
        </g>

        <text
          x="50"
          y="115"
          textAnchor="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="7.5"
          fontWeight="600"
          letterSpacing="0.05em"
          aria-hidden="true"
        >
          MOBILE QA OK
        </text>

        {/* Home Bar */}
        <rect x="35" y="146" width="30" height="2.5" rx="1.25" fill="var(--fog)" />
      </motion.g>
    </svg>
  );
}
