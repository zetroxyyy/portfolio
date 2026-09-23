'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { testimonials } from '@/../content/testimonials';

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="testimonials"
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="testimonials__inner">
        <header className="testimonials__header">
          <span className="section-eyebrow">CLIENT FEEDBACK</span>
          <h2
            id="testimonials-heading"
            className="section-heading section-heading--major"
          >
            What the clients{' '}
            <span className="serif-italic">actually said.</span>
          </h2>
          <p className="section-subhead">
            Two of these were written in the client&apos;s own language. Shown as
            written, translated underneath.
          </p>
        </header>

        <div className="testimonials__list">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.slug}
              className="testimonial-card"
              initial={
                shouldReduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 16 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                      delay: index * 0.06,
                    }
              }
            >
              {/* Left column: attribution meta */}
              <div className="testimonial-card__meta">
                <span className="testimonial-card__lang-pill">
                  {item.langLabel}
                </span>
                <div className="testimonial-card__project-info">
                  <span className="testimonial-card__project">
                    {item.project}
                  </span>
                  <span className="testimonial-card__domain">
                    {item.domain}
                  </span>
                </div>
              </div>

              {/* Right column: words */}
              <div className="testimonial-card__content">
                <blockquote
                  className="testimonial-card__quote"
                  lang={item.lang}
                >
                  <p>{item.quote}</p>
                </blockquote>

                {item.translation && (
                  <div className="testimonial-card__translation">
                    <span className="testimonial-card__translated-badge">
                      TRANSLATED
                    </span>
                    <p className="testimonial-card__translated-text">
                      {item.translation}
                    </p>
                  </div>
                )}

                <footer className="testimonial-card__author-wrap">
                  <span className="testimonial-card__author">
                    {item.author}
                  </span>
                  <span className="testimonial-card__role">
                    {item.role}
                  </span>
                </footer>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
