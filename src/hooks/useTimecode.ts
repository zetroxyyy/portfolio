'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Returns a timecode string (MM:SS) derived from scroll percentage.
 * Pass a totalDuration in seconds to control the "length" of the timeline.
 * Used by section meta to render e.g. "01:42 — SELECTED WORK"
 */
export function useTimecode(scrollProgress: number, totalDuration = 240): string {
  const seconds = Math.floor(scrollProgress * totalDuration);
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

/**
 * Returns a section-fixed timecode (won't change once section is entered).
 * Pass the scroll position at which this section starts (0–1).
 */
export function useSectionTimecode(sectionIndex: number): string {
  // Each section gets a fixed timecode by index
  const times = ['00:00', '01:12', '02:34', '03:58', '05:20'];
  return times[sectionIndex] ?? '00:00';
}
