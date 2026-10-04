import type { Metadata } from 'next';
import { site } from '../../content/site';
import { projects } from '../../content/projects';
import { Header } from '@/components/site/Header';
import { ProjectRow } from '@/components/site/ProjectRow';
import { SideProjects } from '@/components/site/SideProjects';
import { Contact } from '@/components/site/Contact';

export const metadata: Metadata = {
  title: site.title,
  description: site.ogDescription,
};

export default function HomePage() {
  return (
    <div className="wrap">
      <Header />

      <section className="intro" aria-label="Introduction">
        <h1 className="intro__heading">
          Full-stack developer in Kathmandu, building web products end to end.
        </h1>
        <div className="intro__status-row">
          <span className="intro__dot" aria-hidden="true" />
          <p className="intro__status-text">
            Taking on freelance projects ·{' '}
            <a href={site.mailtoHref} className="intro__status-link">
              hello@zetroxy.me
            </a>
          </p>
        </div>
      </section>

      <section className="projects-section" id="work" aria-label="Selected Projects">
        {projects.map((project, index) => {
          const primaryStack = project.stack[0] || 'Next.js';
          const secondaryStack = project.stack[3] || project.stack[1] || 'PostgreSQL';
          const stackLine = `${primaryStack}, ${secondaryStack}`;

          return (
            <ProjectRow
              key={project.slug}
              slug={project.slug}
              title={project.title}
              year={project.year}
              shortSummary={project.shortSummary}
              stackLine={stackLine}
              liveUrl={project.liveUrl}
              cover={project.cover}
              coverAlt={project.coverAlt}
              priority={index === 0}
            />
          );
        })}
      </section>

      <SideProjects />

      <Contact />
    </div>
  );
}
