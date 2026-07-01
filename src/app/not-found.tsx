import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Not found',
  description: 'This page does not exist.',
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 'var(--space-32) var(--page-px)',
        paddingTop: 'calc(var(--space-32) + 60px)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--mist)',
          letterSpacing: '0.1em',
          marginBottom: 'var(--space-8)',
        }}
        aria-hidden="true"
      >
        04:04 — NOT FOUND
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(var(--text-4xl), 7vw, var(--text-5xl))',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color: 'var(--ink)',
          marginBottom: 'var(--space-8)',
        }}
      >
        Page not found.
      </h1>
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--graphite)',
          letterSpacing: '0.06em',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}
      >
        ← Back home
      </Link>
    </div>
  );
}
