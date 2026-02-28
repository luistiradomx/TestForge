/**
 * A trace captures the full lifecycle of a test run step.
 */
export interface Trace {
  id: string;
  runId: string;
  caseId: string;
  steps: TraceStep[];
  metadata: TraceMetadata;
  createdAt: Date;
}

export interface TraceStep {
  stepId: string;
  order: number;
  timestamp: number;
  duration: number;
  action: string;
  locatorStrategy?: string;
  screenshot?: string;
  networkLog: NetworkLogEntry[];
  consoleLogs: ConsoleLogEntry[];
  domSnapshot?: string;
}

export interface TraceMetadata {
  browser: string;
  browserVersion: string;
  platform: string;
  viewportWidth: number;
  viewportHeight: number;
  userAgent: string;
}

export interface NetworkLogEntry {
  timestamp: number;
  url: string;
  method: string;
  status: number;
  responseTime: number;
}

export interface ConsoleLogEntry {
  timestamp: number;
  level: 'log' | 'warn' | 'error' | 'info';
  message: string;
}
