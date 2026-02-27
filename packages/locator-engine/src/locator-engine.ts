import {
  ILocatorEngine,
  LocatorDescriptor,
  LocatorCandidate,
  LocatorContext,
} from '@testforge/core';
import { SemanticAnalyzer } from './semantic/semantic-analyzer';
import { scoreCandidate, rankCandidates, ScoringContext } from './scoring/candidate-scorer';

/**
 * Default scoring context when no real browser context is available
 * (e.g. during offline analysis).
 */
const DEFAULT_SCORING_CONTEXT: ScoringContext = {
  elementFound: true,
  isVisible: true,
  uniqueness: 1,
  isResilient: false,
};

/**
 * SemanticLocatorEngine — resolves the best locator for a descriptor
 * using multi-candidate generation, AI-assisted semantic analysis,
 * and confidence scoring.
 */
export class SemanticLocatorEngine implements ILocatorEngine {
  private readonly analyzer: SemanticAnalyzer;

  constructor(analyzer?: SemanticAnalyzer) {
    this.analyzer = analyzer ?? new SemanticAnalyzer();
  }

  /**
   * Resolve and score all candidates for a descriptor.
   * Returns candidates sorted by descending confidence.
   */
  async resolve(
    descriptor: LocatorDescriptor,
    context: LocatorContext
  ): Promise<LocatorCandidate[]> {
    const scoringCtx = this.buildScoringContext(context);

    const scored = descriptor.candidates.map(candidate => ({
      ...candidate,
      score: scoreCandidate(candidate, scoringCtx),
    }));

    return rankCandidates(scored);
  }

  /**
   * Generate locator candidates from an AI/context hint.
   */
  async generateCandidates(
    hint: string,
    context: LocatorContext
  ): Promise<LocatorCandidate[]> {
    const raw = this.analyzer.generateCandidates(hint, context);
    const scoringCtx = this.buildScoringContext(context);

    const scored = raw.map(candidate => ({
      ...candidate,
      score: scoreCandidate(candidate, scoringCtx),
    }));

    return rankCandidates(scored);
  }

  private buildScoringContext(context: LocatorContext): ScoringContext {
    return {
      ...DEFAULT_SCORING_CONTEXT,
      uniqueness: context.accessibilityTree ? 0.9 : 0.7,
    };
  }
}
