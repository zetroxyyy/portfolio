'use client';

import React, { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { duration, ease } from '@/lib/motionConfig';

interface ProcessStage {
  duration: string;
  name: string;
  deliverable: string;
  desc: string;
}

const stages: ProcessStage[] = [
  {
    duration: 'Week 1',
    name: 'Scope',
    deliverable: 'a written scope, a fixed timeline, and a price.',
    desc: 'A conversation about what the business does and what the system has to handle. Nothing starts until you have that in writing and agree to it.',
  },
  {
    duration: 'Weeks 2–N',
    name: 'Build',
    deliverable: 'a live preview link, from the first week.',
    desc: 'The public side and the back office are built together. You watch it grow on a real URL and comment as it goes, rather than waiting for a reveal.',
  },
  {
    duration: 'Launch week',
    name: 'Ship',
    deliverable: 'your domain, live, with SSL and search metadata.',
    desc: 'The database moves across and everything is checked on a phone before anything goes public.',
  },
  {
    duration: 'Handover',
    name: 'Yours',
    deliverable: 'admin credentials, a walkthrough, and two weeks of fixes.',
    desc: 'After that the system is yours to run. No retainer required, no licence that expires.',
  },
];

export function Process() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="process" id="process" aria-labelledby="process-heading">
      <div className="process__inner">
        <header className="process__header">
          <h2 id="process-heading" className="section-heading section-heading--major">
            From first message <span className="serif-italic">to running it yourself.</span>
          </h2>
          <p className="section-subhead">
            Every build includes the admin tooling needed to operate without ongoing developer friction.
          </p>
        </header>

        {/* Timeline sequence */}
        <div className="timeline">
          {/* Horizontal connecting track on desktop */}
          <motion.div
            className="timeline__track"
            initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left center' }}
            aria-hidden="true"
          />

          <ol className="timeline__list">
            {stages.map((stage, i) => (
              <motion.li
                key={stage.name}
                className="timeline-stage"
                style={{ '--stage-accent': `var(--stage-${i + 1})` } as CSSProperties}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.12 + i * 0.12 }
                }
              >
                <div className="timeline-stage__top">
                  <span className="timeline-stage__marker" aria-hidden="true" />
                  <span className="timeline-stage__badge">{stage.duration}</span>
                </div>

                <h3 className="timeline-stage__name">{stage.name}</h3>

                <div className="timeline-stage__deliverable">
                  <span className="timeline-stage__deliverable-label">You get:</span>
                  <p className="timeline-stage__deliverable-text">{stage.deliverable}</p>
                </div>

                <p className="timeline-stage__desc">{stage.desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Statement callout */}
        <motion.div
          className="statement-wrap"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: duration.slow, ease, delay: 0.2 }}
        >
          <blockquote className="statement">
            Most agencies deliver a static brochure.
          </blockquote>
          <p className="statement__sub">
            Every system here includes a custom admin back office so non-technical staff can update prices, dates, media, and copy autonomously.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
