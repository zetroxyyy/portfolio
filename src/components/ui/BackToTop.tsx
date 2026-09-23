'use client';

import { useState, useEffect } from 'react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hidden until the reader is past roughly 1.5 viewports
      const threshold = window.innerHeight * 1.5;
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const lenis = (
      window as unknown as {
        lenis?: { scrollTo: (target: number | string, opts?: object) => void };
      }
    ).lenis;

    if (lenis) {
      lenis.scrollTo(0, { immediate: prefersReducedMotion });
    } else {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }

    // Move focus to skip-link target (#main-content) so keyboard users do not lose place
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus({ preventScroll: true });
    }
  };

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? 'back-to-top--visible' : ''}`}
      onClick={handleClick}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="back-to-top__arrow"
        aria-hidden="true"
      >
        <path d="M8 12.5V3.5M3.5 8L8 3.5l4.5 4.5" />
      </svg>
    </button>
  );
}
