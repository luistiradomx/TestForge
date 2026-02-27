import { VisualRegressionService } from './visual-regression-service';
import { VisualSnapshot } from '@testforge/core';

const makeSnapshot = (id: string, w = 1280, h = 720): VisualSnapshot => ({
  id, runId: 'run-1', caseId: 'case-1', stepId: 'step-1',
  imagePath: `/screenshots/${id}.png`, width: w, height: h, takenAt: new Date(),
});

describe('VisualRegressionService', () => {
  it('returns null (first-run baseline) when no baseline exists', () => {
    const svc = new VisualRegressionService();
    const result = svc.compare(makeSnapshot('s1'));
    expect(result).toBeNull();
  });

  it('compares on second run', () => {
    const svc = new VisualRegressionService();
    svc.compare(makeSnapshot('s1')); // sets baseline
    const result = svc.compare(makeSnapshot('s2'));
    expect(result).not.toBeNull();
    expect(result!.status).toBe('passed');
  });

  it('detects failure on dimension change', () => {
    const svc = new VisualRegressionService();
    svc.compare(makeSnapshot('s1', 1280, 720)); // sets baseline
    const result = svc.compare(makeSnapshot('s2', 800, 600));
    expect(result!.status).toBe('failed');
  });
});
