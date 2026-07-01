'use client';

import { useSectionTimecode } from '@/hooks/useTimecode';
import { ScrambleText } from '@/components/ui/ScrambleText';

interface SectionMetaProps {
  index: number;
  label: string;
  className?: string;
}

/**
 * SectionMeta — renders the timecode + label in Martian Mono.
 * e.g. "01:12 — SELECTED WORK"
 *
 * The timecode and label scramble→resolve when scrolled into view (once).
 * Structural characters (: —) are preserved during scramble to prevent reflow.
 * Reduced-motion: renders final text immediately, no animation.
 * Screen readers: aria-label on ScrambleText ensures the final value is read.
 */
export function SectionMeta({ index, label, className = '' }: SectionMetaProps) {
  const timecode = useSectionTimecode(index);
  // Build the combined string for a single scramble unit — timecode + sep + label
  // Keeping them as two separate elements for layout (gap) but each scrambles independently.

  return (
    <div className={`section-meta ${className}`} aria-hidden="true">
      <ScrambleText
        text={timecode}
        className="section-meta__timecode"
        duration={480}
      />
      <span className="section-meta__sep">—</span>
      <ScrambleText
        text={label}
        className="section-meta__label"
        duration={540}
      />
    </div>
  );
}
