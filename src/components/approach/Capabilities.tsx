'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { capabilityLayers } from '@/../content/capabilities';

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
            What I work with{' '}
            <span className="serif-italic">and what I reach for first.</span>
          </h2>
          <p className="section-subhead">
            Six layers. Core is what most projects are built on — the rest has
            shipped too, just less often.
          </p>
        </header>

        <div className="capabilities__grid">
          {capabilityLayers.map((layer, index) => (
            <motion.div
              key={layer.label}
              className="capabilities__layer"
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
                      delay: index * 0.08,
                    }
              }
            >
              <h3 className="capabilities__layer-label">{layer.label}</h3>
              <ul
                className="capabilities__tier capabilities__tier--core"
                aria-label="Core"
              >
                {layer.core.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="capabilities__tier-divider" aria-hidden="true" />
              <ul
                className="capabilities__tier capabilities__tier--also"
                aria-label="Also shipped with"
              >
                {layer.also.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
