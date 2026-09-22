'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimProps {
  active: boolean;
  inView: boolean;
}

export function MobileAppAnim({ active, inView }: AnimProps) {
  const shouldReduceMotion = useReducedMotion();
  const isPlaying = active && inView && !shouldReduceMotion;

  return (
    <svg
      viewBox="0 0 600 338"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="capability-diagram-svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ── PHONE CASING & SCREEN ── */}
      <g>
        {/* Outer Phone Frame */}
        <rect
          x="170"
          y="50"
          width="156"
          height="244"
          rx="22"
          fill="var(--paper)"
          stroke="var(--fog)"
          strokeWidth="1.5"
        />
        {/* Inner Screen */}
        <rect
          x="178"
          y="58"
          width="140"
          height="228"
          rx="16"
          fill="var(--paper-2)"
          stroke="var(--hairline)"
          strokeWidth="1"
        />

        {/* Speaker / Camera Notch */}
        <rect x="230" y="66" width="36" height="5" rx="2.5" fill="var(--fog)" />
        {/* Home Indicator */}
        <rect x="228" y="274" width="40" height="3" rx="1.5" fill="var(--fog)" />

        {/* Screen Header */}
        <text
          x="248"
          y="88"
          textAnchor="middle"
          fill="var(--mist)"
          fontFamily="var(--font-mono)"
          fontSize="8.5"
          letterSpacing="0.08em"
          aria-hidden="true"
        >
          RESUMIQ · PROFILE
        </text>

        {/* ── FORM ROW 1: PERSONAL DETAILS ── */}
        <g>
          <rect x="190" y="103" width="40" height="4" rx="2" fill="var(--mist)" opacity="0.6" />
          <rect
            x="190"
            y="111"
            width="116"
            height="18"
            rx="4"
            fill="var(--paper)"
            stroke="var(--hairline)"
            strokeWidth="1"
          />
          {/* Row 1 Fill Bar */}
          <motion.rect
            x="194"
            y="115"
            height="10"
            rx="2"
            fill="var(--fog)"
            initial={shouldReduceMotion ? { width: 90 } : { width: 0 }}
            animate={
              isPlaying
                ? {
                    width: [0, 90, 90, 90, 90, 0],
                  }
                : shouldReduceMotion
                  ? { width: 90 }
                  : { width: 0 }
            }
            transition={{
              duration: 5,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: 0.4,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.18, 0.5, 0.85, 0.95, 1],
            }}
          />
        </g>

        {/* ── FORM ROW 2: VOICE-INPUT WORK EXPERIENCE ── */}
        <g>
          <rect x="190" y="141" width="55" height="4" rx="2" fill="var(--mist)" opacity="0.6" />
          <rect
            x="190"
            y="149"
            width="88"
            height="32"
            rx="4"
            fill="var(--paper)"
            stroke="var(--hairline)"
            strokeWidth="1"
          />
          {/* Row 2 Fill Bar (Simulating transcribed voice flow) */}
          <motion.rect
            x="194"
            y="153"
            height="24"
            rx="2"
            fill="var(--fog)"
            initial={shouldReduceMotion ? { width: 78 } : { width: 0 }}
            animate={
              isPlaying
                ? {
                    width: [0, 0, 78, 78, 78, 0],
                  }
                : shouldReduceMotion
                  ? { width: 78 }
                  : { width: 0 }
            }
            transition={{
              duration: 5,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: 0.4,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.2, 0.42, 0.85, 0.95, 1],
            }}
          />

          {/* Voice Microphone Button & Pulse Aura */}
          <g transform="translate(295, 165)">
            {/* Mic Pulse Wave */}
            <motion.circle
              cx="0"
              cy="0"
              r="13"
              fill="none"
              stroke="var(--project-accent)"
              strokeWidth="1.5"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={
                isPlaying
                  ? {
                      scale: [0.8, 0.8, 1.35, 0.8, 0.8],
                      opacity: [0, 0, 0.8, 0, 0],
                    }
                  : { scale: 0.8, opacity: 0 }
              }
              transition={{
                duration: 5,
                repeat: isPlaying ? Infinity : 0,
                repeatDelay: 0.4,
                ease: 'easeOut',
                times: [0, 0.2, 0.38, 0.45, 1],
              }}
            />
            {/* Mic Button Base */}
            <circle
              cx="0"
              cy="0"
              r="11"
              fill="var(--paper)"
              stroke="var(--project-accent)"
              strokeWidth="1.2"
            />
            {/* Microphone Icon */}
            <rect
              x="-2.5"
              y="-5.5"
              width="5"
              height="8"
              rx="2.5"
              fill="var(--project-accent)"
            />
            <path
              d="M -4.5 -1.5 C -4.5 2, 4.5 2, 4.5 -1.5"
              stroke="var(--project-accent)"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
            <line
              x1="0"
              y1="2.5"
              x2="0"
              y2="5"
              stroke="var(--project-accent)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* ── FORM ROW 3: SKILLS ── */}
        <g>
          <rect x="190" y="193" width="35" height="4" rx="2" fill="var(--mist)" opacity="0.6" />
          <rect
            x="190"
            y="201"
            width="116"
            height="18"
            rx="4"
            fill="var(--paper)"
            stroke="var(--hairline)"
            strokeWidth="1"
          />
          {/* Row 3 Fill Bar */}
          <motion.rect
            x="194"
            y="205"
            height="10"
            rx="2"
            fill="var(--fog)"
            initial={shouldReduceMotion ? { width: 85 } : { width: 0 }}
            animate={
              isPlaying
                ? {
                    width: [0, 0, 85, 85, 85, 0],
                  }
                : shouldReduceMotion
                  ? { width: 85 }
                  : { width: 0 }
            }
            transition={{
              duration: 5,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: 0.4,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.44, 0.58, 0.85, 0.95, 1],
            }}
          />
        </g>

        {/* Generate Trigger Button at Bottom */}
        <rect
          x="190"
          y="232"
          width="116"
          height="22"
          rx="4"
          fill="var(--paper)"
          stroke="var(--hairline)"
          strokeWidth="1"
        />
        <text
          x="248"
          y="246"
          textAnchor="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="8"
          letterSpacing="0.05em"
          fontWeight="500"
          aria-hidden="true"
        >
          GENERATE RESUME
        </text>
      </g>

      {/* ── GENERATED PDF DOCUMENT (SLIDES OUT & SETTLES) ── */}
      <motion.g
        initial={
          shouldReduceMotion
            ? { opacity: 1, x: 375, y: 94, scale: 1 }
            : { opacity: 0, x: 248, y: 60, scale: 0.8 }
        }
        animate={
          isPlaying
            ? {
                opacity: [0, 0, 1, 1, 1, 0],
                x: [248, 248, 375, 375, 375, 248],
                y: [60, 20, 94, 94, 94, 60],
                scale: [0.8, 0.9, 1, 1, 1, 0.8],
              }
            : shouldReduceMotion
              ? { opacity: 1, x: 375, y: 94, scale: 1 }
              : { opacity: 0, x: 248, y: 60, scale: 0.8 }
        }
        transition={{
          duration: 5,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: 0.4,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.6, 0.74, 0.85, 0.95, 1],
        }}
      >
        {/* Document Sheet */}
        <rect
          x="0"
          y="0"
          width="120"
          height="160"
          rx="8"
          fill="var(--paper)"
          stroke="var(--project-accent)"
          strokeWidth="1.5"
        />

        {/* Folded Top-Right Corner */}
        <path
          d="M 98 0 L 120 22 L 98 22 Z"
          fill="var(--paper-2)"
          stroke="var(--project-accent)"
          strokeWidth="1.5"
        />

        {/* PDF Mono Badge */}
        <text
          x="16"
          y="28"
          fill="var(--project-accent)"
          fontFamily="var(--font-mono)"
          fontSize="11"
          fontWeight="700"
          letterSpacing="0.08em"
          aria-hidden="true"
        >
          PDF
        </text>

        {/* Resume Title */}
        <rect x="16" y="42" width="60" height="6" rx="3" fill="var(--ink)" />

        {/* Skeleton Section 1 */}
        <rect x="16" y="60" width="88" height="4" rx="2" fill="var(--mist)" opacity="0.7" />
        <rect x="16" y="70" width="76" height="4" rx="2" fill="var(--mist)" opacity="0.7" />
        <rect x="16" y="80" width="82" height="4" rx="2" fill="var(--mist)" opacity="0.7" />

        {/* Divider */}
        <line x1="16" y1="94" x2="104" y2="94" stroke="var(--fog)" strokeWidth="1" />

        {/* Skeleton Section 2 */}
        <rect x="16" y="104" width="70" height="4" rx="2" fill="var(--mist)" opacity="0.7" />
        <rect x="16" y="114" width="84" height="4" rx="2" fill="var(--mist)" opacity="0.7" />
        <rect x="16" y="124" width="62" height="4" rx="2" fill="var(--mist)" opacity="0.7" />

        {/* Verified Seal */}
        <circle cx="98" cy="142" r="7" fill="var(--project-accent)" />
        <path
          d="M 95 142 L 97.5 144.5 L 101.5 139.5"
          fill="none"
          stroke="var(--paper)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
    </svg>
  );
}
