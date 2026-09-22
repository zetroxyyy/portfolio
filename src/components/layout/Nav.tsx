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

  /**
   * These are real anchors, so the default behaviour already works: crawlable,
   * Cmd-clickable, and functional with JavaScript off. This only intercepts the
   * plain left-click on a target that exists on the current page, to hand the
   * scroll to Lenis. Everything else — modified clicks, and links followed from
   * a case study page back to a homepage section — falls through to the browser.
   */
  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (!href.startsWith('/#')) return;

    const el = document.getElementById(href.slice(2));
    if (!el) return; // not on this page — let the browser navigate

    e.preventDefault();
    setMenuOpen(false);

    const lenis = (window as unknown as {
      lenis?: { scrollTo: (el: Element, opts?: object) => void };
    }).lenis;

    if (lenis) lenis.scrollTo(el, { offset: -70 });
    else el.scrollIntoView({ behavior: 'smooth' });

    // Keep the URL and the back button honest about where the reader is.
    window.history.pushState(null, '', href.slice(1));
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
                <Link
                  href={item.href}
                  className="nav__link"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </Link>
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
                  <Link
                    href={item.href}
                    className="nav__mobile-link"
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
