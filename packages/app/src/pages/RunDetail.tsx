import { useParams, Link } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';
import { MOCK_RUNS, MOCK_RUN_RESULTS } from '../types/mock-data';
import type { RunStatus } from '../types';
import './RunDetail.css';

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
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

const STEP_TYPE_ICONS: Record<string, string> = {
  ui: '🖱', api: '⬡', assertion: '✓', wait: '⏱', script: '⌨',
};

const STATUS_ICONS: Record<RunStatus, string> = {
  passed: '✓', failed: '✗', running: '◎', queued: '○', aborted: '⚠', skipped: '—',
};

export function RunDetail() {
  const { runId } = useParams<{ runId: string }>();
  const run = MOCK_RUNS.find(r => r.id === runId);
  const results = MOCK_RUN_RESULTS[runId ?? ''] ?? [];

  if (!run) {
    return (
      <div className="page-content">
        <p className="not-found">Run <code>{runId}</code> not found. <Link to="/runs">← Back to runs</Link></p>
      </div>
    );
  }

  return (
    <div className="page-content">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/runs" className="breadcrumb__link">Test Runs</Link>
        <span className="breadcrumb__sep">›</span>
        <span className="breadcrumb__current">{run.id}</span>
      </div>

      {/* Run header */}
      <div className="run-header">
        <div className="run-header__main">
          <h1 className="run-header__title">{run.projectName}</h1>
          <div className="run-header__meta">
            <code className="branch-tag">{run.branch}</code>
            {run.commitSha && <code className="commit-tag">{run.commitSha}</code>}
            <span className="trigger-badge">{run.triggeredBy.replace(/-/g, ' ')}</span>
          </div>
        </div>
        <StatusBadge status={run.status} />
      </div>

      {/* Stats bar */}
      <div className="run-stats">
        <div className="run-stat">
          <span className="run-stat__value">{run.totalCases}</span>
          <span className="run-stat__label">Total Cases</span>
        </div>
        <div className="run-stat run-stat--pass">
          <span className="run-stat__value">{run.passedCases}</span>
          <span className="run-stat__label">Passed</span>
        </div>
        <div className="run-stat run-stat--fail">
          <span className="run-stat__value">{run.failedCases}</span>
          <span className="run-stat__label">Failed</span>
        </div>
        <div className="run-stat">
          <span className="run-stat__value">{Math.round(run.passRate * 100)}%</span>
          <span className="run-stat__label">Pass Rate</span>
        </div>
        <div className="run-stat">
          <span className="run-stat__value">{formatDuration(run.duration)}</span>
          <span className="run-stat__label">Duration</span>
        </div>
        <div className="run-stat">
          <span className="run-stat__value">{formatDate(run.startedAt)}</span>
          <span className="run-stat__label">Started</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="run-progress">
        <div
          className="run-progress__bar run-progress__bar--pass"
          style={{ width: `${(run.passedCases / run.totalCases) * 100}%` }}
        />
        <div
          className="run-progress__bar run-progress__bar--fail"
          style={{ width: `${(run.failedCases / run.totalCases) * 100}%` }}
        />
      </div>

      {/* Test case results */}
      {results.length > 0 ? (
        <div className="cases-list">
          <h2 className="section-title">Test Cases</h2>
          {results.map(result => (
            <details key={result.caseId} className={`case-card case-card--${result.status}`} open={result.status === 'failed'}>
              <summary className="case-card__summary">
                <span className={`case-icon case-icon--${result.status}`}>
                  {STATUS_ICONS[result.status]}
                </span>
                <span className="case-name">{result.caseName}</span>
                <StatusBadge status={result.status} />
                <span className="case-duration">{formatDuration(result.duration)}</span>
              </summary>

              {result.error && (
                <div className="case-error">
                  <span className="case-error__type">{result.error.type}</span>
                  <code className="case-error__msg">{result.error.message}</code>
                </div>
              )}

              <div className="steps-timeline">
                {result.steps.map(step => (
                  <div key={step.stepId} className={`step-item step-item--${step.status}`}>
                    <span className="step-number">{step.order}</span>
                    <span className="step-type-icon">{STEP_TYPE_ICONS[step.type] ?? '○'}</span>
                    <div className="step-body">
                      <span className="step-command">{step.command}</span>
                      {step.locatorUsed && (
                        <code className="step-locator">{step.locatorUsed}</code>
                      )}
                    </div>
                    <span className={`step-status step-status--${step.status}`}>
                      {STATUS_ICONS[step.status]}
                    </span>
                    <span className="step-duration">{formatDuration(step.duration)}</span>
                    {step.error && (
                      <div className="step-error">{step.error.message}</div>
                    )}
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No detailed case results available for this run.</p>
          <p className="no-results__sub">Results appear once the run has finished executing.</p>
        </div>
      )}
    </div>
  );
}
