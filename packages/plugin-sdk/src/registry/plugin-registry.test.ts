import { PluginRegistry } from './plugin-registry';
import { BasePlugin } from '../base/base-plugin';

class MockPlugin extends BasePlugin {
  readonly id = 'mock-plugin';
  readonly name = 'Mock Plugin';
  readonly version = '1.0.0';
  readonly description = 'A mock plugin for testing';
}

describe('PluginRegistry', () => {
  it('registers and retrieves a plugin', () => {
    const registry = new PluginRegistry();
    registry.register(new MockPlugin());
    expect(registry.get('mock-plugin')).toBeDefined();
    expect(registry.count()).toBe(1);
  });

  it('throws when registering a duplicate plugin', () => {
    const registry = new PluginRegistry();
    registry.register(new MockPlugin());
    expect(() => registry.register(new MockPlugin())).toThrow();
  });

  it('unregisters a plugin', () => {
    const registry = new PluginRegistry();
    registry.register(new MockPlugin());
    registry.unregister('mock-plugin');
    expect(registry.count()).toBe(0);
  });

  it('throws when unregistering a non-existent plugin', () => {
    const registry = new PluginRegistry();
    expect(() => registry.unregister('unknown')).toThrow();
  });

  it('returns all plugins', () => {
    const registry = new PluginRegistry();
    registry.register(new MockPlugin());
    expect(registry.getAll().length).toBe(1);
  });

  it('filters plugins by type', () => {
    const registry = new PluginRegistry();
    const plugin = new MockPlugin() as MockPlugin & { type: string };
    plugin.type = 'ci-integration';
    registry.register(plugin);
    const typed = registry.getByType('ci-integration');
    expect(typed.length).toBe(1);
  });
});
