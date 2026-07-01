'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { site } from '../../../content/site';
import { ease, duration } from '@/lib/motionConfig';
import { ScrambleHover } from '@/components/ui/ScrambleText';

/**
 * Nav — minimal fixed navigation.
 * Shows the wordmark on the left, nav links on the right.
 * Fades in on load. Transitions to hairline bg on scroll.
 * Nav links use a quick hover-scramble (250ms) via ScrambleHover.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on ESC
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  function handleNavClick(href: string) {
    setMenuOpen(false);
    // If the href is an anchor, let Lenis handle it
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        const lenis = (window as unknown as { lenis?: { scrollTo: (el: Element, opts?: object) => void } }).lenis;
        if (lenis) {
          lenis.scrollTo(el, { offset: -80 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }

  return (
    <header
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      role="banner"
    >
      <nav className="nav__inner" aria-label="Main navigation">
        {/* Wordmark */}
        <Link href="/" className="nav__wordmark" aria-label={`${site.name} — home`}>
          {site.name}
        </Link>

        {/* Desktop links — hover scramble via ScrambleHover */}
        <ul className="nav__links" role="list">
          {site.nav.map((item) => (
            <li key={item.href}>
              <button
                className="nav__link"
                onClick={() => handleNavClick(item.href)}
                aria-label={`Navigate to ${item.label}`}
              >
                {/* ScrambleHover wraps the label text only; button handles click */}
                <ScrambleHover text={item.label} duration={250} />
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <button
          className="nav__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav__mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: duration.base, ease } }}
            exit={{ opacity: 0, y: -8, transition: { duration: duration.fast } }}
            role="dialog"
            aria-label="Mobile navigation"
          >
            <ul role="list">
              {site.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: i * 0.06, duration: duration.base, ease } }}
                >
                  <button
                    className="nav__mobile-link"
                    onClick={() => handleNavClick(item.href)}
                  >
                    {/* No scramble on mobile — touch users don't hover */}
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
