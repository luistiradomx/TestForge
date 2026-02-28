import { TestRun, TestCaseResult, RunStatus } from '@testforge/core';

export interface RunSummary {
  run: TestRun;
  results: TestCaseResult[];
  passRate: number;
  duration: number;
}

/**
 * RunStore — in-memory state store for test runs in the frontend.
 * In production: integrate with React Context / Zustand / Redux.
 */
export class RunStore {
  private readonly runs = new Map<string, RunSummary>();
  private readonly listeners: Array<() => void> = [];

  upsert(run: TestRun, results: TestCaseResult[] = []): void {
    const total = results.length;
    const passed = results.filter(r => r.status === 'passed').length;
    const passRate = total === 0 ? 0 : passed / total;
    const duration = results.reduce((sum, r) => sum + r.duration, 0);

    this.runs.set(run.id, { run, results, passRate, duration });
    this.notify();
  }

  get(runId: string): RunSummary | undefined {
    return this.runs.get(runId);
  }

  getAll(): RunSummary[] {
    return Array.from(this.runs.values()).sort(
      (a, b) => b.run.startedAt.getTime() - a.run.startedAt.getTime()
    );
  }

  getByStatus(status: RunStatus): RunSummary[] {
    return this.getAll().filter(s => s.run.status === status);
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      const idx = this.listeners.indexOf(listener);
      if (idx !== -1) this.listeners.splice(idx, 1);
    };
  }

  private notify(): void {
    this.listeners.forEach(l => l());
  }

  count(): number {
    return this.runs.size;
  }
}
