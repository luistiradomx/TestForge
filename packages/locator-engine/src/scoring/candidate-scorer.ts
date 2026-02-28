import { LocatorCandidate, LocatorStrategy } from '@testforge/core';

/**
 * Strategy weights used when scoring locator candidates.
 * Higher weight = more reliable/preferred strategy.
 */
const STRATEGY_WEIGHTS: Record<LocatorStrategy, number> = {
  'test-id': 1.0,
  'aria-label': 0.92,
  'accessibility-tree': 0.88,
  semantic: 0.85,
  text: 0.75,
  css: 0.65,
  xpath: 0.55,
  visual: 0.45,
};

export interface ScoringContext {
  /** Whether the element was found in the current DOM */
  elementFound: boolean;
  /** Whether the element is currently visible */
  isVisible: boolean;
  /** Uniqueness: 1 = unique, 0 = not unique */
  uniqueness: number;
  /** Whether the selector is resilient to minor DOM changes */
  isResilient: boolean;
}

/**
 * Scores a locator candidate based on strategy weight and runtime context.
 */
export function scoreCandidate(
  candidate: LocatorCandidate,
  context: ScoringContext
): number {
  const strategyWeight = STRATEGY_WEIGHTS[candidate.strategy] ?? 0.5;

  let score = strategyWeight;

  if (!context.elementFound) return 0;
  if (!context.isVisible) score *= 0.6;
  score *= context.uniqueness;
  if (context.isResilient) score *= 1.1;

  return Math.min(1, Math.max(0, score));
}

/**
 * Sort candidates by descending score.
 */
export function rankCandidates(candidates: LocatorCandidate[]): LocatorCandidate[] {
  return [...candidates].sort((a, b) => b.score - a.score);
}

/**
 * Select the best candidate above a confidence threshold.
 */
export function selectBestCandidate(
  candidates: LocatorCandidate[],
  threshold = 0.5
): LocatorCandidate | null {
  const ranked = rankCandidates(candidates);
  const best = ranked[0];
  if (!best || best.score < threshold) return null;
  return best;
}
