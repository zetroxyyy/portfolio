'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { getImageSize } from '../../../content/imageDimensions';
import { ease } from '@/lib/motionConfig';

export interface ProjectRowProps {
  slug: string;
  title: string;
  year: string;
  stackLine: string;
  shortSummary: string;
  liveUrl: string;
  cover: string;
  coverAlt: string;
  priority?: boolean;
}

export function ProjectRow({
  slug,
  title,
  year,
  stackLine,
  shortSummary,
  liveUrl,
  cover,
  coverAlt,
  priority = false,
}: ProjectRowProps) {
  const prefersReduced = useReducedMotion();
  const dimensions = getImageSize(cover);

  return (
    <motion.article
      className="project-row"
      initial={prefersReduced ? false : { opacity: 0, y: 16 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease }}
    >
      <Link
        href={`/work/${slug}`}
        className="project-row__img-link"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={cover}
          alt={coverAlt}
          width={dimensions.width}
          height={dimensions.height}
          priority={priority}
          className="project-row__img"
        />
      </Link>

      <div className="project-row__info">
        <div className="project-row__left">
          <h2 className="project-row__title">
            <Link
              href={`/work/${slug}`}
              className="project-row__title-link"
            >
              {title}
            </Link>
          </h2>
          <p className="project-row__summary">{shortSummary}</p>
        </div>

        <div className="project-row__right">
          <p className="project-row__meta">
            {year} · {stackLine}
          </p>
          <p className="project-row__links">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-row__link"
            >
              Live site ↗
            </a>
            {' · '}
            <Link href={`/work/${slug}`} className="project-row__link">
              Case study →
            </Link>
          </p>
        </div>
      </div>
    </motion.article>
  );
}
