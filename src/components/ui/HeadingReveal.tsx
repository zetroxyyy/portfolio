'use client';

import { motion } from 'framer-motion';
import { ease, duration } from '@/lib/motionConfig';

interface HeadingRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  delay?: number;
}

/**
 * HeadingReveal — word-by-word slide-up reveal.
 * Each word is wrapped in an overflow:hidden clip box.
 * Reduced-motion: words snap in immediately via CSS override.
 *
 * Accessibility: the heading tag carries the accessible label via aria-label.
 * The animated inner span is aria-hidden so screen readers don't read word fragments.
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
      {/* aria-hidden: screen readers use the parent's aria-label */}
      <span className="heading-reveal__inner" aria-hidden="true">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="heading-reveal__word-wrap">
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
              {/* Non-breaking space preserves word spacing across wrapping flex children */}
              {i < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
