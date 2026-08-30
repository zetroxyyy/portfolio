'use client';

import { useState, useEffect, useRef } from 'react';

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

    const tick = () => setTime(fmt.format(new Date()));
    tick();
    intervalRef.current = setInterval(tick, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      className="status-readout"
      aria-label={time ? `Available for new projects. Nepal time: ${time}` : 'Available for new projects'}
    >
      <span className="status-readout__dot" aria-hidden="true" />
      <span>AVAILABLE FOR WORK</span>
      {time && (
        <span aria-hidden="true" style={{ color: 'var(--mist)' }}>
          · KTM {time}
        </span>
      )}
    </div>
  );
}
