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

  // Total duration: 7.2s cycle with ~2.0s hold on final state
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
      {/* ── PHASE 1: THREE CONVERSATION CHAT BUBBLES ── */}
      {/* Bubble 1 (Client, Left) */}
      <motion.g
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 1, 1, 1, 0, 0, 0],
                y: [10, 0, 0, 0, 36, 36, 10],
                scale: [0.96, 1, 1, 1, 0.65, 0.65, 0.96],
              }
            : { opacity: 0 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.06, 0.22, 0.28, 0.38, 0.92, 1],
        }}
      >
        <rect
          x="44"
          y="42"
          width="260"
          height="42"
          rx="10"
          fill="var(--paper-2)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />
        <text
          x="58"
          y="60"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="9.5"
          fontWeight="500"
          letterSpacing="0.02em"
        >
          &quot;Need 6-step booking, JA / EN,&quot;
        </text>
        <text
          x="58"
          y="73"
          fill="var(--graphite)"
          fontFamily="var(--font-mono)"
          fontSize="8.5"
          letterSpacing="0.02em"
        >
          &quot;and custom admin for dates/pricing.&quot;
        </text>
      </motion.g>

      {/* Bubble 2 (Developer, Right) */}
      <motion.g
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 1, 0, 0, 0],
                y: [10, 10, 0, 0, 24, 24, 10],
                scale: [0.96, 0.96, 1, 1, 0.65, 0.65, 0.96],
              }
            : { opacity: 0 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.1, 0.18, 0.28, 0.38, 0.92, 1],
        }}
      >
        <rect
          x="284"
          y="100"
          width="272"
          height="42"
          rx="10"
          fill="var(--fog)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />
        <text
          x="298"
          y="118"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="9.5"
          fontWeight="500"
          letterSpacing="0.02em"
        >
          &quot;Understood. 6 weeks delivery,&quot;
        </text>
        <text
          x="298"
          y="131"
          fill="var(--graphite)"
          fontFamily="var(--font-mono)"
          fontSize="8.5"
          letterSpacing="0.02em"
        >
          &quot;full schema + fixed quote ready.&quot;
        </text>
      </motion.g>

      {/* Bubble 3 (Client, Left) */}
      <motion.g
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 1, 0, 0, 0],
                y: [10, 10, 0, 0, 12, 12, 10],
                scale: [0.96, 0.96, 1, 1, 0.65, 0.65, 0.96],
              }
            : { opacity: 0 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.18, 0.24, 0.28, 0.38, 0.92, 1],
        }}
      >
        <rect
          x="72"
          y="158"
          width="232"
          height="38"
          rx="10"
          fill="var(--paper-2)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />
        <text
          x="86"
          y="182"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="9.5"
          fontWeight="500"
          letterSpacing="0.02em"
        >
          &quot;Perfect. Let&apos;s lock the scope.&quot;
        </text>
      </motion.g>

      {/* ── PHASE 2 & 3: CONDENSED SPECIFICATION DOCUMENT ── */}
      {/* Target ~88% of canvas (524w x 282h, centered with ~38px left/right padding) */}
      <motion.g
        initial={
          shouldReduceMotion
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.9, y: 16 }
        }
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 0, 1, 1, 1, 0],
                scale: [0.9, 0.9, 0.9, 1, 1, 1, 0.9],
                y: [16, 16, 16, 0, 0, 0, 16],
              }
            : shouldReduceMotion
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.32, 0.38, 0.45, 0.92, 0.97, 1],
        }}
      >
        {/* Document Panel Frame */}
        <rect
          x="38"
          y="28"
          width="524"
          height="282"
          rx="10"
          fill="var(--paper-2)"
          stroke="var(--ink)"
          strokeWidth="1.2"
        />

        {/* ── HEADER ROW ── */}
        <g>
          {/* Document Title */}
          <text
            x="60"
            y="58"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="10"
            fontWeight="700"
            letterSpacing="0.08em"
          >
            SCOPE — DREAM ADVENTURE
          </text>

          {/* DRAFT pill (visible initially, hides when AGREED lands) */}
          <motion.g
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 1 }}
            animate={
              isPlaying
                ? {
                    opacity: [0, 0, 1, 1, 0, 0],
                  }
                : shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0 }
            }
            transition={{
              duration: DURATION,
              delay: isPlaying ? delay : 0,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: REPEAT_DELAY,
              ease: 'easeOut',
              times: [0, 0.42, 0.45, 0.72, 0.74, 1],
            }}
          >
            <rect
              x="490"
              y="44"
              width="54"
              height="20"
              rx="4"
              fill="var(--paper)"
              stroke="var(--fog)"
              strokeWidth="1"
            />
            <text
              x="517"
              y="58"
              textAnchor="middle"
              fill="var(--mist)"
              fontFamily="var(--font-mono)"
              fontSize="8.5"
              fontWeight="600"
              letterSpacing="0.06em"
            >
              DRAFT
            </text>
          </motion.g>

          {/* AGREED pill (snaps on at ~74% of cycle, stays through hold) */}
          <motion.g
            initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            animate={
              isPlaying
                ? {
                    opacity: [0, 0, 0, 1, 1, 0],
                    scale: [0.9, 0.9, 0.9, 1, 1, 0.9],
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
              times: [0, 0.72, 0.74, 0.78, 0.92, 1],
            }}
          >
            <rect
              x="482"
              y="44"
              width="62"
              height="20"
              rx="4"
              fill="var(--ink)"
            />
            <text
              x="513"
              y="58"
              textAnchor="middle"
              fill="var(--paper)"
              fontFamily="var(--font-mono)"
              fontSize="8.5"
              fontWeight="700"
              letterSpacing="0.08em"
            >
              AGREED
            </text>
          </motion.g>

          {/* Divider below header */}
          <line x1="60" y1="74" x2="544" y2="74" stroke="var(--hairline)" strokeWidth="1" />
        </g>

        {/* ── FIVE SPECIFICATION LINE ITEMS ── */}
        {[
          {
            label: 'Booking flow',
            val: '6 steps (calendar, pax, checkout)',
            y: 92,
            enterTime: 0.46,
            checkTime: 0.50,
          },
          {
            label: 'Languages',
            val: 'JA / EN (localized routes + copy)',
            y: 134,
            enterTime: 0.52,
            checkTime: 0.56,
          },
          {
            label: 'Admin',
            val: 'Availability, pricing, promos',
            y: 176,
            enterTime: 0.58,
            checkTime: 0.62,
          },
          {
            label: 'Timeline',
            val: '6 weeks to production launch',
            y: 218,
            enterTime: 0.64,
            checkTime: 0.68,
          },
          {
            label: 'Price',
            val: 'REDACTED',
            isRedacted: true,
            y: 260,
            enterTime: 0.70,
            checkTime: 0.74,
          },
        ].map((item, idx) => (
          <g key={item.label}>
            {/* Row separator */}
            {idx > 0 && (
              <line
                x1="60"
                y1={item.y - 12}
                x2="544"
                y2={item.y - 12}
                stroke="var(--hairline)"
                strokeWidth="0.8"
                opacity="0.6"
              />
            )}

            {/* Row Content (Label + Value) */}
            <motion.g
              initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
              animate={
                isPlaying
                  ? {
                      opacity: [0, 0, 1, 1, 0],
                      x: [-6, -6, 0, 0, -6],
                    }
                  : shouldReduceMotion
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0 }
              }
              transition={{
                duration: DURATION,
                delay: isPlaying ? delay : 0,
                repeat: isPlaying ? Infinity : 0,
                repeatDelay: REPEAT_DELAY,
                ease: [0.16, 1, 0.3, 1],
                times: [0, item.enterTime - 0.02, item.enterTime + 0.04, 0.92, 1],
              }}
            >
              {/* Row Label */}
              <text
                x="60"
                y={item.y + 12}
                fill="var(--mist)"
                fontFamily="var(--font-mono)"
                fontSize="9"
                fontWeight="500"
                letterSpacing="0.04em"
              >
                {item.label}
              </text>

              {/* Value or Redacted Block */}
              {item.isRedacted ? (
                <rect
                  x="180"
                  y={item.y}
                  width="88"
                  height="16"
                  rx="3"
                  fill="var(--ink)"
                />
              ) : (
                <text
                  x="180"
                  y={item.y + 12}
                  fill="var(--ink)"
                  fontFamily="var(--font-mono)"
                  fontSize="9.5"
                  fontWeight="600"
                  letterSpacing="0.02em"
                >
                  {item.val}
                </text>
              )}
            </motion.g>

            {/* Checkmark icon for this row */}
            <motion.path
              d={`M 522 ${item.y + 7} L 527 ${item.y + 12} L 537 ${item.y + 2}`}
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={
                shouldReduceMotion
                  ? { opacity: 1, pathLength: 1 }
                  : { opacity: 0, pathLength: 0 }
              }
              animate={
                isPlaying
                  ? {
                      opacity: [0, 0, 1, 1, 0],
                      pathLength: [0, 0, 1, 1, 0],
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
                ease: 'easeOut',
                times: [0, item.checkTime, item.checkTime + 0.04, 0.92, 1],
              }}
            />
          </g>
        ))}
      </motion.g>
    </svg>
  );
}
