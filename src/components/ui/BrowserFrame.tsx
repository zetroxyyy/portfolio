'use client';

import Image from 'next/image';
import React, { CSSProperties, useState, useRef, useId } from 'react';
import { getImageSize } from '../../../content/imageDimensions';

export interface BrowserFrameProps {
  src: string;
  alt: string;
  url: string;
  accent?: string;
  priority?: boolean;
  expandable?: boolean;
  scrollable?: boolean; // backwards compatible alias
  variant?: 'browser' | 'mobile';
  className?: string;
}

export function BrowserFrame({
  src,
  alt,
  url,
  accent,
  priority = false,
  expandable = false,
  scrollable = false,
  variant = 'browser',
  className = '',
}: BrowserFrameProps) {
  const isExpandable = expandable || scrollable;
  const [isExpanded, setIsExpanded] = useState(false);
  const [targetHeight, setTargetHeight] = useState<number | undefined>(undefined);
  const frameRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const screenId = useId();

  // Clean URL for address bar display
  const displayUrl = url.replace(/^https?:\/\//, '');
  const intrinsic = getImageSize(src);

  const customStyle: CSSProperties = {
    ...(accent ? ({ '--project-accent': accent } as CSSProperties) : {}),
  };

  const handleToggle = () => {
    if (!isExpandable) return;

    if (isExpanded) {
      // Collapsing — scroll frame top edge back into view so reader is never stranded
      if (frameRef.current) {
        const lenis = (window as unknown as { lenis?: { scrollTo: (el: Element, opts?: object) => void } }).lenis;
        if (lenis) {
          lenis.scrollTo(frameRef.current, { offset: -80 });
        } else {
          frameRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      if (screenRef.current) {
        setTargetHeight(screenRef.current.scrollHeight);
        requestAnimationFrame(() => {
          setTargetHeight(460);
          setIsExpanded(false);
        });
      } else {
        setIsExpanded(false);
      }
    } else {
      // Expanding
      if (screenRef.current) {
        setTargetHeight(screenRef.current.scrollHeight);
      }
      setIsExpanded(true);
    }
  };

  const onTransitionEnd = () => {
    if (isExpanded) {
      setTargetHeight(undefined);
    } else {
      setTargetHeight(undefined);
    }
  };

  const screenStyle: CSSProperties = isExpandable
    ? {
        maxHeight:
          targetHeight !== undefined
            ? `${targetHeight}px`
            : isExpanded
            ? 'none'
            : '460px',
      }
    : {};

  return (
    <div
      ref={frameRef}
      className={`browser-frame ${
        isExpandable ? 'browser-frame--expandable' : ''
      } ${isExpanded ? 'browser-frame--expanded' : ''} ${
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
      <div
        id={screenId}
        ref={screenRef}
        className={`browser-frame__screen ${
          isExpandable ? 'browser-frame__screen--expandable' : ''
        }`}
        style={screenStyle}
        onTransitionEnd={onTransitionEnd}
      >
        {isExpandable ? (
          <>
            <Image
              src={src}
              alt={alt}
              width={intrinsic.width}
              height={intrinsic.height}
              className="browser-frame__img"
              style={{ height: 'auto', width: '100%', display: 'block' }}
              priority={priority}
            />
            {!isExpanded && (
              <div className="browser-frame__fade" aria-hidden="true" />
            )}
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

      {/* Expand / Collapse action button */}
      {isExpandable && (
        <div
          className={`browser-frame__expand-wrap ${
            isExpanded ? 'browser-frame__expand-wrap--expanded' : ''
          }`}
        >
          <button
            type="button"
            className="browser-frame__expand-btn"
            onClick={handleToggle}
            aria-expanded={isExpanded}
            aria-controls={screenId}
          >
            {isExpanded ? 'Collapse ↑' : 'See the full page ↓'}
          </button>
        </div>
      )}
    </div>
  );
}
