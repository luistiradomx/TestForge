import { LocatorCandidate, LocatorContext } from '@testforge/core';
/**
 * Analyzes the accessibility tree and page context to generate semantic
 * locator candidates. This is an AI-friendly component designed to be
 * enhanced with an LLM provider at runtime.
 */
export declare class SemanticAnalyzer {
    /**
     * Generate locator candidates from a human-readable hint and page context.
     * In production this integrates with an AI model. Here we provide a
     * rule-based baseline implementation.
     */
    generateCandidates(hint: string, context: LocatorContext): LocatorCandidate[];
    /**
     * Extract a locator hint from the accessibility tree snapshot.
     */
    private extractFromAccessibilityTree;
}
//# sourceMappingURL=semantic-analyzer.d.ts.map