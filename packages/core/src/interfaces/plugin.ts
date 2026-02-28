import { TestRun, TestCaseResult } from '../models/execution';
import { Trace } from '../models/trace';

/**
 * Base interface that every TestForge plugin must implement.
 */
export interface IPlugin {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly description: string;

  initialize(config: Record<string, unknown>): Promise<void>;
  destroy(): Promise<void>;
}

/**
 * Plugin that reacts to test run lifecycle events.
 */
export interface IRunLifecyclePlugin extends IPlugin {
  onRunStart?(run: TestRun): Promise<void>;
  onRunEnd?(run: TestRun, results: TestCaseResult[]): Promise<void>;
  onCaseResult?(result: TestCaseResult): Promise<void>;
}

/**
 * Plugin that provides CI/CD integration (e.g. GitHub, Azure DevOps).
 */
export interface ICIIntegrationPlugin extends IPlugin {
  reportStatus(run: TestRun, results: TestCaseResult[]): Promise<void>;
  createAnnotations?(run: TestRun, failures: TestCaseResult[]): Promise<void>;
}

/**
 * Plugin that provides custom locator resolution strategies.
 */
export interface ILocatorPlugin extends IPlugin {
  resolveLocator(
    descriptor: import('../models/locator').LocatorDescriptor,
    context: unknown
  ): Promise<import('../models/locator').LocatorCandidate | null>;
}

/**
 * Plugin registry — manages plugin lifecycle.
 */
export interface IPluginRegistry {
  register(plugin: IPlugin): void;
  unregister(pluginId: string): void;
  get<T extends IPlugin>(pluginId: string): T | undefined;
  getAll(): IPlugin[];
  getByType<T extends IPlugin>(type: string): T[];
}
