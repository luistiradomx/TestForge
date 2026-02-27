import { LocatorCandidate } from '@testforge/core';
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
export declare function scoreCandidate(candidate: LocatorCandidate, context: ScoringContext): number;
/**
 * Sort candidates by descending score.
 */
export declare function rankCandidates(candidates: LocatorCandidate[]): LocatorCandidate[];
/**
 * Select the best candidate above a confidence threshold.
 */
export declare function selectBestCandidate(candidates: LocatorCandidate[], threshold?: number): LocatorCandidate | null;
//# sourceMappingURL=candidate-scorer.d.ts.map