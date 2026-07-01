'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '@/components/project/ProjectCard';
import { FilterBar } from '@/components/ui/FilterBar';
import { SectionMeta } from '@/components/ui/SectionMeta';
import { projects } from '../../../content/projects';
import type { Discipline } from '../../../content/projects';
import { ease, duration } from '@/lib/motionConfig';

/**
 * Work section — filterable project grid.
 * Filter tabs let visitors slice by discipline.
 * Featured projects render larger.
 */
export function Work() {
  const [filter, setFilter] = useState<Discipline | 'all'>('all');

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
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: duration.base, ease }}
                role="listitem"
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
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
