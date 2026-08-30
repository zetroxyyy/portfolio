'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { site } from '../../../content/site';
import { ease, duration } from '@/lib/motionConfig';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
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
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        const lenis = (window as unknown as { lenis?: { scrollTo: (el: Element, opts?: object) => void } }).lenis;
        if (lenis) {
          lenis.scrollTo(el, { offset: -70 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }

  return (
    <header
      ref={navRef}
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      role="banner"
    >
      <nav className="nav__inner" aria-label="Main navigation">
        {/* Wordmark */}
        <Link href="/" className="nav__wordmark" aria-label={`${site.name} — home`}>
          {site.name}
        </Link>

        {/* Desktop links + Theme toggle */}
        <div className="nav__right">
          <ul className="nav__links" role="list">
            {site.nav.map((item) => (
              <li key={item.href}>
                <button
                  type="button"
                  className="nav__link"
                  onClick={() => handleNavClick(item.href)}
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="nav__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav__mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: duration.base, ease } }}
            exit={{ opacity: 0, y: -10, transition: { duration: duration.fast } }}
            role="dialog"
            aria-label="Mobile navigation"
          >
            <ul role="list">
              {site.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05, duration: duration.base, ease } }}
                >
                  <button
                    type="button"
                    className="nav__mobile-link"
                    onClick={() => handleNavClick(item.href)}
                  >
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
