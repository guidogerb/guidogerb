import { describe, expect, it } from 'vitest';
import { notNull } from '../../../src/react/util/notNull/notNull';

describe('notNull', () => {
  it('returns the value when it is not null or undefined', () => {
    expect(notNull('hello', 'error')).toBe('hello');
    expect(notNull(42, 'error')).toBe(42);
    expect(notNull(true, 'error')).toBe(true);
    expect(notNull(false, 'error')).toBe(false);
    expect(notNull(0, 'error')).toBe(0);
    expect(notNull('', 'error')).toBe('');
  });

  it('returns objects and arrays', () => {
    const obj = { key: 'value' };
    const arr = [1, 2, 3];
    
    expect(notNull(obj, 'error')).toBe(obj);
    expect(notNull(arr, 'error')).toBe(arr);
  });

  it('throws error with custom message when value is null', () => {
    expect(() => notNull(null, 'Value should not be null')).toThrow('Value should not be null');
  });

  it('throws error with custom message when value is undefined', () => {
    expect(() => notNull(undefined, 'Value should not be undefined')).toThrow('Value should not be undefined');
  });

  it('preserves falsy values that are not null or undefined', () => {
    expect(notNull(0, 'error')).toBe(0);
    expect(notNull(false, 'error')).toBe(false);
    expect(notNull('', 'error')).toBe('');
    expect(notNull(NaN, 'error')).toBeNaN();
  });

  it('works with complex objects', () => {
    const complexObj = {
      nested: {
        value: 123,
        array: [1, 2, 3],
      },
    };
    
    expect(notNull(complexObj, 'error')).toBe(complexObj);
  });

  it('throws Error type', () => {
    try {
      notNull(null, 'test error');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('test error');
    }
  });

  it('can be used to assert non-null values in TypeScript', () => {
    // This demonstrates the type assertion functionality
    const maybeValue = Math.random() > -1 ? 'value' : null;
    const definiteValue = notNull(maybeValue, 'Should have value');
    
    expect(definiteValue).toBe('value');
  });
});
