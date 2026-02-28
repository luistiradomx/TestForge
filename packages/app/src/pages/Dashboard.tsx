import { Link } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';
import { MOCK_STATS } from '../types/mock-data';
import './Dashboard.css';

function formatDuration(ms: number): string {
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

const STAT_CARDS = [
  { label: 'Total Projects',  value: MOCK_STATS.totalProjects, color: '#6366f1', icon: '⬡' },
  { label: 'Total Runs',      value: MOCK_STATS.totalRuns,     color: '#0ea5e9', icon: '▶' },
  { label: 'Pass Rate',       value: `${Math.round(MOCK_STATS.passRate * 100)}%`, color: '#10b981', icon: '✓' },
  { label: 'Active Runs',     value: MOCK_STATS.activeRuns,    color: '#f59e0b', icon: '◎' },
];

const STATUS_COLORS: Record<string, string> = {
  passed: '#10b981', failed: '#ef4444', running: '#3b82f6',
  aborted: '#f59e0b', queued: '#94a3b8', skipped: '#94a3b8',
};

export function Dashboard() {
  const { runsByStatus, recentRuns } = MOCK_STATS;
  const totalForChart = Object.values(runsByStatus).reduce((a, b) => a + b, 0);

  return (
    <div className="dashboard">
      <header className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <span className="page-subtitle">Platform overview</span>
      </header>

      {/* Stat cards */}
      <div className="stat-grid">
        {STAT_CARDS.map(card => (
          <div key={card.label} className="stat-card" style={{ '--accent': card.color } as React.CSSProperties}>
            <div className="stat-card__icon">{card.icon}</div>
            <div className="stat-card__body">
              <span className="stat-card__value">{card.value}</span>
              <span className="stat-card__label">{card.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard__row">
        {/* Status chart */}
        <div className="card">
          <div className="card__header">
            <h2 className="card__title">Runs by Status</h2>
          </div>
          <div className="status-chart">
            {Object.entries(runsByStatus).filter(([, v]) => v > 0).map(([status, count]) => (
              <div key={status} className="status-chart__item">
                <div className="status-chart__bar-wrap">
                  <div
                    className="status-chart__bar"
                    style={{
                      width: `${(count / totalForChart) * 100}%`,
                      background: STATUS_COLORS[status] ?? '#94a3b8',
                    }}
                  />
                </div>
                <span className="status-chart__label">{status}</span>
                <span className="status-chart__count">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent runs */}
        <div className="card card--wide">
          <div className="card__header">
            <h2 className="card__title">Recent Runs</h2>
            <Link to="/runs" className="card__link">View all →</Link>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Branch</th>
                <th>Status</th>
                <th>Pass Rate</th>
                <th>Duration</th>
                <th>Started</th>
              </tr>
            </thead>
            <tbody>
              {recentRuns.map(run => (
                <tr key={run.id}>
                  <td>
                    <Link to={`/runs/${run.id}`} className="table-link">
                      {run.projectName}
                    </Link>
                  </td>
                  <td><code className="branch-tag">{run.branch}</code></td>
                  <td><StatusBadge status={run.status} /></td>
                  <td>
                    <div className="pass-rate">
                      <div className="pass-rate__bar-wrap">
                        <div
                          className="pass-rate__bar"
                          style={{ width: `${run.passRate * 100}%` }}
                        />
                      </div>
                      <span>{Math.round(run.passRate * 100)}%</span>
                    </div>
                  </td>
                  <td>{run.duration ? formatDuration(run.duration) : '—'}</td>
                  <td className="text-muted">{formatDate(run.startedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
