'use client';

import { motion } from 'framer-motion';
import { StatusReadout } from '@/components/ui/StatusReadout';
import { duration, ease } from '@/lib/motionConfig';
import { site } from '../../../content/site';

export function Hero() {
  const handleScrollToWork = () => {
    const el = document.getElementById('work');
    if (el) {
      const lenis = (window as unknown as { lenis?: { scrollTo: (el: Element, opts?: object) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -60 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="hero" id="hero" aria-label="Introduction">
      <div className="hero__inner">
        {/* Top metadata bar */}
        <motion.div
          className="hero__top-meta"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, ease, delay: 0.1 }}
        >
          <span className="hero__eyebrow">FULL-STACK WEB DEVELOPMENT · NEPAL</span>
          <StatusReadout />
        </motion.div>

        {/* Display headline */}
        <div className="hero__heading-wrap">
          <motion.h1
            className="hero__heading"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, ease, delay: 0.25 }}
          >
            I build the website <span className="serif-italic">and the system that runs it.</span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          className="hero__subhead"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slow, ease, delay: 0.4 }}
        >
          Booking engines, custom CMSs, storefronts, and admin dashboards — front to back, database to interface, deployed and maintained.
        </motion.p>

        {/* Live proof strip */}
        <motion.div
          className="hero__proof-strip"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slow, ease, delay: 0.55 }}
          aria-label="Verified delivery record: 6 products shipped, 3 client domains, Next.js and PostgreSQL stack"
        >
          <span className="hero__proof-item">6 PRODUCTS SHIPPED</span>
          <span className="hero__proof-sep" aria-hidden="true">·</span>
          <span className="hero__proof-item">3 CLIENT DOMAINS</span>
          <span className="hero__proof-sep" aria-hidden="true">·</span>
          <span className="hero__proof-item">NEXT.JS + POSTGRES</span>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slow, ease, delay: 0.7 }}
        >
          <button
            type="button"
            className="btn-primary"
            onClick={handleScrollToWork}
            aria-label="Scroll to selected work"
          >
            <span>Explore the work</span>
            <span aria-hidden="true">↓</span>
          </button>

          <a
            href={`mailto:${site.email}`}
            className="btn-secondary"
            aria-label={`Email ${site.email}`}
          >
            <span>{site.email}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
