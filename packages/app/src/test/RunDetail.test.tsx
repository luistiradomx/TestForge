import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { RunDetail } from '../pages/RunDetail';

function renderRunDetail(runId: string) {
  return render(
    <MemoryRouter initialEntries={[`/runs/${runId}`]}>
      <Routes>
        <Route path="/runs/:runId" element={<RunDetail />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('RunDetail page', () => {
  it('renders project name for a known run', () => {
    renderRunDetail('run-1');
    expect(screen.getByText('E-Commerce Platform')).toBeTruthy();
  });

  it('shows the run stats bar', () => {
    renderRunDetail('run-1');
    expect(screen.getByText('Total Cases')).toBeTruthy();
    expect(screen.getByText('Pass Rate')).toBeTruthy();
  });

  it('shows test case results when available', () => {
    renderRunDetail('run-1');
    expect(screen.getByText('Test Cases')).toBeTruthy();
    expect(screen.getByText('User can log in with valid credentials')).toBeTruthy();
  });

  it('shows error details for failed case', () => {
    renderRunDetail('run-2');
    expect(screen.getByText('Checkout completes with Stripe')).toBeTruthy();
  });

  it('shows not found message for unknown run ID', () => {
    renderRunDetail('run-nonexistent');
    expect(screen.getByText(/not found/i)).toBeTruthy();
  });

  it('shows breadcrumb with link back to runs', () => {
    renderRunDetail('run-1');
    const link = screen.getByText('Test Runs');
    expect(link.getAttribute('href')).toBe('/runs');
  });
});
