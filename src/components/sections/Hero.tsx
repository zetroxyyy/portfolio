'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { projects } from '../../../content/projects';
import { site } from '../../../content/site';

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollCue = () => {
    const workEl = document.getElementById('work');
    if (workEl) {
      const lenis = (window as unknown as { lenis?: { scrollTo: (el: Element | number, opts?: object) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(workEl, { offset: -30 });
      } else {
        workEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="hero-mosaic" id="hero" aria-label="Selected production projects showcase">
      {/* Top Left: Brand and subtitle */}
      <div className="hero-mosaic__brand">
        <span className="hero-mosaic__name">{site.name}</span>
        <span className="hero-mosaic__role">Full-stack developer · {site.location}</span>
      </div>

      {/* Top Right: Availability & direct email */}
      <div className="hero-mosaic__top-right">
        <span className="hero-mosaic__avail-dot" aria-hidden="true" />
        <a href={`mailto:${site.email}`} className="hero-mosaic__email" aria-label={`Email ${site.email}`}>
          {site.email}
        </a>
      </div>

      {/* Bottom Right: Scroll Cue */}
      <button
        type="button"
        className="hero-mosaic__scroll-cue"
        onClick={handleScrollCue}
        aria-label="Scroll down to work"
      >
        <span>Scroll ↓</span>
      </button>

      {/* Asymmetric 6-Cell Grid */}
      <div className="hero-mosaic__grid">
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            className={`hero-mosaic__cell hero-mosaic__cell--${index + 1}`}
            initial={shouldReduceMotion ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }
            }
          >
            <Link
              href={`/work/${project.slug}`}
              className="hero-mosaic__link"
              aria-label={`View ${project.title} case study`}
            >
              <div className="hero-mosaic__img-wrap">
                <Image
                  src={project.cover}
                  alt={project.coverAlt}
                  fill
                  sizes="(max-width: 820px) 50vw, (max-width: 1400px) 33vw, 50vw"
                  className="hero-mosaic__img"
                  priority
                />
                <div
                  className="hero-mosaic__color-wash"
                  style={{ backgroundColor: project.accent }}
                  aria-hidden="true"
                />
              </div>

              <div className="hero-mosaic__title-wrap">
                <span className="hero-mosaic__title">{project.title}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
