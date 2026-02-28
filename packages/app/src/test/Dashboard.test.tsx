import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';

describe('Dashboard', () => {
  function renderDashboard() {
    return render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
  }

  it('renders the Dashboard title', () => {
    renderDashboard();
    expect(screen.getByText('Dashboard')).toBeTruthy();
  });

  it('shows stat cards with correct labels', () => {
    renderDashboard();
    expect(screen.getByText('Total Projects')).toBeTruthy();
    expect(screen.getByText('Total Runs')).toBeTruthy();
    // Pass Rate appears in both the stat card and the table header column
    expect(screen.getAllByText('Pass Rate').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Active Runs')).toBeTruthy();
  });

  it('shows the "Recent Runs" section heading', () => {
    renderDashboard();
    expect(screen.getByText('Recent Runs')).toBeTruthy();
  });

  it('shows a "View all" link pointing to /runs', () => {
    renderDashboard();
    const link = screen.getByText('View all →');
    expect(link.getAttribute('href')).toBe('/runs');
  });

  it('shows run data rows in the table', () => {
    renderDashboard();
    // E-Commerce Platform appears in mock data
    expect(screen.getAllByText('E-Commerce Platform').length).toBeGreaterThan(0);
  });
});
