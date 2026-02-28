import { IPlugin } from '@testforge/core';

/**
 * BasePlugin — abstract convenience class for plugin authors.
 * Provides default no-op lifecycle methods.
 */
export abstract class BasePlugin implements IPlugin {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly version: string;
  abstract readonly description: string;

  protected config: Record<string, unknown> = {};

  async initialize(config: Record<string, unknown>): Promise<void> {
    this.config = config;
  }

  async destroy(): Promise<void> {
    // no-op by default
  }
}
