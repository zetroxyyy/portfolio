'use client';

import React, { useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { duration, ease } from '@/lib/motionConfig';
import { ScopeAnim } from '@/components/ui/process-anim/ScopeAnim';
import { BuildAnim } from '@/components/ui/process-anim/BuildAnim';
import { ShipAnim } from '@/components/ui/process-anim/ShipAnim';
import { YoursAnim } from '@/components/ui/process-anim/YoursAnim';

interface ProcessStage {
  num: string;
  duration: string;
  name: string;
  deliverable: string;
  desc: string;
  ariaLabel: string;
  anim: React.ComponentType<{ inView: boolean; delay?: number }>;
}

const stages: ProcessStage[] = [
  {
    num: '01',
    duration: 'Week 1',
    name: 'Scope',
    deliverable: 'a written scope, a fixed timeline, and a price.',
    desc: 'A conversation about workflows and data models, agreed in writing before work begins.',
    ariaLabel: 'A conversation condensing into a written scope, timeline and price, each marked complete.',
    anim: ScopeAnim,
  },
  {
    num: '02',
    duration: 'Weeks 2–N',
    name: 'Build',
    deliverable: 'a live preview link, from the first week.',
    desc: 'Public interface and back office built together on a live preview URL you can test.',
    ariaLabel: 'Public storefront and admin dashboard being built concurrently on a live preview link with real-time feedback adaptation.',
    anim: BuildAnim,
  },
  {
    num: '03',
    duration: 'Launch week',
    name: 'Ship',
    deliverable: 'your domain, live, with SSL and search metadata.',
    desc: 'Database migration, custom domain setup, and mobile QA before opening publicly.',
    ariaLabel: 'Build deployed from local repo to production server, secured with domain and SSL, verified on mobile phone.',
    anim: ShipAnim,
  },
  {
    num: '04',
    duration: 'Handover',
    name: 'Yours',
    deliverable: 'admin credentials, a walkthrough, and two weeks of fixes.',
    desc: 'Full admin access and two weeks of warranty, with zero ongoing retainer required.',
    ariaLabel: 'Administrative access transferred from developer to client with full console control and a two-week warranty period.',
    anim: YoursAnim,
  },
];

function ProcessRow({
  stage,
  index,
  shouldReduceMotion,
}: {
  stage: ProcessStage;
  index: number;
  shouldReduceMotion: boolean | null;
}) {
  const rowRef = useRef<HTMLLIElement | null>(null);
  const isInView = useInView(rowRef, { margin: '-60px' });
  const Anim = stage.anim;

  return (
    <motion.li
      ref={rowRef}
      className="process-row"
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }
      }
    >
      {/* Two-column layout (Text Left, Animation Right) */}
      <div className="process-row__layout">
        {/* Text column (~42%) */}
        <div className="process-row__text">
          {/* Numbered Stage Marker on the vertical spine, aligned with badge line */}
          <div className="process-row__marker" aria-hidden="true">
            <span className="process-row__marker-num">{stage.num}</span>
          </div>

          <span className="process-row__badge">{stage.duration}</span>
          <h3 className="process-row__name">{stage.name}</h3>

          <div className="process-row__deliverable">
            <span className="process-row__deliverable-label">You get:</span>
            <p className="process-row__deliverable-text">{stage.deliverable}</p>
          </div>

          <p className="process-row__desc">{stage.desc}</p>
        </div>

        {/* Animation stage column (~58%) */}
        <div
          className="process-row__stage"
          role="img"
          aria-label={stage.ariaLabel}
        >
          <Anim inView={isInView} delay={index * 0.4} />
        </div>
      </div>
    </motion.li>
  );
}

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

        {/* Vertical Stepper Timeline */}
        <div className="process-stepper-wrap">
          {/* Static background spine */}
          <div className="process-stepper__spine-bg" aria-hidden="true" />

          {/* Animated fill spine drawn downward */}
          <motion.div
            className="process-stepper__spine-fill"
            initial={shouldReduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top' }}
            aria-hidden="true"
          />

          <ol className="process-stepper">
            {stages.map((stage, i) => (
              <ProcessRow
                key={stage.name}
                stage={stage}
                index={i}
                shouldReduceMotion={shouldReduceMotion}
              />
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
