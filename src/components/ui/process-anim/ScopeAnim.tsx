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

  // Total duration: 11.5s cycle (45% build-up, 35% hold, 20% graceful fade-out reset)
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
      {/* ── 1. PERMANENT DOCUMENT CONTAINER (NEVER DISAPPEARS) ── */}
      {/* Internal padding: exactly 32 units on all sides (x: 32..568, y: 32..306) */}
      <rect
        x="32"
        y="32"
        width="536"
        height="274"
        rx="10"
        fill="var(--paper-2)"
        stroke="var(--hairline)"
        strokeWidth="1.2"
      />

      {/* Header Row (Permanent) */}
      <text
        x="56"
        y="59"
        fill="var(--ink)"
        fontFamily="var(--font-mono)"
        fontSize="9.5"
        fontWeight="700"
        letterSpacing="0.08em"
      >
        PROJECT SCOPE
      </text>

      {/* Divider line below header (Permanent) */}
      <line x1="56" y1="72" x2="544" y2="72" stroke="var(--hairline)" strokeWidth="1" />

      {/* ── PERMANENT SPECIFICATION LABELS & ROW DIVIDERS ── */}
      {[
        { label: 'Scope', y: 92 },
        { label: 'Platforms', y: 132 },
        { label: 'Who edits it', y: 172 },
        { label: 'Timeline', y: 212 },
        { label: 'Price', y: 252 },
      ].map((row, idx) => (
        <g key={row.label}>
          {idx > 0 && (
            <line
              x1="56"
              y1={row.y - 14}
              x2="544"
              y2={row.y - 14}
              stroke="var(--hairline)"
              strokeWidth="0.8"
              opacity="0.6"
            />
          )}
          {/* Row Label (Always visible at low/subtle contrast) */}
          <text
            x="56"
            y={row.y + 12}
            fill="var(--mist)"
            fontFamily="var(--font-mono)"
            fontSize="9.5"
            fontWeight="500"
            letterSpacing="0.04em"
          >
            {row.label}
          </text>
        </g>
      ))}

      {/* ── 2. DRAFT / AGREED STATUS PILL ── */}
      {/* DRAFT pill (visible initially, hides during hold, resets at end) */}
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
          times: [0, 0.44, 0.48, 0.50, 0.84, 0.88, 1],
        }}
      >
        <rect
          x="480"
          y="44"
          width="64"
          height="20"
          rx="4"
          fill="var(--paper)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <text
          x="512"
          y="58"
          textAnchor="middle"
          fill="var(--mist)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fontWeight="600"
          letterSpacing="0.04em"
        >
          DRAFT
        </text>
      </motion.g>

      {/* AGREED pill (snaps on at t=50%, holds through 82%, then gently fades) */}
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
          times: [0, 0.48, 0.51, 0.82, 0.88, 1],
        }}
      >
        <rect
          x="480"
          y="44"
          width="64"
          height="20"
          rx="4"
          fill="var(--ink)"
        />
        <text
          x="512"
          y="58"
          textAnchor="middle"
          fill="var(--paper)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fontWeight="700"
          letterSpacing="0.06em"
        >
          AGREED
        </text>
      </motion.g>

      {/* ── 3. FIVE SPECIFICATION LINE VALUES & CHECKMARKS ── */}
      {[
        {
          val: 'Pages, flows, admin screens',
          y: 92,
          enterTime: 0.22,
          checkTime: 0.26,
        },
        {
          val: 'Web · Mobile',
          y: 132,
          enterTime: 0.28,
          checkTime: 0.32,
        },
        {
          val: 'Your team, no developer',
          y: 172,
          enterTime: 0.34,
          checkTime: 0.38,
        },
        {
          val: 'Agreed before work starts',
          y: 212,
          enterTime: 0.40,
          checkTime: 0.44,
        },
        {
          val: 'REDACTED',
          isRedacted: true,
          y: 252,
          enterTime: 0.46,
          checkTime: 0.50,
        },
      ].map((item) => (
        <g key={item.val}>
          {/* Value Content */}
          <motion.g
            initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
            animate={
              isPlaying
                ? {
                    opacity: [0, 0, 1, 1, 0, 0],
                    x: [-6, -6, 0, 0, 0, -6],
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
              times: [0, item.enterTime - 0.03, item.enterTime + 0.02, 0.82, 0.88, 1],
            }}
          >
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
              ease: 'easeOut',
              times: [0, item.checkTime, item.checkTime + 0.03, 0.82, 0.88, 1],
            }}
          />
        </g>
      ))}

      {/* ── 4. OPENING BEAT: THREE CHAT BUBBLES ── */}
      {/* Appear briefly over the document during t=0.02..0.20, then condense out */}
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
          times: [0, 0.03, 0.16, 0.22, 1],
        }}
      >
        <rect
          x="56"
          y="84"
          width="268"
          height="42"
          rx="8"
          fill="var(--paper)"
          stroke="var(--fog)"
          strokeWidth="1.2"
        />
        <text
          x="70"
          y="101"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="9.5"
          fontWeight="500"
          letterSpacing="0.02em"
        >
          &quot;Need customer portal, mobile-ready,&quot;
        </text>
        <text
          x="70"
          y="115"
          fill="var(--graphite)"
          fontFamily="var(--font-mono)"
          fontSize="9.5"
          letterSpacing="0.02em"
        >
          &quot;and an admin back office for the team.&quot;
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
          times: [0, 0.07, 0.12, 0.22, 1],
        }}
      >
        <rect
          x="276"
          y="136"
          width="268"
          height="42"
          rx="8"
          fill="var(--fog)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />
        <text
          x="290"
          y="153"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="9.5"
          fontWeight="500"
          letterSpacing="0.02em"
        >
          &quot;Understood. Clear milestone scope,&quot;
        </text>
        <text
          x="290"
          y="167"
          fill="var(--graphite)"
          fontFamily="var(--font-mono)"
          fontSize="9.5"
          letterSpacing="0.02em"
        >
          &quot;full schema + fixed quote ready.&quot;
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
          times: [0, 0.13, 0.17, 0.22, 1],
        }}
      >
        <rect
          x="80"
          y="188"
          width="244"
          height="34"
          rx="8"
          fill="var(--paper)"
          stroke="var(--fog)"
          strokeWidth="1.2"
        />
        <text
          x="94"
          y="209"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="9.5"
          fontWeight="500"
          letterSpacing="0.02em"
        >
          &quot;Perfect. Let&apos;s lock the spec.&quot;
        </text>
      </motion.g>
    </svg>
  );
}
