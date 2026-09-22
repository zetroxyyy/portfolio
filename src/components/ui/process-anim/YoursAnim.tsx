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

  // 14.0s total cycle (0-6s build-up, 6-11.5s 5.5s hold, 11.5-12.3s fade, 12.3-14s rest)
  const DURATION = 14.0;
  const REPEAT_DELAY = 0;
  const CIRCUMFERENCE = 201.06; // 2 * PI * 32

  return (
    <svg
      viewBox="0 0 600 338"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="process-diagram-svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ── 1. PERMANENT CONSOLE PANEL ── */}
      {/* x: 32, y: 32, w: 536, h: 186, radius 6, 1px --fog border, fill --paper */}
      <rect
        x="32"
        y="32"
        width="536"
        height="186"
        rx="6"
        fill="var(--paper)"
        stroke="var(--fog)"
        strokeWidth="1"
      />

      {/* Window dots: three 5-unit dots, 8 apart, starting x=48, y=46 */}
      <circle cx="50.5" cy="48.5" r="2.5" fill="var(--fog)" />
      <circle cx="58.5" cy="48.5" r="2.5" fill="var(--fog)" />
      <circle cx="66.5" cy="48.5" r="2.5" fill="var(--fog)" />

      {/* YOUR ADMIN CONSOLE: x=84, centre y=48 */}
      <text
        x="84"
        y="48"
        dominantBaseline="middle"
        fill="var(--ink)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fontWeight="700"
        letterSpacing="0.04em"
      >
        YOUR ADMIN CONSOLE
      </text>

      {/* Access pill: x: 462, y: 38, w: 90, h: 22; READ ONLY -> OWNER ACCESS */}
      {/* READ ONLY pill (Initial state) */}
      <motion.g
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 1 }}
        animate={
          isPlaying
            ? {
                opacity: [1, 1, 0, 0, 0, 1],
              }
            : { opacity: 0 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          times: [0, 0.26, 0.28, 0.82, 0.88, 1],
        }}
      >
        <rect
          x="462"
          y="38"
          width="90"
          height="22"
          rx="4"
          fill="var(--paper-2)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <text
          x="507"
          y="49"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--graphite)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="0.04em"
        >
          READ ONLY
        </text>
      </motion.g>

      {/* OWNER ACCESS pill (Active state) */}
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
          times: [0, 0.26, 0.28, 0.82, 0.88, 1],
        }}
      >
        <rect
          x="462"
          y="38"
          width="90"
          height="22"
          rx="4"
          fill="var(--ink)"
        />
        <text
          x="507"
          y="49"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--paper)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fontWeight="700"
          letterSpacing="0.04em"
        >
          OWNER ACCESS
        </text>
      </motion.g>

      {/* Header divider: x: 32, y: 66, w: 536, h: 1 */}
      <line x1="32" y1="66" x2="568" y2="66" stroke="var(--fog)" strokeWidth="1" />

      {/* ── SIDEBAR (x: 32, y: 66, w: 116, h: 152) ── */}
      {/* Sidebar divider: x: 148, y: 66, h: 152, vertical */}
      <line x1="148" y1="66" x2="148" y2="218" stroke="var(--fog)" strokeWidth="1" />

      {/* 5 items, 26 apart, first centre y=84: Dashboard (84), Content (110), Customers (136), Orders (162), Settings (188) */}
      {[
        { label: 'Dashboard', y: 84, active: true },
        { label: 'Content', y: 110, active: false },
        { label: 'Customers', y: 136, active: false },
        { label: 'Orders', y: 162, active: false },
        { label: 'Settings', y: 188, active: false },
      ].map((item) => (
        <g key={item.label}>
          {item.active && (
            <rect
              x="42"
              y="74"
              width="96"
              height="20"
              rx="3"
              fill="var(--paper-2)"
              stroke="var(--fog)"
              strokeWidth="0.8"
            />
          )}
          <motion.text
            x="50"
            y={item.y}
            dominantBaseline="middle"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fontWeight={item.active ? '700' : '500'}
            letterSpacing="0.04em"
            initial={shouldReduceMotion ? { fill: 'var(--ink)' } : { fill: 'var(--graphite)' }}
            animate={
              isPlaying
                ? {
                    fill: [
                      'var(--graphite)',
                      'var(--graphite)',
                      'var(--ink)',
                      'var(--ink)',
                      'var(--graphite)',
                    ],
                  }
                : shouldReduceMotion
                  ? { fill: 'var(--ink)' }
                  : { fill: 'var(--graphite)' }
            }
            transition={{
              duration: DURATION,
              delay: isPlaying ? delay : 0,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: REPEAT_DELAY,
              times: [0, 0.26, 0.28, 0.82, 0.88, 1],
            }}
          >
            {item.label}
          </motion.text>
        </g>
      ))}

      {/* ── TABLE AREA (x: 148..568) ── */}
      {/* Table header: centre y=84: REF x 164, RECORD x 236, STATUS x 470 */}
      <text
        x="164"
        y="84"
        dominantBaseline="middle"
        fill="var(--graphite)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="0.04em"
      >
        REF
      </text>
      <text
        x="236"
        y="84"
        dominantBaseline="middle"
        fill="var(--graphite)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="0.04em"
      >
        RECORD
      </text>
      <text
        x="470"
        y="84"
        dominantBaseline="middle"
        fill="var(--graphite)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="0.04em"
      >
        STATUS
      </text>

      {/* Row dividers */}
      <line x1="148" y1="100" x2="568" y2="100" stroke="var(--fog)" strokeWidth="0.8" opacity="0.6" />
      <line x1="148" y1="134" x2="568" y2="134" stroke="var(--fog)" strokeWidth="0.8" opacity="0.6" />
      <line x1="148" y1="168" x2="568" y2="168" stroke="var(--fog)" strokeWidth="0.8" opacity="0.6" />

      {/* Table rows: centres y 116, 150, 184 */}
      {[
        { ref: '#1042', status: 'ACTIVE', y: 116 },
        { ref: '#1043', status: 'ACTIVE', y: 150 },
        { ref: '#1044', status: 'PENDING', y: 184 },
      ].map((row) => (
        <g key={row.ref}>
          {/* REF (x: 164) */}
          <motion.text
            x="164"
            y={row.y}
            dominantBaseline="middle"
            fontFamily="var(--font-mono)"
            fontSize="10"
            fontWeight="600"
            letterSpacing="0.04em"
            initial={shouldReduceMotion ? { fill: 'var(--ink)' } : { fill: 'var(--graphite)' }}
            animate={
              isPlaying
                ? {
                    fill: [
                      'var(--graphite)',
                      'var(--graphite)',
                      'var(--ink)',
                      'var(--ink)',
                      'var(--graphite)',
                    ],
                  }
                : shouldReduceMotion
                  ? { fill: 'var(--ink)' }
                  : { fill: 'var(--graphite)' }
            }
            transition={{
              duration: DURATION,
              delay: isPlaying ? delay : 0,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: REPEAT_DELAY,
              times: [0, 0.26, 0.28, 0.82, 0.88, 1],
            }}
          >
            {row.ref}
          </motion.text>

          {/* RECORD: a --paper-2 bar (x 236, w 180, h 10, rx 2, 1px --fog border) */}
          <rect
            x="236"
            y={row.y - 5}
            width="180"
            height="10"
            rx="2"
            fill="var(--paper-2)"
            stroke="var(--fog)"
            strokeWidth="1"
          />

          {/* STATUS: status pill (x 470, w 62, h 18, rx 4) */}
          <motion.rect
            x="470"
            y={row.y - 9}
            width="62"
            height="18"
            rx="4"
            fill="var(--paper)"
            strokeWidth="1"
            initial={shouldReduceMotion ? { stroke: 'var(--ink)' } : { stroke: 'var(--fog)' }}
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
              times: [0, 0.26, 0.28, 0.82, 0.88, 1],
            }}
          />
          <motion.text
            x="501"
            y={row.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fontWeight="600"
            letterSpacing="0.04em"
            initial={shouldReduceMotion ? { fill: 'var(--ink)' } : { fill: 'var(--graphite)' }}
            animate={
              isPlaying
                ? {
                    fill: [
                      'var(--graphite)',
                      'var(--graphite)',
                      'var(--ink)',
                      'var(--ink)',
                      'var(--graphite)',
                    ],
                  }
                : shouldReduceMotion
                  ? { fill: 'var(--ink)' }
                  : { fill: 'var(--graphite)' }
            }
            transition={{
              duration: DURATION,
              delay: isPlaying ? delay : 0,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: REPEAT_DELAY,
              times: [0, 0.26, 0.28, 0.82, 0.88, 1],
            }}
          >
            {row.status}
          </motion.text>
        </g>
      ))}

      {/* ── 2. BOTTOM ROW: CHIPS, TRAVEL TRACK & KEY, WARRANTY BADGE ── */}
      {/* Chip: developer: x: 32, y: 250, w: 152, h: 40, radius 20 */}
      <g>
        <rect
          x="32"
          y="250"
          width="152"
          height="40"
          rx="20"
          fill="var(--paper)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        {/* Avatar circle 24 units at chip.x + 12 = 44, cx = 56, cy = 270 */}
        <circle cx="56" cy="270" r="12" fill="var(--ink)" />
        <text
          x="56"
          y="270"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--paper)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fontWeight="700"
        >
          Z
        </text>
        {/* Name at size 10 --ink, centre y 264 */}
        <text
          x="76"
          y="263"
          dominantBaseline="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="10"
          fontWeight="600"
          letterSpacing="0.04em"
        >
          zetroxy
        </text>
        {/* Role at size 9 --graphite, centre y 278 */}
        <text
          x="76"
          y="277"
          dominantBaseline="middle"
          fill="var(--graphite)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="0.04em"
        >
          DEVELOPER
        </text>
      </g>

      {/* Travel track: x: 196, y: 270, w: 118, h: 1, dashed (from x 196 to x 314) */}
      <line
        x1="196"
        y1="270"
        x2="314"
        y2="270"
        stroke="var(--fog)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      {/* Sliding Key Glyph: travels from x 196 to x 314 (stops 18 units before chip at 326) */}
      <motion.g
        initial={
          shouldReduceMotion
            ? { x: 314, y: 270, opacity: 1 }
            : { x: 196, y: 270, opacity: 1 }
        }
        animate={
          isPlaying
            ? {
                x: [196, 196, 314, 314, 314, 196],
                opacity: [1, 1, 1, 1, 0, 0],
              }
            : shouldReduceMotion
              ? { x: 314, y: 270, opacity: 1 }
              : { x: 196, y: 270, opacity: 1 }
        }
        transition={{
          duration: DURATION,
          delay: isPlaying ? delay : 0,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: REPEAT_DELAY,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.12, 0.28, 0.82, 0.88, 1],
        }}
      >
        {/* Key Head */}
        <circle cx="0" cy="0" r="6" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        {/* Key Shaft */}
        <line x1="6" y1="0" x2="16" y2="0" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Key Teeth */}
        <line x1="12" y1="0" x2="12" y2="4" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="0" x2="16" y2="3" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
      </motion.g>

      {/* Chip: owner: x: 326, y: 250, w: 132, h: 40, radius 20 */}
      <g>
        <motion.rect
          x="326"
          y="250"
          width="132"
          height="40"
          rx="20"
          fill="var(--paper)"
          strokeWidth="1"
          initial={shouldReduceMotion ? { stroke: 'var(--ink)' } : { stroke: 'var(--fog)' }}
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
            times: [0, 0.26, 0.28, 0.82, 0.88, 1],
          }}
        />
        {/* Avatar circle 24 units at chip.x + 12 = 338, cx = 350, cy = 270 */}
        <circle cx="350" cy="270" r="12" fill="var(--ink)" />
        <text
          x="350"
          y="270"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--paper)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fontWeight="700"
        >
          Y
        </text>
        {/* Name at size 10 --ink, centre y 264 */}
        <text
          x="370"
          y="263"
          dominantBaseline="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="10"
          fontWeight="700"
          letterSpacing="0.04em"
        >
          You
        </text>
        {/* Role at size 9 --graphite, centre y 278 */}
        <text
          x="370"
          y="277"
          dominantBaseline="middle"
          fill="var(--graphite)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fontWeight="600"
          letterSpacing="0.04em"
        >
          OWNER
        </text>
      </g>

      {/* ── WARRANTY BADGE (x: 484, y: 238, w: 64, h: 64, circle centre (516, 270)) ── */}
      <g>
        {/* Track Circle (Permanent structure: cx 516, cy 270, r 32) */}
        <circle
          cx="516"
          cy="270"
          r="32"
          fill="var(--paper)"
          stroke="var(--fog)"
          strokeWidth="1.5"
        />

        {/* Animated Progress Arc on the circle's own radius (r=32, outside the text) */}
        <motion.circle
          cx="516"
          cy="270"
          r="32"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          style={{ rotate: -90, transformOrigin: '516px 270px' }}
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
            times: [0, 0.30, 0.42, 0.82, 0.88, 1],
          }}
        />

        {/* Text inside circle: 2 WEEKS at centre y 264, WARRANTY at centre y 278, both size 9, both centred on x 516 */}
        <text
          x="516"
          y="264"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fontWeight="700"
          letterSpacing="0.04em"
        >
          2 WEEKS
        </text>
        <text
          x="516"
          y="278"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--graphite)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fontWeight="600"
          letterSpacing="0.04em"
        >
          WARRANTY
        </text>
      </g>
    </svg>
  );
}
