/**
 * Test Impact Analysis — determines which tests to run based on code changes.
 */
export interface ITestImpactAnalyzer {
  /**
   * Analyze changed files and return the set of test IDs that should be run.
   */
  analyze(changes: CodeChange[]): Promise<ImpactAnalysisResult>;

  /**
   * Build/update the dependency graph from current test suite + source.
   */
  buildGraph(projectId: string): Promise<void>;
}

export interface CodeChange {
  filePath: string;
  changeType: 'added' | 'modified' | 'deleted' | 'renamed';
  oldPath?: string;
}

export interface ImpactAnalysisResult {
  affectedTestIds: string[];
  skippedTestIds: string[];
  confidence: number;
  reasoning: string;
  dependencyGraph: DependencyNode[];
}

export interface DependencyNode {
  id: string;
  type: 'test' | 'source' | 'config';
  path: string;
  dependsOn: string[];
}
