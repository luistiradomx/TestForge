/**
 * Multi-strategy locator descriptor used by the semantic locator engine.
 */
export interface LocatorDescriptor {
    id: string;
    candidates: LocatorCandidate[];
    /** Best candidate selected after scoring */
    resolved?: LocatorCandidate;
}
export interface LocatorCandidate {
    strategy: LocatorStrategy;
    value: string;
    /** Confidence score 0–1 assigned by the scoring engine */
    score: number;
    /** Human-readable reason for this candidate */
    rationale?: string;
}
export type LocatorStrategy = 'css' | 'xpath' | 'aria-label' | 'test-id' | 'text' | 'semantic' | 'accessibility-tree' | 'visual';
//# sourceMappingURL=locator.d.ts.map