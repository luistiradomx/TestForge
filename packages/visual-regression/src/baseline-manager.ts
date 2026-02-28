import { VisualSnapshot } from '@testforge/core';

/**
 * Manages baseline screenshots used for visual regression comparisons.
 */
export class BaselineManager {
  private readonly baselines = new Map<string, VisualSnapshot>();

  /**
   * Registers a snapshot as a new baseline. Key = `caseId:stepId`.
   */
  setBaseline(snapshot: VisualSnapshot): void {
    const key = this.buildKey(snapshot.caseId, snapshot.stepId);
    this.baselines.set(key, snapshot);
  }

  getBaseline(caseId: string, stepId: string): VisualSnapshot | undefined {
    return this.baselines.get(this.buildKey(caseId, stepId));
  }

  hasBaseline(caseId: string, stepId: string): boolean {
    return this.baselines.has(this.buildKey(caseId, stepId));
  }

  removeBaseline(caseId: string, stepId: string): boolean {
    return this.baselines.delete(this.buildKey(caseId, stepId));
  }

  count(): number {
    return this.baselines.size;
  }

  private buildKey(caseId: string, stepId: string): string {
    return `${caseId}:${stepId}`;
  }
}
