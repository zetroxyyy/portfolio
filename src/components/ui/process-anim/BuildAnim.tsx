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
      {/* ── 1. TOP BAR: PREVIEW URL PILL + LIVE COMMITS COUNTER (PERMANENT) ── */}
      {/* Internal padding: 32 units on all sides (x: 32..568, y: 32..306) */}
      <g>
        {/* Preview URL Pill */}
        <g transform="translate(32, 32)">
          <rect
            x="0"
            y="0"
            width="214"
            height="22"
            rx="11"
            fill="var(--paper-2)"
            stroke="var(--hairline)"
            strokeWidth="1.2"
          />
          <circle cx="13" cy="11" r="3" fill="var(--ink)" />
          <text
            x="24"
            y="14.5"
            fill="var(--mist)"
            fontFamily="var(--font-mono)"
            fontSize="9"
            letterSpacing="0.04em"
          >
            preview.yourproject.dev
          </text>
        </g>

        {/* Live Commits Ticker (Permanent pill, animated number) */}
        <g transform="translate(444, 32)">
          <rect
            x="0"
            y="0"
            width="124"
            height="22"
            rx="11"
            fill="var(--paper-2)"
            stroke="var(--hairline)"
            strokeWidth="1.2"
          />
          {/* Base commit text: +12 commits */}
          <motion.text
            x="62"
            y="14.5"
            textAnchor="middle"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fontWeight="600"
            letterSpacing="0.04em"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 1 }}
            animate={
              isPlaying
                ? {
                    opacity: [1, 1, 0, 0, 0, 0, 1],
                  }
                : { opacity: 1 }
            }
            transition={{
              duration: DURATION,
              delay: isPlaying ? delay : 0,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: REPEAT_DELAY,
              times: [0, 0.28, 0.31, 0.82, 0.86, 1],
            }}
          >
            +12 commits
          </motion.text>
          {/* Mid-cycle tick: +13 commits */}
          <motion.text
            x="62"
            y="14.5"
            textAnchor="middle"
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
              times: [0, 0.30, 0.32, 0.54, 0.57, 0.82, 1],
            }}
          >
            +13 commits
          </motion.text>
          {/* Final-cycle tick: +14 commits · main */}
          <motion.text
            x="62"
            y="14.5"
            textAnchor="middle"
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
              times: [0, 0.55, 0.58, 0.82, 0.86],
            }}
          >
            +14 commits · main
          </motion.text>
        </g>
      </g>

      {/* ── 2. 01 / PUBLIC PANEL (LEFT) ── */}
      {/* x=32, y=62, w=252, h=244 */}
      <g>
        <rect
          x="32"
          y="62"
          width="252"
          height="244"
          rx="10"
          fill="var(--paper-2)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />

        {/* Panel Header */}
        <text
          x="48"
          y="83"
          fill="var(--mist)"
          fontFamily="var(--font-mono)"
          fontSize="9.5"
          fontWeight="600"
          letterSpacing="0.08em"
        >
          01 / PUBLIC
        </text>

        {/* Search Field with Permanent Frame & Blinking Cursor */}
        <g transform="translate(46, 94)">
          <rect
            x="0"
            y="0"
            width="224"
            height="22"
            rx="4"
            fill="var(--paper)"
            stroke="var(--fog)"
            strokeWidth="1"
          />
          <text
            x="10"
            y="14.5"
            fill="var(--graphite)"
            fontFamily="var(--font-mono)"
            fontSize="9"
            letterSpacing="0.02em"
          >
            Search...
          </text>
          {/* Blinking Cursor */}
          <motion.line
            x1="66"
            y1="5"
            x2="66"
            y2="17"
            stroke="var(--ink)"
            strokeWidth="1.5"
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: [1, 0, 1] }
            }
            transition={{
              duration: 0.9,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </g>

        {/* Storefront Hero Card (Step 1) */}
        <motion.g
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          animate={
            isPlaying
              ? {
                  opacity: [0, 1, 1, 1, 0],
                  y: [6, 0, 0, 0, 6],
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
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.10, 0.82, 0.88, 1],
          }}
        >
          <rect
            x="46"
            y="124"
            width="224"
            height="38"
            rx="5"
            fill="var(--paper)"
            stroke="var(--fog)"
            strokeWidth="1"
          />
          <rect x="56" y="133" width="98" height="6" rx="2" fill="var(--ink)" />
          <rect x="56" y="145" width="138" height="5" rx="2" fill="var(--mist)" opacity="0.6" />
        </motion.g>

        {/* Storefront Filter Chips (Step 5, after client note) */}
        <motion.g
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={
            isPlaying
              ? {
                  opacity: [0, 0, 0, 0, 1, 1, 0],
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
            ease: 'easeOut',
            times: [0, 0.60, 0.64, 0.68, 0.72, 0.82, 0.88],
          }}
        >
          <rect x="46" y="169" width="50" height="13" rx="3" fill="var(--ink)" />
          <text x="71" y="178.5" textAnchor="middle" fill="var(--paper)" fontFamily="var(--font-mono)" fontSize="7.5" fontWeight="600">ALL</text>
          <rect x="102" y="169" width="54" height="13" rx="3" fill="var(--fog)" />
          <text x="129" y="178.5" textAnchor="middle" fill="var(--graphite)" fontFamily="var(--font-mono)" fontSize="7.5">ACTIVE</text>
          <rect x="162" y="169" width="62" height="13" rx="3" fill="var(--fog)" />
          <text x="193" y="178.5" textAnchor="middle" fill="var(--graphite)" fontFamily="var(--font-mono)" fontSize="7.5">ARCHIVED</text>
        </motion.g>

        {/* Product Card A (Step 3) */}
        <motion.g
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          animate={
            isPlaying
              ? {
                  opacity: [0, 0, 1, 1, 0],
                  y: [6, 6, 0, 0, 6],
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
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.24, 0.30, 0.82, 0.88],
          }}
        >
          <rect
            x="46"
            y="189"
            width="107"
            height="70"
            rx="5"
            fill="var(--paper)"
            stroke="var(--fog)"
            strokeWidth="1"
          />
          <rect x="54" y="196" width="91" height="30" rx="3" fill="var(--fog)" />
          <rect x="54" y="233" width="68" height="6" rx="2" fill="var(--ink)" />
          <rect x="54" y="244" width="36" height="5" rx="2" fill="var(--graphite)" />
        </motion.g>

        {/* Product Card B (Step 5) */}
        <motion.g
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          animate={
            isPlaying
              ? {
                  opacity: [0, 0, 1, 1, 0],
                  y: [6, 6, 0, 0, 6],
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
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.42, 0.48, 0.82, 0.88],
          }}
        >
          <rect
            x="163"
            y="189"
            width="107"
            height="70"
            rx="5"
            fill="var(--paper)"
            stroke="var(--fog)"
            strokeWidth="1"
          />
          <rect x="171" y="196" width="91" height="30" rx="3" fill="var(--fog)" />
          <rect x="171" y="233" width="68" height="6" rx="2" fill="var(--ink)" />
          <rect x="171" y="244" width="36" height="5" rx="2" fill="var(--graphite)" />
        </motion.g>

        {/* Client Note / Feedback Pill (Step 4, pops up and resolves into filter) */}
        <motion.g
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
          animate={
            isPlaying
              ? {
                  opacity: [0, 0, 1, 1, 0, 0],
                  scale: [0.85, 0.85, 1, 1, 0.85, 0.85],
                }
              : { opacity: 0 }
          }
          transition={{
            duration: DURATION,
            delay: isPlaying ? delay : 0,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: REPEAT_DELAY,
            ease: 'easeOut',
            times: [0, 0.54, 0.57, 0.67, 0.71, 1],
          }}
          style={{ transformOrigin: '110px 160px' }}
        >
          <rect
            x="58"
            y="156"
            width="108"
            height="20"
            rx="4"
            fill="var(--ink)"
            stroke="var(--paper)"
            strokeWidth="1"
          />
          <text
            x="112"
            y="169.5"
            textAnchor="middle"
            fill="var(--paper)"
            fontFamily="var(--font-mono)"
            fontSize="8"
            fontWeight="600"
            letterSpacing="0.04em"
          >
            NOTE: &quot;+ FILTER&quot;
          </text>
        </motion.g>

        {/* Footer Checkout / Continue Summary */}
        <g transform="translate(46, 267)">
          <rect
            x="0"
            y="0"
            width="224"
            height="26"
            rx="4"
            fill="var(--paper)"
            stroke="var(--hairline)"
            strokeWidth="1"
          />
          <rect x="12" y="10" width="70" height="7" rx="2" fill="var(--fog)" />
          <rect x="156" y="5" width="60" height="16" rx="3" fill="var(--ink)" />
          <text x="186" y="16.5" textAnchor="middle" fill="var(--paper)" fontFamily="var(--font-mono)" fontSize="7.5" fontWeight="600">CONTINUE</text>
        </g>
      </g>

      {/* ── 3. 02 / ADMIN PANEL (RIGHT) ── */}
      {/* x=316, y=62, w=252, h=244 */}
      <g>
        <rect
          x="316"
          y="62"
          width="252"
          height="244"
          rx="10"
          fill="var(--paper-2)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />

        {/* Panel Header */}
        <text
          x="332"
          y="83"
          fill="var(--mist)"
          fontFamily="var(--font-mono)"
          fontSize="9.5"
          fontWeight="600"
          letterSpacing="0.08em"
        >
          02 / ADMIN
        </text>

        {/* Admin KPI Stats Bar (Step 2) */}
        <motion.g
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          animate={
            isPlaying
              ? {
                  opacity: [0, 0, 1, 1, 0],
                  y: [6, 6, 0, 0, 6],
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
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.16, 0.22, 0.82, 0.88],
          }}
        >
          <rect
            x="330"
            y="94"
            width="224"
            height="30"
            rx="5"
            fill="var(--paper)"
            stroke="var(--fog)"
            strokeWidth="1"
          />
          <rect x="340" y="102" width="60" height="14" rx="3" fill="var(--fog)" />
          <rect x="412" y="102" width="60" height="14" rx="3" fill="var(--fog)" />
          <rect x="484" y="102" width="60" height="14" rx="3" fill="var(--fog)" />
        </motion.g>

        {/* Admin Catalog Table Row 1 (Step 4) */}
        <motion.g
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          animate={
            isPlaying
              ? {
                  opacity: [0, 0, 1, 1, 0],
                  y: [6, 6, 0, 0, 6],
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
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.34, 0.40, 0.82, 0.88],
          }}
        >
          <rect
            x="330"
            y="132"
            width="224"
            height="28"
            rx="4"
            fill="var(--paper)"
            stroke="var(--fog)"
            strokeWidth="1"
          />
          <rect x="340" y="142" width="82" height="7" rx="2" fill="var(--ink)" />
          <rect x="446" y="142" width="40" height="7" rx="2" fill="var(--graphite)" />
          <rect x="510" y="139" width="34" height="14" rx="2" fill="var(--fog)" />
        </motion.g>

        {/* Admin Catalog Table Row 2 (Step 6) */}
        <motion.g
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          animate={
            isPlaying
              ? {
                  opacity: [0, 0, 1, 1, 0],
                  y: [6, 6, 0, 0, 6],
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
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.50, 0.56, 0.82, 0.88],
          }}
        >
          <rect
            x="330"
            y="168"
            width="224"
            height="28"
            rx="4"
            fill="var(--paper)"
            stroke="var(--fog)"
            strokeWidth="1"
          />
          <rect x="340" y="178" width="82" height="7" rx="2" fill="var(--ink)" />
          <rect x="446" y="178" width="40" height="7" rx="2" fill="var(--graphite)" />
          <rect x="510" y="175" width="34" height="14" rx="2" fill="var(--fog)" />
        </motion.g>

        {/* Admin Settings Table Row 3 (Permanent structure) */}
        <rect
          x="330"
          y="204"
          width="224"
          height="28"
          rx="4"
          fill="var(--paper)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <rect x="340" y="214" width="62" height="7" rx="2" fill="var(--mist)" opacity="0.6" />
        <rect x="446" y="214" width="40" height="7" rx="2" fill="var(--mist)" opacity="0.6" />
        <rect x="510" y="211" width="34" height="14" rx="2" fill="var(--fog)" />

        {/* Sync Indicator at Bottom of Admin Dashboard (Permanent) */}
        <g transform="translate(330, 267)">
          <rect
            x="0"
            y="0"
            width="224"
            height="26"
            rx="4"
            fill="var(--paper)"
            stroke="var(--hairline)"
          />
          <circle cx="16" cy="13" r="3.5" fill="var(--ink)" />
          <text
            x="28"
            y="16.5"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fontWeight="600"
            letterSpacing="0.04em"
          >
            SHARED DB SYNC: LIVE
          </text>
        </g>
      </g>
    </svg>
  );
}
