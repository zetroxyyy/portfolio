import type { Metadata } from 'next';
import { site } from '../../content/site';

export const metadata: Metadata = {
  title: site.title,
  description: site.ogDescription,
};

export default function HomePage() {
  return (
    <div
      className="dot-grid"
      style={{
        minHeight: '100vh',
        padding: '3rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--t-name)',
          fontWeight: 700,
          color: 'var(--ink)',
          lineHeight: 1,
        }}
      >
        zetroxy
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--t-label)',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--ink-dim)',
        }}
      >
        Full-stack developer · Kathmandu
      </p>
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--t-meta)',
          color: 'var(--ink-faint)',
          marginTop: '1rem',
        }}
      >
        window manager init
      </p>
    </div>
  );
}
