import {
  IExecutionEngine,
  TestCase,
  TestStep,
  TestRun,
  TestCaseResult,
  StepResult,
  RunStatus,
} from '@testforge/core';
import { ExecutionStateMachine } from '../state-machine/execution-state-machine';

/**
 * TestRunner — executes test runs deterministically.
 *
 * Each run gets its own state machine instance ensuring isolation.
 * Step execution is serialized; the state machine guarantees
 * consistent transitions even on errors.
 */
export class TestRunner implements IExecutionEngine {
  private readonly abortFlags = new Map<string, boolean>();

  async executeRun(run: TestRun, cases: TestCase[]): Promise<TestCaseResult[]> {
    if (!this.abortFlags.has(run.id)) {
      this.abortFlags.set(run.id, false);
    }
    const results: TestCaseResult[] = [];

    for (const testCase of cases) {
      if (this.abortFlags.get(run.id)) break;
      results.push(await this.executeCase(run, testCase));
    }

    this.abortFlags.delete(run.id);
    return results;
  }

  async executeCase(run: TestRun, testCase: TestCase): Promise<TestCaseResult> {
    const sm = new ExecutionStateMachine();
    sm.transition('start');

    const stepResults: StepResult[] = [];
    let caseStatus: RunStatus = 'running';
    const startTime = Date.now();

    try {
      for (const step of testCase.steps) {
        if (this.abortFlags.get(run.id)) {
          sm.transition('abort');
          caseStatus = 'aborted';
          break;
        }

        const stepResult = await this.executeStep(run, step);
        stepResults.push(stepResult);

        if (stepResult.status === 'failed') {
          sm.transition('error');
          caseStatus = 'failed';
          break;
        }

        if (step.type === 'assertion') {
          sm.transition('assertion_pass');
        } else {
          sm.transition('step_complete');
        }
      }

      if (caseStatus === 'running') {
        sm.transition('finish');
        caseStatus = 'passed';
      }
    } catch (err) {
      caseStatus = 'failed';
      if (sm.canTransition('error')) sm.transition('error');
    }

    return {
      caseId: testCase.id,
      runId: run.id,
      status: caseStatus,
      steps: stepResults,
      duration: Date.now() - startTime,
      screenshotIds: [],
    };
  }

  async executeStep(_run: TestRun, step: TestStep): Promise<StepResult> {
    const start = Date.now();

    // Deterministic stub — real implementation delegates to browser/API drivers
    return {
      stepId: step.id,
      status: 'passed',
      duration: Date.now() - start,
      networkEvents: [],
    };
  }

  async abort(runId: string): Promise<void> {
    this.abortFlags.set(runId, true);
  }
}
