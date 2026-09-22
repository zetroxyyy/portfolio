'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimProps {
  inView: boolean;
}

export function BuildAnim({ inView }: AnimProps) {
  const shouldReduceMotion = useReducedMotion();
  const isPlaying = inView && !shouldReduceMotion;

  return (
    <svg
      viewBox="0 0 600 375"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="process-diagram-svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ── PREVIEW URL PILL (TOP) ── */}
      <g transform="translate(180, 26)">
        <rect
          x="0"
          y="0"
          width="240"
          height="26"
          rx="13"
          fill="var(--paper-2)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />
        <circle cx="18" cy="13" r="3.5" fill="var(--ink)" />
        <text
          x="32"
          y="16"
          fill="var(--mist)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="0.05em"
          aria-hidden="true"
        >
          preview-build.zetroxy.dev
        </text>
      </g>

      {/* ── PUBLIC PANEL (LEFT) ── */}
      <g>
        <rect
          x="70"
          y="68"
          width="220"
          height="276"
          rx="10"
          fill="var(--paper-2)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />
        <text
          x="88"
          y="92"
          fill="var(--mist)"
          fontFamily="var(--font-mono)"
          fontSize="8.5"
          letterSpacing="0.08em"
          aria-hidden="true"
        >
          01 / PUBLIC STOREFRONT
        </text>

        {/* Public Block 1 (Hero Banner) - Enters Step 1 */}
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
            duration: 7,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: 0.6,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.12, 0.92, 0.97, 1],
          }}
        >
          <rect
            x="86"
            y="104"
            width="188"
            height="46"
            rx="5"
            fill="var(--paper)"
            stroke="var(--fog)"
            strokeWidth="1"
          />
          <rect x="98" y="118" width="90" height="6" rx="2" fill="var(--ink)" />
          <rect x="98" y="130" width="130" height="4" rx="2" fill="var(--mist)" opacity="0.6" />
        </motion.g>

        {/* Public Filter Bar - Added in response to comment */}
        <motion.g
          initial={shouldReduceMotion ? { opacity: 1, height: 16 } : { opacity: 0, height: 0 }}
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
            duration: 7,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: 0.6,
            ease: 'easeOut',
            times: [0, 0.68, 0.72, 0.76, 0.8, 0.92, 1],
          }}
        >
          <rect x="86" y="156" width="48" height="12" rx="3" fill="var(--ink)" />
          <rect x="138" y="156" width="40" height="12" rx="3" fill="var(--fog)" />
          <rect x="182" y="156" width="40" height="12" rx="3" fill="var(--fog)" />
        </motion.g>

        {/* Public Block 2 (Product Card A) - Enters Step 3 */}
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
            duration: 7,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: 0.6,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.28, 0.36, 0.92, 1],
          }}
        >
          <rect
            x="86"
            y="174"
            width="88"
            height="86"
            rx="5"
            fill="var(--paper)"
            stroke="var(--fog)"
            strokeWidth="1"
          />
          <rect x="94" y="182" width="72" height="42" rx="3" fill="var(--fog)" />
          <rect x="94" y="232" width="55" height="5" rx="2" fill="var(--ink)" />
          <rect x="94" y="243" width="30" height="5" rx="2" fill="var(--graphite)" />
        </motion.g>

        {/* Public Block 3 (Product Card B) - Enters Step 5 */}
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
            duration: 7,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: 0.6,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.48, 0.56, 0.92, 1],
          }}
        >
          <rect
            x="186"
            y="174"
            width="88"
            height="86"
            rx="5"
            fill="var(--paper)"
            stroke="var(--fog)"
            strokeWidth="1"
          />
          <rect x="194" y="182" width="72" height="42" rx="3" fill="var(--fog)" />
          <rect x="194" y="232" width="55" height="5" rx="2" fill="var(--ink)" />
          <rect x="194" y="243" width="30" height="5" rx="2" fill="var(--graphite)" />
        </motion.g>

        {/* Public Comment Marker (Client note pops up at Step 6) */}
        <motion.g
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
          animate={
            isPlaying
              ? {
                  opacity: [0, 0, 1, 1, 0, 0],
                  scale: [0.8, 0.8, 1, 1, 0.8, 0.8],
                }
              : { opacity: 0 }
          }
          transition={{
            duration: 7,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: 0.6,
            ease: 'easeOut',
            times: [0, 0.64, 0.68, 0.78, 0.82, 1],
          }}
          style={{ transformOrigin: '145px 165px' }}
        >
          <rect
            x="100"
            y="145"
            width="90"
            height="20"
            rx="4"
            fill="var(--ink)"
            stroke="var(--paper)"
            strokeWidth="1"
          />
          <text
            x="145"
            y="158"
            textAnchor="middle"
            fill="var(--paper)"
            fontFamily="var(--font-mono)"
            fontSize="7.5"
            fontWeight="600"
            letterSpacing="0.05em"
            aria-hidden="true"
          >
            NOTE: &quot;+ FILTER&quot;
          </text>
        </motion.g>

        {/* Footer Checkout Bar */}
        <rect
          x="86"
          y="272"
          width="188"
          height="28"
          rx="4"
          fill="var(--paper)"
          stroke="var(--hairline)"
          strokeWidth="1"
        />
        <rect x="98" y="282" width="60" height="8" rx="2" fill="var(--fog)" />
        <rect x="220" y="278" width="46" height="16" rx="3" fill="var(--ink)" />
      </g>

      {/* ── ADMIN PANEL (RIGHT) ── */}
      <g>
        <rect
          x="310"
          y="68"
          width="220"
          height="276"
          rx="10"
          fill="var(--paper-2)"
          stroke="var(--hairline)"
          strokeWidth="1.2"
        />
        <text
          x="328"
          y="92"
          fill="var(--mist)"
          fontFamily="var(--font-mono)"
          fontSize="8.5"
          letterSpacing="0.08em"
          aria-hidden="true"
        >
          02 / ADMIN DASHBOARD
        </text>

        {/* Admin Block 1 (Stats Bar) - Enters Step 2 */}
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
            duration: 7,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: 0.6,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.18, 0.26, 0.92, 1],
          }}
        >
          <rect
            x="326"
            y="104"
            width="188"
            height="36"
            rx="5"
            fill="var(--paper)"
            stroke="var(--fog)"
            strokeWidth="1"
          />
          <rect x="338" y="114" width="48" height="16" rx="3" fill="var(--fog)" />
          <rect x="394" y="114" width="48" height="16" rx="3" fill="var(--fog)" />
          <rect x="450" y="114" width="52" height="16" rx="3" fill="var(--fog)" />
        </motion.g>

        {/* Admin Block 2 (Catalog Table Row 1) - Enters Step 4 */}
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
            duration: 7,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: 0.6,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.38, 0.46, 0.92, 1],
          }}
        >
          <rect
            x="326"
            y="150"
            width="188"
            height="32"
            rx="4"
            fill="var(--paper)"
            stroke="var(--fog)"
            strokeWidth="1"
          />
          <rect x="338" y="161" width="70" height="8" rx="2" fill="var(--ink)" />
          <rect x="430" y="161" width="30" height="8" rx="2" fill="var(--graphite)" />
          <rect x="480" y="159" width="24" height="14" rx="2" fill="var(--fog)" />
        </motion.g>

        {/* Admin Block 3 (Catalog Table Row 2) - Enters Step 6 */}
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
            duration: 7,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: 0.6,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.58, 0.66, 0.92, 1],
          }}
        >
          <rect
            x="326"
            y="190"
            width="188"
            height="32"
            rx="4"
            fill="var(--paper)"
            stroke="var(--fog)"
            strokeWidth="1"
          />
          <rect x="338" y="201" width="70" height="8" rx="2" fill="var(--ink)" />
          <rect x="430" y="201" width="30" height="8" rx="2" fill="var(--graphite)" />
          <rect x="480" y="199" width="24" height="14" rx="2" fill="var(--fog)" />
        </motion.g>

        {/* Admin Block 4 (Settings Table Row 3) */}
        <rect
          x="326"
          y="230"
          width="188"
          height="32"
          rx="4"
          fill="var(--paper)"
          stroke="var(--fog)"
          strokeWidth="1"
        />
        <rect x="338" y="241" width="50" height="8" rx="2" fill="var(--mist)" opacity="0.6" />
        <rect x="430" y="241" width="30" height="8" rx="2" fill="var(--mist)" opacity="0.6" />
        <rect x="480" y="239" width="24" height="14" rx="2" fill="var(--fog)" />

        {/* Sync Indicator at Bottom */}
        <g transform="translate(326, 274)">
          <rect x="0" y="0" width="188" height="24" rx="4" fill="var(--paper)" stroke="var(--hairline)" />
          <circle cx="16" cy="12" r="3" fill="var(--ink)" />
          <text
            x="26"
            y="15"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="8"
            fontWeight="500"
            letterSpacing="0.04em"
            aria-hidden="true"
          >
            SHARED DB SYNC: LIVE
          </text>
        </g>
      </g>
    </svg>
  );
}
