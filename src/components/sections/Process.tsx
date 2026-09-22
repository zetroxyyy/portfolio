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
    ariaLabel: 'A scoping conversation between client and developer ending in an agreed document.',
    anim: ScopeAnim,
  },
  {
    num: '02',
    duration: 'Weeks 2–N',
    name: 'Build',
    deliverable: 'a live preview link, from the first week.',
    desc: 'Public interface and back office built together on a live preview URL you can test.',
    ariaLabel: 'Code being written line by line in an editor with line numbers and a typing caret.',
    anim: BuildAnim,
  },
  {
    num: '03',
    duration: 'Launch week',
    name: 'Ship',
    deliverable: 'your domain, live, with SSL and search metadata.',
    desc: 'Database migration, custom domain setup, and mobile QA before opening publicly.',
    ariaLabel: 'Address bar switching from preview domain to real domain, followed by checks passing.',
    anim: ShipAnim,
  },
  {
    num: '04',
    duration: 'Handover',
    name: 'Yours',
    deliverable: 'admin credentials, a walkthrough, and two weeks of fixes.',
    desc: 'Full admin access and two weeks of warranty, with zero ongoing retainer required.',
    ariaLabel: 'Admin access, documentation, and walkthrough cards handed across to client with checks.',
    anim: YoursAnim,
  },
];

function ProcessCell({
  stage,
  index,
  shouldReduceMotion,
}: {
  stage: ProcessStage;
  index: number;
  shouldReduceMotion: boolean | null;
}) {
  const cellRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(cellRef, { margin: '-60px' });
  const Anim = stage.anim;

  return (
    <motion.div
      ref={cellRef}
      className="process-cell"
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }
      }
    >
      {/* 1. Animation stage */}
      <div
        className="process-cell__stage"
        role="img"
        aria-label={stage.ariaLabel}
      >
        <Anim inView={isInView} delay={index * 0.5} />
      </div>

      {/* 2. Text Content */}
      <div className="process-cell__content">
        {/* Meta line: number and duration together in mono, e.g. 01 · WEEK 1 */}
        <span className="process-cell__meta">
          {stage.num} · {stage.duration.toUpperCase()}
        </span>

        {/* Stage name */}
        <h3 className="process-cell__name">{stage.name}</h3>

        {/* "You get:" deliverable block */}
        <div className="process-cell__deliverable">
          <span className="process-cell__deliverable-label">You get:</span>
          <p className="process-cell__deliverable-text">{stage.deliverable}</p>
        </div>

        {/* Description */}
        <p className="process-cell__desc">{stage.desc}</p>
      </div>
    </motion.div>
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

        {/* 2 × 2 Process Grid */}
        <div className="process-grid">
          {stages.map((stage, i) => (
            <ProcessCell
              key={stage.name}
              stage={stage}
              index={i}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
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
