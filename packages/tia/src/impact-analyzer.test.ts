import { TestImpactAnalyzer } from './impact-analyzer';

describe('TestImpactAnalyzer', () => {
  it('returns all tests as affected when full build required', async () => {
    const analyzer = new TestImpactAnalyzer('proj-1');
    analyzer.registerTestDependencies('test-1', 'tests/login.test.ts', ['src/auth.ts', 'src/session.ts']);
    analyzer.registerTestDependencies('test-2', 'tests/profile.test.ts', ['src/user.ts']);

    const result = await analyzer.analyze([{ filePath: 'src/auth.ts', changeType: 'modified' }]);
    expect(result.affectedTestIds).toContain('test-1');
    expect(result.skippedTestIds).toContain('test-2');
  });

  it('skips all tests when no dependencies match', async () => {
    const analyzer = new TestImpactAnalyzer('proj-1');
    analyzer.registerTestDependencies('test-1', 'tests/login.test.ts', ['src/auth.ts']);

    const result = await analyzer.analyze([{ filePath: 'src/unrelated.ts', changeType: 'modified' }]);
    expect(result.affectedTestIds.length).toBe(0);
    expect(result.skippedTestIds).toContain('test-1');
  });

  it('returns confidence 1 when no tests registered', async () => {
    const analyzer = new TestImpactAnalyzer('proj-1');
    const result = await analyzer.analyze([{ filePath: 'src/anything.ts', changeType: 'added' }]);
    expect(result.confidence).toBe(1);
  });
});
