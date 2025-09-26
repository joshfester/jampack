import type { CheerioAPI } from '@divriots/cheerio';
import type { GlobalState } from '../state.js';
import { pluginRegistry } from './registry.js';

/**
 * Execute all registered plugins
 */
export async function runPlugins(
  state: GlobalState,
  theFold: number,
  $: CheerioAPI,
  file: string
): Promise<void> {
  const plugins = pluginRegistry.getAll();

  for (const plugin of plugins) {
    try {
      await plugin.execute(state, theFold, $, file);
    } catch (error) {
      state.reportIssue(file, {
        type: 'erro',
        msg: `Plugin "${plugin.name}" failed: ${(error as Error).message}`,
      });
    }
  }
}