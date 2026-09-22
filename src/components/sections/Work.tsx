import { getClientProjects, getIndependentProjects } from '../../../content/projects';
import { sideProjects } from '../../../content/sideProjects';
import { ProjectBand } from '@/components/project/ProjectBand';
import { SideProjectCard } from '@/components/project/SideProjectCard';

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
              Client work. <span className="serif-italic">Shipped, and still running.</span>
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
              Independent builds. <span className="serif-italic">Made without waiting to be asked.</span>
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

        {/* Side projects — source-available tools, run locally rather than visited.
            Presented as a compact grid, deliberately lighter than the bands above:
            no screenshot, no live dot, no case study. */}
        <div className="work-group work-group--side" aria-labelledby="side-projects-heading">
          <header className="work-group__header">
            <span className="work-group__eyebrow">03 / TOOLS</span>
            <h2 id="side-projects-heading" className="work-group__title">
              Side projects. <span className="serif-italic">Built to scratch my own itch.</span>
            </h2>
            <p className="work-group__qualifier">
              Things built to solve my own problems. Source is public — clone the repo and run
              them yourself.
            </p>
          </header>

          <div className="side-grid">
            {sideProjects.map((project, index) => (
              <SideProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
