'use client';

import { motion } from 'framer-motion';
import type { SideProject } from '../../../content/sideProjects';
import { ease, duration } from '@/lib/motionConfig';

interface SideProjectCardProps {
  project: SideProject;
  index: number;
}

export function SideProjectCard({ project, index }: SideProjectCardProps) {
  return (
    <motion.article
      className="side-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: duration.base, ease, delay: index * 0.07 }}
    >
      <div className="side-card__top">
        <span className="side-card__platform">{project.platform}</span>
        <span className="side-card__year">{project.year}</span>
      </div>

      <h3 className="side-card__title">
        {/* The whole card is the target; the link carries the accessible name. */}
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="side-card__link"
        >
          <span className="side-card__link-overlay" aria-hidden="true" />
          {project.title}
        </a>
      </h3>

      <p className="side-card__summary">{project.summary}</p>
      <p className="side-card__detail">{project.detail}</p>

      <div className="side-card__stack" aria-label="Built with">
        {project.stack.slice(0, 5).map((tech) => (
          <span key={tech} className="stack-chip stack-chip--sm">
            {tech}
          </span>
        ))}
        {project.stack.length > 5 && (
          <span className="stack-chip stack-chip--sm">+{project.stack.length - 5}</span>
        )}
      </div>

      <div className="side-card__foot">
        {/* No live dot here — these are not deployed, and borrowing the live
            treatment from the project bands would imply a URL that does not exist. */}
        <p className="side-card__runs">{project.runsOn}</p>
        <span className="side-card__repo">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
          </svg>
          <span>Source</span>
          <span className="arrow" aria-hidden="true">↗</span>
        </span>
      </div>
    </motion.article>
  );
}
