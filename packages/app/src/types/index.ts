/** Shared UI-layer types for the TestForge dashboard. */

export type RunStatus = 'queued' | 'running' | 'passed' | 'failed' | 'aborted' | 'skipped';
export type TriggerSource = 'manual' | 'github-push' | 'github-pr' | 'azure-pipeline' | 'schedule';
export type StepType = 'ui' | 'api' | 'assertion' | 'wait' | 'script';

export interface Project {
  id: string;
  name: string;
  description?: string;
  repositoryUrl?: string;
  defaultBranch: string;
  environments: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TestSuite {
  id: string;
  name: string;
  description?: string;
  projectId: string;
  tags: string[];
  caseCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface TestRun {
  id: string;
  projectId: string;
  projectName: string;
  branch: string;
  commitSha?: string;
  status: RunStatus;
  passRate: number;
  totalCases: number;
  passedCases: number;
  failedCases: number;
  duration: number;
  startedAt: string;
  finishedAt?: string;
  triggeredBy: TriggerSource;
}

export interface StepResult {
  stepId: string;
  order: number;
  type: StepType;
  command: string;
  status: RunStatus;
  duration: number;
  locatorUsed?: string;
  error?: { message: string; type: string };
}

export interface TestCaseResult {
  caseId: string;
  caseName: string;
  runId: string;
  status: RunStatus;
  steps: StepResult[];
  duration: number;
  error?: { message: string; type: string };
  traceId?: string;
}

export interface StepSuggestion {
  id: string;
  type: StepType;
  command: string;
  description: string;
  confidence: number;
  parameters: Record<string, unknown>;
}

export interface DashboardStats {
  totalProjects: number;
  totalRuns: number;
  passRate: number;
  activeRuns: number;
  recentRuns: TestRun[];
  runsByStatus: Record<RunStatus, number>;
}
