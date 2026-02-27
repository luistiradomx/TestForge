/**
 * A single test run execution record.
 */
export interface TestRun {
    id: string;
    projectId: string;
    suiteIds: string[];
    environment: EnvironmentConfig;
    branch: string;
    commitSha?: string;
    status: RunStatus;
    results: TestCaseResult[];
    startedAt: Date;
    finishedAt?: Date;
    triggeredBy: TriggerSource;
}
export type RunStatus = 'queued' | 'running' | 'passed' | 'failed' | 'aborted' | 'skipped';
export type TriggerSource = 'manual' | 'github-push' | 'github-pr' | 'azure-pipeline' | 'schedule';
export interface EnvironmentConfig {
    id: string;
    name: string;
    baseUrl: string;
    variables: Record<string, string>;
    credentials?: EnvironmentCredentials;
}
export interface EnvironmentCredentials {
    /** Secret references — never stored as plain text */
    usernameRef: string;
    passwordRef: string;
}
export interface TestCaseResult {
    caseId: string;
    runId: string;
    status: RunStatus;
    steps: StepResult[];
    duration: number;
    error?: TestError;
    traceId?: string;
    screenshotIds: string[];
}
export interface StepResult {
    stepId: string;
    status: RunStatus;
    duration: number;
    locatorUsed?: string;
    error?: TestError;
    networkEvents?: NetworkEvent[];
}
export interface TestError {
    message: string;
    stack?: string;
    type: string;
}
export interface NetworkEvent {
    url: string;
    method: string;
    status: number;
    duration: number;
    requestBody?: unknown;
    responseBody?: unknown;
}
//# sourceMappingURL=execution.d.ts.map