import { Link } from 'react-router-dom';
import { MOCK_PROJECTS, MOCK_SUITES, MOCK_RUNS } from '../types/mock-data';
import './Projects.css';

export function Projects() {
  return (
    <div className="page-content">
      <header className="page-header">
        <div>
          <h1 className="page-title">Projects</h1>
          <span className="page-subtitle">{MOCK_PROJECTS.length} projects</span>
        </div>
        <button className="btn btn--primary">+ New Project</button>
      </header>

      <div className="projects-grid">
        {MOCK_PROJECTS.map(project => {
          const suites = MOCK_SUITES.filter(s => s.projectId === project.id);
          const totalCases = suites.reduce((n, s) => n + s.caseCount, 0);
          const runs = MOCK_RUNS.filter(r => r.projectId === project.id);
          const lastRun = runs[0];
          return (
            <div key={project.id} className="project-card">
              <div className="project-card__header">
                <div className="project-card__icon">
                  {project.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="project-card__meta">
                  <h3 className="project-card__name">{project.name}</h3>
                  {project.repositoryUrl && (
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="project-card__repo"
                    >
                      {project.repositoryUrl.replace('https://', '')}
                    </a>
                  )}
                </div>
              </div>

              {project.description && (
                <p className="project-card__desc">{project.description}</p>
              )}

              <div className="project-card__stats">
                <div className="project-stat">
                  <span className="project-stat__value">{suites.length}</span>
                  <span className="project-stat__label">Suites</span>
                </div>
                <div className="project-stat">
                  <span className="project-stat__value">{totalCases}</span>
                  <span className="project-stat__label">Cases</span>
                </div>
                <div className="project-stat">
                  <span className="project-stat__value">{runs.length}</span>
                  <span className="project-stat__label">Runs</span>
                </div>
              </div>

              <div className="project-card__footer">
                <div className="project-card__envs">
                  {project.environments.map(env => (
                    <span key={env} className="env-tag">{env}</span>
                  ))}
                </div>
                {lastRun && (
                  <Link to={`/runs/${lastRun.id}`} className="project-card__last-run">
                    Last run →
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
