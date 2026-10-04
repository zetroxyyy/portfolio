'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../../../content/site';

export function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  return (
    <section className="contact-section" id="contact" aria-label="Direct contact and booking">
      <div className="contact-section__inner">
        {/* Testimonial Pull Quote */}
        <motion.div
          className="contact-section__quote-wrap"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <blockquote className="contact-section__quote">
            <p>
              &ldquo;It is rare to find a developer who perfectly balances technical backend skills with such a strong eye for frontend design.&rdquo;
            </p>
            <cite className="contact-section__cite">
              — Nexus MCU
            </cite>
          </blockquote>
        </motion.div>

        {/* Primary Contact CTA */}
        <div className="contact-section__main">
          <motion.a
            href={`mailto:${site.email}`}
            className="contact-section__email"
            aria-label={`Send email to ${site.email}`}
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {site.email}
          </motion.a>

          <div className="contact-section__meta">
            <div className="contact-section__status">
              <span className="contact-section__dot" aria-hidden="true" />
              <span className="contact-section__label">Available · 2026</span>
            </div>

            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-section__link"
            >
              GitHub ↗
            </a>

            <Link href="/approach" className="contact-section__link contact-section__link--approach">
              How I work →
            </Link>
          </div>
        </div>

        {/* Footer Legal Line */}
        <div className="contact-section__bottom">
          <span className="contact-section__legal">
            © {currentYear} {site.name} · {site.location}
          </span>
        </div>
      </div>
    </section>
  );
}
