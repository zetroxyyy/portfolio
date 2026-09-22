'use client';

import React, { useState, useRef, CSSProperties } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserFrame } from '@/components/ui/BrowserFrame';

interface Capability {
  num: string;
  slug: string;
  title: string;
  desc: string;
  screenshot: string;
  alt: string;
  url: string;
  caption: string;
  projectName: string;
  link: string;
  accent: string;
}

const capabilities: Capability[] = [
  {
    num: '01',
    slug: 'dream-adventure-booking',
    title: 'Booking and availability',
    desc: 'Per-slot capacity and blackout dates read from the database at booking time.',
    screenshot: '/images/projects/dream-adventure/admin-availability.webp',
    alt: 'Dream Adventure booking availability calendar showing capacity per departure and date controls',
    url: 'https://dreamadventure.jp/admin/availability',
    caption: 'Availability calendar — per-slot capacity and blackout dates.',
    projectName: 'Dream Adventure',
    link: '/work/dream-adventure',
    accent: '#0D9488',
  },
  {
    num: '02',
    slug: 'nischal-legal',
    title: 'Admin panels clients run',
    desc: 'Bespoke back offices built in Nepali for non-technical office staff.',
    screenshot: '/images/projects/nischal-legal/admin-services.webp',
    alt: 'Nischal Legal Service admin panel showing service editing form in Nepali language',
    url: 'https://nischallegal.com/admin/services',
    caption: 'Service editor, in Nepali, used by the office staff.',
    projectName: 'Nischal Legal Service',
    link: '/work/nischal-legal',
    accent: '#B3222C',
  },
  {
    num: '03',
    slug: 'didee',
    title: 'Catalogue and pricing',
    desc: 'Bulk price and inventory updates across the catalogue in a single pass.',
    screenshot: '/images/projects/didee/admin-prices.webp',
    alt: 'Didee back office product catalogue price updates interface',
    url: 'https://didee.store/admin/prices',
    caption: 'Bulk price entry across the whole catalogue in one pass.',
    projectName: 'Didee',
    link: '/work/didee',
    accent: '#1A1A18',
  },
  {
    num: '04',
    slug: 'dream-adventure-manifest',
    title: 'Operations and documents',
    desc: 'Daily manifest grouping departures, river guides, and instant PDF exports.',
    screenshot: '/images/projects/dream-adventure/admin-manifest.webp',
    alt: 'Dream Adventure daily manifest interface showing departures and PDF export options',
    url: 'https://dreamadventure.jp/admin/manifest',
    caption: 'Daily manifest, grouped by departure, exports to PDF.',
    projectName: 'Dream Adventure',
    link: '/work/dream-adventure',
    accent: '#0D9488',
  },
];

export function Capabilities() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (index + 1) % capabilities.length;
      setSelectedIndex(next);
      buttonRefs.current[next]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (index - 1 + capabilities.length) % capabilities.length;
      setSelectedIndex(prev);
      buttonRefs.current[prev]?.focus();
    }
  };

  const selected = capabilities[selectedIndex];

  return (
    <section className="capabilities" id="capabilities" aria-labelledby="capabilities-heading">
      <div className="capabilities__inner">
        <header className="capabilities__header">
          <span className="section-eyebrow">CAPABILITIES</span>
          <h2 id="capabilities-heading" className="section-heading section-heading--major">
            What I build <span className="serif-italic">and what it costs you to run.</span>
          </h2>
          <p className="section-subhead">
            Full-stack scope — from database architecture to client-operable back offices.
          </p>
        </header>

        <div className="capabilities__layout">
          {/* Left Column: Selector list */}
          <div
            className="capabilities__selector"
            aria-label="Capabilities selector"
          >
            {capabilities.map((item, index) => {
              const isSelected = selectedIndex === index;
              const customStyle = {
                '--row-accent': item.accent,
              } as CSSProperties;

              return (
                <div
                  key={item.num}
                  className={`capabilities__item ${isSelected ? 'capabilities__item--active' : ''}`}
                  data-slug={item.slug}
                  style={customStyle}
                >
                  <button
                    ref={(el) => {
                      buttonRefs.current[index] = el;
                    }}
                    type="button"
                    className={`capability-nav-btn ${isSelected ? 'capability-nav-btn--active' : ''}`}
                    onClick={() => setSelectedIndex(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    aria-pressed={isSelected}
                    id={`cap-tab-${item.num}`}
                    aria-controls={`cap-panel-${item.num}`}
                  >
                    <div className="capability-nav-btn__header">
                      <span className="capability-nav-btn__num" aria-hidden="true">
                        {item.num}
                      </span>
                      <h3 className="capability-nav-btn__title">{item.title}</h3>
                    </div>
                    <p className="capability-nav-btn__desc">{item.desc}</p>
                  </button>

                  {/* Accordion panel on mobile (<= 820px) */}
                  <div
                    id={`cap-panel-${item.num}`}
                    aria-labelledby={`cap-tab-${item.num}`}
                    className={`capabilities__accordion-panel ${
                      isSelected ? 'capabilities__accordion-panel--open' : ''
                    }`}
                  >
                    {isSelected && (
                      <div className="capabilities__accordion-content">
                        <BrowserFrame
                          src={item.screenshot}
                          alt={item.alt}
                          url={item.url}
                          accent={item.accent}
                          priority={index === 0}
                        />
                        <div className="capabilities__caption">
                          <span>{item.caption} </span>
                          <Link href={item.link} className="capabilities__caption-link">
                            <em>{item.projectName}</em> →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Desktop Viewer */}
          <div className="capabilities__viewer" aria-live="polite">
            <div
              className="capabilities__viewer-wrap"
              style={{ '--project-accent': selected.accent } as CSSProperties}
              data-slug={selected.slug}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.num}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="capabilities__viewer-motion"
                >
                  <BrowserFrame
                    src={selected.screenshot}
                    alt={selected.alt}
                    url={selected.url}
                    accent={selected.accent}
                    priority={selectedIndex === 0}
                  />
                  <div className="capabilities__caption">
                    <span>{selected.caption} </span>
                    <Link href={selected.link} className="capabilities__caption-link">
                      <em>{selected.projectName}</em> →
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
