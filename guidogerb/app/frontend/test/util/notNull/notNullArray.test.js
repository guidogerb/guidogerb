import { describe, expect, it } from 'vitest';
import { notNullArray } from '../../../src/react/util/notNull/notNullArray';

describe('notNullArray', () => {
  it('returns the array when all elements are non-null', () => {
    const arr = [1, 2, 3, 4];
    expect(notNullArray(arr, 'error')).toEqual([1, 2, 3, 4]);
  });

  it('returns array with string elements', () => {
    const arr = ['a', 'b', 'c'];
    expect(notNullArray(arr, 'error')).toEqual(['a', 'b', 'c']);
  });

  it('returns array with object elements', () => {
    const arr = [{ id: 1 }, { id: 2 }];
    const result = notNullArray(arr, 'error');
    expect(result).toEqual(arr);
    expect(result[0]).toBe(arr[0]);
  });

  it('returns empty array when given empty array', () => {
    expect(notNullArray([], 'error')).toEqual([]);
  });

  it('preserves falsy values that are not null or undefined', () => {
    const arr = [0, false, '', NaN];
    const result = notNullArray(arr, 'error');
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(false);
    expect(result[2]).toBe('');
    expect(result[3]).toBeNaN();
  });

  it('throws error when array itself is null', () => {
    expect(() => notNullArray(null, 'Array is null')).toThrow('Array is null');
  });

  it('throws error when array itself is undefined', () => {
    expect(() => notNullArray(undefined, 'Array is undefined')).toThrow('Array is undefined');
  });

  it('throws error when array contains null', () => {
    const arr = [1, 2, null, 4];
    expect(() => notNullArray(arr, 'Array contains null')).toThrow('Array contains null');
  });

  it('throws error when array contains undefined', () => {
    const arr = [1, 2, undefined, 4];
    expect(() => notNullArray(arr, 'Array contains undefined')).toThrow('Array contains undefined');
  });

  it('throws error on first null/undefined element encountered', () => {
    const arr = [1, null, undefined, 4];
    expect(() => notNullArray(arr, 'Invalid element')).toThrow('Invalid element');
  });

  it('works with arrays of different types', () => {
    const mixedArray = [1, 'two', { three: 3 }, [4], true];
    const result = notNullArray(mixedArray, 'error');
    expect(result).toEqual(mixedArray);
  });

  it('throws Error type with correct message', () => {
    try {
      notNullArray(null, 'Custom error message');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Custom error message');
    }
  });

  it('can be used for type assertion in TypeScript', () => {
    // Demonstrates type narrowing functionality
    const maybeArray = [1, 2, 3];
    const definiteArray = notNullArray(maybeArray, 'Should have array');
    
    expect(definiteArray).toEqual([1, 2, 3]);
  });
});
