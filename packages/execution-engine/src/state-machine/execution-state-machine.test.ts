import { ExecutionStateMachine } from './execution-state-machine';

describe('ExecutionStateMachine', () => {
  it('starts in idle state', () => {
    const sm = new ExecutionStateMachine();
    expect(sm.currentState).toBe('idle');
  });

  it('transitions idle → initializing on start', () => {
    const sm = new ExecutionStateMachine();
    const next = sm.transition('start');
    expect(next).toBe('initializing');
    expect(sm.currentState).toBe('initializing');
  });

  it('transitions through a happy path', () => {
    const sm = new ExecutionStateMachine();
    sm.transition('start');
    sm.transition('step_complete'); // initializing → running
    sm.transition('assertion_pass'); // running → asserting
    sm.transition('assertion_pass'); // asserting → running
    sm.transition('finish'); // running → finished
    expect(sm.currentState).toBe('finished');
  });

  it('throws on invalid transition', () => {
    const sm = new ExecutionStateMachine();
    expect(() => sm.transition('finish')).toThrow();
  });

  it('canTransition returns false for invalid events', () => {
    const sm = new ExecutionStateMachine();
    expect(sm.canTransition('finish')).toBe(false);
    expect(sm.canTransition('start')).toBe(true);
  });

  it('fires state change handlers', () => {
    const sm = new ExecutionStateMachine();
    const changes: string[] = [];
    sm.onStateChange((prev, next) => changes.push(`${prev}→${next}`));
    sm.transition('start');
    expect(changes).toEqual(['idle→initializing']);
  });

  it('transitions to aborted on abort', () => {
    const sm = new ExecutionStateMachine();
    sm.transition('start');
    sm.transition('step_complete'); // → running
    sm.transition('abort');
    expect(sm.currentState).toBe('aborted');
  });
});
