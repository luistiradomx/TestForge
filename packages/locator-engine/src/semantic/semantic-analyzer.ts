import { LocatorCandidate, LocatorContext } from '@testforge/core';

/**
 * Analyzes the accessibility tree and page context to generate semantic
 * locator candidates. This is an AI-friendly component designed to be
 * enhanced with an LLM provider at runtime.
 */
export class SemanticAnalyzer {
  /**
   * Generate locator candidates from a human-readable hint and page context.
   * In production this integrates with an AI model. Here we provide a
   * rule-based baseline implementation.
   */
  generateCandidates(hint: string, context: LocatorContext): LocatorCandidate[] {
    const candidates: LocatorCandidate[] = [];

    const normalized = hint.toLowerCase().trim();

    // Rule 1: data-testid pattern
    candidates.push({
      strategy: 'test-id',
      value: `[data-testid="${normalized.replace(/\s+/g, '-')}"]`,
      score: 0,
      rationale: 'Generated from hint as kebab-case test ID',
    });

    // Rule 2: aria-label
    candidates.push({
      strategy: 'aria-label',
      value: `[aria-label="${hint}"]`,
      score: 0,
      rationale: 'Direct aria-label match',
    });

    // Rule 3: visible text match
    candidates.push({
      strategy: 'text',
      value: hint,
      score: 0,
      rationale: 'Visible text content match',
    });

    // Rule 4: CSS class heuristic from accessibility tree
    if (context.accessibilityTree) {
      const treeHint = this.extractFromAccessibilityTree(hint, context.accessibilityTree);
      if (treeHint) {
        candidates.push(treeHint);
      }
    }

    return candidates;
  }

  /**
   * Extract a locator hint from the accessibility tree snapshot.
   */
  private extractFromAccessibilityTree(
    hint: string,
    tree: string
  ): LocatorCandidate | null {
    const normalized = hint.toLowerCase();
    // Simple heuristic: look for the hint text in the tree
    if (tree.toLowerCase().includes(normalized)) {
      return {
        strategy: 'accessibility-tree',
        value: `role=button[name="${hint}"]`,
        score: 0,
        rationale: 'Matched in accessibility tree',
      };
    }
    return null;
  }
}
