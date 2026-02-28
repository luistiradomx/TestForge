import { VisualSnapshot, VisualComparison } from '@testforge/core';
import { BaselineManager } from './baseline-manager';
import { DiffAnalyzer } from './diff-analyzer';

/**
 * VisualRegressionService orchestrates baseline management and diff analysis.
 */
export class VisualRegressionService {
  private readonly baselineManager: BaselineManager;
  private readonly diffAnalyzer: DiffAnalyzer;
  private comparisonCounter = 0;

  constructor(
    baselineManager?: BaselineManager,
    diffAnalyzer?: DiffAnalyzer
  ) {
    this.baselineManager = baselineManager ?? new BaselineManager();
    this.diffAnalyzer = diffAnalyzer ?? new DiffAnalyzer();
  }

  /**
   * Compare a snapshot against its baseline.
   * If no baseline exists, the snapshot becomes the new baseline.
   */
  compare(snapshot: VisualSnapshot): VisualComparison | null {
    if (!this.baselineManager.hasBaseline(snapshot.caseId, snapshot.stepId)) {
      this.baselineManager.setBaseline(snapshot);
      return null; // First run — no comparison possible yet
    }

    const baseline = this.baselineManager.getBaseline(snapshot.caseId, snapshot.stepId)!;
    this.comparisonCounter++;
    return this.diffAnalyzer.analyze({ snapshot, baseline }, `cmp-${this.comparisonCounter}`);
  }

  updateBaseline(snapshot: VisualSnapshot): void {
    this.baselineManager.setBaseline(snapshot);
  }
}
