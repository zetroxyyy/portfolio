import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/components/site/Header';
import { Contact } from '@/components/site/Contact';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The requested page could not be found.',
};

export default function NotFound() {
  return (
    <div className="wrap">
      <Header />

      <section className="not-found__section">
        <p className="not-found__label">404</p>
        <h1 className="not-found__heading">This page does not exist.</h1>
        <p className="not-found__body">
          The link may be broken, or the page has moved.
        </p>
        <Link href="/" className="not-found__back">
          ← Back to the homepage
        </Link>
      </section>

      <Contact />
    </div>
  );
}
