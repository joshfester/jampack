import type { CheerioAPI } from '@divriots/cheerio';
import type { GlobalState } from '../state.js';

/**
 * Interface for optimizer plugins
 */
export interface OptimizerPlugin {
  /**
   * Plugin name for identification
   */
  name: string;

  /**
   * Execute the plugin optimization
   * @param state Global optimization state
   * @param theFold Position of the fold in the document
   * @param $ Cheerio instance for DOM manipulation
   * @param file Current HTML file being processed
   */
  execute(
    state: GlobalState,
    theFold: number,
    $: CheerioAPI,
    file: string
  ): Promise<void>;
}

/**
 * Plugin configuration for built-in plugins
 */
export interface PluginConfig {
  preloadImages?: string[];
  preloadFonts?: string[];
  fetchpriorityHigh?: string[];
}