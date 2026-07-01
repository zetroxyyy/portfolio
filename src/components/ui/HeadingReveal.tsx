'use client';

import { motion } from 'framer-motion';
import { wordReveal, ease, duration } from '@/lib/motionConfig';

interface HeadingRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  delay?: number;
}

/**
 * HeadingReveal — animates a heading word-by-word with a clip/mask reveal.
 * Used for the hero title and section headings.
 * Respects reduced-motion via CSS.
 */
export function HeadingReveal({
  text,
  as: Tag = 'h2',
  className = '',
  delay = 0,
}: HeadingRevealProps) {
  const words = text.split(' ');

  return (
    <Tag className={`heading-reveal ${className}`} aria-label={text}>
      <span className="heading-reveal__inner" aria-hidden="true">
        {words.map((word, i) => (
          <span key={i} className="heading-reveal__word-wrap">
            <motion.span
              className="heading-reveal__word"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: duration.slow,
                ease,
                delay: delay + i * 0.065,
              }}
            >
              {word}
              {i < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
