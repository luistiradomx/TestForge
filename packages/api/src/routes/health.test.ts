import { healthHandler } from './health';

describe('healthHandler', () => {
  it('returns ok status', () => {
    const result = healthHandler();
    expect(result.status).toBe('ok');
    expect(result.version).toBe('1.0.0');
    expect(result.timestamp).toBeDefined();
  });
});
