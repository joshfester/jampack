import type { CheerioAPI } from '@divriots/cheerio';
import type { OptimizerPlugin } from '../types/plugin.js';
import type { GlobalState } from '../state.js';

/**
 * Plugin to add preconnect links for specified URLs
 */
export class PreconnectPlugin implements OptimizerPlugin {
  name = 'preconnect';

  constructor(
    private urls: string[],
    private urlsCrossorigin: string[]
  ) { }

  async execute(
    state: GlobalState,
    _theFold: number,
    $: CheerioAPI,
    file: string
  ): Promise<void> {
    // Only apply preconnect links to root index.html
    if (file !== 'index.html') {
      return;
    }

    const head = $('head');
    if (head.length === 0) {
      state.reportIssue(file, {
        type: 'warn',
        msg: 'No <head> element found, cannot add preconnect links',
      });
      return;
    }

    // Add regular preconnect links
    for (const url of this.urls) {
      // Check if preconnect link already exists
      const existingPreconnect = head.find(`link[rel="preconnect"][href="${url}"]`);
      if (existingPreconnect.length > 0) {
        continue;
      }

      // Add preconnect link
      const preconnectLink = `<link rel="preconnect" href="${url}">`;
      head.append(preconnectLink);

      state.reportIssue(file, {
        type: 'perf',
        msg: `Added preconnect link for: ${url}`,
      });
    }

    // Add preconnect links with crossorigin
    for (const url of this.urlsCrossorigin) {
      // Check if preconnect link already exists
      const existingPreconnect = head.find(`link[rel="preconnect"][href="${url}"]`);
      if (existingPreconnect.length > 0) {
        continue;
      }

      // Add preconnect link with crossorigin
      const preconnectLink = `<link rel="preconnect" href="${url}" crossorigin>`;
      head.append(preconnectLink);

      state.reportIssue(file, {
        type: 'perf',
        msg: `Added preconnect link (crossorigin) for: ${url}`,
      });
    }
  }
}