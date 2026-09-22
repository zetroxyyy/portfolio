'use client';

import React from 'react';
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
    desc: 'A conversation about workflows and data models, agreed in writing before work begins.',
  },
  {
    duration: 'Weeks 2–N',
    name: 'Build',
    deliverable: 'a live preview link, from the first week.',
    desc: 'Public interface and back office built together on a live preview URL you can test.',
  },
  {
    duration: 'Launch week',
    name: 'Ship',
    deliverable: 'your domain, live, with SSL and search metadata.',
    desc: 'Database migration, custom domain setup, and mobile QA before opening publicly.',
  },
  {
    duration: 'Handover',
    name: 'Yours',
    deliverable: 'admin credentials, a walkthrough, and two weeks of fixes.',
    desc: 'Full admin access and two weeks of warranty, with zero ongoing retainer required.',
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
          {/* Static background rule */}
          <div className="timeline__track-bg" aria-hidden="true" />

          {/* Animated fill rule drawn over static rule */}
          <motion.div
            className="timeline__track-fill"
            initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left center' }}
            aria-hidden="true"
          />

          <ol className="timeline__list">
            {stages.map((stage, i) => (
              <motion.li
                key={stage.name}
                className="timeline-stage"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.12 }
                }
              >
                <div className="timeline-stage__marker-wrap">
                  <span className="timeline-stage__marker" aria-hidden="true" />
                </div>

                <span className="timeline-stage__badge">{stage.duration}</span>

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
