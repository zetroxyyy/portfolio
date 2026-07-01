import { Hero } from '@/components/sections/Hero';
import { Work } from '@/components/sections/Work';
import { About } from '@/components/sections/About';
import type { Metadata } from 'next';
import { site } from '../../content/site';

export const metadata: Metadata = {
  title: `${site.name} — Design. Build. Edit.`,
  description: site.ogDescription,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <About />
    </>
  );
}
