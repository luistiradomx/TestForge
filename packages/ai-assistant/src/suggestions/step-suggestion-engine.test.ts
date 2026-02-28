import { StepSuggestionEngine } from './step-suggestion-engine';

describe('StepSuggestionEngine', () => {
  const engine = new StepSuggestionEngine();
  const context = { url: 'https://example.com' };

  it('suggests click step for click intent', () => {
    const suggestions = engine.suggest({ intent: 'click the login button', context });
    expect(suggestions.some(s => s.step.action.command === 'click')).toBe(true);
  });

  it('suggests assertion for verify intent', () => {
    const suggestions = engine.suggest({ intent: 'verify the form is visible', context });
    expect(suggestions.some(s => s.step.type === 'assertion')).toBe(true);
  });

  it('suggests navigation for navigate intent', () => {
    const suggestions = engine.suggest({ intent: 'navigate to dashboard', context });
    expect(suggestions.some(s => s.step.action.command === 'navigate')).toBe(true);
  });

  it('suggests wait step for wait intent', () => {
    const suggestions = engine.suggest({ intent: 'wait until modal appears', context });
    expect(suggestions.some(s => s.step.type === 'wait')).toBe(true);
  });

  it('returns suggestions sorted by confidence descending', () => {
    const suggestions = engine.suggest({ intent: 'navigate to login', context });
    for (let i = 1; i < suggestions.length; i++) {
      expect(suggestions[i - 1].confidence).toBeGreaterThanOrEqual(suggestions[i].confidence);
    }
  });

  it('returns generic suggestion for unknown intent', () => {
    const suggestions = engine.suggest({ intent: 'do something unusual', context });
    expect(suggestions.length).toBeGreaterThan(0);
  });
});
