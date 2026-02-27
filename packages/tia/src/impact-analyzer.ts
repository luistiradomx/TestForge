import {
  ITestImpactAnalyzer,
  CodeChange,
  ImpactAnalysisResult,
  DependencyNode,
} from '@testforge/core';
import { DependencyGraph } from './dependency-graph';

/**
 * TestImpactAnalyzer — determines which tests to run based on changed files.
 *
 * Algorithm:
 *  1. Map each changed file to a DependencyNode.
 *  2. Traverse the graph to find all transitively affected tests.
 *  3. Return affected + skipped sets.
 */
export class TestImpactAnalyzer implements ITestImpactAnalyzer {
  private graph = new DependencyGraph();

  constructor(private readonly projectId: string) {}

  async analyze(changes: CodeChange[]): Promise<ImpactAnalysisResult> {
    const allTests = this.graph.getAllTestIds();
    const affectedSet = new Set<string>();

    for (const change of changes) {
      const nodeId = this.pathToNodeId(change.filePath);
      const affected = this.graph.getAffectedTests(nodeId);
      affected.forEach(id => affectedSet.add(id));
    }

    const affectedTestIds = Array.from(affectedSet);
    const skippedTestIds = allTests.filter(id => !affectedSet.has(id));

    const confidence = allTests.length === 0
      ? 1
      : affectedTestIds.length / allTests.length;

    const graphSnapshot: DependencyNode[] = allTests.map(id => {
      const node = this.graph.getNode(id);
      return node ?? { id, type: 'test', path: id, dependsOn: [] };
    });

    return {
      affectedTestIds,
      skippedTestIds,
      confidence,
      reasoning: `${affectedTestIds.length} of ${allTests.length} tests affected by ${changes.length} changed file(s).`,
      dependencyGraph: graphSnapshot,
    };
  }

  async buildGraph(projectId: string): Promise<void> {
    // In production: scan source files and test files, build edges
    // Here we reset — real implementation integrates with file system / AST parser
    this.graph = new DependencyGraph();
    void projectId;
  }

  /**
   * Register a test node + its file dependencies in the graph.
   */
  registerTestDependencies(testId: string, testPath: string, sourcePaths: string[]): void {
    this.graph.addNode({ id: testId, type: 'test', path: testPath, dependsOn: sourcePaths });

    for (const srcPath of sourcePaths) {
      const nodeId = this.pathToNodeId(srcPath);
      if (!this.graph.getNode(nodeId)) {
        this.graph.addNode({ id: nodeId, type: 'source', path: srcPath, dependsOn: [] });
      }
      this.graph.addEdge(testId, nodeId);
    }
  }

  private pathToNodeId(filePath: string): string {
    return filePath.replace(/\\/g, '/');
  }
}
