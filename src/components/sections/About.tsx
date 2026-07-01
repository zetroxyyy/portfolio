'use client';

import { motion } from 'framer-motion';
import { SectionMeta } from '@/components/ui/SectionMeta';
import { site } from '../../../content/site';
import { duration, ease } from '@/lib/motionConfig';

/**
 * About section — the human behind the work.
 * Short, real voice, no fluff. Bio from content/site.ts.
 */
export function About() {
  return (
    <section className="about-section" id="about" aria-label="About zetroxy">
      <div className="about-section__inner">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: duration.base, ease }}
        >
          <SectionMeta index={2} label="ABOUT" />
        </motion.div>

        <div className="about-section__grid">
          {/* Left — heading */}
          <motion.div
            className="about-section__left"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: duration.slow, ease }}
          >
            <h2 className="about-section__heading">
              End&#8209;to&#8209;end craft.
            </h2>
            <p className="about-section__location">{site.location}</p>
          </motion.div>

          {/* Right — bio */}
          <motion.div
            className="about-section__right"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: duration.slow, ease, delay: 0.12 }}
          >
            {site.bio.map((paragraph, i) => (
              <p key={i} className="about-section__bio">
                {paragraph}
              </p>
            ))}

            {site.bioSecondary && (
              <p className="about-section__bio about-section__bio--secondary">
                {site.bioSecondary}
              </p>
            )}

            {/* Discipline tags */}
            <div className="about-section__tags" aria-label="Core disciplines">
              {(['design', 'build', 'edit'] as const).map((d) => (
                <span key={d} className={`discipline-tag discipline-tag--${d} discipline-tag--lg`}>
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
