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
      {/* ── TOP BAR: PREVIEW URL PILL + LIVE COMMITS COUNTER ── */}
      {/* Spans across top: Preview URL on left/center, +12-14 commits on right */}
      <g>
        {/* Preview URL Pill */}
        <g transform="translate(130, 14)">
          <rect
            x="0"
            y="0"
            width="220"
            height="24"
            rx="12"
            fill="var(--paper-2)"
            stroke="var(--hairline)"
            strokeWidth="1.2"
          />
          <circle cx="14" cy="12" r="3" fill="var(--ink)" />
          <text
            x="26"
            y="15"
            fill="var(--mist)"
            fontFamily="var(--font-mono)"
            fontSize="8.5"
            letterSpacing="0.04em"
          >
            preview-build.zetroxy.dev
          </text>
        </g>

        {/* Live Commits Ticker (ticks once/twice per cycle) */}
        <g transform="translate(366, 14)">
          <rect
            x="0"
            y="0"
            width="104"
            height="24"
            rx="12"
            fill="var(--paper-2)"
            stroke="var(--hairline)"
            strokeWidth="1.2"
          />
          {/* Base commit text: +12 commits */}
          <motion.text
            x="52"
            y="15"
            textAnchor="middle"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="8"
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
              times: [0, 0.32, 0.34, 0.92, 0.96, 1],
            }}
          >
            +12 commits
          </motion.text>
          {/* Mid-cycle tick: +13 commits */}
          <motion.text
            x="52"
            y="15"
            textAnchor="middle"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="8"
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
              times: [0, 0.33, 0.35, 0.62, 0.64, 0.92, 1],
            }}
          >
            +13 commits
          </motion.text>
          {/* Final-cycle tick: +14 commits (stays on hold) */}
          <motion.text
            x="52"
            y="15"
            textAnchor="middle"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="8"
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
              times: [0, 0.63, 0.65, 0.92, 1],
            }}
          >
            +14 commits
          </motion.text>
        </g>
      </g>

      {/* ── 01 / PUBLIC STOREFRONT (LEFT PANEL) ── */}
      {/* x=36, y=48, w=254, h=274 (uniform margins, ~88% total width) */}
      <g>
        <rect
          x="36"
          y="48"
          width="254"
          height="274"
          rx="10"
          fill="var(--paper-2)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />

        {/* Panel Header */}
        <text
          x="54"
          y="72"
          fill="var(--mist)"
          fontFamily="var(--font-mono)"
          fontSize="8.5"
          fontWeight="600"
          letterSpacing="0.08em"
        >
          01 / PUBLIC STOREFRONT
        </text>

        {/* Search Field with Blinking Cursor */}
        <g transform="translate(52, 84)">
          <rect
            x="0"
            y="0"
            width="222"
            height="22"
            rx="4"
            fill="var(--paper)"
            stroke="var(--fog)"
            strokeWidth="1"
          />
          <text
            x="10"
            y="14"
            fill="var(--graphite)"
            fontFamily="var(--font-mono)"
            fontSize="8"
            letterSpacing="0.02em"
          >
            Search tours...
          </text>
          {/* Blinking Cursor */}
          <motion.line
            x1="88"
            y1="5"
            x2="88"
            y2="17"
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
            times: [0, 0.12, 0.92, 0.97, 1],
          }}
        >
          <rect
            x="52"
            y="114"
            width="222"
            height="44"
            rx="5"
            fill="var(--paper)"
            stroke="var(--fog)"
            strokeWidth="1"
          />
          <rect x="62" y="124" width="105" height="7" rx="2" fill="var(--ink)" />
          <rect x="62" y="137" width="145" height="5" rx="2" fill="var(--mist)" opacity="0.6" />
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
            times: [0, 0.68, 0.72, 0.76, 0.8, 0.92, 1],
          }}
        >
          <rect x="52" y="166" width="56" height="13" rx="3" fill="var(--ink)" />
          <text x="80" y="175" textAnchor="middle" fill="var(--paper)" fontFamily="var(--font-mono)" fontSize="6.5" fontWeight="600">ALL TOURS</text>
          <rect x="114" y="166" width="46" height="13" rx="3" fill="var(--fog)" />
          <text x="137" y="175" textAnchor="middle" fill="var(--graphite)" fontFamily="var(--font-mono)" fontSize="6.5">HONSHU</text>
          <rect x="166" y="166" width="46" height="13" rx="3" fill="var(--fog)" />
          <text x="189" y="175" textAnchor="middle" fill="var(--graphite)" fontFamily="var(--font-mono)" fontSize="6.5">HOKKAIDO</text>
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
            times: [0, 0.28, 0.36, 0.92, 1],
          }}
        >
          <rect
            x="52"
            y="186"
            width="106"
            height="82"
            rx="5"
            fill="var(--paper)"
            stroke="var(--fog)"
            strokeWidth="1"
          />
          <rect x="60" y="194" width="90" height="38" rx="3" fill="var(--fog)" />
          <rect x="60" y="240" width="68" height="6" rx="2" fill="var(--ink)" />
          <rect x="60" y="252" width="36" height="6" rx="2" fill="var(--graphite)" />
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
            times: [0, 0.48, 0.56, 0.92, 1],
          }}
        >
          <rect
            x="168"
            y="186"
            width="106"
            height="82"
            rx="5"
            fill="var(--paper)"
            stroke="var(--fog)"
            strokeWidth="1"
          />
          <rect x="176" y="194" width="90" height="38" rx="3" fill="var(--fog)" />
          <rect x="176" y="240" width="68" height="6" rx="2" fill="var(--ink)" />
          <rect x="176" y="252" width="36" height="6" rx="2" fill="var(--graphite)" />
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
            times: [0, 0.62, 0.66, 0.76, 0.80, 1],
          }}
          style={{ transformOrigin: '110px 160px' }}
        >
          <rect
            x="64"
            y="152"
            width="104"
            height="20"
            rx="4"
            fill="var(--ink)"
            stroke="var(--paper)"
            strokeWidth="1"
          />
          <text
            x="116"
            y="165"
            textAnchor="middle"
            fill="var(--paper)"
            fontFamily="var(--font-mono)"
            fontSize="7.5"
            fontWeight="600"
            letterSpacing="0.04em"
          >
            NOTE: &quot;+ FILTER&quot;
          </text>
        </motion.g>

        {/* Footer Checkout Summary */}
        <g transform="translate(52, 276)">
          <rect
            x="0"
            y="0"
            width="222"
            height="32"
            rx="4"
            fill="var(--paper)"
            stroke="var(--hairline)"
            strokeWidth="1"
          />
          <rect x="12" y="12" width="70" height="8" rx="2" fill="var(--fog)" />
          <rect x="160" y="8" width="52" height="16" rx="3" fill="var(--ink)" />
          <text x="186" y="19" textAnchor="middle" fill="var(--paper)" fontFamily="var(--font-mono)" fontSize="7" fontWeight="600">BOOK</text>
        </g>
      </g>

      {/* ── 02 / ADMIN DASHBOARD (RIGHT PANEL) ── */}
      {/* x=310, y=48, w=254, h=274 (uniform margins, ~88% total width) */}
      <g>
        <rect
          x="310"
          y="48"
          width="254"
          height="274"
          rx="10"
          fill="var(--paper-2)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />

        {/* Panel Header */}
        <text
          x="328"
          y="72"
          fill="var(--mist)"
          fontFamily="var(--font-mono)"
          fontSize="8.5"
          fontWeight="600"
          letterSpacing="0.08em"
        >
          02 / ADMIN DASHBOARD
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
            times: [0, 0.18, 0.26, 0.92, 1],
          }}
        >
          <rect
            x="326"
            y="84"
            width="222"
            height="34"
            rx="5"
            fill="var(--paper)"
            stroke="var(--fog)"
            strokeWidth="1"
          />
          <rect x="338" y="93" width="58" height="16" rx="3" fill="var(--fog)" />
          <rect x="404" y="93" width="58" height="16" rx="3" fill="var(--fog)" />
          <rect x="470" y="93" width="68" height="16" rx="3" fill="var(--fog)" />
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
            times: [0, 0.38, 0.46, 0.92, 1],
          }}
        >
          <rect
            x="326"
            y="126"
            width="222"
            height="32"
            rx="4"
            fill="var(--paper)"
            stroke="var(--fog)"
            strokeWidth="1"
          />
          <rect x="338" y="138" width="80" height="8" rx="2" fill="var(--ink)" />
          <rect x="444" y="138" width="36" height="8" rx="2" fill="var(--graphite)" />
          <rect x="502" y="135" width="34" height="14" rx="2" fill="var(--fog)" />
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
            times: [0, 0.58, 0.66, 0.92, 1],
          }}
        >
          <rect
            x="326"
            y="166"
            width="222"
            height="32"
            rx="4"
            fill="var(--paper)"
            stroke="var(--fog)"
            strokeWidth="1"
          />
          <rect x="338" y="178" width="80" height="8" rx="2" fill="var(--ink)" />
          <rect x="444" y="178" width="36" height="8" rx="2" fill="var(--graphite)" />
          <rect x="502" y="175" width="34" height="14" rx="2" fill="var(--fog)" />
        </motion.g>

        {/* Admin Settings Table Row 3 */}
        <rect
          x="326"
          y="206"
          width="222"
          height="32"
          rx="4"
          fill="var(--paper)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <rect x="338" y="218" width="60" height="8" rx="2" fill="var(--mist)" opacity="0.6" />
        <rect x="444" y="218" width="36" height="8" rx="2" fill="var(--mist)" opacity="0.6" />
        <rect x="502" y="215" width="34" height="14" rx="2" fill="var(--fog)" />

        {/* Sync Indicator at Bottom of Admin Dashboard */}
        <g transform="translate(326, 276)">
          <rect
            x="0"
            y="0"
            width="222"
            height="32"
            rx="4"
            fill="var(--paper)"
            stroke="var(--hairline)"
          />
          <circle cx="18" cy="16" r="3.5" fill="var(--ink)" />
          <text
            x="30"
            y="19"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="8.5"
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
