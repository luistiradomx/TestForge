import { AzureDevOpsIntegrationPlugin } from './azure-devops-plugin';
import { TestRun, TestCaseResult, EnvironmentConfig } from '@testforge/core';

const makeRun = (): TestRun => ({
  id: 'run-1', projectId: 'p1', suiteIds: [], branch: 'feature/login',
  environment: { id: 'e1', name: 'dev', baseUrl: 'https://example.com', variables: {} } as EnvironmentConfig,
  status: 'passed', results: [], startedAt: new Date(), triggeredBy: 'azure-pipeline',
});

const makeResult = (status: TestCaseResult['status']): TestCaseResult => ({
  caseId: 'c1', runId: 'run-1', status, steps: [], duration: 100, screenshotIds: [],
});

describe('AzureDevOpsIntegrationPlugin', () => {
  it('initializes with config', async () => {
    const plugin = new AzureDevOpsIntegrationPlugin();
    await plugin.initialize({
      organizationUrl: 'https://dev.azure.com/myorg',
      project: 'MyProject',
      patRef: 'AZURE_PAT',
    });
    expect(plugin.getProjectName()).toBe('MyProject');
  });

  it('reports status without throwing', async () => {
    const plugin = new AzureDevOpsIntegrationPlugin();
    await plugin.initialize({
      organizationUrl: 'https://dev.azure.com/myorg',
      project: 'MyProject',
      patRef: 'AZURE_PAT',
    });
    await expect(plugin.reportStatus(makeRun(), [makeResult('passed'), makeResult('failed')])).resolves.not.toThrow();
  });
});
