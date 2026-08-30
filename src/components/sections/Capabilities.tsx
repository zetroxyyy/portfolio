'use client';

import { motion } from 'framer-motion';
import { duration, ease } from '@/lib/motionConfig';

const capabilities = [
  {
    number: '01',
    title: 'Product & Front-End',
    items: [
      'Next.js App Router & React 19',
      'TypeScript strict typing',
      'Tailwind CSS v4 design systems',
      'Responsive design down to 375px',
      'WCAG 2.1 AA accessibility',
      'Bilingual and internationalization (i18n)',
    ],
  },
  {
    number: '02',
    title: 'Back-End & Data',
    items: [
      'PostgreSQL (Neon / Supabase)',
      'Prisma ORM & raw SQL models',
      'Server Actions & REST route handlers',
      'JWT & NextAuth session auth',
      'bcrypt hashing & brute-force lockouts',
      'Role-gated administrative portals',
    ],
  },
  {
    number: '03',
    title: 'Systems & Operations',
    items: [
      'Real-time booking & capacity engines',
      'Custom single-tenant CMS platforms',
      'Bulk inventory & pricing matrices',
      'Server-side PDF manifest generation',
      'Transactional email & notification hooks',
      'Audit logging & Vercel Blob storage',
    ],
  },
  {
    number: '04',
    title: 'Ship & Operate',
    items: [
      'Vercel production deployments',
      'Custom domain routing & DNS config',
      'Search engine optimization & metadata',
      'Sub-second Core Web Vitals performance',
      'Zero layout shift (CLS) architectures',
      'Post-launch SLA & code maintenance',
    ],
  },
];

export function Capabilities() {
  return (
    <section className="capabilities" id="capabilities" aria-labelledby="capabilities-heading">
      <div className="capabilities__inner">
        <header className="capabilities__header">
          <span className="mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--mist)', letterSpacing: 'var(--tracking-wider)' }}>
            CAPABILITIES
          </span>
          <h2 id="capabilities-heading" style={{ fontSize: 'clamp(var(--text-2xl), 4vw, var(--text-3xl))', color: 'var(--ink)' }}>
            What I build and ship.
          </h2>
          <p className="serif-italic" style={{ fontSize: '1.25rem', color: 'var(--graphite)' }}>
            Full-stack scope — from database architecture to client-operable back offices.
          </p>
        </header>

        <div className="capabilities__grid">
          {capabilities.map((group, i) => (
            <motion.div
              key={group.title}
              className="capabilities__card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: duration.slow, ease, delay: i * 0.08 }}
            >
              <span className="capabilities__card-num">{group.number}</span>
              <h3 className="capabilities__card-title">{group.title}</h3>
              <ul className="capabilities__card-list" role="list">
                {group.items.map((item) => (
                  <li key={item} className="capabilities__item">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
