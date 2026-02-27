"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreCandidate = scoreCandidate;
exports.rankCandidates = rankCandidates;
exports.selectBestCandidate = selectBestCandidate;
/**
 * Strategy weights used when scoring locator candidates.
 * Higher weight = more reliable/preferred strategy.
 */
const STRATEGY_WEIGHTS = {
    'test-id': 1.0,
    'aria-label': 0.92,
    'accessibility-tree': 0.88,
    semantic: 0.85,
    text: 0.75,
    css: 0.65,
    xpath: 0.55,
    visual: 0.45,
};
/**
 * Scores a locator candidate based on strategy weight and runtime context.
 */
function scoreCandidate(candidate, context) {
    const strategyWeight = STRATEGY_WEIGHTS[candidate.strategy] ?? 0.5;
    let score = strategyWeight;
    if (!context.elementFound)
        return 0;
    if (!context.isVisible)
        score *= 0.6;
    score *= context.uniqueness;
    if (context.isResilient)
        score *= 1.1;
    return Math.min(1, Math.max(0, score));
}
/**
 * Sort candidates by descending score.
 */
function rankCandidates(candidates) {
    return [...candidates].sort((a, b) => b.score - a.score);
}
/**
 * Select the best candidate above a confidence threshold.
 */
function selectBestCandidate(candidates, threshold = 0.5) {
    const ranked = rankCandidates(candidates);
    const best = ranked[0];
    if (!best || best.score < threshold)
        return null;
    return best;
}
//# sourceMappingURL=candidate-scorer.js.map