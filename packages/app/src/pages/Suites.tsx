import { useState } from 'react';
import { MOCK_SUITES, MOCK_PROJECTS } from '../types/mock-data';
import './Suites.css';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

export function Suites() {
  const [selectedProject, setSelectedProject] = useState<string>('all');

  const filtered = MOCK_SUITES.filter(
    s => selectedProject === 'all' || s.projectId === selectedProject
  );

  return (
    <div className="page-content">
      <header className="page-header">
        <div>
          <h1 className="page-title">Test Suites</h1>
          <span className="page-subtitle">{filtered.length} suites</span>
        </div>
        <button className="btn btn--primary">+ New Suite</button>
      </header>

      {/* Project filter */}
      <div className="suite-filters">
        <button
          className={`filter-btn${selectedProject === 'all' ? ' filter-btn--active' : ''}`}
          onClick={() => setSelectedProject('all')}
        >
          All Projects
        </button>
        {MOCK_PROJECTS.map(p => (
          <button
            key={p.id}
            className={`filter-btn${selectedProject === p.id ? ' filter-btn--active' : ''}`}
            onClick={() => setSelectedProject(p.id)}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="suites-grid">
        {filtered.map(suite => {
          const project = MOCK_PROJECTS.find(p => p.id === suite.projectId);
          return (
            <div key={suite.id} className="suite-card">
              <div className="suite-card__header">
                <h3 className="suite-card__name">{suite.name}</h3>
                {project && (
                  <span className="suite-card__project">{project.name}</span>
                )}
              </div>

              {suite.description && (
                <p className="suite-card__desc">{suite.description}</p>
              )}

              <div className="suite-card__tags">
                {suite.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>

              <div className="suite-card__footer">
                <div className="suite-stat">
                  <span className="suite-stat__value">{suite.caseCount}</span>
                  <span className="suite-stat__label">test cases</span>
                </div>
                <span className="suite-card__date">Updated {formatDate(suite.updatedAt)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
