import { describe, test, expect } from 'vitest';
import { formatNumber } from './common';

describe('formatNumber Utility Function', () => {
  test('formats numbers in billions (B)', () => {
    expect(formatNumber(1_000_000_000)).toBe('1B');
    expect(formatNumber(2_500_000_000)).toBe('2.5B');
  });

  test('formats numbers in millions (M)', () => {
    expect(formatNumber(1_000_000)).toBe('1M');
    expect(formatNumber(5_700_000)).toBe('5.7M');
  });

  test('formats numbers in thousands (K)', () => {
    expect(formatNumber(1_000)).toBe('1K');
    expect(formatNumber(9_900)).toBe('9.9K');
  });

  test('returns exact number for values less than 1000', () => {
    expect(formatNumber(500)).toBe('500');
    expect(formatNumber(42)).toBe('42');
  });

  test('handles edge cases', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(999_999)).toBe('1M'); // Should be rounded properly
  });
});
