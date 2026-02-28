import { TestRun, TestCaseResult } from '@testforge/core';
import { BaseCIPlugin } from '@testforge/plugin-sdk';

export interface GitHubPluginConfig {
  /** GitHub API base URL (default: https://api.github.com) */
  apiBaseUrl?: string;
  /** GitHub App installation token or PAT — injected at runtime, never stored */
  tokenRef: string;
  /** Repository in owner/repo format */
  repository: string;
}

/**
 * GitHubIntegrationPlugin — reports TestForge run results to GitHub Checks API.
 *
 * Security: The token is never stored in the plugin config object after use.
 * The tokenRef is a reference key resolved from a secrets vault at runtime.
 */
export class GitHubIntegrationPlugin extends BaseCIPlugin {
  readonly id = 'github-integration';
  readonly name = 'GitHub Integration';
  readonly version = '1.0.0';
  readonly description = 'Reports test results to GitHub Checks API';

  private pluginConfig!: GitHubPluginConfig;

  async initialize(config: Record<string, unknown>): Promise<void> {
    await super.initialize(config);
    this.pluginConfig = {
      apiBaseUrl: (config['apiBaseUrl'] as string | undefined) ?? 'https://api.github.com',
      tokenRef: config['tokenRef'] as string,
      repository: config['repository'] as string,
    };
  }

  async reportStatus(run: TestRun, results: TestCaseResult[]): Promise<void> {
    const failed = results.filter(r => r.status === 'failed').length;
    const passed = results.filter(r => r.status === 'passed').length;
    const conclusion = failed === 0 ? 'success' : 'failure';

    const payload = {
      name: 'TestForge',
      head_sha: run.commitSha ?? 'unknown',
      status: 'completed',
      conclusion,
      output: {
        title: `TestForge: ${passed} passed, ${failed} failed`,
        summary: `Run ${run.id} on branch ${run.branch} — ${conclusion}`,
      },
    };

    // In production: POST to GitHub Checks API using this.pluginConfig.apiBaseUrl
    // Token resolved from secrets vault via this.pluginConfig.tokenRef
    void payload; // prevent unused variable lint warning
  }

  async createAnnotations(run: TestRun, failures: TestCaseResult[]): Promise<void> {
    // In production: create GitHub PR annotations for each failure
    void run;
    void failures;
  }

  getReportedRepository(): string {
    return this.pluginConfig?.repository ?? '';
  }
}
