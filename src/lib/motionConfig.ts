// Motion configuration — easing curves, animation variants, duration tokens
// Used across all animated components. Tweak here to adjust the global feel.

// "Expensive" easing — expo-out style
export const ease = [0.16, 1, 0.3, 1] as const;
export const easeIn = [0.7, 0, 1, 0.84] as const;
export const easeInOut = [0.37, 0, 0.63, 1] as const;

// Duration tokens
export const duration = {
  fast: 0.2,
  base: 0.45,
  slow: 0.8,
  xslow: 1.2,
} as const;

// Heading mask reveal — clip-path from bottom up
export const headingReveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: { duration: duration.slow, ease },
  },
};

// Word-by-word stagger for large headings
export const wordReveal = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: duration.slow,
      ease,
      delay: i * 0.065,
    },
  }),
};

// Fade in (used very sparingly — e.g. body text)
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.base, ease },
  },
};

// Section entrance — subtle Y shift, only for non-heading elements
export const sectionEntry = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease },
  },
};

// Stagger container
export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

// Page transition variants (cut-style)
export const pageVariants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: duration.base, ease },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration.fast, ease: easeIn },
  },
};

// Card hover
export const cardHover = {
  rest: { y: 0 },
  hover: {
    y: -4,
    transition: { duration: duration.base, ease },
  },
};
