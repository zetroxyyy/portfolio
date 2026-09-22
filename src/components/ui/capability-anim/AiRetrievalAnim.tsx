'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimProps {
  active: boolean;
  inView: boolean;
}

const embeddingDots = [
  { id: 0, x: 160, y: 160 },
  { id: 1, x: 200, y: 220 },
  { id: 2, x: 235, y: 175, isMatch: true, score: '0.94' },
  { id: 3, x: 265, y: 235, isMatch: true, score: '0.91' },
  { id: 4, x: 280, y: 185, isMatch: true, score: '0.88' },
  { id: 5, x: 315, y: 150 },
  { id: 6, x: 325, y: 255 },
  { id: 7, x: 355, y: 200 },
  { id: 8, x: 385, y: 165 },
  { id: 9, x: 405, y: 240 },
  { id: 10, x: 430, y: 195 },
  { id: 11, x: 455, y: 150 },
  { id: 12, x: 475, y: 225 },
  { id: 13, x: 495, y: 180 },
  { id: 14, x: 175, y: 250 },
  { id: 15, x: 365, y: 260 },
];

export function AiRetrievalAnim({ active, inView }: AnimProps) {
  const shouldReduceMotion = useReducedMotion();
  const isPlaying = active && inView && !shouldReduceMotion;

  const docOrigins = [
    { x: 120, targetDot: 1 },
    { x: 220, targetDot: 2 },
    { x: 320, targetDot: 7 },
    { x: 420, targetDot: 10 },
  ];

  return (
    <svg
      viewBox="0 0 600 338"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="capability-diagram-svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ── TOP SECTION: 4 INGESTED DOCUMENTS ── */}
      <g>
        <text
          x="75"
          y="42"
          fill="var(--mist)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="0.08em"
          aria-hidden="true"
        >
          DOCUMENTS / TRANSCRIPTS
        </text>

        {docOrigins.map((doc, idx) => (
          <g key={idx}>
            {/* Document Card */}
            <motion.g
              initial={shouldReduceMotion ? { opacity: 0.6 } : { opacity: 1, scale: 1 }}
              animate={
                isPlaying
                  ? {
                      opacity: [1, 1, 0, 0, 0, 1],
                      scale: [1, 1, 0.4, 0.4, 1, 1],
                    }
                  : shouldReduceMotion
                    ? { opacity: 0.6 }
                    : { opacity: 1 }
              }
              transition={{
                duration: 5.2,
                repeat: isPlaying ? Infinity : 0,
                repeatDelay: 0.4,
                ease: [0.16, 1, 0.3, 1],
                times: [0, 0.12, 0.22, 0.88, 0.96, 1],
              }}
              style={{ transformOrigin: `${doc.x + 28}px 68px` }}
            >
              <rect
                x={doc.x}
                y="50"
                width="56"
                height="38"
                rx="4"
                fill="var(--paper-2)"
                stroke="var(--hairline)"
                strokeWidth="1.2"
              />
              <rect x={doc.x + 8} y="58" width="24" height="3" rx="1.5" fill="var(--mist)" />
              <rect x={doc.x + 8} y="65" width="38" height="3" rx="1.5" fill="var(--fog)" />
              <rect x={doc.x + 8} y="72" width="30" height="3" rx="1.5" fill="var(--fog)" />
            </motion.g>

            {/* Dropping Dot during embedding ingestion */}
            <motion.circle
              r="4"
              fill="var(--project-accent)"
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, cx: doc.x + 28, cy: 70 }
              }
              animate={
                isPlaying
                  ? {
                      opacity: [0, 0, 1, 0, 0],
                      cx: [
                        doc.x + 28,
                        doc.x + 28,
                        embeddingDots[doc.targetDot].x,
                        embeddingDots[doc.targetDot].x,
                        embeddingDots[doc.targetDot].x,
                      ],
                      cy: [
                        70,
                        70,
                        embeddingDots[doc.targetDot].y,
                        embeddingDots[doc.targetDot].y,
                        embeddingDots[doc.targetDot].y,
                      ],
                    }
                  : { opacity: 0 }
              }
              transition={{
                duration: 5.2,
                repeat: isPlaying ? Infinity : 0,
                repeatDelay: 0.4,
                ease: [0.16, 1, 0.3, 1],
                times: [0, 0.15, 0.3, 0.35, 1],
              }}
            />
          </g>
        ))}
      </g>

      {/* ── VECTOR EMBEDDING SPACE LABEL & BOUNDARY ── */}
      <text
        x="75"
        y="126"
        fill="var(--mist)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="0.08em"
        aria-hidden="true"
      >
        EMBEDDING SPACE · PGVECTOR
      </text>

      {/* ── QUERY PULSE & EXPANDING RIPPLE FROM LEFT ── */}
      <g transform="translate(85, 205)">
        {/* Query Input Marker */}
        <circle cx="0" cy="0" r="5" fill="var(--project-accent)" />
        <text
          x="10"
          y="3"
          fill="var(--project-accent)"
          fontFamily="var(--font-mono)"
          fontSize="8"
          letterSpacing="0.05em"
          fontWeight="600"
          aria-hidden="true"
        >
          QUERY
        </text>

        {/* Expanding Search Wave (RAG query ring) */}
        <motion.circle
          cx="0"
          cy="0"
          fill="none"
          stroke="var(--project-accent)"
          strokeWidth="1.5"
          initial={
            shouldReduceMotion
              ? { r: 190, opacity: 0.4 }
              : { r: 15, opacity: 0 }
          }
          animate={
            isPlaying
              ? {
                  r: [15, 15, 220, 240, 240, 15],
                  opacity: [0, 0, 0.85, 0, 0, 0],
                }
              : shouldReduceMotion
                ? { r: 190, opacity: 0.4 }
                : { r: 15, opacity: 0 }
          }
          transition={{
            duration: 5.2,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: 0.4,
            ease: 'easeOut',
            times: [0, 0.38, 0.62, 0.72, 0.95, 1],
          }}
        />
      </g>

      {/* ── EMBEDDING SPACE DOTS ── */}
      {embeddingDots.map((dot) => {
        if (!dot.isMatch) {
          return (
            <circle
              key={dot.id}
              cx={dot.x}
              cy={dot.y}
              r="4"
              fill="var(--paper-2)"
              stroke="var(--fog)"
              strokeWidth="1.2"
            />
          );
        }

        // Highlighted nearest match dot
        return (
          <g key={dot.id}>
            {/* Match Halo Aura */}
            <motion.circle
              cx={dot.x}
              cy={dot.y}
              r="14"
              fill="none"
              stroke="var(--project-accent)"
              strokeWidth="1.2"
              initial={
                shouldReduceMotion
                  ? { opacity: 0.5, scale: 1 }
                  : { opacity: 0, scale: 0.8 }
              }
              animate={
                isPlaying
                  ? {
                      opacity: [0, 0, 0, 0.8, 0.8, 0],
                      scale: [0.8, 0.8, 0.8, 1.2, 1, 0.8],
                    }
                  : shouldReduceMotion
                    ? { opacity: 0.5, scale: 1 }
                    : { opacity: 0 }
              }
              transition={{
                duration: 5.2,
                repeat: isPlaying ? Infinity : 0,
                repeatDelay: 0.4,
                ease: [0.16, 1, 0.3, 1],
                times: [0, 0.52, 0.56, 0.66, 0.92, 1],
              }}
            />

            {/* Rising Vector Match Dot */}
            <motion.circle
              cx={dot.x}
              r="5.5"
              initial={
                shouldReduceMotion
                  ? { cy: dot.y - 6, fill: 'var(--project-accent)' }
                  : { cy: dot.y, fill: 'var(--fog)' }
              }
              animate={
                isPlaying
                  ? {
                      cy: [dot.y, dot.y, dot.y, dot.y - 6, dot.y - 6, dot.y],
                      fill: [
                        'var(--fog)',
                        'var(--fog)',
                        'var(--fog)',
                        'var(--project-accent)',
                        'var(--project-accent)',
                        'var(--fog)',
                      ],
                    }
                  : shouldReduceMotion
                    ? { cy: dot.y - 6, fill: 'var(--project-accent)' }
                    : { cy: dot.y, fill: 'var(--fog)' }
              }
              transition={{
                duration: 5.2,
                repeat: isPlaying ? Infinity : 0,
                repeatDelay: 0.4,
                ease: [0.16, 1, 0.3, 1],
                times: [0, 0.52, 0.56, 0.66, 0.92, 1],
              }}
            />

            {/* Match score badge above dot */}
            <motion.g
              initial={
                shouldReduceMotion
                  ? { opacity: 1, y: -6 }
                  : { opacity: 0, y: 0 }
              }
              animate={
                isPlaying
                  ? {
                      opacity: [0, 0, 0, 1, 1, 0],
                      y: [0, 0, 0, -6, -6, 0],
                    }
                  : shouldReduceMotion
                    ? { opacity: 1, y: -6 }
                    : { opacity: 0 }
              }
              transition={{
                duration: 5.2,
                repeat: isPlaying ? Infinity : 0,
                repeatDelay: 0.4,
                ease: [0.16, 1, 0.3, 1],
                times: [0, 0.54, 0.58, 0.68, 0.92, 1],
              }}
            >
              <rect
                x={dot.x - 14}
                y={dot.y - 24}
                width="28"
                height="13"
                rx="3"
                fill="var(--paper)"
                stroke="var(--project-accent)"
                strokeWidth="1"
              />
              <text
                x={dot.x}
                y={dot.y - 15}
                textAnchor="middle"
                fill="var(--ink)"
                fontFamily="var(--font-mono)"
                fontSize="7.5"
                fontWeight="600"
                aria-hidden="true"
              >
                {dot.score}
              </text>
            </motion.g>
          </g>
        );
      })}
    </svg>
  );
}
