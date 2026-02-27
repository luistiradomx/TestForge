import { TestStep, StepType } from './test-suite';

describe('TestSuite models', () => {
  it('should create a valid TestStep', () => {
    const step: TestStep = {
      id: 'step-1',
      order: 1,
      type: 'ui' as StepType,
      action: { command: 'click', parameters: {} },
    };
    expect(step.id).toBe('step-1');
    expect(step.type).toBe('ui');
    expect(step.action.command).toBe('click');
  });

  it('should support all step types', () => {
    const types: StepType[] = ['ui', 'api', 'assertion', 'wait', 'script'];
    types.forEach(type => {
      expect(['ui', 'api', 'assertion', 'wait', 'script']).toContain(type);
    });
  });
});
