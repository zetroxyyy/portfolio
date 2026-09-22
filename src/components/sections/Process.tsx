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
    desc: 'A conversation about what the system has to do, written down and agreed before any code exists.',
    ariaLabel: 'A scoping conversation between client and developer ending in an agreed scope, timeline, and price.',
    anim: ScopeAnim,
  },
  {
    num: '02',
    duration: 'Weeks 2–N',
    name: 'Build',
    deliverable: 'a preview link you can open from the first week.',
    desc: 'Front-end and back-end written together, on a link you can check any time — not a reveal at the end.',
    ariaLabel: 'Code being typed in an editor with a live preview link in the header.',
    anim: BuildAnim,
  },
  {
    num: '03',
    duration: 'Launch week',
    name: 'Ship',
    deliverable: 'your domain, live, with SSL and search metadata.',
    desc: 'The preview link becomes your own domain, with the certificate, search metadata and mobile checks done before it opens.',
    ariaLabel: 'Address bar switching from preview domain to real domain, followed by verification checks passing.',
    anim: ShipAnim,
  },
  {
    num: '04',
    duration: 'Handover',
    name: 'Yours',
    deliverable: 'admin access, documentation, and a walkthrough.',
    desc: 'Everything handed across, with the docs to use it. Two weeks of fixes included, then it runs without me.',
    ariaLabel: 'Admin access, documentation, and walkthrough handed across to client with progress tracking.',
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
            The same four steps whether it&apos;s a website, a mobile app, or the system running behind both.
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
            Everything I build ships with the tools to run it, so your team can change what needs changing without calling a developer.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
