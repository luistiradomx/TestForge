import { TestRun, TestCase, TestCaseResult, RunStatus } from '@testforge/core';
import { TestRunner } from '@testforge/execution-engine';
import { TraceStore } from '@testforge/trace-viewer';

/**
 * In-memory storage for demo purposes.
 * Production: use a database repository.
 */
const runs = new Map<string, TestRun>();
const results = new Map<string, TestCaseResult[]>();
const runner = new TestRunner();
const traceStore = new TraceStore();

export interface CreateRunRequest {
  projectId: string;
  suiteIds: string[];
  cases: TestCase[];
  branch: string;
  environment: import('@testforge/core').EnvironmentConfig;
}

export function createRunHandler(request: CreateRunRequest): TestRun {
  const run: TestRun = {
    id: `run-${Date.now()}`,
    projectId: request.projectId,
    suiteIds: request.suiteIds,
    environment: request.environment,
    branch: request.branch,
    status: 'queued',
    results: [],
    startedAt: new Date(),
    triggeredBy: 'manual',
  };
  runs.set(run.id, run);
  return run;
}

export async function executeRunHandler(
  runId: string,
  cases: TestCase[]
): Promise<TestCaseResult[]> {
  const run = runs.get(runId);
  if (!run) throw new Error(`Run ${runId} not found`);

  run.status = 'running';
  const runResults = await runner.executeRun(run, cases);
  results.set(runId, runResults);

  const hasFailed = runResults.some((r: TestCaseResult) => r.status === 'failed');
  run.status = (hasFailed ? 'failed' : 'passed') as RunStatus;
  run.finishedAt = new Date();

  return runResults;
}

export function getRunHandler(runId: string): TestRun | undefined {
  return runs.get(runId);
}

export function getRunResultsHandler(runId: string): TestCaseResult[] {
  return results.get(runId) ?? [];
}

export { traceStore };
