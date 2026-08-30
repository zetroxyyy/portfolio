'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '../../../content/projects';
import { BrowserFrame } from '@/components/ui/BrowserFrame';
import { ease, duration } from '@/lib/motionConfig';
import React, { CSSProperties } from 'react';

interface ProjectBandProps {
  project: Project;
  index: number;
}

export function ProjectBand({ project, index }: ProjectBandProps) {
  const isEven = index % 2 === 1;
  const indexFormatted = String(index + 1).padStart(2, '0');

  const customStyle: CSSProperties = {
    '--project-accent': project.accent,
  } as CSSProperties;

  return (
    <motion.article
      className={`project-band ${isEven ? 'project-band--reverse' : ''}`}
      style={customStyle}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: duration.slow, ease }}
      aria-labelledby={`project-${project.slug}-title`}
    >
      <div className="project-band__grid">
        {/* Text and metadata column */}
        <div className="project-band__info">
          <div className="project-band__top">
            <span className="project-band__index" aria-hidden="true">
              {indexFormatted}
            </span>
            <div className="project-band__heading-block">
              <h3 id={`project-${project.slug}-title`} className="project-band__title">
                {project.title}
              </h3>
              <p className="project-band__client">{project.client}</p>
            </div>
          </div>

          <p className="project-band__problem">{project.summary}</p>

          {/* Stack chips */}
          <div className="project-band__stack" aria-label="Technologies used">
            {project.stack.slice(0, 6).map((tech) => (
              <span key={tech} className="stack-chip">
                {tech}
              </span>
            ))}
            {project.stack.length > 6 && (
              <span className="stack-chip">+{project.stack.length - 6} more</span>
            )}
          </div>

          {/* Live status readout */}
          <div className="project-band__status">
            <span className="project-band__status-dot" aria-hidden="true" />
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-band__btn-live"
              aria-label={`Visit live site for ${project.title} at ${project.status}`}
            >
              <span>{project.status}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Actions */}
          <div className="project-band__actions">
            <Link
              href={`/work/${project.slug}`}
              className="project-band__btn-study"
              aria-label={`Read case study for ${project.title}`}
            >
              <span>Read the case study</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Browser visual column */}
        <motion.div
          className="project-band__visual"
          initial={{ scale: 1.02 }}
          whileInView={{ scale: 1.0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slow, ease }}
        >
          <Link
            href={`/work/${project.slug}`}
            tabIndex={-1}
            aria-hidden="true"
            className="block"
          >
            <BrowserFrame
              src={project.cover}
              alt={project.coverAlt}
              url={project.liveUrl}
              accent={project.accent}
              priority={index < 2}
            />
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}
