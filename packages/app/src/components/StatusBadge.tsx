import type { RunStatus } from '../types';
import './StatusBadge.css';

interface Props {
  status: RunStatus;
}

const LABELS: Record<RunStatus, string> = {
  queued:  'Queued',
  running: 'Running',
  passed:  'Passed',
  failed:  'Failed',
  aborted: 'Aborted',
  skipped: 'Skipped',
};

export function StatusBadge({ status }: Props) {
  return (
    <span className={`status-badge status-badge--${status}`}>
      {status === 'running' && <span className="status-badge__dot" />}
      {LABELS[status]}
    </span>
  );
}
