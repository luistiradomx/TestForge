import { createRunHandler, getRunHandler, executeRunHandler } from './runs';
import { EnvironmentConfig, TestCase } from '@testforge/core';

const env: EnvironmentConfig = {
  id: 'env-1', name: 'dev', baseUrl: 'https://example.com', variables: {},
};

const cases: TestCase[] = [
  {
    id: 'c1', name: 'Login Test', suiteId: 's1',
    steps: [{ id: 'st1', order: 1, type: 'ui', action: { command: 'click', parameters: {} } }],
    metadata: {}, createdAt: new Date(), updatedAt: new Date(),
  },
];

describe('runs routes', () => {
  it('creates a run', () => {
    const run = createRunHandler({
      projectId: 'proj-1', suiteIds: ['s1'], cases, branch: 'main', environment: env,
    });
    expect(run.id).toMatch(/^run-/);
    expect(run.status).toBe('queued');
  });

  it('retrieves created run', () => {
    const run = createRunHandler({
      projectId: 'proj-1', suiteIds: ['s1'], cases, branch: 'main', environment: env,
    });
    expect(getRunHandler(run.id)).toBeDefined();
  });

  it('executes a run', async () => {
    const run = createRunHandler({
      projectId: 'proj-1', suiteIds: ['s1'], cases, branch: 'main', environment: env,
    });
    const results = await executeRunHandler(run.id, cases);
    expect(results.length).toBe(1);
    expect(results[0].status).toBe('passed');
  });
});
