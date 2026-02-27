import { LocatorContext } from '@testforge/core';

export interface RawPageContext {
  url: string;
  title: string;
  accessibilityTree?: string;
  viewport?: { width: number; height: number };
  activeElement?: string;
}

/**
 * Builds a structured LocatorContext from raw page data.
 */
export class PageContextBuilder {
  build(raw: RawPageContext): LocatorContext {
    return {
      url: raw.url,
      title: raw.title,
      accessibilityTree: raw.accessibilityTree,
      viewport: raw.viewport,
      hint: raw.activeElement,
    };
  }

  /**
   * Summarize the accessibility tree to a concise string suitable for AI prompts.
   * Truncates to maxLength characters to avoid exceeding token limits.
   */
  summarizeTree(tree: string, maxLength = 2000): string {
    if (tree.length <= maxLength) return tree;
    return tree.slice(0, maxLength) + '…[truncated]';
  }
}
