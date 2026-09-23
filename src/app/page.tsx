import { Hero } from '@/components/sections/Hero';
import { Work } from '@/components/sections/Work';
import { Testimonials } from '@/components/sections/Testimonials';
import { Capabilities } from '@/components/sections/Capabilities';
import { Process } from '@/components/sections/Process';
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
      <Testimonials />
      <Capabilities />
      <Process />
    </>
  );
}
