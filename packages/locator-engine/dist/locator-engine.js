"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemanticLocatorEngine = void 0;
const semantic_analyzer_1 = require("./semantic/semantic-analyzer");
const candidate_scorer_1 = require("./scoring/candidate-scorer");
/**
 * Default scoring context when no real browser context is available
 * (e.g. during offline analysis).
 */
const DEFAULT_SCORING_CONTEXT = {
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
class SemanticLocatorEngine {
    analyzer;
    constructor(analyzer) {
        this.analyzer = analyzer ?? new semantic_analyzer_1.SemanticAnalyzer();
    }
    /**
     * Resolve and score all candidates for a descriptor.
     * Returns candidates sorted by descending confidence.
     */
    async resolve(descriptor, context) {
        const scoringCtx = this.buildScoringContext(context);
        const scored = descriptor.candidates.map(candidate => ({
            ...candidate,
            score: (0, candidate_scorer_1.scoreCandidate)(candidate, scoringCtx),
        }));
        return (0, candidate_scorer_1.rankCandidates)(scored);
    }
    /**
     * Generate locator candidates from an AI/context hint.
     */
    async generateCandidates(hint, context) {
        const raw = this.analyzer.generateCandidates(hint, context);
        const scoringCtx = this.buildScoringContext(context);
        const scored = raw.map(candidate => ({
            ...candidate,
            score: (0, candidate_scorer_1.scoreCandidate)(candidate, scoringCtx),
        }));
        return (0, candidate_scorer_1.rankCandidates)(scored);
    }
    buildScoringContext(context) {
        return {
            ...DEFAULT_SCORING_CONTEXT,
            uniqueness: context.accessibilityTree ? 0.9 : 0.7,
        };
    }
}
exports.SemanticLocatorEngine = SemanticLocatorEngine;
//# sourceMappingURL=locator-engine.js.map