'use client';

/**
 * Returns a timecode string (MM:SS) derived from a scroll progress value (0–1).
 * Pass totalDuration in seconds to control the "length" of the timeline.
 * Used by the Playhead to display current scroll position as a timecode.
 */
export function useTimecode(scrollProgress: number, totalDuration = 240): string {
  const seconds = Math.floor(scrollProgress * totalDuration);
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

/**
 * Returns a fixed timecode string for a given section index.
 * Used by SectionMeta to show stable timecodes beside section labels.
 * Timecodes correspond to approximate real scroll positions across a ~6-minute "runtime".
 */
export function useSectionTimecode(sectionIndex: number): string {
  const times = ['00:00', '01:12', '02:34', '03:58', '05:20'];
  return times[sectionIndex] ?? '00:00';
}
