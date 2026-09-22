'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimProps {
  inView: boolean;
  delay?: number;
}

export function ScopeAnim({ inView, delay = 0 }: AnimProps) {
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
      {/* ── 1. PERMANENT DOCUMENT PANEL STRUCTURE ── */}
      {/* x: 32, y: 32, w: 536, h: 274, 1px --fog border, radius 6, fill --paper */}
      <rect
        x="32"
        y="32"
        width="536"
        height="274"
        rx="6"
        fill="var(--paper)"
        stroke="var(--fog)"
        strokeWidth="1"
      />

      {/* Header divider: x: 32, y: 74, w: 536, h: 1, --fog */}
      <line x1="32" y1="74" x2="568" y2="74" stroke="var(--fog)" strokeWidth="1" />

      {/* PROJECT SCOPE: x=52, centre-aligned vertically on y=53 */}
      <text
        x="52"
        y="53"
        dominantBaseline="middle"
        fill="var(--ink)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fontWeight="700"
        letterSpacing="0.04em"
      >
        PROJECT SCOPE
      </text>

      {/* ── PERMANENT ROW DIVIDERS & LABELS ── */}
      {/* Row 1 (y: 74..120, centre y=97) */}
      <line x1="32" y1="120" x2="568" y2="120" stroke="var(--fog)" strokeWidth="1" />
      <text
        x="52"
        y="97"
        dominantBaseline="middle"
        fill="var(--graphite)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="0.04em"
      >
        Scope
      </text>

      {/* Row 2 (y: 120..166, centre y=143) */}
      <line x1="32" y1="166" x2="568" y2="166" stroke="var(--fog)" strokeWidth="1" />
      <text
        x="52"
        y="143"
        dominantBaseline="middle"
        fill="var(--graphite)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="0.04em"
      >
        Platforms
      </text>

      {/* Row 3 (y: 166..212, centre y=189) */}
      <line x1="32" y1="212" x2="568" y2="212" stroke="var(--fog)" strokeWidth="1" />
      <text
        x="52"
        y="189"
        dominantBaseline="middle"
        fill="var(--graphite)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="0.04em"
      >
        Who edits it
      </text>

      {/* Row 4 (y: 212..258, centre y=235) */}
      <line x1="32" y1="258" x2="568" y2="258" stroke="var(--fog)" strokeWidth="1" />
      <text
        x="52"
        y="235"
        dominantBaseline="middle"
        fill="var(--graphite)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="0.04em"
      >
        Timeline
      </text>

      {/* Row 5 (y: 258..304, centre y=281) */}
      <text
        x="52"
        y="281"
        dominantBaseline="middle"
        fill="var(--graphite)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="0.04em"
      >
        Price
      </text>

      {/* ── 2. STATUS PILL (x: 470, y: 41, w: 78, h: 24, radius 12; DRAFT -> AGREED) ── */}
      {/* DRAFT pill */}
      <motion.g
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 1 }}
        animate={
          isPlaying
            ? {
                opacity: [1, 1, 1, 0, 0, 0, 1],
              }
            : { opacity: 0 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          times: [0, 0.38, 0.40, 0.41, 0.82, 0.88, 1],
        }}
      >
        <rect
          x="470"
          y="41"
          width="78"
          height="24"
          rx="12"
          fill="var(--paper)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <text
          x="509"
          y="53"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--graphite)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="0.04em"
        >
          DRAFT
        </text>
      </motion.g>

      {/* AGREED pill */}
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
          times: [0, 0.40, 0.41, 0.82, 0.88, 1],
        }}
      >
        <rect
          x="470"
          y="41"
          width="78"
          height="24"
          rx="12"
          fill="var(--ink)"
        />
        <text
          x="509"
          y="53"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--paper)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fontWeight="700"
          letterSpacing="0.04em"
        >
          AGREED
        </text>
      </motion.g>

      {/* ── 3. SPECIFICATION VALUES & CHECKS ── */}
      {/* Row 1 Value: Pages, flows, admin screens (x: 190, centre y: 97) */}
      <motion.text
        x="190"
        y="97"
        dominantBaseline="middle"
        fill="var(--ink)"
        fontFamily="var(--font-mono)"
        fontSize="10"
        fontWeight="600"
        letterSpacing="0.04em"
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
          times: [0, 0.17, 0.20, 0.82, 0.88, 1],
        }}
      >
        Pages, flows, admin screens
      </motion.text>

      {/* Row 1 Checkmark (centred at x=534, y=97, 12x12) */}
      <motion.path
        d="M 528 97 L 532 101 L 540 93"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={shouldReduceMotion ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 1, 0, 0],
                pathLength: [0, 0, 1, 1, 1, 0],
              }
            : shouldReduceMotion
              ? { opacity: 1, pathLength: 1 }
              : { opacity: 0 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          times: [0, 0.20, 0.23, 0.82, 0.88, 1],
        }}
      />

      {/* Row 2 Value: Web · Mobile (middle dot U+00B7) (x: 190, centre y: 143) */}
      <motion.text
        x="190"
        y="143"
        dominantBaseline="middle"
        fill="var(--ink)"
        fontFamily="var(--font-mono)"
        fontSize="10"
        fontWeight="600"
        letterSpacing="0.04em"
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
          times: [0, 0.22, 0.25, 0.82, 0.88, 1],
        }}
      >
        Web · Mobile
      </motion.text>

      {/* Row 2 Checkmark (centred at x=534, y=143) */}
      <motion.path
        d="M 528 143 L 532 147 L 540 139"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={shouldReduceMotion ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 1, 0, 0],
                pathLength: [0, 0, 1, 1, 1, 0],
              }
            : shouldReduceMotion
              ? { opacity: 1, pathLength: 1 }
              : { opacity: 0 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          times: [0, 0.25, 0.28, 0.82, 0.88, 1],
        }}
      />

      {/* Row 3 Value: Your team, no developer (x: 190, centre y: 189) */}
      <motion.text
        x="190"
        y="189"
        dominantBaseline="middle"
        fill="var(--ink)"
        fontFamily="var(--font-mono)"
        fontSize="10"
        fontWeight="600"
        letterSpacing="0.04em"
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
          times: [0, 0.27, 0.30, 0.82, 0.88, 1],
        }}
      >
        Your team, no developer
      </motion.text>

      {/* Row 3 Checkmark (centred at x=534, y=189) */}
      <motion.path
        d="M 528 189 L 532 193 L 540 185"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={shouldReduceMotion ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 1, 0, 0],
                pathLength: [0, 0, 1, 1, 1, 0],
              }
            : shouldReduceMotion
              ? { opacity: 1, pathLength: 1 }
              : { opacity: 0 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          times: [0, 0.30, 0.33, 0.82, 0.88, 1],
        }}
      />

      {/* Row 4 Value: Agreed before work starts (x: 190, centre y: 235) */}
      <motion.text
        x="190"
        y="235"
        dominantBaseline="middle"
        fill="var(--ink)"
        fontFamily="var(--font-mono)"
        fontSize="10"
        fontWeight="600"
        letterSpacing="0.04em"
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
          times: [0, 0.32, 0.35, 0.82, 0.88, 1],
        }}
      >
        Agreed before work starts
      </motion.text>

      {/* Row 4 Checkmark (centred at x=534, y=235) */}
      <motion.path
        d="M 528 235 L 532 239 L 540 231"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={shouldReduceMotion ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 1, 0, 0],
                pathLength: [0, 0, 1, 1, 1, 0],
              }
            : shouldReduceMotion
              ? { opacity: 1, pathLength: 1 }
              : { opacity: 0 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          times: [0, 0.35, 0.38, 0.82, 0.88, 1],
        }}
      />

      {/* Row 5 Value: Redacted bar: x 190, y 275, w 96, h 12, fill --paper-2, 1px --fog border */}
      <motion.rect
        x="190"
        y="275"
        width="96"
        height="12"
        rx="2"
        fill="var(--paper-2)"
        stroke="var(--fog)"
        strokeWidth="1"
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
          times: [0, 0.37, 0.40, 0.82, 0.88, 1],
        }}
      />

      {/* Row 5 Checkmark (centred at x=534, y=281) */}
      <motion.path
        d="M 528 281 L 532 285 L 540 277"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={shouldReduceMotion ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 1, 0, 0],
                pathLength: [0, 0, 1, 1, 1, 0],
              }
            : shouldReduceMotion
              ? { opacity: 1, pathLength: 1 }
              : { opacity: 0 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          times: [0, 0.40, 0.43, 0.82, 0.88, 1],
        }}
      />

      {/* ── 4. OPENING CHAT BUBBLES (INSIDE PANEL BODY y: 74..306) ── */}
      {/* Bubble 1 (Client) */}
      <motion.g
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 1, 1, 0, 0],
                y: [6, 0, 0, -4, 6],
              }
            : { opacity: 0 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.02, 0.12, 0.16, 1],
        }}
      >
        <rect
          x="48"
          y="86"
          width="264"
          height="34"
          rx="6"
          fill="var(--paper)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <text
          x="60"
          y="103"
          dominantBaseline="middle"
          fill="var(--graphite)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="0.04em"
        >
          &quot;Need client portal + admin screens&quot;
        </text>
      </motion.g>

      {/* Bubble 2 (Developer) */}
      <motion.g
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 0, 0],
                y: [6, 6, 0, -4, 6],
              }
            : { opacity: 0 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.05, 0.12, 0.16, 1],
        }}
      >
        <rect
          x="276"
          y="132"
          width="264"
          height="34"
          rx="6"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <text
          x="288"
          y="149"
          dominantBaseline="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="0.04em"
        >
          &quot;Understood. 6 weeks milestone scope.&quot;
        </text>
      </motion.g>

      {/* Bubble 3 (Client) */}
      <motion.g
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 0, 0],
                y: [6, 6, 0, -4, 6],
              }
            : { opacity: 0 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.09, 0.13, 0.16, 1],
        }}
      >
        <rect
          x="64"
          y="178"
          width="240"
          height="32"
          rx="6"
          fill="var(--paper)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <text
          x="76"
          y="194"
          dominantBaseline="middle"
          fill="var(--graphite)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="0.04em"
        >
          &quot;Agreed. Let&apos;s lock the spec.&quot;
        </text>
      </motion.g>
    </svg>
  );
}
