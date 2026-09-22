import { Hero } from '@/components/sections/Hero';
import { SystemLoop } from '@/components/sections/SystemLoop';
import { Work } from '@/components/sections/Work';
import { Testimonials } from '@/components/sections/Testimonials';
import { Capabilities } from '@/components/sections/Capabilities';
import { Process } from '@/components/sections/Process';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';
import type { Metadata } from 'next';
import { site } from '../../content/site';

export const metadata: Metadata = {
  title: `${site.name} — Full-Stack Web Developer`,
  description: site.ogDescription,
};

/**
 * Order is the argument, in sequence:
 *
 *   Hero         the claim
 *   SystemLoop   what the claim means, as a diagram rather than a paragraph
 *   Work         six live products that prove it
 *   Testimonials three clients saying it in their own words
 *   Capabilities the detail, for whoever wants it
 *   Process      how an engagement actually runs
 *   FAQ          the objections that stop people emailing
 *   Contact      the way to start
 *
 * The explainer sits above the work deliberately: a visitor who does not yet
 * know what "full-stack" buys them cannot tell why six admin panels matter.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <SystemLoop />
      <Work />
      <Testimonials />
      <Capabilities />
      <Process />
      <FAQ />
      <Contact />
    </>
  );
}
