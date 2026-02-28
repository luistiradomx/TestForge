import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';
import { MOCK_RUNS } from '../types/mock-data';
import type { RunStatus } from '../types';
import './Runs.css';

function formatDuration(ms: number): string {
  if (!ms) return '—';
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${m}m ${s}s`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

const STATUSES: Array<RunStatus | 'all'> = ['all', 'passed', 'failed', 'running', 'aborted', 'skipped', 'queued'];

export function Runs() {
  const [filterStatus, setFilterStatus] = useState<RunStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = MOCK_RUNS.filter(run => {
    if (filterStatus !== 'all' && run.status !== filterStatus) return false;
    if (search && !run.projectName.toLowerCase().includes(search.toLowerCase()) &&
        !run.branch.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="page-content">
      <header className="page-header">
        <div>
          <h1 className="page-title">Test Runs</h1>
          <span className="page-subtitle">{filtered.length} of {MOCK_RUNS.length} runs</span>
        </div>
        <button className="btn btn--primary">▶ New Run</button>
      </header>

      {/* Filters */}
      <div className="filters-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search by project or branch…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="status-filters">
          {STATUSES.map(s => (
            <button
              key={s}
              className={`filter-btn${filterStatus === s ? ' filter-btn--active' : ''}`}
              onClick={() => setFilterStatus(s)}
            >
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Runs table */}
      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Run ID</th>
              <th>Project</th>
              <th>Branch</th>
              <th>Trigger</th>
              <th>Status</th>
              <th>Pass Rate</th>
              <th>Cases</th>
              <th>Duration</th>
              <th>Started</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="empty-row">No runs match the current filters.</td>
              </tr>
            ) : (
              filtered.map(run => (
                <tr key={run.id}>
                  <td>
                    <Link to={`/runs/${run.id}`} className="table-link mono">
                      {run.id}
                    </Link>
                  </td>
                  <td className="fw-medium">{run.projectName}</td>
                  <td><code className="branch-tag">{run.branch}</code></td>
                  <td>
                    <span className="trigger-tag">
                      {run.triggeredBy.replace('-', ' ')}
                    </span>
                  </td>
                  <td><StatusBadge status={run.status} /></td>
                  <td>
                    <div className="pass-rate">
                      <div className="pass-rate__bar-wrap">
                        <div className="pass-rate__bar" style={{ width: `${run.passRate * 100}%` }} />
                      </div>
                      <span>{Math.round(run.passRate * 100)}%</span>
                    </div>
                  </td>
                  <td>
                    <span className="cases-count">
                      <span className="cases-count__passed">{run.passedCases}</span>
                      <span className="cases-count__sep">/</span>
                      {run.totalCases}
                    </span>
                  </td>
                  <td>{formatDuration(run.duration)}</td>
                  <td className="text-muted">{formatDate(run.startedAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
