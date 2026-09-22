'use client';

import { motion } from 'framer-motion';
import { duration, ease } from '@/lib/motionConfig';

// Three shapes an engagement actually takes, with what each includes and how
// long it really runs. No figures: scope decides cost, and a price card next
// to a booking platform and a five-page site prices neither of them honestly.
const TIERS = [
  {
    name: 'Site',
    forWhom: 'A business that needs to exist online properly.',
    weeks: '1–2 weeks',
    includes: [
      'Design and build, mobile-first',
      'Up to about five pages',
      'Contact form and map',
      'Search metadata and social cards',
      'Your domain, SSL, deployed',
    ],
  },
  {
    name: 'Site + CMS',
    forWhom: 'You need to change the content yourself, without calling anyone.',
    weeks: '3–5 weeks',
    highlight: true,
    includes: [
      'Everything in Site',
      'Admin panel built for your content',
      'Image uploads and galleries',
      'Two languages if you need them',
      'Enquiries stored, not just emailed',
    ],
  },
  {
    name: 'Platform',
    forWhom: 'The site has to run the business, not describe it.',
    weeks: '6–10 weeks',
    includes: [
      'Everything in Site + CMS',
      'Bookings, orders or inventory',
      'Live availability and capacity rules',
      'Staff accounts and permissions',
      'Reporting, exports and documents',
    ],
  },
] as const;

const STEPS = [
  { num: '01', name: 'Scope', when: 'Day 1–2', desc: 'A conversation about what the business does and what the system has to handle. You get honest scope and timing back, in writing.' },
  { num: '02', name: 'Build', when: 'The bulk of it', desc: 'Public side and back office built together. You see a live preview link from the first week and comment on it as it grows.' },
  { num: '03', name: 'Ship', when: 'Launch week', desc: 'Your domain, SSL, search metadata, and the database moved across. Nothing goes live until it works on a phone.' },
  { num: '04', name: 'Hand over', when: 'Launch + 2 weeks', desc: 'Admin credentials, a walkthrough, and two weeks of fixes included. After that the system is yours to run.' },
] as const;

export function Process() {
  return (
    <section className="process" id="process" aria-labelledby="process-heading">
      <div className="process__inner">
        <header className="process__header">
          <span className="process__eyebrow">HOW IT WORKS</span>
          <h2 id="process-heading" className="process__title">
            Three shapes a project takes.
          </h2>
          <p className="process__qualifier serif-italic">
            Timelines are the real ones, not the optimistic ones.
          </p>
        </header>

        {/* Scope tiers */}
        <div className="tiers">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              className={`tier ${'highlight' in tier && tier.highlight ? 'tier--highlight' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: duration.slow, ease, delay: i * 0.07 }}
            >
              {'highlight' in tier && tier.highlight && (
                <span className="tier__flag">Most projects</span>
              )}
              <div className="tier__head">
                <h3 className="tier__name">{tier.name}</h3>
                <span className="tier__weeks">{tier.weeks}</span>
              </div>
              <p className="tier__for">{tier.forWhom}</p>
              <ul className="tier__list">
                {tier.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href="#contact" className="tier__cta">
                <span>Start here</span>
                <span className="arrow" aria-hidden="true">→</span>
              </a>
            </motion.div>
          ))}
        </div>

        {/* The four steps */}
        <div className="process__steps-wrap">
          <h3 className="process__steps-title">From first message to live</h3>
          <ol className="process__steps">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.name}
                className="process__step"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: duration.base, ease, delay: i * 0.06 }}
              >
                <div className="process__step-top">
                  <span className="process__step-num">{step.num}</span>
                  <span className="process__step-when">{step.when}</span>
                </div>
                <h4 className="process__step-name">{step.name}</h4>
                <p className="process__step-desc">{step.desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        <p className="process__statement">
          <strong>What is different:</strong> most builds hand over a site someone else has to
          maintain. Every one of these hands over the admin screens too, so the people running the
          business can change prices, dates, stock and copy without a developer in the loop.
        </p>
      </div>
    </section>
  );
}
