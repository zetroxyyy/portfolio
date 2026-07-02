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
 * Shows cover image, title, year, disciplines.
 * Hover: subtle cover scale, color reveal (grayscale → color via CSS filter).
 *
 * Image optimisation:
 *   - quality={90} for UI screenshots so text stays crisp after compression
 *   - Featured cards use a wider `sizes` hint (dominant 8/12 col at desktop)
 *   - Standard cards use a balanced hint (4/12 – 6/12 col range)
 *   - avif/webp served by next/image (configured in next.config.ts)
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  const isPlaceholder = project.cover.startsWith('/images/projects/placeholder');

  /**
   * sizes hints for next/image:
   * featured (8/12 cols ≈ 67vw at desktop):
   *   mobile: 100vw, tablet: 100vw (full-width), desktop: 67vw
   * standard (4–6/12 cols):
   *   mobile: 100vw, tablet: 50vw, desktop: 35vw
   */
  const imgSizes = project.featured
    ? '(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 67vw'
    : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 35vw';

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
            <PlaceholderCover disciplines={project.disciplines} />
          ) : (
            <Image
              src={project.cover}
              alt={project.coverAlt}
              fill
              sizes={imgSizes}
              quality={90}
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
 * Dark matte surface with discipline label.
 *
 * Optional: to render year in the ghost position later, uncomment
 * the year prop and render it with .placeholder-cover__index styles.
 */
function PlaceholderCover({
  disciplines,
}: {
  disciplines: string[];
}) {
  return (
    <div className="placeholder-cover" aria-hidden="true">
      <div className="placeholder-cover__label">
        {disciplines.join(' · ')}
      </div>
      <div className="placeholder-cover__replace">[ Add cover image ]</div>
    </div>
  );
}
