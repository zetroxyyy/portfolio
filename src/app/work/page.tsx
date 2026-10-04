import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/site/Header';
import { Contact } from '@/components/site/Contact';
import { projects } from '../../../content/projects';
import { sideProjects } from '../../../content/sideProjects';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Six products built for clients, and three tools I maintain in the open.',
};

export default function WorkPage() {
  return (
    <div className="wrap">
      <Header />

      <header className="work-header">
        <h1 className="work-header__title">Work</h1>
        <p className="work-header__sub">
          Six products built for clients, and three tools I maintain in the open.
        </p>
      </header>

      <section className="work-section" aria-labelledby="client-work-label">
        <h2 id="client-work-label" className="work-section__label">
          Client Work
        </h2>
        <div className="work-list">
          {projects.map((project) => {
            const primaryStack = project.stack[0] || 'Next.js';
            const secondaryStack = project.stack[3] || project.stack[1] || 'PostgreSQL';
            const stackLine = `${primaryStack}, ${secondaryStack}`;

            return (
              <article key={project.slug} className="work-item">
                <div className="work-item__col work-item__col--main">
                  <h3 className="work-item__name">
                    <Link href={`/work/${project.slug}`} className="work-item__name-link">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="work-item__summary">{project.shortSummary}</p>
                </div>

                <div className="work-item__col work-item__col--side">
                  <p className="work-item__meta">
                    {project.year} · {stackLine}
                  </p>
                  <p className="work-item__links">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-item__link"
                    >
                      Live ↗
                    </a>
                    <span> · </span>
                    <Link href={`/work/${project.slug}`} className="work-item__link">
                      Case study →
                    </Link>
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="work-section" aria-labelledby="tools-label">
        <h2 id="tools-label" className="work-section__label">
          Source-Available Tools
        </h2>
        <div className="work-list">
          {sideProjects.map((tool) => (
            <article key={tool.slug} className="work-item">
              <div className="work-item__col work-item__col--main">
                <h3 className="work-item__name">
                  <a
                    href={tool.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-item__name-link"
                  >
                    {tool.title}
                  </a>
                </h3>
                <p className="work-item__summary">{tool.summary}</p>
              </div>

              <div className="work-item__col work-item__col--side">
                <p className="work-item__links">
                  <a
                    href={tool.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-item__link"
                  >
                    GitHub ↗
                  </a>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Contact />
    </div>
  );
}
