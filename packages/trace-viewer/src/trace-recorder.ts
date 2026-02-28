import { Trace, TraceStep, TraceMetadata } from '@testforge/core';

/**
 * TraceRecorder captures step-by-step execution data during a test run.
 */
export class TraceRecorder {
  private steps: TraceStep[] = [];
  private startTime: number = Date.now();

  constructor(
    private readonly runId: string,
    private readonly caseId: string,
    private readonly metadata: TraceMetadata
  ) {}

  /**
   * Record a step event.
   */
  record(partial: Omit<TraceStep, 'timestamp'>): void {
    this.steps.push({
      ...partial,
      timestamp: Date.now() - this.startTime,
    });
  }

  /**
   * Finalize and return the complete trace.
   */
  finalize(id: string): Trace {
    return {
      id,
      runId: this.runId,
      caseId: this.caseId,
      steps: [...this.steps],
      metadata: this.metadata,
      createdAt: new Date(),
    };
  }

  getStepCount(): number {
    return this.steps.length;
  }
}
