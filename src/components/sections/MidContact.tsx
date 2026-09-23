'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../../../content/site';

export function MidContact() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <aside className="mid-contact" aria-label="Direct contact prompt">
      <div className="mid-contact__inner">
        <motion.div
          className="mid-contact__content"
          initial={
            shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 12 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
          }
        >
          <p className="mid-contact__heading">
            Seen enough?{' '}
            <span className="serif-italic">Tell me what you need built.</span>
          </p>

          <a
            href={`mailto:${site.email}`}
            className="mid-contact__email"
            aria-label={`Send email to ${site.email}`}
          >
            {site.email} ↗
          </a>

          <p className="mid-contact__reassurance">
            A reply within one working day, with honest scope and timing.
          </p>
        </motion.div>
      </div>
    </aside>
  );
}
