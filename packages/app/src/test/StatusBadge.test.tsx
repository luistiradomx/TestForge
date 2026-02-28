import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusBadge } from '../components/StatusBadge';

describe('StatusBadge', () => {
  it('renders "Passed" for passed status', () => {
    render(<StatusBadge status="passed" />);
    expect(screen.getByText('Passed')).toBeTruthy();
  });

  it('renders "Failed" for failed status', () => {
    render(<StatusBadge status="failed" />);
    expect(screen.getByText('Failed')).toBeTruthy();
  });

  it('renders "Running" with the correct class', () => {
    const { container } = render(<StatusBadge status="running" />);
    expect(container.querySelector('.status-badge--running')).toBeTruthy();
  });

  it('renders a pulse dot for running status', () => {
    const { container } = render(<StatusBadge status="running" />);
    expect(container.querySelector('.status-badge__dot')).toBeTruthy();
  });

  it('does not render a pulse dot for non-running status', () => {
    const { container } = render(<StatusBadge status="passed" />);
    expect(container.querySelector('.status-badge__dot')).toBeNull();
  });

  const statuses = ['queued', 'running', 'passed', 'failed', 'aborted', 'skipped'] as const;
  statuses.forEach(status => {
    it(`applies correct CSS class for status "${status}"`, () => {
      const { container } = render(<StatusBadge status={status} />);
      expect(container.querySelector(`.status-badge--${status}`)).toBeTruthy();
    });
  });
});
