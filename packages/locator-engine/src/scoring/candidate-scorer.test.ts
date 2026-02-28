import { scoreCandidate, rankCandidates, selectBestCandidate } from './candidate-scorer';
import { LocatorCandidate } from '@testforge/core';

const makeCandidate = (strategy: LocatorCandidate['strategy'], score = 0): LocatorCandidate => ({
  strategy,
  value: `test-value`,
  score,
});

describe('scoreCandidate', () => {
  it('returns 0 when element not found', () => {
    const candidate = makeCandidate('css');
    const score = scoreCandidate(candidate, {
      elementFound: false,
      isVisible: true,
      uniqueness: 1,
      isResilient: false,
    });
    expect(score).toBe(0);
  });

  it('returns highest score for test-id strategy', () => {
    const ctx = { elementFound: true, isVisible: true, uniqueness: 1, isResilient: false };
    const testIdScore = scoreCandidate(makeCandidate('test-id'), ctx);
    const cssScore = scoreCandidate(makeCandidate('css'), ctx);
    expect(testIdScore).toBeGreaterThan(cssScore);
  });

  it('applies uniqueness factor', () => {
    const ctx1 = { elementFound: true, isVisible: true, uniqueness: 1, isResilient: false };
    const ctx2 = { elementFound: true, isVisible: true, uniqueness: 0.5, isResilient: false };
    const s1 = scoreCandidate(makeCandidate('css'), ctx1);
    const s2 = scoreCandidate(makeCandidate('css'), ctx2);
    expect(s1).toBeGreaterThan(s2);
  });

  it('boosts score when resilient', () => {
    const ctx1 = { elementFound: true, isVisible: true, uniqueness: 1, isResilient: false };
    const ctx2 = { elementFound: true, isVisible: true, uniqueness: 1, isResilient: true };
    const s1 = scoreCandidate(makeCandidate('css'), ctx1);
    const s2 = scoreCandidate(makeCandidate('css'), ctx2);
    expect(s2).toBeGreaterThan(s1);
  });
});

describe('rankCandidates', () => {
  it('sorts candidates by descending score', () => {
    const candidates: LocatorCandidate[] = [
      { ...makeCandidate('css'), score: 0.3 },
      { ...makeCandidate('test-id'), score: 0.9 },
      { ...makeCandidate('text'), score: 0.6 },
    ];
    const ranked = rankCandidates(candidates);
    expect(ranked[0].score).toBe(0.9);
    expect(ranked[1].score).toBe(0.6);
    expect(ranked[2].score).toBe(0.3);
  });
});

describe('selectBestCandidate', () => {
  it('returns null when no candidates exceed threshold', () => {
    const candidates: LocatorCandidate[] = [
      { ...makeCandidate('css'), score: 0.3 },
    ];
    expect(selectBestCandidate(candidates, 0.5)).toBeNull();
  });

  it('returns best candidate above threshold', () => {
    const candidates: LocatorCandidate[] = [
      { ...makeCandidate('test-id'), score: 0.95 },
      { ...makeCandidate('css'), score: 0.4 },
    ];
    const best = selectBestCandidate(candidates, 0.5);
    expect(best?.strategy).toBe('test-id');
  });
});
