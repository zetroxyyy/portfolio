import { useSectionTimecode } from '@/hooks/useTimecode';

interface SectionMetaProps {
  index: number;
  label: string;
  className?: string;
}

/**
 * SectionMeta — renders the timecode + label in Martian Mono.
 * e.g. "01:12 — SELECTED WORK"
 * Honest because the timecodes are indexed to actual section positions.
 */
export function SectionMeta({ index, label, className = '' }: SectionMetaProps) {
  const timecode = useSectionTimecode(index);

  return (
    <div className={`section-meta ${className}`} aria-hidden="true">
      <span className="section-meta__timecode">{timecode}</span>
      <span className="section-meta__sep">—</span>
      <span className="section-meta__label">{label}</span>
    </div>
  );
}
