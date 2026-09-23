'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { site } from '../../../content/site';
import { fadeIn } from '@/lib/motionConfig';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="contact" aria-label="Contact and site footer">
      <motion.div
        className="footer__inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {/* Contact CTA */}
        <motion.div className="footer__contact" variants={fadeIn}>
          <p className="footer__eyebrow">Direct Contact</p>
          <a
            href={`mailto:${site.email}`}
            className="footer__email-cta"
            aria-label={`Send email to ${site.email}`}
          >
            {site.email}
          </a>
          <p className="footer__location">{site.locationDetails}</p>
        </motion.div>

        {/* Bottom bar */}
        <motion.div className="footer__bottom" variants={fadeIn}>
          <span className="footer__copy">
            © {currentYear} {site.name} · Full-Stack Developer
          </span>

          <nav aria-label="Footer links">
            <ul className="footer__links" role="list">
              <li>
                <Link
                  href={site.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__link"
                  aria-label="GitHub repository"
                >
                  GitHub ↗
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="footer__link"
                  aria-label="Send direct email"
                >
                  Email
                </a>
              </li>
            </ul>
          </nav>
        </motion.div>
      </motion.div>
    </footer>
  );
}
