import { sideProjects } from '../../../content/sideProjects';

export function SideProjects() {
  return (
    <section className="side-projects" aria-labelledby="side-projects-label">
      <h2 id="side-projects-label" className="side-projects__label">
        Side Projects
      </h2>
      <div className="side-projects__list">
        {sideProjects.map((project) => (
          <div key={project.slug} className="side-project-item">
            <span className="side-project-item__name">{project.title}</span>
            <p className="side-project-item__summary">{project.summary}</p>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="side-project-item__link"
            >
              GitHub ↗
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
