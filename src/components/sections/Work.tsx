'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '@/components/project/ProjectCard';
import { FilterBar } from '@/components/ui/FilterBar';
import { SectionMeta } from '@/components/ui/SectionMeta';
import { projects, Project } from '../../../content/projects';
import type { Discipline } from '../../../content/projects';
import { ease, duration } from '@/lib/motionConfig';

/**
 * Work section — filterable project grid.
 * Filter tabs let visitors slice by discipline.
 * Featured projects take 8/12 cols; the next card fills the remaining 4.
 * Standard cards take 6/12 cols (two per row).
 * Below 768px, all cards go full width.
 * Below 1024px, featured cards go full width, non-featured take 6 cols.
 */
export function Work() {
  const [filter, setFilter] = useState<Discipline | 'all'>('all');
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const tabletMq = window.matchMedia('(max-width: 1024px)');
    const mobileMq = window.matchMedia('(max-width: 768px)');

    const onTablet = (e: MediaQueryListEvent | MediaQueryList) => setIsTablet(e.matches);
    const onMobile = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);

    onTablet(tabletMq);
    onMobile(mobileMq);

    tabletMq.addEventListener('change', onTablet);
    mobileMq.addEventListener('change', onMobile);

    return () => {
      tabletMq.removeEventListener('change', onTablet);
      mobileMq.removeEventListener('change', onMobile);
    };
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter((p) => p.disciplines.includes(filter));
  }, [filter]);

  return (
    <section className="work-section" id="work" aria-label="Selected work">
      <div className="work-section__inner">
        {/* Section header */}
        <div className="work-section__header">
          <SectionMeta index={1} label="SELECTED WORK" />
          <motion.h2
            className="work-section__heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: duration.slow, ease }}
          >
            Work
          </motion.h2>
          <FilterBar active={filter} onChange={setFilter} />
        </div>

        {/* Project grid */}
        <div className="work-grid" role="list" aria-label={`Projects filtered by: ${filter}`}>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const span = getGridSpan(filtered, i, { isTablet, isMobile });
              return (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: duration.base, ease }}
                  role="listitem"
                  style={{ gridColumn: span }}
                >
                  <ProjectCard project={project} index={i} />
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.p
              className="work-grid__empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: duration.base, ease }}
            >
              No projects in this discipline yet.
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}

interface Breakpoints {
  isTablet: boolean;
  isMobile: boolean;
}

/**
 * Compute the grid-column span for a card, responsive-aware.
 *
 * Desktop (>1024px):
 *   - Featured → span 8
 *   - Card right after featured → span 4
 *   - All others → span 6
 *
 * Tablet (≤1024px):
 *   - Featured → 1 / -1 (full width)
 *   - All others → span 6
 *
 * Mobile (≤768px):
 *   - All → 1 / -1
 */
function getGridSpan(
  items: Project[],
  index: number,
  { isTablet, isMobile }: Breakpoints
): string {
  if (isMobile) return '1 / -1';

  const item = items[index];

  if (isTablet) {
    if (item.featured) return '1 / -1';
    return 'span 6';
  }

  // Desktop
  if (item.featured) return 'span 8';
  const prev = index > 0 ? items[index - 1] : null;
  if (prev?.featured) return 'span 4';
  return 'span 6';
}
