import type { OptimizerPlugin, PluginConfig } from '../types/plugin.js';
import { PreloadImagesPlugin } from './preload-images.js';
import { PreloadFontsPlugin } from './preload-fonts.js';
import { FetchpriorityHighPlugin } from './fetchpriority-high.js';

/**
 * Global plugin registry
 */
class PluginRegistry {
  private plugins: OptimizerPlugin[] = [];

  /**
   * Register a plugin
   */
  register(plugin: OptimizerPlugin): void {
    this.plugins.push(plugin);
  }

  /**
   * Get all registered plugins
   */
  getAll(): OptimizerPlugin[] {
    return [...this.plugins];
  }

  /**
   * Clear all plugins
   */
  clear(): void {
    this.plugins = [];
  }

  /**
   * Register built-in plugins based on configuration
   */
  registerBuiltinPlugins(config: PluginConfig): void {
    this.clear();

    if (config.preloadImages && config.preloadImages.length > 0) {
      this.register(new PreloadImagesPlugin(config.preloadImages));
    }

    if (config.preloadFonts && config.preloadFonts.length > 0) {
      this.register(new PreloadFontsPlugin(config.preloadFonts));
    }

    if (config.fetchpriorityHigh && config.fetchpriorityHigh.length > 0) {
      this.register(new FetchpriorityHighPlugin(config.fetchpriorityHigh));
    }
  }
}

// Export singleton instance
export const pluginRegistry = new PluginRegistry();