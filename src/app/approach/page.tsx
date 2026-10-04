import type { Metadata } from 'next';
import { Process } from '@/components/sections/Process';
import { Capabilities } from '@/components/sections/Capabilities';
import { Testimonials } from '@/components/sections/Testimonials';

export const metadata: Metadata = {
  title: 'Approach & Capabilities — zetroxy',
  description:
    'How I scope, build, deploy and support production web platforms, technical capabilities toolkit, and verified client testimonials.',
};

export default function ApproachPage() {
  return (
    <div className="approach-page">
      <Process />
      <Capabilities />
      <Testimonials />
    </div>
  );
}
