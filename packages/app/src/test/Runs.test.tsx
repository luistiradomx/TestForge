import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Runs } from '../pages/Runs';

describe('Runs page', () => {
  function renderRuns() {
    return render(
      <MemoryRouter>
        <Runs />
      </MemoryRouter>
    );
  }

  it('renders the page title', () => {
    renderRuns();
    expect(screen.getByText('Test Runs')).toBeTruthy();
  });

  it('shows all mock runs by default', () => {
    renderRuns();
    // There are 6 mock runs from 3 projects
    expect(screen.getAllByText('E-Commerce Platform').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Payment Gateway API').length).toBeGreaterThan(0);
  });

  it('filters runs by search text', () => {
    renderRuns();
    const searchInput = screen.getByPlaceholderText('Search by project or branch…');
    fireEvent.change(searchInput, { target: { value: 'Mobile' } });
    expect(screen.getByText('Mobile App (iOS/Android)')).toBeTruthy();
    expect(screen.queryByText('Payment Gateway API')).toBeNull();
  });

  it('filters runs by status', () => {
    renderRuns();
    const failedBtn = screen.getByText('failed');
    fireEvent.click(failedBtn);
    // Only failed runs should show
    const rows = screen.getAllByRole('row');
    // header + at least 1 failed row
    expect(rows.length).toBeGreaterThanOrEqual(2);
  });

  it('shows "All" filter as active by default', () => {
    renderRuns();
    const allBtn = screen.getByText('All');
    expect(allBtn.classList.contains('filter-btn--active')).toBe(true);
  });
});
