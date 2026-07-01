'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { site } from '../../../content/site';
import { fadeIn, duration, ease } from '@/lib/motionConfig';

/**
 * Footer — a considered closing moment.
 * Shows the closing thought, email CTA, and socials.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="contact">
      <motion.div
        className="footer__inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {/* Closing statement */}
        <motion.div className="footer__statement" variants={fadeIn}>
          <p className="footer__label">Let&apos;s work together</p>
          <a
            href={`mailto:${site.email}`}
            className="footer__email"
            aria-label={`Send email to ${site.email}`}
          >
            {site.email}
          </a>
        </motion.div>

        {/* Bottom bar */}
        <motion.div className="footer__bottom" variants={fadeIn}>
          <span className="footer__copy">
            © {currentYear} {site.name}
          </span>

          <nav aria-label="Social links">
            <ul className="footer__socials" role="list">
              {Object.entries(site.socials).map(([platform, href]) => (
                <li key={platform}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    aria-label={`${site.name} on ${platform}`}
                  >
                    {platform}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="footer__social-link"
                  aria-label="Email zetroxy"
                >
                  email
                </a>
              </li>
            </ul>
          </nav>
        </motion.div>
      </motion.div>
    </footer>
  );
}
