import { DiffAnalyzer } from './diff-analyzer';
import { VisualSnapshot } from '@testforge/core';

const makeSnapshot = (id: string, w = 1280, h = 720): VisualSnapshot => ({
  id,
  runId: 'run-1',
  caseId: 'case-1',
  stepId: 'step-1',
  imagePath: `/screenshots/${id}.png`,
  width: w,
  height: h,
  takenAt: new Date(),
});

describe('DiffAnalyzer', () => {
  const analyzer = new DiffAnalyzer();

  it('returns passed when dimensions match', () => {
    const result = analyzer.analyze(
      { snapshot: makeSnapshot('s1'), baseline: makeSnapshot('b1') },
      'cmp-1'
    );
    expect(result.status).toBe('passed');
    expect(result.diffScore).toBe(0);
    expect(result.diffRegions.length).toBe(0);
  });

  it('returns failed when dimensions differ', () => {
    const result = analyzer.analyze(
      { snapshot: makeSnapshot('s1', 800, 600), baseline: makeSnapshot('b1', 1280, 720) },
      'cmp-2'
    );
    expect(result.status).toBe('failed');
    expect(result.diffScore).toBe(1.0);
    expect(result.diffRegions.length).toBeGreaterThan(0);
  });
});
