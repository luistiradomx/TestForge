import { formatDuration, formatPassRate, formatDate, truncate } from './format';

describe('formatDuration', () => {
  it('formats milliseconds', () => expect(formatDuration(500)).toBe('500ms'));
  it('formats seconds', () => expect(formatDuration(1500)).toBe('1.5s'));
  it('formats minutes', () => expect(formatDuration(90000)).toBe('1m 30s'));
});

describe('formatPassRate', () => {
  it('formats 1.0 as 100%', () => expect(formatPassRate(1.0)).toBe('100%'));
  it('formats 0.5 as 50%', () => expect(formatPassRate(0.5)).toBe('50%'));
  it('formats 0 as 0%', () => expect(formatPassRate(0)).toBe('0%'));
});

describe('truncate', () => {
  it('returns string unchanged if short enough', () => expect(truncate('hello', 10)).toBe('hello'));
  it('truncates long strings', () => {
    const result = truncate('hello world', 8);
    expect(result.length).toBeLessThanOrEqual(8);
    expect(result.endsWith('…')).toBe(true);
  });
});

describe('formatDate', () => {
  it('returns a non-empty string', () => {
    expect(formatDate(new Date()).length).toBeGreaterThan(0);
  });
});
