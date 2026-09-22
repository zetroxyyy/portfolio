'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { duration, ease } from '@/lib/motionConfig';
import React, { CSSProperties } from 'react';

interface CapabilityItem {
  num: string;
  slug: string;
  title: string;
  desc: string;
  proof: string;
  link: string;
  linkLabel: string;
  accent: string;
}

const capabilityRows: CapabilityItem[] = [
  {
    num: '01',
    slug: 'dream-adventure',
    title: 'Booking and availability systems',
    desc: 'Reservation flows where a seat cannot be sold twice, because availability is read from the database at the moment of booking rather than cached.',
    proof: 'Dream Adventure holds 21 rafting seats across three daily departures, in Japanese and English.',
    link: '/work/dream-adventure',
    linkLabel: 'Dream Adventure case study',
    accent: '#0D9488',
  },
  {
    num: '02',
    slug: 'nischal-legal',
    title: 'Admin panels the client actually runs',
    desc: 'Not a generic CMS bolted on — screens built for the specific things this business changes, in the language its staff work in.',
    proof: 'A legal practice in Chitwan edits its own services, photography and contact details in Nepali.',
    link: '/work/nischal-legal',
    linkLabel: 'Nischal Legal Service case study',
    accent: '#B3222C',
  },
  {
    num: '03',
    slug: 'didee',
    title: 'Catalogues and storefronts',
    desc: 'Product, category and pricing management built for bulk editing, because catalogues go stale when every change takes six clicks.',
    proof: 'Didee’s back office updates prices across the whole catalogue in a single pass.',
    link: '/work/didee',
    linkLabel: 'Didee case study',
    accent: '#1A1A18',
  },
  {
    num: '04',
    slug: 'all-shipped',
    title: 'Shipped and maintained',
    desc: 'Custom domain, SSL, search metadata, Core Web Vitals, and the deployment pipeline — set up once and handed over with the credentials.',
    proof: 'Six products live on their own domains, including three client-owned.',
    link: '/#work',
    linkLabel: 'View shipped projects',
    accent: '#E11D2F',
  },
];

export function Capabilities() {
  return (
    <section className="capabilities" id="capabilities" aria-labelledby="capabilities-heading">
      <div className="capabilities__inner">
        <header className="capabilities__header">
          <span className="section-eyebrow">
            CAPABILITIES
          </span>
          <h2 id="capabilities-heading" className="section-heading section-heading--major">
            What I build <span className="serif-italic">and what it costs you to run.</span>
          </h2>
          <p className="section-subhead">
            Full-stack scope — from database architecture to client-operable back offices.
          </p>
        </header>

        <div className="capabilities__list" role="list">
          {capabilityRows.map((item, i) => (
            <motion.div
              key={item.num}
              className="capability-row"
              data-slug={item.slug}
              style={{ '--row-accent': item.accent } as CSSProperties}
              role="listitem"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: duration.slow, ease, delay: i * 0.08 }}
            >
              <div className="capability-row__left">
                <span className="capability-row__num" aria-hidden="true">
                  {item.num}
                </span>
                <h3 className="capability-row__title">{item.title}</h3>
              </div>
              <div className="capability-row__right">
                <p className="capability-row__desc">{item.desc}</p>
                <Link
                  href={item.link}
                  className="capability-row__proof"
                  aria-label={`${item.proof} (${item.linkLabel})`}
                >
                  <span className="capability-row__proof-text">
                    {item.proof}
                  </span>
                  <span className="capability-row__proof-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
