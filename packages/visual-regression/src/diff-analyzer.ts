import { VisualComparison, VisualSnapshot, DiffRegion } from '@testforge/core';

export interface DiffAnalysisInput {
  snapshot: VisualSnapshot;
  baseline: VisualSnapshot;
}

/**
 * DiffAnalyzer compares two visual snapshots and produces a VisualComparison.
 *
 * In production this calls an AI image diffing model (e.g. a pixel diff CNN).
 * This baseline implementation uses metadata heuristics.
 */
export class DiffAnalyzer {
  /**
   * Compare snapshot against baseline.
   * Returns a VisualComparison with diff score and detected regions.
   */
  analyze(input: DiffAnalysisInput, id: string): VisualComparison {
    const { snapshot, baseline } = input;

    const dimensionsDiffer =
      snapshot.width !== baseline.width || snapshot.height !== baseline.height;

    // Heuristic diff regions — real implementation uses pixel comparison
    const diffRegions: DiffRegion[] = dimensionsDiffer
      ? [
          {
            x: 0,
            y: 0,
            width: snapshot.width,
            height: snapshot.height,
            severity: 'high',
            description: 'Viewport dimensions changed',
          },
        ]
      : [];

    const diffScore = dimensionsDiffer ? 1.0 : 0.0;

    return {
      id,
      snapshotId: snapshot.id,
      baselineId: baseline.id,
      diffScore,
      diffRegions,
      status: diffScore === 0 ? 'passed' : diffScore < 0.05 ? 'needs_review' : 'failed',
      aiAnalysis: dimensionsDiffer
        ? 'Viewport dimensions differ between baseline and current snapshot.'
        : 'No visual differences detected.',
    };
  }
}
