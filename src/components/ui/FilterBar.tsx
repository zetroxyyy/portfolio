'use client';

import { Discipline } from '../../../content/projects';

interface FilterBarProps {
  active: Discipline | 'all';
  onChange: (filter: Discipline | 'all') => void;
}

const filters: { value: Discipline | 'all'; label: string }[] = [
  { value: 'all', label: 'All work' },
  { value: 'design', label: 'Design' },
  { value: 'build', label: 'Build' },
  { value: 'edit', label: 'Edit' },
];

/**
 * FilterBar — discipline filter for the work section.
 * Keyboard navigable, ARIA-compliant.
 */
export function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div
      className="filter-bar"
      role="tablist"
      aria-label="Filter projects by discipline"
    >
      {filters.map((f) => (
        <button
          key={f.value}
          role="tab"
          aria-selected={active === f.value}
          className={`filter-bar__btn ${active === f.value ? 'filter-bar__btn--active' : ''}`}
          onClick={() => onChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
