'use client';

import { motion } from 'framer-motion';
import { testimonials } from '../../../content/testimonials';
import { ease, duration } from '@/lib/motionConfig';
import type { CSSProperties } from 'react';

export function Testimonials() {
  return (
    <section className="testimonials" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="testimonials__inner">
        <header className="testimonials__header">
          <span className="testimonials__eyebrow">CLIENT FEEDBACK</span>
          <h2 id="testimonials-heading" className="testimonials__title">
            What the clients said.
          </h2>
          <p className="testimonials__qualifier">
            Two of these were written in the client&apos;s own language. Shown as written, translated
            underneath.
          </p>
        </header>

        <div className="testimonials__list">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.slug}
              className="quote"
              style={{ '--project-accent': t.accent } as CSSProperties}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: duration.slow, ease, delay: i * 0.06 }}
            >
              {/* Attribution column — who said it, about what */}
              <div className="quote__meta">
                <span className="quote__lang" aria-hidden="true">
                  {t.langLabel}
                </span>
                <div className="quote__project">
                  <p className="quote__project-name">{t.project}</p>
                  <p className="quote__domain">{t.domain}</p>
                </div>
              </div>

              {/* The words */}
              <div className="quote__body">
                {/* lang drives both the screen-reader voice and the script font stack */}
                <blockquote className="quote__original" lang={t.lang} data-lang={t.lang}>
                  {t.quote}
                </blockquote>

                {t.translation && (
                  <div className="quote__translation">
                    <span className="quote__translation-label">Translated</span>
                    <p lang="en">{t.translation}</p>
                  </div>
                )}

                <figcaption className="quote__attribution">
                  <span className="quote__author">{t.author}</span>
                  <span className="quote__role">{t.role}</span>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
