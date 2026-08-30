'use client';

import Image from 'next/image';
import React, { CSSProperties } from 'react';

export interface BrowserFrameProps {
  src: string;
  alt: string;
  url: string;
  accent?: string;
  priority?: boolean;
  scrollable?: boolean;
  variant?: 'browser' | 'mobile';
  className?: string;
}

export function BrowserFrame({
  src,
  alt,
  url,
  accent,
  priority = false,
  scrollable = false,
  variant = 'browser',
  className = '',
}: BrowserFrameProps) {
  // Clean URL for address bar display (strip protocol if preferred, or keep https://)
  const displayUrl = url.replace(/^https?:\/\//, '');

  const customStyle: CSSProperties = {
    ...(accent ? ({ '--project-accent': accent } as CSSProperties) : {}),
  };

  return (
    <div
      className={`browser-frame ${scrollable ? 'browser-frame--scrollable' : ''} ${
        variant === 'mobile' ? 'browser-frame--mobile' : ''
      } ${className}`}
      style={customStyle}
    >
      {/* Title bar chrome */}
      <div className="browser-frame__bar" aria-hidden="true">
        {/* Window controls */}
        <div className="browser-frame__dots">
          <span className="browser-frame__dot" />
          <span className="browser-frame__dot" />
          <span className="browser-frame__dot" />
        </div>

        {/* Address pill */}
        <div className="browser-frame__address">
          <span className="browser-frame__lock">🔒</span>
          <span className="browser-frame__url">{displayUrl}</span>
        </div>

        <div style={{ width: 48 }} />
      </div>

      {/* Screenshot frame */}
      <div className="browser-frame__screen">
        {scrollable ? (
          <>
            <Image
              src={src}
              alt={alt}
              width={1400}
              height={3500}
              className="browser-frame__img"
              style={{ height: 'auto', width: '100%' }}
              priority={priority}
            />
            <div className="browser-frame__scroll-hint">
              <span>Scroll to view full page ↓</span>
            </div>
          </>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
            className="browser-frame__img"
            priority={priority}
          />
        )}
      </div>
    </div>
  );
}
