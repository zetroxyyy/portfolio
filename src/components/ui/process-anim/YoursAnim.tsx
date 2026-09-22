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

  const DURATION = 7.2;
  const REPEAT_DELAY = 0.6;
  const CIRCUMFERENCE = 175.9; // 2 * PI * 28

  return (
    <svg
      viewBox="0 0 600 338"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="process-diagram-svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ── ADMIN PANEL (TOP / CENTER) ── */}
      {/* Target ~88% of canvas: x=36, y=20, w=528, h=202 */}
      <g>
        {/* Panel Frame */}
        <rect
          x="36"
          y="20"
          width="528"
          height="202"
          rx="10"
          fill="var(--paper-2)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />

        {/* ── HEADER ROW ── */}
        <g>
          {/* Window control dots */}
          <circle cx="52" cy="36" r="3" fill="var(--fog)" />
          <circle cx="62" cy="36" r="3" fill="var(--fog)" />
          <circle cx="72" cy="36" r="3" fill="var(--fog)" />

          {/* Console Title */}
          <text
            x="90"
            y="39"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fontWeight="700"
            letterSpacing="0.08em"
          >
            DREAM ADVENTURE · CMS CONSOLE
          </text>

          {/* READ ONLY pill (Initial State) */}
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
              times: [0, 0.40, 0.44, 0.94, 1],
            }}
          >
            <rect
              x="456"
              y="26"
              width="96"
              height="20"
              rx="4"
              fill="var(--paper)"
              stroke="var(--fog)"
              strokeWidth="1"
            />
            <text
              x="504"
              y="39"
              textAnchor="middle"
              fill="var(--mist)"
              fontFamily="var(--font-mono)"
              fontSize="7.5"
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
              times: [0, 0.40, 0.44, 0.94, 1],
            }}
          >
            <rect
              x="456"
              y="26"
              width="96"
              height="20"
              rx="4"
              fill="var(--ink)"
            />
            <text
              x="504"
              y="39"
              textAnchor="middle"
              fill="var(--paper)"
              fontFamily="var(--font-mono)"
              fontSize="7.5"
              fontWeight="700"
              letterSpacing="0.06em"
            >
              OWNER ACCESS
            </text>
          </motion.g>

          {/* Divider below header */}
          <line x1="36" y1="52" x2="564" y2="52" stroke="var(--hairline)" strokeWidth="1" />
        </g>

        {/* ── SIDEBAR (LEFT) ── */}
        {/* Width: 114px (x=36 to x=150) */}
        <g>
          {/* Vertical divider */}
          <line x1="150" y1="52" x2="150" y2="222" stroke="var(--hairline)" strokeWidth="1" />

          {/* 5 Nav Items: Bookings, Availability, Pricing, Promos, Settings */}
          {[
            { label: 'Bookings', y: 72, active: true },
            { label: 'Availability', y: 102, active: false },
            { label: 'Pricing', y: 132, active: false },
            { label: 'Promos', y: 162, active: false },
            { label: 'Settings', y: 192, active: false },
          ].map((nav) => (
            <g key={nav.label}>
              {/* Active nav indicator */}
              {nav.active && (
                <motion.rect
                  x="44"
                  y={nav.y - 10}
                  width="98"
                  height="18"
                  rx="3"
                  initial={
                    shouldReduceMotion
                      ? { fill: 'var(--paper)', opacity: 1 }
                      : { fill: 'var(--paper)', opacity: 0.5 }
                  }
                  animate={
                    isPlaying
                      ? {
                          opacity: [0.5, 0.5, 1, 1, 0.5],
                        }
                      : shouldReduceMotion
                        ? { opacity: 1 }
                        : { opacity: 0.5 }
                  }
                  transition={{
                    duration: DURATION,
                    delay: isPlaying ? delay : 0,
                    repeat: isPlaying ? Infinity : 0,
                    repeatDelay: REPEAT_DELAY,
                    times: [0, 0.40, 0.44, 0.94, 1],
                  }}
                />
              )}

              {/* Nav item text: transitions from --fog/--mist to --ink when key arrives */}
              <motion.text
                x="52"
                y={nav.y + 2}
                fontFamily="var(--font-mono)"
                fontSize="8.5"
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
                  times: [0, 0.40, 0.44, 0.94, 1],
                }}
              >
                {nav.label}
              </motion.text>
            </g>
          ))}
        </g>

        {/* ── TABLE AREA (RIGHT OF SIDEBAR) ── */}
        {/* x=150 to x=564 */}
        <g>
          {/* Table Column Headers */}
          <text x="166" y="68" fill="var(--mist)" fontFamily="var(--font-mono)" fontSize="7.5" fontWeight="600" letterSpacing="0.06em">REF</text>
          <text x="236" y="68" fill="var(--mist)" fontFamily="var(--font-mono)" fontSize="7.5" fontWeight="600" letterSpacing="0.06em">CUSTOMER</text>
          <text x="330" y="68" fill="var(--mist)" fontFamily="var(--font-mono)" fontSize="7.5" fontWeight="600" letterSpacing="0.06em">TOUR / DATES</text>
          <text x="490" y="68" fill="var(--mist)" fontFamily="var(--font-mono)" fontSize="7.5" fontWeight="600" letterSpacing="0.06em">STATUS</text>
          <line x1="150" y1="76" x2="564" y2="76" stroke="var(--hairline)" strokeWidth="0.8" />

          {/* Three Table Rows */}
          {[
            { ref: '#DA-1042', guest: 'S. Tanaka', tour: 'Fuji Sunrise (4pax)', status: 'CONFIRMED', y: 94 },
            { ref: '#DA-1043', guest: 'K. Miller', tour: 'Kyoto Trail (2pax)', status: 'CONFIRMED', y: 132 },
            { ref: '#DA-1044', guest: 'A. Dupont', tour: 'Alpine Pass (6pax)', status: 'CONFIRMED', y: 170 },
          ].map((row, idx) => (
            <g key={row.ref}>
              {idx > 0 && (
                <line
                  x1="160"
                  y1={row.y - 18}
                  x2="554"
                  y2={row.y - 18}
                  stroke="var(--hairline)"
                  strokeWidth="0.6"
                  opacity="0.6"
                />
              )}

              {/* Row container background (subtle highlight when active) */}
              <motion.rect
                x="160"
                y={row.y - 14}
                width="394"
                height="28"
                rx="4"
                initial={
                  shouldReduceMotion
                    ? { fill: 'var(--paper)', opacity: 0.8 }
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
                  times: [0, 0.40, 0.44, 0.94, 1],
                }}
              />

              {/* Row text content: transitions from --fog to --ink upon handover */}
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
                  times: [0, 0.40, 0.44, 0.94, 1],
                }}
              >
                {/* Ref */}
                <text x="170" y={row.y + 4} fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="600">
                  {row.ref}
                </text>
                {/* Guest */}
                <text x="236" y={row.y + 4} fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="500">
                  {row.guest}
                </text>
                {/* Tour */}
                <text x="330" y={row.y + 4} fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="500">
                  {row.tour}
                </text>
                {/* Status Pill */}
                <rect x="486" y={row.y - 8} width="62" height="16" rx="3" fill="var(--paper-2)" stroke="currentColor" strokeWidth="0.8" />
                <text x="517" y={row.y + 3} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fontWeight="700">
                  {row.status}
                </text>
              </motion.g>
            </g>
          ))}
        </g>
      </g>

      {/* ── BOTTOM ROW: ACCOUNT CHIPS & KEY TRANSFER + WARRANTY ARC ── */}
      {/* Target ~88% of canvas, y=242 to y=308 */}
      <g>
        {/* ── ACCOUNT CHIP 1: zetroxy (LEFT) ── */}
        <g transform="translate(36, 248)">
          <rect
            x="0"
            y="0"
            width="150"
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
            y="23"
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
          x1="186"
          y1="267"
          x2="276"
          y2="267"
          stroke="var(--fog)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* ── SLIDING KEY GLYPH ── */}
        {/* Slides from zetroxy (x=188) to Dream Adventure (x=272) */}
        <motion.g
          initial={
            shouldReduceMotion
              ? { x: 272, y: 267, opacity: 1 }
              : { x: 190, y: 267, opacity: 1 }
          }
          animate={
            isPlaying
              ? {
                  x: [190, 190, 272, 272, 190],
                  opacity: [1, 1, 1, 1, 0],
                }
              : shouldReduceMotion
                ? { x: 272, y: 267, opacity: 1 }
                : { x: 190, y: 267, opacity: 0 }
          }
          transition={{
            duration: DURATION,
            delay: isPlaying ? delay : 0,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: REPEAT_DELAY,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.16, 0.40, 0.94, 1],
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

        {/* ── ACCOUNT CHIP 2: Dream Adventure (RIGHT) ── */}
        <g transform="translate(276, 248)">
          {/* Border brightens to ink when key arrives */}
          <motion.rect
            x="0"
            y="0"
            width="170"
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
              times: [0, 0.38, 0.42, 0.94, 1],
            }}
          />
          {/* Avatar */}
          <circle cx="20" cy="19" r="11" fill="var(--ink)" />
          <text
            x="20"
            y="23"
            textAnchor="middle"
            fill="var(--paper)"
            fontFamily="var(--font-mono)"
            fontSize="7.5"
            fontWeight="700"
          >
            DA
          </text>
          {/* Account name */}
          <text
            x="38"
            y="17"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="8.5"
            fontWeight="700"
          >
            Dream Adventure
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
        {/* Center: x=510, y=267 */}
        <g transform="translate(510, 267)">
          {/* Track Circle */}
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
              times: [0, 0.44, 0.68, 0.94, 1],
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
            fontSize="6.5"
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
