import { TraceRecorder } from './trace-recorder';
import { TraceMetadata } from '@testforge/core';

const meta: TraceMetadata = {
  browser: 'chromium',
  browserVersion: '120.0',
  platform: 'linux',
  viewportWidth: 1280,
  viewportHeight: 720,
  userAgent: 'TestForge/1.0',
};

describe('TraceRecorder', () => {
  it('records steps and finalizes a trace', () => {
    const recorder = new TraceRecorder('run-1', 'case-1', meta);
    recorder.record({
      stepId: 's1',
      order: 1,
      action: 'click',
      duration: 50,
      networkLog: [],
      consoleLogs: [],
    });
    expect(recorder.getStepCount()).toBe(1);

    const trace = recorder.finalize('trace-1');
    expect(trace.id).toBe('trace-1');
    expect(trace.steps.length).toBe(1);
    expect(trace.steps[0].timestamp).toBeGreaterThanOrEqual(0);
  });

  it('captures multiple steps', () => {
    const recorder = new TraceRecorder('run-1', 'case-1', meta);
    for (let i = 0; i < 5; i++) {
      recorder.record({ stepId: `s${i}`, order: i, action: 'click', duration: 10, networkLog: [], consoleLogs: [] });
    }
    expect(recorder.getStepCount()).toBe(5);
  });
});
