import type { CheerioAPI } from '@divriots/cheerio';
import type { OptimizerPlugin } from '../types/plugin.js';
import type { GlobalState } from '../state.js';

/**
 * Plugin to add preload links for specified images
 */
export class PreloadImagesPlugin implements OptimizerPlugin {
  name = 'preload-images';

  constructor(private imageFiles: string[]) { }

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
        msg: 'No <head> element found, cannot add image preload links',
      });
      return;
    }

    for (const imageFile of this.imageFiles) {
      // Check if preload link already exists
      const existingPreload = head.find(`link[rel="preload"][href="${imageFile}"]`);
      if (existingPreload.length > 0) {
        continue;
      }

      // Add preload link
      const preloadLink = `<link rel="preload" as="image" fetchpriority="high" href="${imageFile}">`;
      head.append(preloadLink);

      state.reportIssue(file, {
        type: 'perf',
        msg: `Added preload link for image: ${imageFile}`,
      });
    }
  }
}