'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { capabilityGroups } from '@/../content/capabilities';

export function Capabilities() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="capabilities"
      id="capabilities"
      aria-labelledby="capabilities-heading"
    >
      <div className="capabilities__inner">
        <header className="capabilities__header">
          <span className="section-eyebrow">CAPABILITIES</span>
          <h2
            id="capabilities-heading"
            className="section-heading section-heading--major"
          >
            What I build <span className="serif-italic">is not one thing.</span>
          </h2>
          <p className="section-subhead">
            Websites, mobile apps, internal tools, and the systems behind them.
            Underlined items link to something already running.
          </p>
        </header>

        <div className="capabilities__list">
          {capabilityGroups.map((group, groupIndex) => (
            <motion.div
              key={group.label}
              className="capabilities__group"
              initial={
                shouldReduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 12 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                      delay: groupIndex * 0.09,
                    }
              }
            >
              <h3 className="capabilities__group-label">{group.label}</h3>
              <ul className="capabilities__items">
                {group.items.map((item) => {
                  const isExternal = item.href?.startsWith('http');

                  return (
                    <li key={item.label} className="capabilities__item">
                      {item.href ? (
                        isExternal ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="capabilities__item-link"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className="capabilities__item-link"
                          >
                            {item.label}
                          </Link>
                        )
                      ) : (
                        <span className="capabilities__item-text">
                          {item.label}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
