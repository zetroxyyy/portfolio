'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project } from '../../../content/projects';
import { ease, duration } from '@/lib/motionConfig';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const disciplineLabels: Record<string, string> = {
  design: 'Design',
  build: 'Build',
  edit: 'Edit',
};

/**
 * ProjectCard — a single work item in the filterable grid.
 * Shows cover image (or placeholder), title, year, disciplines.
 * Hover: subtle cover scale, title dims.
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  const isPlaceholder = project.cover.includes('placeholder');

  return (
    <motion.article
      className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: duration.slow, ease, delay: (index % 3) * 0.08 }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="project-card__link"
        aria-label={`View ${project.title} — ${project.disciplines.map(d => disciplineLabels[d]).join(', ')}, ${project.year}`}
      >
        {/* Cover */}
        <div className="project-card__cover">
          {isPlaceholder ? (
            <PlaceholderCover
              title={project.title}
              disciplines={project.disciplines}
              index={index}
            />
          ) : (
            <Image
              src={project.cover}
              alt={project.coverAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              className="project-card__img"
              priority={index < 2}
            />
          )}
        </div>

        {/* Card info */}
        <div className="project-card__info">
          <div className="project-card__meta">
            <span className="project-card__year">{project.year}</span>
            <div
              className="project-card__disciplines"
              aria-label={`Disciplines: ${project.disciplines.map(d => disciplineLabels[d]).join(', ')}`}
            >
              {project.disciplines.map((d) => (
                <span key={d} className="discipline-tag">
                  {disciplineLabels[d]}
                </span>
              ))}
            </div>
          </div>
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__summary">{project.summary}</p>
        </div>
      </Link>
    </motion.article>
  );
}

/**
 * PlaceholderCover — shown when no real cover image is available.
 * Uses a text-based composition with the project index as a visual anchor.
 * Looks intentional, clearly a placeholder, not a broken image.
 */
function PlaceholderCover({
  title,
  disciplines,
  index,
}: {
  title: string;
  disciplines: string[];
  index: number;
}) {
  const n = String(index + 1).padStart(2, '0');
  const shortTitle = title.replace('REPLACE_ME — ', '').slice(0, 20);

  return (
    <div className="placeholder-cover" aria-hidden="true">
      <div className="placeholder-cover__index">{n}</div>
      <div className="placeholder-cover__label">
        {disciplines.join(' · ')}
      </div>
      <div className="placeholder-cover__replace">[ Add cover image ]</div>
    </div>
  );
}
