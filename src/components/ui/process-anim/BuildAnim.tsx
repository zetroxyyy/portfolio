'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimProps {
  inView: boolean;
  delay?: number;
}

export function BuildAnim({ inView, delay = 0 }: AnimProps) {
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
      {/* ── 1. PERMANENT TOP BAR PILLS ── */}
      {/* URL Pill: x: 32, y: 32, w: 200, h: 26, radius 13; dot at x 46; text at x 60 */}
      <rect
        x="32"
        y="32"
        width="200"
        height="26"
        rx="13"
        fill="var(--paper)"
        stroke="var(--fog)"
        strokeWidth="1"
      />
      <circle cx="46" cy="45" r="3" fill="var(--ink)" />
      <text
        x="60"
        y="45"
        dominantBaseline="middle"
        fill="var(--graphite)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="0.04em"
      >
        preview.zetroxy.me
      </text>

      {/* Commits Pill: x: 428, y: 32, w: 140, h: 26, radius 13; text centred on x=498, y=45 */}
      <rect
        x="428"
        y="32"
        width="140"
        height="26"
        rx="13"
        fill="var(--paper)"
        stroke="var(--fog)"
        strokeWidth="1"
      />
      {/* Commits text: +12 commits -> +14 commits · main */}
      <motion.text
        x="498"
        y="45"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--ink)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fontWeight="600"
        letterSpacing="0.04em"
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 1 }}
        animate={
          isPlaying
            ? {
                opacity: [1, 1, 0, 0, 0, 0, 1],
              }
            : { opacity: 0 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          times: [0, 0.22, 0.24, 0.82, 0.88, 1],
        }}
      >
        +12 commits
      </motion.text>
      <motion.text
        x="498"
        y="45"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--ink)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fontWeight="600"
        letterSpacing="0.04em"
        initial={{ opacity: 0 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 1, 0, 0, 0],
              }
            : { opacity: 0 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          times: [0, 0.24, 0.26, 0.40, 0.42, 0.82, 1],
        }}
      >
        +13 commits
      </motion.text>
      <motion.text
        x="498"
        y="45"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--ink)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fontWeight="600"
        letterSpacing="0.04em"
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
          times: [0, 0.42, 0.44, 0.82, 0.88],
        }}
      >
        +14 commits · main
      </motion.text>

      {/* ── 2. PERMANENT PANELS (LEFT & RIGHT) ── */}
      {/* Left panel: x: 32, y: 72, w: 258, h: 234, 1px --fog, radius 6, fill --paper */}
      <rect
        x="32"
        y="72"
        width="258"
        height="234"
        rx="6"
        fill="var(--paper)"
        stroke="var(--fog)"
        strokeWidth="1"
      />
      <text
        x="48"
        y="90"
        dominantBaseline="middle"
        fill="var(--graphite)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fontWeight="600"
        letterSpacing="0.04em"
      >
        01 / PUBLIC
      </text>
      <line x1="32" y1="106" x2="290" y2="106" stroke="var(--fog)" strokeWidth="1" />

      {/* Right panel: x: 310, y: 72, w: 258, h: 234, 1px --fog, radius 6, fill --paper */}
      <rect
        x="310"
        y="72"
        width="258"
        height="234"
        rx="6"
        fill="var(--paper)"
        stroke="var(--fog)"
        strokeWidth="1"
      />
      <text
        x="326"
        y="90"
        dominantBaseline="middle"
        fill="var(--graphite)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fontWeight="600"
        letterSpacing="0.04em"
      >
        02 / ADMIN
      </text>
      <line x1="310" y1="106" x2="568" y2="106" stroke="var(--fog)" strokeWidth="1" />

      {/* ── 3. LEFT PANEL BODY (starts y: 118) ── */}
      {/* Search field: x: 48, y: 118, w: 226, h: 24 (Permanent frame) */}
      <rect
        x="48"
        y="118"
        width="226"
        height="24"
        rx="4"
        fill="var(--paper-2)"
        stroke="var(--fog)"
        strokeWidth="1"
      />
      <text
        x="60"
        y="130"
        dominantBaseline="middle"
        fill="var(--graphite)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="0.04em"
      >
        Search...
      </text>
      {/* Blinking Caret after Search... (x=114, y1=124, y2=136) */}
      <motion.line
        x1="114"
        y1="124"
        x2="114"
        y2="136"
        stroke="var(--ink)"
        strokeWidth="1.5"
        animate={
          shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: [1, 0, 1] }
        }
        transition={{
          duration: 0.85,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Two content cards: x 48 and x 166, y 154, w 108, h 62 */}
      {/* Card 1 (x: 48, y: 154, w: 108, h: 62) */}
      <motion.g
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 1, 0, 0],
                y: [6, 6, 0, 0, 0, 6],
              }
            : shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          times: [0, 0.05, 0.09, 0.82, 0.88, 1],
        }}
      >
        <rect
          x="48"
          y="154"
          width="108"
          height="62"
          rx="4"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <rect x="56" y="162" width="92" height="26" rx="2" fill="var(--fog)" />
        <rect x="56" y="194" width="60" height="6" rx="2" fill="var(--ink)" />
        <rect x="56" y="204" width="34" height="5" rx="2" fill="var(--graphite)" />
      </motion.g>

      {/* Card 2 (x: 166, y: 154, w: 108, h: 62) */}
      <motion.g
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 1, 0, 0],
                y: [6, 6, 0, 0, 0, 6],
              }
            : shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          times: [0, 0.16, 0.20, 0.82, 0.88, 1],
        }}
      >
        <rect
          x="166"
          y="154"
          width="108"
          height="62"
          rx="4"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <rect x="174" y="162" width="92" height="26" rx="2" fill="var(--fog)" />
        <rect x="174" y="194" width="60" height="6" rx="2" fill="var(--ink)" />
        <rect x="174" y="204" width="34" height="5" rx="2" fill="var(--graphite)" />
      </motion.g>

      {/* Bottom bar: x 48, y 264, w 226, h 26; CONTINUE button right-aligned w 76, h 20, at x 190 */}
      <g>
        <rect
          x="48"
          y="264"
          width="226"
          height="26"
          rx="4"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <rect x="58" y="274" width="56" height="6" rx="2" fill="var(--fog)" />
        {/* CONTINUE Button */}
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
          <rect
            x="190"
            y="267"
            width="76"
            height="20"
            rx="3"
            fill="var(--ink)"
          />
          <text
            x="228"
            y="277"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--paper)"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fontWeight="700"
            letterSpacing="0.04em"
          >
            CONTINUE
          </text>
        </motion.g>
      </g>

      {/* ── 4. RIGHT PANEL BODY (starts y: 118) ── */}
      {/* Three table rows at y 118, 152, 186 — each x 326, w 226, h 26 */}
      {/* Row 1 (y: 118) */}
      <motion.g
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 1, 0, 0],
                y: [6, 6, 0, 0, 0, 6],
              }
            : shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          times: [0, 0.10, 0.14, 0.82, 0.88, 1],
        }}
      >
        <rect
          x="326"
          y="118"
          width="226"
          height="26"
          rx="4"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <rect x="336" y="128" width="68" height="6" rx="2" fill="var(--ink)" />
        <rect x="446" y="128" width="38" height="6" rx="2" fill="var(--graphite)" />
        <rect x="508" y="124" width="34" height="14" rx="2" fill="var(--fog)" />
      </motion.g>

      {/* Row 2 (y: 152) */}
      <motion.g
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 1, 0, 0],
                y: [6, 6, 0, 0, 0, 6],
              }
            : shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          times: [0, 0.22, 0.26, 0.82, 0.88, 1],
        }}
      >
        <rect
          x="326"
          y="152"
          width="226"
          height="26"
          rx="4"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <rect x="336" y="162" width="68" height="6" rx="2" fill="var(--ink)" />
        <rect x="446" y="162" width="38" height="6" rx="2" fill="var(--graphite)" />
        <rect x="508" y="158" width="34" height="14" rx="2" fill="var(--fog)" />
      </motion.g>

      {/* Row 3 (y: 186) */}
      <motion.g
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 1, 0, 0],
                y: [6, 6, 0, 0, 0, 6],
              }
            : shouldReduceMotion
              ? { opacity: 1, y: 0 }
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
        <rect
          x="326"
          y="186"
          width="226"
          height="26"
          rx="4"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <rect x="336" y="196" width="68" height="6" rx="2" fill="var(--ink)" />
        <rect x="446" y="196" width="38" height="6" rx="2" fill="var(--graphite)" />
        <rect x="508" y="192" width="34" height="14" rx="2" fill="var(--fog)" />
      </motion.g>

      {/* Status line at x 326, y 272, with a dot at x 326 and SHARED DB SYNC: LIVE at x 340 */}
      <g>
        <circle cx="329" cy="272" r="3" fill="var(--ink)" />
        <text
          x="340"
          y="272"
          dominantBaseline="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fontWeight="600"
          letterSpacing="0.04em"
        >
          SHARED DB SYNC: LIVE
        </text>
      </g>
    </svg>
  );
}
