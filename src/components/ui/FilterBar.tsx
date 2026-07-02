'use client';

import { projects } from '../../../content/projects';
import type { Discipline } from '../../../content/projects';
import { ScrambleHover } from '@/components/ui/ScrambleText';

interface FilterBarProps {
  active: Discipline | 'all';
  onChange: (filter: Discipline | 'all') => void;
}

/**
 * FilterBar — discipline filter for the work section.
 *
 * The available filter chips are derived from the disciplines that actually
 * appear in the project data — so only disciplines with real work are shown.
 * Order is fixed (design → build → edit) so the chip order is stable and
 * predictable regardless of which projects are present.
 *
 * When an 'edit' project is added to content/projects.ts, the Edit chip
 * appears automatically with no code change needed here.
 *
 * Keyboard navigable, ARIA-compliant.
 * Filter labels use a quick hover-scramble (250ms) via ScrambleHover.
 */

/** Canonical order for discipline chips — determines display order */
const DISCIPLINE_ORDER: Discipline[] = ['design', 'build', 'edit'];

const DISCIPLINE_LABELS: Record<Discipline, string> = {
  design: 'Design',
  build: 'Build',
  edit: 'Edit',
};

/**
 * Derive the set of disciplines that actually have at least one project.
 * Maintains canonical order (design → build → edit).
 */
function getAvailableDisciplines(): Discipline[] {
  const used = new Set<Discipline>();
  for (const project of projects) {
    for (const d of project.disciplines) {
      used.add(d);
    }
  }
  return DISCIPLINE_ORDER.filter((d) => used.has(d));
}

export function FilterBar({ active, onChange }: FilterBarProps) {
  const availableDisciplines = getAvailableDisciplines();

  return (
    <div
      className="filter-bar"
      role="tablist"
      aria-label="Filter projects by discipline"
    >
      {/* "All work" chip is always shown */}
      <button
        role="tab"
        aria-selected={active === 'all'}
        className={`filter-bar__btn ${active === 'all' ? 'filter-bar__btn--active' : ''}`}
        onClick={() => onChange('all')}
      >
        <ScrambleHover text="All work" duration={250} />
      </button>

      {/* Only disciplines that have at least one project */}
      {availableDisciplines.map((d) => (
        <button
          key={d}
          role="tab"
          aria-selected={active === d}
          className={`filter-bar__btn ${active === d ? 'filter-bar__btn--active' : ''}`}
          onClick={() => onChange(d)}
        >
          <ScrambleHover text={DISCIPLINE_LABELS[d]} duration={250} />
        </button>
      ))}
    </div>
  );
}
