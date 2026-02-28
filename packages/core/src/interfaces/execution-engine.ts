import { TestCase, TestStep } from '../models/test-suite';
import { TestRun, TestCaseResult, EnvironmentConfig } from '../models/execution';

/**
 * Contract for the deterministic execution engine.
 */
export interface IExecutionEngine {
  executeRun(run: TestRun, cases: TestCase[]): Promise<TestCaseResult[]>;
  executeCase(run: TestRun, testCase: TestCase): Promise<TestCaseResult>;
  executeStep(run: TestRun, step: TestStep): Promise<import('../models/execution').StepResult>;
  abort(runId: string): Promise<void>;
}

/**
 * Execution state machine — tracks current state during a run.
 */
export interface IStateMachine {
  currentState: ExecutionState;
  transition(event: ExecutionEvent): ExecutionState;
  canTransition(event: ExecutionEvent): boolean;
  onStateChange(handler: (prev: ExecutionState, next: ExecutionState) => void): void;
}

export type ExecutionState =
  | 'idle'
  | 'initializing'
  | 'running'
  | 'paused'
  | 'asserting'
  | 'recovering'
  | 'finished'
  | 'aborted';

export type ExecutionEvent =
  | 'start'
  | 'pause'
  | 'resume'
  | 'step_complete'
  | 'assertion_pass'
  | 'assertion_fail'
  | 'error'
  | 'abort'
  | 'finish';
