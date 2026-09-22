'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ease } from '@/lib/motionConfig';

// ─────────────────────────────────────────────────────────────────────────────
// SystemLoop — what "full-stack" actually means, as a diagram
// ─────────────────────────────────────────────────────────────────────────────
// Most portfolios say "full-stack" and show a website. This traces one real
// booking through all four surfaces it touches, because the gap between "a site
// that looks nice" and "a system that runs a business" is the entire pitch and
// it does not survive being written as a paragraph.
//
// The sequence advances on a timer once scrolled into view, and stops when it
// leaves. Under prefers-reduced-motion every stage renders complete and static
// — the diagram still teaches, it just does not move.
// ─────────────────────────────────────────────────────────────────────────────

const STAGES = [
  {
    key: 'customer',
    label: 'Customer',
    surface: 'Public site',
    line: 'Someone picks a date and pays on a phone, in their own language.',
  },
  {
    key: 'database',
    label: 'Database',
    surface: 'Postgres',
    line: 'The seat is held the moment it is taken, so it cannot be sold twice.',
  },
  {
    key: 'owner',
    label: 'Owner',
    surface: 'Admin panel',
    line: 'The booking appears in the back office. No email, no spreadsheet.',
  },
  {
    key: 'operations',
    label: 'Operations',
    surface: 'Daily manifest',
    line: "The morning's list prints itself, with names, sizes and times.",
  },
] as const;

const STAGE_MS = 2600;

export function SystemLoop() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: '-20% 0px -20% 0px' });
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % STAGES.length),
      STAGE_MS
    );
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  // With reduced motion every stage reads as "on" — nothing is hidden behind
  // an animation the visitor has asked not to see.
  const isOn = (i: number) => reduced || i <= active;
  const isCurrent = (i: number) => !reduced && i === active;

  return (
    <section className="loop" id="how-it-works" aria-labelledby="loop-heading">
      <div className="loop__inner" ref={ref}>
        <header className="loop__header">
          <span className="loop__eyebrow">WHAT I ACTUALLY BUILD</span>
          <h2 id="loop-heading" className="loop__title">
            A website shows information.{' '}
            <span className="serif-italic">A system moves it.</span>
          </h2>
          <p className="loop__blurb">
            Here is one booking on a real client site, and every surface it touches between a
            customer&apos;s phone and a guide standing at the river at 8am. Building only the first
            box is what most people mean by &ldquo;a website&rdquo;.
          </p>
        </header>

        {/* Screen-reader path: the same four steps as an ordered list, since the
            visual diagram carries meaning that colour and position alone cannot. */}
        <ol className="sr-only">
          {STAGES.map((s) => (
            <li key={s.key}>
              {s.label} — {s.surface}. {s.line}
            </li>
          ))}
        </ol>

        <div className="loop__track" aria-hidden="true">
          {STAGES.map((stage, i) => (
            <div className="loop__node-wrap" key={stage.key}>
              <motion.div
                className={`loop__node ${isOn(i) ? 'is-on' : ''} ${isCurrent(i) ? 'is-current' : ''}`}
                animate={
                  reduced
                    ? undefined
                    : { scale: isCurrent(i) ? 1.03 : 1, opacity: isOn(i) ? 1 : 0.42 }
                }
                transition={{ duration: 0.5, ease }}
              >
                <div className="loop__node-top">
                  <span className="loop__node-index">0{i + 1}</span>
                  <span className="loop__node-surface">{stage.surface}</span>
                </div>

                <StageGlyph stage={stage.key} on={isOn(i)} current={isCurrent(i)} />

                <p className="loop__node-label">{stage.label}</p>
                <p className="loop__node-line">{stage.line}</p>
              </motion.div>

              {i < STAGES.length - 1 && (
                <div className="loop__connector">
                  <span className="loop__connector-rail" />
                  <motion.span
                    className="loop__connector-fill"
                    animate={{ scaleX: isOn(i + 1) ? 1 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.55, ease }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="loop__foot">
          Every project in the work above is built this way — the public side and the back office
          together, by one person, so they cannot disagree with each other.
        </p>
      </div>
    </section>
  );
}

/* ── Glyphs ──────────────────────────────────────────────────────────────────
   Drawn rather than illustrated: four small abstractions of the surface each
   stage represents. Inline SVG so they inherit currentColor and stay crisp,
   and so there is no image request for any of them. */

function StageGlyph({
  stage,
  on,
  current,
}: {
  stage: (typeof STAGES)[number]['key'];
  on: boolean;
  current: boolean;
}) {
  const cls = `loop__glyph ${on ? 'is-on' : ''} ${current ? 'is-current' : ''}`;

  if (stage === 'customer') {
    return (
      <svg className={cls} viewBox="0 0 120 72" fill="none" aria-hidden="true">
        <rect x="46" y="6" width="28" height="60" rx="5" className="g-stroke" />
        <rect x="52" y="16" width="16" height="3" rx="1.5" className="g-fill-soft" />
        <rect x="52" y="24" width="16" height="12" rx="2" className="g-fill-accent" />
        <rect x="52" y="41" width="16" height="3" rx="1.5" className="g-fill-soft" />
        <rect x="52" y="48" width="10" height="3" rx="1.5" className="g-fill-soft" />
        <circle cx="60" cy="60" r="2.5" className="g-fill-soft" />
      </svg>
    );
  }

  if (stage === 'database') {
    return (
      <svg className={cls} viewBox="0 0 120 72" fill="none" aria-hidden="true">
        <ellipse cx="60" cy="18" rx="24" ry="8" className="g-stroke" />
        <path d="M36 18v18c0 4.4 10.7 8 24 8s24-3.6 24-8V18" className="g-stroke" />
        <path d="M36 36v18c0 4.4 10.7 8 24 8s24-3.6 24-8V36" className="g-stroke" />
        <circle cx="60" cy="36" r="3" className="g-fill-accent" />
      </svg>
    );
  }

  if (stage === 'owner') {
    return (
      <svg className={cls} viewBox="0 0 120 72" fill="none" aria-hidden="true">
        <rect x="18" y="10" width="84" height="52" rx="5" className="g-stroke" />
        <path d="M18 23h84" className="g-stroke" />
        <rect x="26" y="31" width="22" height="22" rx="3" className="g-fill-accent" />
        <rect x="54" y="31" width="40" height="4" rx="2" className="g-fill-soft" />
        <rect x="54" y="40" width="30" height="4" rx="2" className="g-fill-soft" />
        <rect x="54" y="49" width="36" height="4" rx="2" className="g-fill-soft" />
      </svg>
    );
  }

  return (
    <svg className={cls} viewBox="0 0 120 72" fill="none" aria-hidden="true">
      <rect x="34" y="6" width="52" height="60" rx="4" className="g-stroke" />
      <path d="M42 20h36M42 30h36M42 40h24" className="g-stroke-thin" />
      <rect x="42" y="49" width="20" height="9" rx="2" className="g-fill-accent" />
    </svg>
  );
}
