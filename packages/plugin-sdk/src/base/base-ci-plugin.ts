import { ICIIntegrationPlugin, TestRun, TestCaseResult } from '@testforge/core';
import { BasePlugin } from './base-plugin';

/**
 * BaseCIPlugin — base class for CI/CD integration plugins (GitHub, Azure DevOps, etc.).
 */
export abstract class BaseCIPlugin extends BasePlugin implements ICIIntegrationPlugin {
  readonly type = 'ci-integration';

  abstract reportStatus(run: TestRun, results: TestCaseResult[]): Promise<void>;

  async createAnnotations(_run: TestRun, _failures: TestCaseResult[]): Promise<void> {
    // Optional — override in subclass
  }
}
