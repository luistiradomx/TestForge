import { DependencyGraph } from './dependency-graph';

describe('DependencyGraph', () => {
  it('adds nodes and edges', () => {
    const g = new DependencyGraph();
    g.addNode({ id: 'src/auth.ts', type: 'source', path: 'src/auth.ts', dependsOn: [] });
    g.addNode({ id: 'tests/auth.test.ts', type: 'test', path: 'tests/auth.test.ts', dependsOn: [] });
    g.addEdge('tests/auth.test.ts', 'src/auth.ts');
    expect(g.nodeCount()).toBe(2);
  });

  it('returns affected tests for a changed source file', () => {
    const g = new DependencyGraph();
    g.addNode({ id: 'src/auth.ts', type: 'source', path: 'src/auth.ts', dependsOn: [] });
    g.addNode({ id: 'tests/auth.test.ts', type: 'test', path: 'tests/auth.test.ts', dependsOn: [] });
    g.addEdge('tests/auth.test.ts', 'src/auth.ts');

    const affected = g.getAffectedTests('src/auth.ts');
    expect(affected).toContain('tests/auth.test.ts');
  });

  it('returns empty for unrelated changes', () => {
    const g = new DependencyGraph();
    g.addNode({ id: 'src/auth.ts', type: 'source', path: 'src/auth.ts', dependsOn: [] });
    g.addNode({ id: 'tests/auth.test.ts', type: 'test', path: 'tests/auth.test.ts', dependsOn: [] });
    g.addEdge('tests/auth.test.ts', 'src/auth.ts');

    const affected = g.getAffectedTests('src/unrelated.ts');
    expect(affected.length).toBe(0);
  });
});
