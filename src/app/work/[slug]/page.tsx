import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/components/site/Header';
import { Contact } from '@/components/site/Contact';
import { CaseBuiltItem } from '@/components/case/CaseBuiltItem';
import { CaseTestimonial } from '@/components/case/CaseTestimonial';
import { projects, getProjectBySlug, getAdjacentProjects } from '../../../../content/projects';
import { site } from '../../../../content/site';

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
    title: project.title,
    description: project.shortSummary,
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.shortSummary,
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

  return (
    <div className="wrap">
      <Header />

      <article className="case-study">
        <Link href="/work" className="case-study__back">
          ← All work
        </Link>

        <h1 className="case-study__title">{project.title}</h1>
        <p className="case-study__summary">{project.shortSummary}</p>

        {/* Meta grid — 4 columns desktop, 2 columns mobile */}
        <div className="case-study__meta-grid">
          <div className="case-meta-cell">
            <span className="case-meta-cell__label">Client</span>
            <span className="case-meta-cell__value">{project.client}</span>
          </div>
          <div className="case-meta-cell">
            <span className="case-meta-cell__label">Year</span>
            <span className="case-meta-cell__value">{project.year}</span>
          </div>
          <div className="case-meta-cell">
            <span className="case-meta-cell__label">Role</span>
            <span className="case-meta-cell__value">{project.role}</span>
          </div>
          <div className="case-meta-cell">
            <span className="case-meta-cell__label">Status</span>
            <span className="case-meta-cell__value">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="case-meta-cell__link"
              >
                {project.status} ↗
              </a>
            </span>
          </div>
        </div>

        {/* Section: The Problem */}
        <section aria-labelledby="problem-label">
          <h2 id="problem-label" className="case-section-label">
            The Problem
          </h2>
          <div className="case-problem__prose">
            {project.problem.map((paragraph, idx) => (
              <p key={idx} className="case-problem__p">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Section: What I Built */}
        <section aria-labelledby="built-label">
          <h2 id="built-label" className="case-section-label">
            What I Built
          </h2>
          <div className="case-built-list">
            {project.built.map((item, idx) => (
              <CaseBuiltItem key={idx} item={item} liveUrl={project.liveUrl} />
            ))}
          </div>
        </section>

        {/* Section: Key Decisions */}
        {project.decisions.length > 0 && (
          <section aria-labelledby="decisions-label">
            <h2 id="decisions-label" className="case-section-label">
              Key Decisions
            </h2>
            <div className="case-decisions-list">
              {project.decisions.map((dec, idx) => (
                <div key={idx} className="case-decision-row">
                  <div className="case-decision-row__left">
                    <span className="case-decision-row__index">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="case-decision-row__heading">{dec.heading}</h3>
                  </div>
                  <p className="case-decision-row__body">{dec.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Outcome */}
        <section aria-labelledby="outcome-label">
          <h2 id="outcome-label" className="case-section-label">
            Outcome
          </h2>
          <p className="case-outcome__text">{project.outcome}</p>

          {/* Testimonial if matched */}
          <CaseTestimonial slug={project.slug} />
        </section>

        {/* Section: Built With */}
        <section aria-labelledby="stack-label">
          <h2 id="stack-label" className="case-section-label">
            Built With
          </h2>
          <p className="case-stack-text">{project.stack.join(' · ')}</p>
        </section>

        {/* Adjacent Navigation */}
        <nav className="case-adjacent-nav" aria-label="Adjacent projects">
          {prev ? (
            <Link href={`/work/${prev.slug}`} className="case-adjacent-nav__link">
              ← {prev.title}
            </Link>
          ) : (
            <div />
          )}
          {next && (
            <Link
              href={`/work/${next.slug}`}
              className="case-adjacent-nav__link case-adjacent-nav__link--next"
            >
              {next.title} →
            </Link>
          )}
        </nav>
      </article>

      <Contact />
    </div>
  );
}
