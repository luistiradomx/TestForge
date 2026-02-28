import { TestRunner } from './test-runner';
import { TestCase, TestRun, EnvironmentConfig } from '@testforge/core';

const makeRun = (id = 'run-1'): TestRun => ({
  id,
  projectId: 'proj-1',
  suiteIds: [],
  environment: {
    id: 'env-1',
    name: 'dev',
    baseUrl: 'https://example.com',
    variables: {},
  } as EnvironmentConfig,
  branch: 'main',
  status: 'running',
  results: [],
  startedAt: new Date(),
  triggeredBy: 'manual',
});

const makeCase = (id = 'case-1'): TestCase => ({
  id,
  name: 'My Test',
  suiteId: 'suite-1',
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'ui',
      action: { command: 'click', parameters: {} },
    },
    {
      id: 'step-2',
      order: 2,
      type: 'assertion',
      action: { command: 'assert_visible', parameters: {} },
    },
  ],
  metadata: {},
  createdAt: new Date(),
  updatedAt: new Date(),
});

describe('TestRunner', () => {
  it('executes a case and returns passed result', async () => {
    const runner = new TestRunner();
    const result = await runner.executeCase(makeRun(), makeCase());
    expect(result.status).toBe('passed');
    expect(result.steps.length).toBe(2);
  });

  it('executes a full run with multiple cases', async () => {
    const runner = new TestRunner();
    const results = await runner.executeRun(makeRun(), [makeCase('c1'), makeCase('c2')]);
    expect(results.length).toBe(2);
    results.forEach(r => expect(r.status).toBe('passed'));
  });

  it('aborts run cleanly', async () => {
    const runner = new TestRunner();
    const run = makeRun('abort-run');
    // Immediately abort before execution
    await runner.abort(run.id);
    // All cases should be skipped since abort flag set before run
    const results = await runner.executeRun(run, [makeCase('c1'), makeCase('c2')]);
    expect(results.length).toBe(0);
  });
});
