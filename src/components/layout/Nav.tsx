'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { site } from '../../../content/site';
import { ease, duration } from '@/lib/motionConfig';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      if (isHome && !isClickScrollingRef.current) {
        const atBottom =
          window.innerHeight + Math.ceil(window.scrollY) >=
          document.documentElement.scrollHeight - 2;
        if (atBottom) {
          setActiveSection('contact');
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  // Close menu on ESC
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // Lock scrolling while menuOpen is true, restoring previous overflow and Lenis state
  useEffect(() => {
    if (!menuOpen) return;

    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    const previousOverflow = document.body.style.overflow;

    lenis?.stop();
    document.body.style.overflow = 'hidden';

    return () => {
      lenis?.start();
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  // Clear pending click timeout on unmount
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = null;
      }
    };
  }, []);

  // Active section indicator via IntersectionObserver
  useEffect(() => {
    if (!isHome) return;

    const sectionIds = ['work', 'capabilities', 'process', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const entriesMap = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrollingRef.current) return;

        entries.forEach((entry) => {
          entriesMap.set(entry.target.id, entry);
        });

        const atBottom =
          window.innerHeight + Math.ceil(window.scrollY) >=
          document.documentElement.scrollHeight - 2;

        if (atBottom) {
          setActiveSection(sectionIds[sectionIds.length - 1]);
          return;
        }

        // Pick intersecting entry minimising distance from section centre to viewport centre
        const viewportCenter = window.innerHeight / 2;
        let nearestId: string | null = null;
        let minDistance = Infinity;

        entriesMap.forEach((entry, id) => {
          if (entry.isIntersecting) {
            const rect = entry.target.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const distance = Math.abs(sectionCenter - viewportCenter);
            if (distance < minDistance) {
              minDistance = distance;
              nearestId = id;
            }
          }
        });

        // Sticky highlight: if a tracked section is active, update state.
        // If visible sections empty (e.g. over Testimonials), do not clear state.
        if (nearestId) {
          setActiveSection(nearestId);
        }
      },
      {
        rootMargin: '-45% 0px -45% 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [isHome]);

  // Handle on-load or route-change hash scroll
  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) {
        const lenis = (window as unknown as { lenis?: { scrollTo: (el: Element, opts?: object) => void } }).lenis;
        setTimeout(() => {
          if (lenis) {
            lenis.scrollTo(el, { offset: -70, immediate: true });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  }, [pathname]);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    // Let the browser handle modified clicks — new tab, new window, download.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (!href.startsWith('/#')) return;

    const targetId = href.slice(2);
    const el = document.getElementById(targetId);
    if (!el) return; // not on this page — let the browser navigate to it

    e.preventDefault();
    setMenuOpen(false);

    // Clicking must win immediately
    setActiveSection(targetId);
    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
      clickTimeoutRef.current = null;
    }, 1500);

    const lenis = (window as unknown as {
      lenis?: {
        scrollTo: (
          el: Element,
          opts?: { offset?: number; onComplete?: () => void }
        ) => void;
      };
    }).lenis;

    if (lenis) {
      lenis.scrollTo(el, {
        offset: -70,
        onComplete: () => {
          isClickScrollingRef.current = false;
          if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current);
            clickTimeoutRef.current = null;
          }
        },
      });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }

    // A6: Use replaceState so back button leaves page cleanly in one press
    window.history.replaceState(null, '', href.slice(1));
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
            {site.nav.map((item) => {
              const targetId = item.href.replace('/#', '');
              const isActive = isHome && activeSection === targetId;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav__link ${isActive ? 'nav__link--active' : ''}`}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
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
              {site.nav.map((item, i) => {
                const targetId = item.href.replace('/#', '');
                const isActive = isHome && activeSection === targetId;

                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05, duration: duration.base, ease } }}
                  >
                    <Link
                      href={item.href}
                      className={`nav__mobile-link ${isActive ? 'nav__mobile-link--active' : ''}`}
                      aria-current={isActive ? 'location' : undefined}
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
