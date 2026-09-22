import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { projects, getProjectBySlug, getAdjacentProjects } from '../../../../content/projects';
import { BrowserFrame } from '@/components/ui/BrowserFrame';
import { site } from '../../../../content/site';
import React, { CSSProperties } from 'react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Case Study | ${site.name}`,
      description: project.summary,
      images: [
        {
          url: project.cover,
          width: 1200,
          height: 675,
          alt: project.coverAlt,
        },
      ],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  const customStyle: CSSProperties = {
    '--project-accent': project.accent,
  } as CSSProperties;

  return (
    <article className="case-study" style={customStyle} aria-label={`${project.title} case study`}>
      <div className="case-study__inner">
        {/* Back navigation */}
        <Link href="/#work" className="case-study__back" aria-label="Back to all projects">
          <span aria-hidden="true">←</span>
          <span>All work</span>
        </Link>

        {/* Header */}
        <header className="case-study__header">
          <div className="case-study__top-meta">
            <span>{project.kind === 'client' ? 'CLIENT ENGAGEMENT' : 'INDEPENDENT BUILD'}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>

          <h1 className="case-study__title">{project.title}</h1>
          <p className="case-study__client">{project.client}</p>
          <p className="case-study__summary">{project.summary}</p>
        </header>

        {/* Meta Bar */}
        <div className="case-study__meta-bar" role="region" aria-label="Project details">
          <div className="case-study__meta-item">
            <span className="case-study__meta-label">Role</span>
            <span className="case-study__meta-value">{project.role}</span>
          </div>
          <div className="case-study__meta-item">
            <span className="case-study__meta-label">Year</span>
            <span className="case-study__meta-value">{project.year}</span>
          </div>
          <div className="case-study__meta-item">
            <span className="case-study__meta-label">Status</span>
            <span className="case-study__meta-value">{project.status}</span>
          </div>
          <div className="case-study__meta-item">
            <span className="case-study__meta-label">Live URL</span>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study__meta-value case-study__meta-value--link"
              aria-label={`Visit live site for ${project.title} (opens in new tab)`}
            >
              {project.liveUrl.replace(/^https?:\/\//, '')} ↗
            </a>
          </div>
        </div>

        {/* Hero cover in BrowserFrame */}
        <div className="case-study__hero-frame">
          <BrowserFrame
            src={project.cover}
            alt={project.coverAlt}
            url={project.liveUrl}
            accent={project.accent}
            priority
          />
        </div>

        {/* Section: The Problem */}
        <section className="case-study__section" aria-labelledby="problem-heading">
          <h2 id="problem-heading" className="case-study__section-heading">
            The Problem
          </h2>
          <div className="case-study__prose">
            {project.problem.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </section>

        {/* Section: What I Built */}
        <section className="case-study__section" aria-labelledby="built-heading">
          <h2 id="built-heading" className="case-study__section-heading">
            What I Built
          </h2>

          <div className="case-study__built-list">
            {project.built.map((item, idx) => (
              <div key={idx} className="case-study__built-item">
                <h3 className="case-study__built-title">{item.heading}</h3>
                <p className="case-study__built-desc">{item.body}</p>

                {item.image && (
                  <figure style={{ margin: 0 }}>
                    <BrowserFrame
                      src={item.image}
                      alt={item.imageAlt || item.heading}
                      url={project.liveUrl}
                      accent={project.accent}
                      expandable={item.isFullScroll}
                    />
                    {item.caption && (
                      <figcaption className="case-study__caption" style={{ marginTop: 'var(--space-3)' }}>
                        {item.caption}
                      </figcaption>
                    )}
                  </figure>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section: Technical Decisions */}
        {project.decisions.length > 0 && (
          <section className="case-study__section" aria-labelledby="decisions-heading">
            <h2 id="decisions-heading" className="case-study__section-heading">
              Technical Decisions
            </h2>
            <div className="case-study__decisions-grid">
              {project.decisions.map((dec, idx) => (
                <div key={idx} className="case-study__decision-card">
                  <h3 className="case-study__decision-title">{dec.heading}</h3>
                  <p className="case-study__decision-body">{dec.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Outcome */}
        <section className="case-study__section" aria-labelledby="outcome-heading">
          <h2 id="outcome-heading" className="case-study__section-heading">
            Outcome
          </h2>
          <div className="case-study__outcome-card">
            <span className="case-study__outcome-title">Delivered State</span>
            <p className="case-study__outcome-text">{project.outcome}</p>
          </div>
        </section>

        {/* Navigation & Live Link */}
        <div className="case-study__bottom-actions">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            aria-label={`Visit live site for ${project.title}`}
          >
            <span>Visit live site</span>
            <span aria-hidden="true">↗</span>
          </a>

          <Link href="/#work" className="btn-secondary">
            <span>Back to all work</span>
          </Link>
        </div>

        {/* Prev / Next Pagination */}
        <nav className="case-study__nav-links" aria-label="Adjacent projects">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="case-study__nav-card"
              aria-label={`Previous project: ${prev.title}`}
            >
              <span className="case-study__nav-dir">← Previous</span>
              <span className="case-study__nav-name">{prev.title}</span>
            </Link>
          ) : (
            <div />
          )}

          {next && (
            <Link
              href={`/work/${next.slug}`}
              className="case-study__nav-card case-study__nav-card--next"
              aria-label={`Next project: ${next.title}`}
            >
              <span className="case-study__nav-dir">Next →</span>
              <span className="case-study__nav-name">{next.title}</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
