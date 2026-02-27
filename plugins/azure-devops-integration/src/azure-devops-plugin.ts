import { TestRun, TestCaseResult } from '@testforge/core';
import { BaseCIPlugin } from '@testforge/plugin-sdk';

export interface AzureDevOpsPluginConfig {
  /** Azure DevOps organization URL e.g. https://dev.azure.com/myorg */
  organizationUrl: string;
  /** Project name */
  project: string;
  /** PAT reference — resolved from secrets vault at runtime */
  patRef: string;
  /** Azure Pipelines build ID (set at runtime from environment variable) */
  buildId?: string;
}

/**
 * AzureDevOpsIntegrationPlugin — publishes test results to Azure Pipelines.
 *
 * Security: PAT is never stored in plain text. `patRef` is a reference
 * resolved from a secrets vault at runtime.
 */
export class AzureDevOpsIntegrationPlugin extends BaseCIPlugin {
  readonly id = 'azure-devops-integration';
  readonly name = 'Azure DevOps Integration';
  readonly version = '1.0.0';
  readonly description = 'Publishes test results to Azure Pipelines';

  private pluginConfig!: AzureDevOpsPluginConfig;

  async initialize(config: Record<string, unknown>): Promise<void> {
    await super.initialize(config);
    this.pluginConfig = {
      organizationUrl: config['organizationUrl'] as string,
      project: config['project'] as string,
      patRef: config['patRef'] as string,
      buildId: process.env['SYSTEM_BUILDID'],
    };
  }

  async reportStatus(run: TestRun, results: TestCaseResult[]): Promise<void> {
    const failed = results.filter(r => r.status === 'failed').length;
    const passed = results.filter(r => r.status === 'passed').length;
    const skipped = results.filter(r => r.status === 'skipped').length;

    const payload = {
      testRunTitle: `TestForge Run ${run.id}`,
      buildId: this.pluginConfig.buildId,
      state: 'Completed',
      isAutomated: true,
      comment: `Branch: ${run.branch} | Passed: ${passed}, Failed: ${failed}, Skipped: ${skipped}`,
    };

    // In production: POST to Azure DevOps Test Runs API
    // PAT resolved from secrets vault via this.pluginConfig.patRef
    void payload;
  }

  getProjectName(): string {
    return this.pluginConfig?.project ?? '';
  }
}
