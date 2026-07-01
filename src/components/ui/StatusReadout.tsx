'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * StatusReadout — a live, mono status display for the hero upper region.
 * Shows availability + current Kathmandu time, ticking every second.
 *
 * Hydration-safe: nothing is rendered on the server tick — only the
 * static label renders until the component mounts on the client.
 *
 * prefers-reduced-motion: still updates (plain text, no animated glyphs).
 */
export function StatusReadout() {
  const [time, setTime] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kathmandu',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    // Tick immediately, then every second
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    intervalRef.current = setInterval(tick, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="status-readout" aria-label={time ? `Available for work. Nepal time: ${time}` : 'Available for work'}>
      <span className="status-readout__line" aria-hidden="true">
        AVAILABLE FOR WORK
      </span>
      {/* Time renders only after mount to avoid hydration mismatch */}
      {time && (
        <span className="status-readout__time" aria-hidden="true">
          <span className="status-readout__tz">KTM</span>
          {' '}
          <span className="status-readout__clock">{time}</span>
        </span>
      )}
    </div>
  );
}
