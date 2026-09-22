'use client';

import React, { useState, useRef, CSSProperties } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { WebAppAnim } from '@/components/ui/capability-anim/WebAppAnim';
import { MobileAppAnim } from '@/components/ui/capability-anim/MobileAppAnim';
import { AiRetrievalAnim } from '@/components/ui/capability-anim/AiRetrievalAnim';
import { ShipHandoverAnim } from '@/components/ui/capability-anim/ShipHandoverAnim';

interface Capability {
  num: string;
  slug: string;
  title: string;
  caption: string;
  projectName: string;
  link: string;
  accent: string;
  ariaLabel: string;
  anim: React.ComponentType<{ active: boolean; inView: boolean }>;
}

const capabilities: Capability[] = [
  {
    num: '01',
    slug: 'web-apps',
    title: 'Web applications',
    caption: 'The public side and the back office, wired to the same database.',
    projectName: 'Dream Adventure',
    link: '/work/dream-adventure',
    accent: '#0D9488',
    ariaLabel: 'Diagram showing customer booking requests flowing to a shared database and updating the admin back office in real time.',
    anim: WebAppAnim,
  },
  {
    num: '02',
    slug: 'mobile-apps',
    title: 'Mobile applications',
    caption: 'Native Android apps — voice input, on-device flows, real file output.',
    projectName: 'Resumiq',
    link: 'https://github.com/zetroxyyy/resumiq',
    accent: '#2563EB',
    ariaLabel: 'Diagram showing native Android mobile application with voice-assisted form inputs generating a PDF document.',
    anim: MobileAppAnim,
  },
  {
    num: '03',
    slug: 'ai-retrieval',
    title: 'AI & retrieval',
    caption: 'Language models wired into products — transcription, summarisation, semantic search.',
    projectName: 'Reels Second Brain',
    link: 'https://github.com/zetroxyyy/reels-second-brain',
    accent: '#D97A2B',
    ariaLabel: 'Diagram showing documents being embedded into vector space, with a query ripple retrieving the nearest semantic matches.',
    anim: AiRetrievalAnim,
  },
  {
    num: '04',
    slug: 'ship-handover',
    title: 'Ship & hand over',
    caption: 'Deployed on your domain, with the keys handed to you.',
    projectName: 'All work',
    link: '/#work',
    accent: '#16A34A',
    ariaLabel: 'Diagram showing delivery phases: build, domain setup with SSL, and handing over administrative keys to the owner.',
    anim: ShipHandoverAnim,
  },
];

export function Capabilities() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(containerRef, { margin: '-60px' });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const accordionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (index + 1) % capabilities.length;
      setSelectedIndex(next);
      tabRefs.current[next]?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (index - 1 + capabilities.length) % capabilities.length;
      setSelectedIndex(prev);
      tabRefs.current[prev]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSelectedIndex(0);
      tabRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      const last = capabilities.length - 1;
      setSelectedIndex(last);
      tabRefs.current[last]?.focus();
    }
  };

  const selected = capabilities[selectedIndex];
  const SelectedAnim = selected.anim;

  return (
    <section
      ref={containerRef}
      className="capabilities"
      id="capabilities"
      aria-labelledby="capabilities-heading"
    >
      <div className="capabilities__inner">
        <header className="capabilities__header">
          <span className="section-eyebrow">CAPABILITIES</span>
          <h2 id="capabilities-heading" className="section-heading section-heading--major">
            What I build <span className="serif-italic">and how the system works.</span>
          </h2>
          <p className="section-subhead">
            Full-stack scope — web platforms, native mobile apps, AI pipelines, and production handover.
          </p>
        </header>

        {/* ── DESKTOP STACKED LAYOUT (> 820px) ── */}
        <div className="capabilities__desktop">
          {/* Horizontal tab row across full measure */}
          <div className="capabilities__tabs" role="tablist" aria-label="Capabilities tabs">
            {capabilities.map((item, index) => {
              const isSelected = selectedIndex === index;
              const customStyle = {
                '--row-accent': item.accent,
              } as CSSProperties;

              return (
                <button
                  key={item.num}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`cap-tab-${item.num}`}
                  aria-selected={isSelected}
                  aria-controls="capabilities-desktop-panel"
                  className={`capabilities__tab-btn ${isSelected ? 'capabilities__tab-btn--active' : ''}`}
                  onClick={() => setSelectedIndex(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  data-slug={item.slug}
                  style={customStyle}
                >
                  <span className="capabilities__tab-num" aria-hidden="true">
                    {item.num}
                  </span>
                  <span className="capabilities__tab-title">{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Full-width frame viewer */}
          <div
            id="capabilities-desktop-panel"
            role="tabpanel"
            aria-labelledby={`cap-tab-${selected.num}`}
            className="capabilities__desktop-viewer"
          >
            <div
              className="capabilities__viewer-stacked"
              style={{ '--project-accent': selected.accent } as CSSProperties}
              data-slug={selected.slug}
            >
              <div className="capabilities__frame-box">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected.num}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="capabilities__viewer-motion"
                  >
                    <div
                      className="capabilities__stage"
                      role="img"
                      aria-label={selected.ariaLabel}
                    >
                      <SelectedAnim active={true} inView={isInView} />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Meta row beneath stage: caption + proof link */}
              <div className="capabilities__viewer-meta">
                <div className="capabilities__caption">
                  <span>{selected.caption} </span>
                  {selected.link.startsWith('http') ? (
                    <a
                      href={selected.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="capabilities__caption-link"
                    >
                      <em>{selected.projectName}</em> ↗
                    </a>
                  ) : (
                    <Link href={selected.link} className="capabilities__caption-link">
                      <em>{selected.projectName}</em> →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE ACCORDION (<= 820px) ── */}
        <div className="capabilities__mobile-accordion">
          {capabilities.map((item, index) => {
            const isSelected = selectedIndex === index;
            const ItemAnim = item.anim;
            const customStyle = {
              '--row-accent': item.accent,
              '--project-accent': item.accent,
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
                    accordionRefs.current[index] = el;
                  }}
                  type="button"
                  className={`capability-nav-btn ${isSelected ? 'capability-nav-btn--active' : ''}`}
                  onClick={() => setSelectedIndex(index)}
                  aria-expanded={isSelected}
                  id={`cap-acc-${item.num}`}
                  aria-controls={`cap-acc-panel-${item.num}`}
                >
                  <div className="capability-nav-btn__header">
                    <span className="capability-nav-btn__num" aria-hidden="true">
                      {item.num}
                    </span>
                    <h3 className="capability-nav-btn__title">{item.title}</h3>
                  </div>
                </button>

                {isSelected && (
                  <div
                    id={`cap-acc-panel-${item.num}`}
                    aria-labelledby={`cap-acc-${item.num}`}
                    className="capabilities__accordion-panel capabilities__accordion-panel--open"
                  >
                    <div className="capabilities__accordion-content">
                      <div
                        className="capabilities__stage"
                        role="img"
                        aria-label={item.ariaLabel}
                      >
                        <ItemAnim active={isSelected} inView={isInView} />
                      </div>
                      <div className="capabilities__caption">
                        <span>{item.caption} </span>
                        {item.link.startsWith('http') ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="capabilities__caption-link"
                          >
                            <em>{item.projectName}</em> ↗
                          </a>
                        ) : (
                          <Link href={item.link} className="capabilities__caption-link">
                            <em>{item.projectName}</em> →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
