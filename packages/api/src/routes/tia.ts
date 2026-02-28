import { CodeChange, ImpactAnalysisResult } from '@testforge/core';
import { TestImpactAnalyzer } from '@testforge/tia';

const analyzers = new Map<string, TestImpactAnalyzer>();

function getAnalyzer(projectId: string): TestImpactAnalyzer {
  if (!analyzers.has(projectId)) {
    analyzers.set(projectId, new TestImpactAnalyzer(projectId));
  }
  return analyzers.get(projectId)!;
}

export async function analyzeImpactHandler(
  projectId: string,
  changes: CodeChange[]
): Promise<ImpactAnalysisResult> {
  return getAnalyzer(projectId).analyze(changes);
}
