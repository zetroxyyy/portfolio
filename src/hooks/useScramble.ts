'use client';

import { useCallback, useRef, useState, useEffect } from 'react';

/**
 * Scramble character pool — digits, punctuation, uppercase hex-style set.
 * Same width bracket as Martian Mono digits (all tabular) so no reflow.
 */
const POOL = '0123456789:—/#%*ABCDEF';

function randomChar(): string {
  return POOL[Math.floor(Math.random() * POOL.length)];
}

interface ScrambleOptions {
  /** Total duration of the full resolve in ms (default 500) */
  duration?: number;
  /** Whether to skip animation (prefers-reduced-motion) */
  skip?: boolean;
}

/**
 * useScramble — characters cycle through random glyphs then lock left-to-right.
 *
 * Returns:
 *   display  — the current (possibly scrambled) string to render
 *   trigger  — call this to start the scramble animation
 *
 * The final string length never changes during the animation, so no reflow.
 * Accessibility: callers should set aria-label to `text` and aria-hidden on
 * the animated span so screen readers always read the final value.
 */
export function useScramble(
  text: string,
  { duration = 500, skip = false }: ScrambleOptions = {}
) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  // Track the current text to avoid stale closure issues
  const textRef = useRef(text);

  const trigger = useCallback(() => {
    if (skip) return; // reduced-motion: no-op, stay at final text

    // Cancel any in-progress animation
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    startRef.current = null;
    const resolveText = textRef.current;
    const len = resolveText.length;

    function frame(now: number) {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // How many characters have locked (left-to-right)
      const locked = Math.floor(progress * len);

      let result = '';
      for (let i = 0; i < len; i++) {
        if (i < locked) {
          // This position has resolved to its final character
          result += resolveText[i];
        } else {
          // Still scrambling — preserve spaces and colons (structural chars)
          const ch = resolveText[i];
          if (ch === ' ' || ch === ':' || ch === '—') {
            result += ch;
          } else {
            result += randomChar();
          }
        }
      }

      setDisplay(result);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        setDisplay(resolveText); // guarantee exact final string
        rafRef.current = null;
      }
    }

    rafRef.current = requestAnimationFrame(frame);
  }, [duration, skip]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Keep textRef and display in sync when text prop changes
  // Use a ref-then-setState pattern to avoid the synchronous setState-in-effect lint error
  useEffect(() => {
    textRef.current = text;
    // Only update display if not currently animating
    if (!rafRef.current) {
      const timer = setTimeout(() => setDisplay(text), 0);
      return () => clearTimeout(timer);
    }
  }, [text]);

  return { display, trigger };
}
