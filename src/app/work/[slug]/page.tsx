import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { projects, getProjectBySlug, getAdjacentProjects } from '../../../../content/projects';
import { MediaBlock } from '@/components/project/MediaBlock';
import { site } from '../../../../content/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all project slugs
export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// Generate page metadata from project data
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: 'Not found' };
  }

  return {
    title: `${project.title} (${project.year})`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.summary,
      images: [{ url: project.cover }],
    },
  };
}

const disciplineLabels: Record<string, string> = {
  design: 'Design',
  build: 'Build',
  edit: 'Edit',
};

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { next } = getAdjacentProjects(slug);

  return (
    <article className="project-detail" aria-label={project.title}>
      <div className="project-detail__inner">
        {/* Back link */}
        <Link href="/#work" className="project-detail__back">
          <span aria-hidden="true">←</span> All work
        </Link>

        {/* Header */}
        <header className="project-detail__header">
          <h1 className="project-detail__title">{project.title}</h1>

          <div className="project-detail__meta-grid">
            <div className="project-detail__meta-item">
              <span className="project-detail__meta-label">Year</span>
              <span className="project-detail__meta-value">{project.year}</span>
            </div>
            <div className="project-detail__meta-item">
              <span className="project-detail__meta-label">Role</span>
              <span className="project-detail__meta-value">{project.role}</span>
            </div>
            <div className="project-detail__meta-item">
              <span className="project-detail__meta-label">Discipline</span>
              <span className="project-detail__meta-value">
                {project.disciplines.map((d) => disciplineLabels[d]).join(', ')}
              </span>
            </div>
          </div>
        </header>

        {/* Summary */}
        <p className="project-detail__summary">{project.summary}</p>

        {/* Cover image */}
        <div className="media-block media-block--full" style={{ marginBottom: 'var(--space-3)' }}>
          <div className="media-block__img-wrap" style={{ aspectRatio: '16/9' }}>
            <Image
              src={project.cover}
              alt={project.coverAlt}
              fill
              sizes="(max-width: 768px) 100vw, 90vw"
              quality={90}
              className="media-block__img"
              priority
            />
          </div>
        </div>

        {/* Media blocks */}
        {project.media.length > 0 && (
          <div className="project-detail__media">
            {project.media.map((block, i) => (
              <MediaBlock key={i} block={block} />
            ))}
          </div>
        )}

        {/* Body sections */}
        {project.body && project.body.length > 0 && (
          <div className="project-detail__body">
            {project.body.map((section, i) => (
              <div key={i} className="project-detail__section">
                {section.heading && (
                  <h2 className="project-detail__section-heading">{section.heading}</h2>
                )}
                <p className="project-detail__section-body">{section.body}</p>
              </div>
            ))}
          </div>
        )}

        {/* External links */}
        {project.links && project.links.length > 0 && (
          <div className="project-detail__links">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail__link"
                aria-label={`${link.label} (opens in new tab)`}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}

        {/* Next project navigation */}
        <nav className="project-detail__next" aria-label="Next project">
          {next ? (
            <Link href={`/work/${next.slug}`} className="project-detail__next-link">
              <div>
                <p className="project-detail__next-label">Next project</p>
                <p className="project-detail__next-title">{next.title}</p>
              </div>
            </Link>
          ) : (
            <Link href="/#work" className="project-detail__next-link">
              <div>
                <p className="project-detail__next-label">Back to</p>
                <p className="project-detail__next-title">All work</p>
              </div>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
