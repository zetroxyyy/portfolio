import { Hero } from '@/components/sections/Hero';
import { Work } from '@/components/sections/Work';
import { Statement } from '@/components/sections/Statement';
import { Contact } from '@/components/sections/Contact';
import type { Metadata } from 'next';
import { site } from '../../content/site';

export const metadata: Metadata = {
  title: site.title,
  description: site.ogDescription,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <Statement />
      <Contact />
    </>
  );
}
