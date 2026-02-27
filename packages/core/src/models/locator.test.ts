import { LocatorDescriptor, LocatorCandidate, LocatorStrategy } from './locator';

describe('Locator models', () => {
  it('should create a valid LocatorDescriptor', () => {
    const candidate: LocatorCandidate = {
      strategy: 'css' as LocatorStrategy,
      value: '#submit-btn',
      score: 0.95,
      rationale: 'Unique ID selector',
    };
    const descriptor: LocatorDescriptor = {
      id: 'loc-1',
      candidates: [candidate],
      resolved: candidate,
    };
    expect(descriptor.candidates.length).toBe(1);
    expect(descriptor.resolved?.score).toBe(0.95);
  });

  it('should support all locator strategies', () => {
    const strategies: LocatorStrategy[] = [
      'css', 'xpath', 'aria-label', 'test-id', 'text', 'semantic', 'accessibility-tree', 'visual',
    ];
    expect(strategies.length).toBe(8);
  });
});
