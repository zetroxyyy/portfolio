'use client';

interface SectionMetaProps {
  label: string;
  className?: string;
}

export function SectionMeta({ label, className = '' }: SectionMetaProps) {
  return (
    <div className={`section-eyebrow ${className}`} aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}
