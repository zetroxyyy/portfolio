'use client';

import { motion, useReducedMotion } from 'framer-motion';

export function Statement() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="statement" className="statement-section" aria-label="Core thesis statement">
      <div className="statement-section__inner">
        <motion.p
          className="statement-section__text"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <strong>Most sites just sit there.</strong>{' '}
          <span className="serif-italic">Mine run the business.</span>
        </motion.p>
      </div>
    </section>
  );
}
