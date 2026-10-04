'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { BrowserFrame } from '@/components/ui/BrowserFrame';
import { ease } from '@/lib/motionConfig';
import type { ProjectBuiltItem } from '../../../content/projects';

export interface CaseBuiltItemProps {
  item: ProjectBuiltItem;
  liveUrl: string;
}

export function CaseBuiltItem({ item, liveUrl }: CaseBuiltItemProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className="case-built-item"
      initial={prefersReduced ? false : { opacity: 0, y: 16 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease }}
    >
      <h3 className="case-built-item__heading">{item.heading}</h3>
      <p className="case-built-item__body">{item.body}</p>

      {item.image && (
        <figure className="case-built-item__media">
          <BrowserFrame
            src={item.image}
            alt={item.imageAlt || item.heading}
            url={liveUrl}
            expandable={item.isFullScroll}
          />
          {item.caption && (
            <figcaption className="case-built-item__caption">
              {item.caption}
            </figcaption>
          )}
        </figure>
      )}
    </motion.div>
  );
}
