import { IPlugin, IPluginRegistry } from '@testforge/core';

/**
 * PluginRegistry — manages the lifecycle of all registered plugins.
 *
 * Plugins are stored by ID. Type queries use duck-typing.
 */
export class PluginRegistry implements IPluginRegistry {
  private readonly plugins = new Map<string, IPlugin>();

  register(plugin: IPlugin): void {
    if (this.plugins.has(plugin.id)) {
      throw new Error(`Plugin "${plugin.id}" is already registered.`);
    }
    this.plugins.set(plugin.id, plugin);
  }

  unregister(pluginId: string): void {
    if (!this.plugins.has(pluginId)) {
      throw new Error(`Plugin "${pluginId}" is not registered.`);
    }
    this.plugins.delete(pluginId);
  }

  get<T extends IPlugin>(pluginId: string): T | undefined {
    return this.plugins.get(pluginId) as T | undefined;
  }

  getAll(): IPlugin[] {
    return Array.from(this.plugins.values());
  }

  /**
   * Filter plugins by duck-typing a type discriminator property.
   * Each plugin type adds a unique marker (e.g. `type = 'ci-integration'`).
   */
  getByType<T extends IPlugin>(type: string): T[] {
    return this.getAll().filter(
      p => (p as unknown as Record<string, unknown>)['type'] === type
    ) as T[];
  }

  count(): number {
    return this.plugins.size;
  }
}
