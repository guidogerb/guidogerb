import { describe, expect, it } from 'vitest';
import { notNullMap } from '../../../src/react/util/notNull/notNullMap';

describe('notNullMap', () => {
  it('should return the value when it is not null or undefined', () => {
    const value = 'test';
    const result = notNullMap(value);
    expect(result).toBe(value);
  });

  it('should throw an error when value is null', () => {
    expect(() => notNullMap(null)).toThrow('notNullMap: value is null or undefined');
  });

  it('should throw an error when value is undefined', () => {
    expect(() => notNullMap(undefined)).toThrow('notNullMap: value is null or undefined');
  });

  it('should work with string values', () => {
    expect(notNullMap('hello')).toBe('hello');
  });

  it('should work with number values', () => {
    expect(notNullMap(42)).toBe(42);
    expect(notNullMap(0)).toBe(0);
    expect(notNullMap(-1)).toBe(-1);
  });

  it('should work with boolean values', () => {
    expect(notNullMap(true)).toBe(true);
    expect(notNullMap(false)).toBe(false);
  });

  it('should work with object values', () => {
    const obj = { key: 'value' };
    expect(notNullMap(obj)).toBe(obj);
  });

  it('should work with array values', () => {
    const arr = [1, 2, 3];
    expect(notNullMap(arr)).toBe(arr);
  });

  it('should work with empty string', () => {
    expect(notNullMap('')).toBe('');
  });

  it('should work with empty array', () => {
    const emptyArr = [];
    expect(notNullMap(emptyArr)).toBe(emptyArr);
  });

  it('should work with empty object', () => {
    const emptyObj = {};
    expect(notNullMap(emptyObj)).toBe(emptyObj);
  });

  it('should work in array map operations', () => {
    const values = ['a', 'b', 'c'];
    const result = values.map(notNullMap);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should preserve type information', () => {
    const num = 123;
    const result = notNullMap(num);
    expect(typeof result).toBe('number');
  });
});
