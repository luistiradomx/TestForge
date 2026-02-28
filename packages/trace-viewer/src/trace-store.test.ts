import { TraceStore } from './trace-store';
import { Trace, TraceMetadata } from '@testforge/core';

const meta: TraceMetadata = {
  browser: 'chromium', browserVersion: '120', platform: 'linux',
  viewportWidth: 1280, viewportHeight: 720, userAgent: 'TestForge',
};

const makeTrace = (id: string, runId = 'run-1'): Trace => ({
  id, runId, caseId: 'case-1', steps: [], metadata: meta, createdAt: new Date(),
});

describe('TraceStore', () => {
  it('saves and retrieves traces', () => {
    const store = new TraceStore();
    store.save(makeTrace('t1'));
    expect(store.get('t1')).toBeDefined();
    expect(store.count()).toBe(1);
  });

  it('filters by runId', () => {
    const store = new TraceStore();
    store.save(makeTrace('t1', 'run-a'));
    store.save(makeTrace('t2', 'run-b'));
    expect(store.getByRunId('run-a').length).toBe(1);
  });

  it('deletes traces', () => {
    const store = new TraceStore();
    store.save(makeTrace('t1'));
    expect(store.delete('t1')).toBe(true);
    expect(store.count()).toBe(0);
  });
});
