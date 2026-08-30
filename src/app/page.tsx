import { Hero } from '@/components/sections/Hero';
import { Work } from '@/components/sections/Work';
import { Capabilities } from '@/components/sections/Capabilities';
import { Process } from '@/components/sections/Process';
import type { Metadata } from 'next';
import { site } from '../../content/site';

export const metadata: Metadata = {
  title: `${site.name} — Full-Stack Web Developer`,
  description: site.ogDescription,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <Capabilities />
      <Process />
    </>
  );
}
