'use client';

import { motion } from 'framer-motion';
import { duration, ease } from '@/lib/motionConfig';

const steps = [
  {
    num: '01',
    name: 'Scope',
    desc: 'Clarify data models, user flows, and the exact admin tooling required to run the business.',
  },
  {
    num: '02',
    name: 'Build',
    desc: 'Develop the public customer interface and the private back office concurrently on Next.js and PostgreSQL.',
  },
  {
    num: '03',
    name: 'Ship',
    desc: 'Deploy to production with custom domains, DNS, SSL, metadata, and zero-downtime database migrations.',
  },
  {
    num: '04',
    name: 'Maintain',
    desc: 'Client receives full admin credentials to manage content, prices, and bookings independently.',
  },
];

export function Process() {
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

        <div className="process__steps">
          {steps.map((step, i) => (
            <motion.div
              key={step.name}
              className="process__step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: duration.slow, ease, delay: i * 0.08 }}
            >
              <div className="process__step-header">
                <span className="process__step-num">{step.num}</span>
                {i < steps.length - 1 && <span className="process__step-arrow" aria-hidden="true">→</span>}
              </div>
              <h3 className="process__step-name">{step.name}</h3>
              <p className="process__step-desc">{step.desc}</p>
            </motion.div>
          ))}
        </div>

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
