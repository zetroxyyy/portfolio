import { getClientProjects, getIndependentProjects } from '../../../content/projects';
import { ProjectBand } from '@/components/project/ProjectBand';

export function Work() {
  const clientProjects = getClientProjects();
  const independentProjects = getIndependentProjects();

  return (
    <section className="work-section" id="work" aria-label="Selected production systems and web applications">
      <div className="work-section__inner">
        {/* Client Engagements Group */}
        <div className="work-group" aria-labelledby="client-work-heading">
          <header className="work-group__header">
            <span className="work-group__eyebrow">01 / ENGAGEMENTS</span>
            <h2 id="client-work-heading" className="work-group__title">
              Client Work
            </h2>
            <p className="work-group__qualifier">
              Commissioned, shipped, live on the client&apos;s own domain.
            </p>
          </header>

          <div className="work-group__list">
            {clientProjects.map((project, index) => (
              <ProjectBand
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Independent Production Builds Group */}
        <div className="work-group" aria-labelledby="independent-work-heading">
          <header className="work-group__header">
            <span className="work-group__eyebrow">02 / PRODUCTION DEMOS</span>
            <h2 id="independent-work-heading" className="work-group__title">
              Independent Builds
            </h2>
            <p className="work-group__qualifier">
              Self-initiated production builds for real businesses, made to demonstrate the work. Live on zetroxy.me subdomains.
            </p>
          </header>

          <div className="work-group__list">
            {independentProjects.map((project, index) => (
              <ProjectBand
                key={project.slug}
                project={project}
                index={index + clientProjects.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
