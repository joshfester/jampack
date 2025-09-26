import type { CheerioAPI } from '@divriots/cheerio';
import type { OptimizerPlugin } from '../types/plugin.js';
import type { GlobalState } from '../state.js';

/**
 * Plugin to add preload links for specified fonts
 */
export class PreloadFontsPlugin implements OptimizerPlugin {
  name = 'preload-fonts';

  constructor(private fontFiles: string[]) {}

  async execute(
    state: GlobalState,
    _theFold: number,
    $: CheerioAPI,
    file: string
  ): Promise<void> {
    // Only apply preload links to root index.html
    if (file !== 'index.html') {
      return;
    }

    const head = $('head');
    if (head.length === 0) {
      state.reportIssue(file, {
        type: 'warn',
        msg: 'No <head> element found, cannot add font preload links',
      });
      return;
    }

    for (const fontFile of this.fontFiles) {
      // Check if preload link already exists
      const existingPreload = head.find(`link[rel="preload"][href="${fontFile}"]`);
      if (existingPreload.length > 0) {
        continue;
      }

      // Add preload link with crossorigin for fonts
      const preloadLink = `<link rel="preload" as="font" href="${fontFile}" crossorigin>`;
      head.append(preloadLink);

      state.reportIssue(file, {
        type: 'perf',
        msg: `Added preload link for font: ${fontFile}`,
      });
    }
  }
}