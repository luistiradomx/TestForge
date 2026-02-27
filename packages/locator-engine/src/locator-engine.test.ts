import { SemanticLocatorEngine } from './locator-engine';
import { LocatorDescriptor, LocatorContext } from '@testforge/core';

describe('SemanticLocatorEngine', () => {
  const engine = new SemanticLocatorEngine();

  it('resolves candidates sorted by score', async () => {
    const descriptor: LocatorDescriptor = {
      id: 'loc-1',
      candidates: [
        { strategy: 'css', value: '.btn', score: 0 },
        { strategy: 'test-id', value: '[data-testid="submit"]', score: 0 },
      ],
    };
    const context: LocatorContext = {};
    const results = await engine.resolve(descriptor, context);
    expect(results[0].score).toBeGreaterThanOrEqual(results[1].score);
  });

  it('generates candidates from hint', async () => {
    const context: LocatorContext = { url: 'https://example.com' };
    const candidates = await engine.generateCandidates('Submit Button', context);
    expect(candidates.length).toBeGreaterThan(0);
    expect(candidates[0].value).toBeDefined();
  });

  it('generates more candidates when accessibility tree provided', async () => {
    const context: LocatorContext = {
      accessibilityTree: 'role=button[name="Submit Button"]',
    };
    const candidates = await engine.generateCandidates('Submit Button', context);
    const strategies = candidates.map(c => c.strategy);
    expect(strategies).toContain('accessibility-tree');
  });
});
