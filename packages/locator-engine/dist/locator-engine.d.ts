import { ILocatorEngine, LocatorDescriptor, LocatorCandidate, LocatorContext } from '@testforge/core';
import { SemanticAnalyzer } from './semantic/semantic-analyzer';
/**
 * SemanticLocatorEngine — resolves the best locator for a descriptor
 * using multi-candidate generation, AI-assisted semantic analysis,
 * and confidence scoring.
 */
export declare class SemanticLocatorEngine implements ILocatorEngine {
    private readonly analyzer;
    constructor(analyzer?: SemanticAnalyzer);
    /**
     * Resolve and score all candidates for a descriptor.
     * Returns candidates sorted by descending confidence.
     */
    resolve(descriptor: LocatorDescriptor, context: LocatorContext): Promise<LocatorCandidate[]>;
    /**
     * Generate locator candidates from an AI/context hint.
     */
    generateCandidates(hint: string, context: LocatorContext): Promise<LocatorCandidate[]>;
    private buildScoringContext;
}
//# sourceMappingURL=locator-engine.d.ts.map