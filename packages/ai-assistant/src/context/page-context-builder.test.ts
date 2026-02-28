import { PageContextBuilder } from './page-context-builder';

describe('PageContextBuilder', () => {
  const builder = new PageContextBuilder();

  it('builds locator context from raw page data', () => {
    const ctx = builder.build({
      url: 'https://example.com',
      title: 'Home',
      accessibilityTree: 'button[Login]',
      viewport: { width: 1280, height: 720 },
    });
    expect(ctx.url).toBe('https://example.com');
    expect(ctx.accessibilityTree).toBe('button[Login]');
  });

  it('truncates long accessibility trees', () => {
    const longTree = 'a'.repeat(5000);
    const summary = builder.summarizeTree(longTree, 100);
    expect(summary.length).toBeLessThanOrEqual(115); // 100 + '…[truncated]'
    expect(summary.endsWith('[truncated]')).toBe(true);
  });

  it('preserves short accessibility trees', () => {
    const shortTree = 'button[Submit]';
    expect(builder.summarizeTree(shortTree)).toBe(shortTree);
  });
});
