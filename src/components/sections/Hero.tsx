'use client';

import { motion } from 'framer-motion';
import { HeadingReveal } from '@/components/ui/HeadingReveal';
import { StatusReadout } from '@/components/ui/StatusReadout';
import { duration, ease } from '@/lib/motionConfig';

/**
 * Hero — the opening thesis.
 * Confident, specific, no clichés.
 * Structure: status readout (top-right) → timecode meta → heading → spine → scroll cue
 */
export function Hero() {
  return (
    <section className="hero" id="hero" aria-label="Introduction">
      {/* Status readout — upper right; absolutely positioned so it
          doesn't displace the bottom-aligned main content */}
      <motion.div
        className="hero__status"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.base, ease, delay: 0.1 }}
      >
        <StatusReadout />
      </motion.div>

      <div className="hero__inner">
        {/* Timecode meta — section 00 */}
        <motion.div
          className="hero__meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duration.base, ease, delay: 0.2 }}
          aria-hidden="true"
        >
          <span className="section-meta__timecode">00:00</span>
          <span className="section-meta__sep">—</span>
          <span className="section-meta__label">INTRO</span>
        </motion.div>

        {/* Main heading */}
        <div className="hero__heading-wrap">
          <HeadingReveal
            as="h1"
            text="Design. Build. Edit."
            className="hero__heading"
            delay={0.4}
          />
        </div>

        {/* Sub-statement */}
        <motion.p
          className="hero__sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duration.slow, ease, delay: 0.85 }}
        >
          Front-end and back-end development, interface design, and video editing —
          three disciplines that compound.
        </motion.p>

        {/* Discipline spine */}
        <motion.div
          className="hero__spine"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duration.slow, ease, delay: 1.0 }}
          aria-label="Core disciplines: Design, Build, Edit"
        >
          <span className="hero__discipline">Design</span>
          <span className="hero__divider" aria-hidden="true">·</span>
          <span className="hero__discipline">Build</span>
          <span className="hero__divider" aria-hidden="true">·</span>
          <span className="hero__discipline">Edit</span>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="hero__actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duration.slow, ease, delay: 1.15 }}
        >
          <button
            className="hero__scroll-cue"
            onClick={() => {
              const el = document.getElementById('work');
              if (el) {
                const lenis = (window as unknown as { lenis?: { scrollTo: (el: Element) => void } }).lenis;
                if (lenis) lenis.scrollTo(el);
                else el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            aria-label="Scroll to selected work"
          >
            <span className="scroll-cue__label">Selected work</span>
            <span className="scroll-cue__arrow" aria-hidden="true">↓</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator line */}
      <motion.div
        className="hero__line"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: duration.xslow, ease, delay: 0.6 }}
        aria-hidden="true"
      />
    </section>
  );
}
