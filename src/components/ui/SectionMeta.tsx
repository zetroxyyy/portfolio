'use client';

interface SectionMetaProps {
  label: string;
  className?: string;
}

export function SectionMeta({ label, className = '' }: SectionMetaProps) {
  return (
    <div className={`section-eyebrow ${className}`} aria-hidden="true">
      <span className="mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--mist)', letterSpacing: 'var(--tracking-wider)' }}>
        {label}
      </span>
    </div>
  );
}
