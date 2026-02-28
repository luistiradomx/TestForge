import {
  TestRun,
  TestCase,
  TestCaseResult,
  LocatorDescriptor,
  LocatorContext,
  LocatorCandidate,
  CodeChange,
  ImpactAnalysisResult,
  EnvironmentConfig,
} from '@testforge/core';

export interface CreateRunOptions {
  projectId: string;
  suiteIds: string[];
  cases: TestCase[];
  branch: string;
  environment: EnvironmentConfig;
}

/**
 * TestForgeClient — typed API client for the TestForge backend.
 * Wraps fetch() calls with proper error handling.
 */
export class TestForgeClient {
  constructor(private readonly baseUrl: string = 'http://localhost:3000') {}

  async getHealth(): Promise<{ status: string; version: string; timestamp: string }> {
    return this.get('/health');
  }

  async createRun(options: CreateRunOptions): Promise<TestRun> {
    return this.post('/runs', options);
  }

  async getRun(runId: string): Promise<TestRun> {
    return this.get(`/runs/${runId}`);
  }

  async getRunResults(runId: string): Promise<TestCaseResult[]> {
    return this.get(`/runs/${runId}/results`);
  }

  async resolveLocator(
    descriptor: LocatorDescriptor,
    context: LocatorContext
  ): Promise<LocatorCandidate[]> {
    return this.post('/locators/resolve', { descriptor, context });
  }

  async generateLocator(
    hint: string,
    context: LocatorContext
  ): Promise<LocatorCandidate[]> {
    return this.post('/locators/generate', { hint, context });
  }

  async analyzeImpact(
    projectId: string,
    changes: CodeChange[]
  ): Promise<ImpactAnalysisResult> {
    return this.post(`/projects/${projectId}/tia`, { changes });
  }

  private async get<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`);
    if (!res.ok) {
      throw new Error(`GET ${path} failed: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<T>;
  }

  private async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`POST ${path} failed: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<T>;
  }
}
