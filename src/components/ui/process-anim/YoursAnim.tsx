'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimProps {
  inView: boolean;
  delay?: number;
}

export function YoursAnim({ inView, delay = 0 }: AnimProps) {
  const shouldReduceMotion = useReducedMotion();
  const isPlaying = inView && !shouldReduceMotion;

  const DURATION = 11.5;
  const REPEAT_DELAY = 0.5;
  const CIRCUMFERENCE = 175.9; // 2 * PI * 28

  return (
    <svg
      viewBox="0 0 600 338"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="process-diagram-svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ── 1. PERMANENT ADMIN CONSOLE (TOP / CENTER) ── */}
      {/* Internal padding: 32 units on all sides (x: 32..568, y: 32..306) */}
      <g>
        {/* Panel Frame */}
        <rect
          x="32"
          y="32"
          width="536"
          height="194"
          rx="10"
          fill="var(--paper-2)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />

        {/* ── HEADER ROW ── */}
        <g>
          {/* Window control dots */}
          <circle cx="48" cy="47" r="3" fill="var(--fog)" />
          <circle cx="58" cy="47" r="3" fill="var(--fog)" />
          <circle cx="68" cy="47" r="3" fill="var(--fog)" />

          {/* Console Title */}
          <text
            x="86"
            y="50.5"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="9.5"
            fontWeight="700"
            letterSpacing="0.08em"
          >
            YOUR ADMIN CONSOLE
          </text>

          {/* READ ONLY pill (Initial State, hides when key arrives) */}
          <motion.g
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 1 }}
            animate={
              isPlaying
                ? {
                    opacity: [1, 1, 0, 0, 1],
                  }
                : { opacity: 0 }
            }
            transition={{
              duration: DURATION,
              delay: isPlaying ? delay : 0,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: REPEAT_DELAY,
              times: [0, 0.38, 0.42, 0.85, 1],
            }}
          >
            <rect
              x="464"
              y="37"
              width="92"
              height="20"
              rx="4"
              fill="var(--paper)"
              stroke="var(--fog)"
              strokeWidth="1"
            />
            <text
              x="510"
              y="50.5"
              textAnchor="middle"
              fill="var(--mist)"
              fontFamily="var(--font-mono)"
              fontSize="8.5"
              fontWeight="600"
              letterSpacing="0.04em"
            >
              READ ONLY
            </text>
          </motion.g>

          {/* OWNER ACCESS pill (Active State, flips on when key arrives) */}
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
              duration: DURATION,
              delay: isPlaying ? delay : 0,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: REPEAT_DELAY,
              times: [0, 0.38, 0.42, 0.85, 1],
            }}
          >
            <rect
              x="464"
              y="37"
              width="92"
              height="20"
              rx="4"
              fill="var(--ink)"
            />
            <text
              x="510"
              y="50.5"
              textAnchor="middle"
              fill="var(--paper)"
              fontFamily="var(--font-mono)"
              fontSize="8.5"
              fontWeight="700"
              letterSpacing="0.06em"
            >
              OWNER ACCESS
            </text>
          </motion.g>

          {/* Divider below header */}
          <line x1="32" y1="62" x2="568" y2="62" stroke="var(--hairline)" strokeWidth="1" />
        </g>

        {/* ── SIDEBAR (LEFT) ── */}
        {/* Width: 114px (x=32 to x=146) */}
        <g>
          {/* Vertical divider */}
          <line x1="146" y1="62" x2="146" y2="226" stroke="var(--hairline)" strokeWidth="1" />

          {/* 5 Generic Nav Items: Dashboard, Content, Customers, Orders, Settings */}
          {[
            { label: 'Dashboard', y: 82, active: true },
            { label: 'Content', y: 110, active: false },
            { label: 'Customers', y: 138, active: false },
            { label: 'Orders', y: 166, active: false },
            { label: 'Settings', y: 194, active: false },
          ].map((nav) => (
            <g key={nav.label}>
              {/* Active nav indicator */}
              {nav.active && (
                <motion.rect
                  x="40"
                  y={nav.y - 10}
                  width="98"
                  height="18"
                  rx="3"
                  initial={
                    shouldReduceMotion
                      ? { fill: 'var(--paper)', opacity: 1 }
                      : { fill: 'var(--paper)', opacity: 0.4 }
                  }
                  animate={
                    isPlaying
                      ? {
                          opacity: [0.4, 0.4, 1, 1, 0.4],
                        }
                      : shouldReduceMotion
                        ? { opacity: 1 }
                        : { opacity: 0.4 }
                  }
                  transition={{
                    duration: DURATION,
                    delay: isPlaying ? delay : 0,
                    repeat: isPlaying ? Infinity : 0,
                    repeatDelay: REPEAT_DELAY,
                    times: [0, 0.38, 0.42, 0.85, 1],
                  }}
                />
              )}

              {/* Nav item text */}
              <motion.text
                x="48"
                y={nav.y + 2.5}
                fontFamily="var(--font-mono)"
                fontSize="9"
                fontWeight={nav.active ? '700' : '500'}
                letterSpacing="0.04em"
                initial={
                  shouldReduceMotion
                    ? { fill: 'var(--ink)' }
                    : { fill: 'var(--mist)' }
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
                  duration: DURATION,
                  delay: isPlaying ? delay : 0,
                  repeat: isPlaying ? Infinity : 0,
                  repeatDelay: REPEAT_DELAY,
                  times: [0, 0.38, 0.42, 0.85, 1],
                }}
              >
                {nav.label}
              </motion.text>
            </g>
          ))}
        </g>

        {/* ── TABLE AREA (RIGHT OF SIDEBAR) ── */}
        {/* x=146 to x=568 */}
        <g>
          {/* Table Column Headers */}
          <text x="162" y="78" fill="var(--mist)" fontFamily="var(--font-mono)" fontSize="8" fontWeight="600" letterSpacing="0.06em">REF</text>
          <text x="240" y="78" fill="var(--mist)" fontFamily="var(--font-mono)" fontSize="8" fontWeight="600" letterSpacing="0.06em">RECORD</text>
          <text x="496" y="78" fill="var(--mist)" fontFamily="var(--font-mono)" fontSize="8" fontWeight="600" letterSpacing="0.06em">STATUS</text>
          <line x1="146" y1="86" x2="568" y2="86" stroke="var(--hairline)" strokeWidth="0.8" />

          {/* Three Table Rows with REF, Neutral Bar, and Status Pill (NO invented people) */}
          {[
            { ref: '#1042', barW: 150, status: 'ACTIVE', y: 104 },
            { ref: '#1043', barW: 130, status: 'ACTIVE', y: 140 },
            { ref: '#1044', barW: 165, status: 'PENDING', y: 176 },
          ].map((row, idx) => (
            <g key={row.ref}>
              {idx > 0 && (
                <line
                  x1="156"
                  y1={row.y - 18}
                  x2="558"
                  y2={row.y - 18}
                  stroke="var(--hairline)"
                  strokeWidth="0.6"
                  opacity="0.6"
                />
              )}

              {/* Row container background */}
              <motion.rect
                x="156"
                y={row.y - 14}
                width="402"
                height="28"
                rx="4"
                initial={
                  shouldReduceMotion
                    ? { fill: 'var(--paper)', opacity: 0.85 }
                    : { fill: 'var(--paper)', opacity: 0.3 }
                }
                animate={
                  isPlaying
                    ? {
                        opacity: [0.3, 0.3, 0.85, 0.85, 0.3],
                      }
                    : shouldReduceMotion
                      ? { opacity: 0.85 }
                      : { opacity: 0.3 }
                }
                transition={{
                  duration: DURATION,
                  delay: isPlaying ? delay : 0,
                  repeat: isPlaying ? Infinity : 0,
                  repeatDelay: REPEAT_DELAY,
                  times: [0, 0.38, 0.42, 0.85, 1],
                }}
              />

              {/* Row text & neutral bars: brighten from --fog to --ink upon handover */}
              <motion.g
                initial={
                  shouldReduceMotion
                    ? { fill: 'var(--ink)' }
                    : { fill: 'var(--fog)' }
                }
                animate={
                  isPlaying
                    ? {
                        fill: [
                          'var(--fog)',
                          'var(--fog)',
                          'var(--ink)',
                          'var(--ink)',
                          'var(--fog)',
                        ],
                      }
                    : shouldReduceMotion
                      ? { fill: 'var(--ink)' }
                      : { fill: 'var(--fog)' }
                }
                transition={{
                  duration: DURATION,
                  delay: isPlaying ? delay : 0,
                  repeat: isPlaying ? Infinity : 0,
                  repeatDelay: REPEAT_DELAY,
                  times: [0, 0.38, 0.42, 0.85, 1],
                }}
              >
                {/* REF Column */}
                <text x="166" y={row.y + 4} fontFamily="var(--font-mono)" fontSize="9" fontWeight="600">
                  {row.ref}
                </text>

                {/* Neutral Data Bar where an invented name would be */}
                <rect x="240" y={row.y - 2} width={row.barW} height="7" rx="2" fill="currentColor" opacity="0.8" />

                {/* Status Pill */}
                <rect x="490" y={row.y - 8} width="58" height="16" rx="3" fill="var(--paper-2)" stroke="currentColor" strokeWidth="0.8" />
                <text x="519" y={row.y + 3.5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" fontWeight="700">
                  {row.status}
                </text>
              </motion.g>
            </g>
          ))}
        </g>
      </g>

      {/* ── 2. BOTTOM ROW: ACCOUNT CHIPS & KEY TRANSFER + WARRANTY ARC ── */}
      {/* y=244 to y=306 (Internal padding: 32 units, within y_max: 306) */}
      <g>
        {/* ── ACCOUNT CHIP 1: zetroxy · DEVELOPER (LEFT) ── */}
        <g transform="translate(32, 246)">
          <rect
            x="0"
            y="0"
            width="146"
            height="38"
            rx="19"
            fill="var(--paper-2)"
            stroke="var(--fog)"
            strokeWidth="1.2"
          />
          {/* Avatar */}
          <circle cx="20" cy="19" r="11" fill="var(--ink)" />
          <text
            x="20"
            y="22.5"
            textAnchor="middle"
            fill="var(--paper)"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fontWeight="700"
          >
            Z
          </text>
          {/* Account name */}
          <text
            x="38"
            y="17"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fontWeight="600"
          >
            zetroxy
          </text>
          {/* Role badge */}
          <text
            x="38"
            y="28"
            fill="var(--mist)"
            fontFamily="var(--font-mono)"
            fontSize="7.5"
            fontWeight="500"
          >
            DEVELOPER
          </text>
        </g>

        {/* ── TRANSFER TRACK (BETWEEN CHIPS) ── */}
        <line
          x1="178"
          y1="265"
          x2="242"
          y2="265"
          stroke="var(--fog)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* ── SLIDING KEY GLYPH ── */}
        {/* Slides from zetroxy (x=182) to You (x=240) */}
        <motion.g
          initial={
            shouldReduceMotion
              ? { x: 240, y: 265, opacity: 1 }
              : { x: 182, y: 265, opacity: 1 }
          }
          animate={
            isPlaying
              ? {
                  x: [182, 182, 240, 240, 182],
                  opacity: [1, 1, 1, 1, 0],
                }
              : shouldReduceMotion
                ? { x: 240, y: 265, opacity: 1 }
                : { x: 182, y: 265, opacity: 0 }
          }
          transition={{
            duration: DURATION,
            delay: isPlaying ? delay : 0,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: REPEAT_DELAY,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.16, 0.38, 0.85, 1],
          }}
        >
          {/* Key Head */}
          <circle cx="0" cy="0" r="7" fill="none" stroke="var(--ink)" strokeWidth="1.8" />
          {/* Key Shaft */}
          <line x1="7" y1="0" x2="20" y2="0" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
          {/* Key Teeth */}
          <line x1="16" y1="0" x2="16" y2="5" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="20" y1="0" x2="20" y2="4" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
        </motion.g>

        {/* ── ACCOUNT CHIP 2: You · OWNER (RIGHT OF TRACK) ── */}
        <g transform="translate(242, 246)">
          {/* Border brightens to ink when key arrives */}
          <motion.rect
            x="0"
            y="0"
            width="134"
            height="38"
            rx="19"
            fill="var(--paper-2)"
            strokeWidth="1.2"
            initial={
              shouldReduceMotion
                ? { stroke: 'var(--ink)' }
                : { stroke: 'var(--fog)' }
            }
            animate={
              isPlaying
                ? {
                    stroke: [
                      'var(--fog)',
                      'var(--fog)',
                      'var(--ink)',
                      'var(--ink)',
                      'var(--fog)',
                    ],
                  }
                : shouldReduceMotion
                  ? { stroke: 'var(--ink)' }
                  : { stroke: 'var(--fog)' }
            }
            transition={{
              duration: DURATION,
              delay: isPlaying ? delay : 0,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: REPEAT_DELAY,
              times: [0, 0.36, 0.40, 0.85, 1],
            }}
          />
          {/* Avatar */}
          <circle cx="20" cy="19" r="11" fill="var(--ink)" />
          <text
            x="20"
            y="22.5"
            textAnchor="middle"
            fill="var(--paper)"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fontWeight="700"
          >
            Y
          </text>
          {/* Account name */}
          <text
            x="38"
            y="17"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fontWeight="700"
          >
            You
          </text>
          {/* Role badge */}
          <text
            x="38"
            y="28"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="7.5"
            fontWeight="600"
          >
            OWNER
          </text>
        </g>

        {/* ── 2 WEEKS WARRANTY CIRCULAR ARC (FAR RIGHT) ── */}
        {/* Center: x=494, y=265 (Radius 28 -> spans 466..522, well inside x_max: 568) */}
        <g transform="translate(494, 265)">
          {/* Track Circle (Permanent structure) */}
          <circle
            cx="0"
            cy="0"
            r="28"
            fill="none"
            stroke="var(--fog)"
            strokeWidth="2.5"
            opacity="0.4"
          />

          {/* Animated Sweeping Arc */}
          <motion.circle
            cx="0"
            cy="0"
            r="28"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            style={{ rotate: -90 }}
            initial={
              shouldReduceMotion
                ? { strokeDashoffset: 0 }
                : { strokeDashoffset: CIRCUMFERENCE }
            }
            animate={
              isPlaying
                ? {
                    strokeDashoffset: [
                      CIRCUMFERENCE,
                      CIRCUMFERENCE,
                      0,
                      0,
                      CIRCUMFERENCE,
                    ],
                  }
                : shouldReduceMotion
                  ? { strokeDashoffset: 0 }
                  : { strokeDashoffset: CIRCUMFERENCE }
            }
            transition={{
              duration: DURATION,
              delay: isPlaying ? delay : 0,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: REPEAT_DELAY,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.42, 0.62, 0.85, 1],
            }}
          />

          {/* Central Label */}
          <text
            x="0"
            y="-3"
            textAnchor="middle"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fontWeight="700"
            letterSpacing="0.04em"
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
            fontWeight="600"
            letterSpacing="0.08em"
          >
            WARRANTY
          </text>
        </g>
      </g>
    </svg>
  );
}
