import {
  IStateMachine,
  ExecutionState,
  ExecutionEvent,
} from '@testforge/core';

/**
 * Valid state transitions for the execution engine.
 * Key: current state → Value: set of valid events and their target states.
 */
const TRANSITIONS: Record<ExecutionState, Partial<Record<ExecutionEvent, ExecutionState>>> = {
  idle: {
    start: 'initializing',
  },
  initializing: {
    step_complete: 'running',
    error: 'aborted',
    abort: 'aborted',
  },
  running: {
    pause: 'paused',
    step_complete: 'running',
    assertion_pass: 'asserting',
    assertion_fail: 'recovering',
    error: 'recovering',
    abort: 'aborted',
    finish: 'finished',
  },
  asserting: {
    assertion_pass: 'running',
    assertion_fail: 'recovering',
    abort: 'aborted',
    finish: 'finished',
  },
  paused: {
    resume: 'running',
    abort: 'aborted',
  },
  recovering: {
    step_complete: 'running',
    error: 'aborted',
    abort: 'aborted',
    finish: 'finished',
  },
  finished: {},
  aborted: {},
};

type StateChangeHandler = (prev: ExecutionState, next: ExecutionState) => void;

/**
 * ExecutionStateMachine — provides deterministic state management
 * for a single test run.
 */
export class ExecutionStateMachine implements IStateMachine {
  private _state: ExecutionState = 'idle';
  private readonly handlers: StateChangeHandler[] = [];

  get currentState(): ExecutionState {
    return this._state;
  }

  transition(event: ExecutionEvent): ExecutionState {
    if (!this.canTransition(event)) {
      throw new Error(
        `Invalid transition: event "${event}" is not valid in state "${this._state}"`
      );
    }

    const nextState = TRANSITIONS[this._state][event] as ExecutionState;
    const prev = this._state;
    this._state = nextState;
    this.handlers.forEach(h => h(prev, nextState));
    return nextState;
  }

  canTransition(event: ExecutionEvent): boolean {
    return event in TRANSITIONS[this._state];
  }

  onStateChange(handler: StateChangeHandler): void {
    this.handlers.push(handler);
  }
}
