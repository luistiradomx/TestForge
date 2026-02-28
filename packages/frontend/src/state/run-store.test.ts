import { RunStore } from './run-store';
import { TestRun, EnvironmentConfig } from '@testforge/core';

const makeRun = (id: string, status: TestRun['status'] = 'passed'): TestRun => ({
  id, projectId: 'p1', suiteIds: [], branch: 'main',
  environment: { id: 'e1', name: 'dev', baseUrl: 'https://example.com', variables: {} } as EnvironmentConfig,
  status, results: [], startedAt: new Date(), triggeredBy: 'manual',
});

describe('RunStore', () => {
  it('stores and retrieves runs', () => {
    const store = new RunStore();
    store.upsert(makeRun('r1'), []);
    expect(store.get('r1')).toBeDefined();
    expect(store.count()).toBe(1);
  });

  it('calculates pass rate', () => {
    const store = new RunStore();
    store.upsert(makeRun('r1'), [
      { caseId: 'c1', runId: 'r1', status: 'passed', steps: [], duration: 100, screenshotIds: [] },
      { caseId: 'c2', runId: 'r1', status: 'failed', steps: [], duration: 50, screenshotIds: [] },
    ]);
    expect(store.get('r1')!.passRate).toBe(0.5);
  });

  it('filters by status', () => {
    const store = new RunStore();
    store.upsert(makeRun('r1', 'passed'));
    store.upsert(makeRun('r2', 'failed'));
    expect(store.getByStatus('passed').length).toBe(1);
    expect(store.getByStatus('failed').length).toBe(1);
  });

  it('notifies subscribers on upsert', () => {
    const store = new RunStore();
    let notified = 0;
    const unsubscribe = store.subscribe(() => notified++);
    store.upsert(makeRun('r1'));
    expect(notified).toBe(1);
    unsubscribe();
    store.upsert(makeRun('r2'));
    expect(notified).toBe(1); // Unsubscribed, no more notifications
  });
});
