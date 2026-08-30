'use client';

import Image from 'next/image';
import React, { CSSProperties } from 'react';
import { getImageSize } from '../../../content/imageDimensions';

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
  const intrinsic = getImageSize(src);

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
          <svg
            className="browser-frame__lock"
            width="9"
            height="11"
            viewBox="0 0 9 11"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 4.5V3a2.5 2.5 0 0 1 5 0v1.5"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <rect x="0.75" y="4.5" width="7.5" height="5.75" rx="1.25" fill="currentColor" />
          </svg>
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
              /* True intrinsic size — these captures run 2,464px to 9,000px tall,
                 so a single hardcoded height shifts layout on every one of them. */
              width={intrinsic.width}
              height={intrinsic.height}
              className="browser-frame__img"
              style={{ height: 'auto', width: '100%' }}
              priority={priority}
            />
            <div className="browser-frame__scroll-hint" aria-hidden="true">
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
