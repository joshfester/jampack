import type { CheerioAPI } from '@divriots/cheerio';
import type { OptimizerPlugin } from '../types/plugin.js';
import type { GlobalState } from '../state.js';

/**
 * Plugin to add fetchpriority="high" to elements matching CSS selectors
 */
export class FetchpriorityHighPlugin implements OptimizerPlugin {
  name = 'fetchpriority-high';

  constructor(private selectors: string[]) {}

  async execute(
    state: GlobalState,
    _theFold: number,
    $: CheerioAPI,
    file: string
  ): Promise<void> {
    // Only apply fetchpriority to root index.html
    if (file !== 'index.html') {
      return;
    }

    let elementsModified = 0;

    for (const selector of this.selectors) {
      try {
        const elements = $(selector);

        elements.each((_, element) => {
          const $element = $(element);

          // Only add if not already set
          if (!$element.attr('fetchpriority')) {
            $element.attr('fetchpriority', 'high');
            elementsModified++;
          }
        });
      } catch (error) {
        state.reportIssue(file, {
          type: 'warn',
          msg: `Invalid CSS selector "${selector}": ${(error as Error).message}`,
        });
      }
    }

    if (elementsModified > 0) {
      state.reportIssue(file, {
        type: 'perf',
        msg: `Added fetchpriority="high" to ${elementsModified} element(s)`,
      });
    }
  }
}