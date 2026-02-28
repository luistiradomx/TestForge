import { GitHubIntegrationPlugin } from './github-plugin';
import { TestRun, TestCaseResult, EnvironmentConfig } from '@testforge/core';

const makeRun = (): TestRun => ({
  id: 'run-1', projectId: 'p1', suiteIds: [], branch: 'main', commitSha: 'abc123',
  environment: { id: 'e1', name: 'dev', baseUrl: 'https://example.com', variables: {} } as EnvironmentConfig,
  status: 'passed', results: [], startedAt: new Date(), triggeredBy: 'github-push',
});

const makeResult = (status: TestCaseResult['status']): TestCaseResult => ({
  caseId: 'c1', runId: 'run-1', status, steps: [], duration: 100, screenshotIds: [],
});

describe('GitHubIntegrationPlugin', () => {
  it('initializes with config', async () => {
    const plugin = new GitHubIntegrationPlugin();
    await plugin.initialize({ tokenRef: 'GITHUB_TOKEN', repository: 'owner/repo' });
    expect(plugin.getReportedRepository()).toBe('owner/repo');
  });

  it('reports status without throwing', async () => {
    const plugin = new GitHubIntegrationPlugin();
    await plugin.initialize({ tokenRef: 'GITHUB_TOKEN', repository: 'owner/repo' });
    await expect(plugin.reportStatus(makeRun(), [makeResult('passed')])).resolves.not.toThrow();
  });

  it('creates annotations without throwing', async () => {
    const plugin = new GitHubIntegrationPlugin();
    await plugin.initialize({ tokenRef: 'GITHUB_TOKEN', repository: 'owner/repo' });
    await expect(plugin.createAnnotations(makeRun(), [makeResult('failed')])).resolves.not.toThrow();
  });
});
