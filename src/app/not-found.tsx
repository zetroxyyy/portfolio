import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The requested page could not be found.',
};

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <span className="mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--mist)', letterSpacing: 'var(--tracking-wider)' }}>
          404 · PAGE NOT FOUND
        </span>
        <h1 style={{ fontSize: 'clamp(var(--text-3xl), 6vw, var(--text-4xl))', lineHeight: 1.1, color: 'var(--ink)' }}>
          This page does not exist.
        </h1>
        <p style={{ color: 'var(--graphite)', fontSize: 'var(--text-base)' }}>
          The link you followed may be broken or the page has been repositioned.
        </p>
        <div style={{ marginTop: 'var(--space-4)' }}>
          <Link href="/" className="btn-primary">
            <span>← Back to home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
