import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AIAssistant } from '../pages/AIAssistant';

describe('AIAssistant page', () => {
  it('renders the page title', () => {
    render(<AIAssistant />);
    expect(screen.getByText('AI Assistant')).toBeTruthy();
  });

  it('shows the empty state before generation', () => {
    render(<AIAssistant />);
    expect(screen.getByText('Enter an intent and click "Generate Steps"')).toBeTruthy();
  });

  it('Generate button is disabled when intent is empty', () => {
    render(<AIAssistant />);
    const btn = screen.getByText('✦ Generate Steps');
    expect((btn as HTMLButtonElement).disabled).toBe(true);
  });

  it('Generate button becomes enabled when intent is typed', () => {
    render(<AIAssistant />);
    const textarea = screen.getByPlaceholderText('Describe what the test should do…');
    fireEvent.change(textarea, { target: { value: 'click the login button' } });
    const btn = screen.getByText('✦ Generate Steps');
    expect((btn as HTMLButtonElement).disabled).toBe(false);
  });

  it('fills the intent field when an example pill is clicked', () => {
    render(<AIAssistant />);
    const pill = screen.getByText('click the login button');
    fireEvent.click(pill);
    const textarea = screen.getByPlaceholderText('Describe what the test should do…') as HTMLTextAreaElement;
    expect(textarea.value).toBe('click the login button');
  });

  it('shows the "How it works" section', () => {
    render(<AIAssistant />);
    expect(screen.getByText('How it works')).toBeTruthy();
  });
});
