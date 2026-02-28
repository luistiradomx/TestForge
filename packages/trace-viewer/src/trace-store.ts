import { Trace } from '@testforge/core';

/**
 * In-memory trace store — production implementations should use a persistent backend.
 */
export class TraceStore {
  private readonly store = new Map<string, Trace>();

  save(trace: Trace): void {
    this.store.set(trace.id, trace);
  }

  get(id: string): Trace | undefined {
    return this.store.get(id);
  }

  getByRunId(runId: string): Trace[] {
    return Array.from(this.store.values()).filter(t => t.runId === runId);
  }

  delete(id: string): boolean {
    return this.store.delete(id);
  }

  count(): number {
    return this.store.size;
  }
}
