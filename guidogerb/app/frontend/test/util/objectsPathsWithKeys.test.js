import { describe, expect, it } from 'vitest';
import { objectsPathsWithKeys } from '../../src/react/util/objectsPathsWithKeys';

describe('objectsPathsWithKeys', () => {
  it('finds key in root object', () => {
    const obj = { name: 'John', age: 30 };
    const result = objectsPathsWithKeys(obj, ['name']);
    
    expect(result).toHaveLength(1);
    expect(result[0].searchKey).toBe('name');
    expect(result[0].path).toBe('');
    expect(result[0].object).toBe(obj);
  });

  it('finds multiple keys in root object', () => {
    const obj = { name: 'John', age: 30, city: 'NYC' };
    const result = objectsPathsWithKeys(obj, ['name', 'age']);
    
    expect(result).toHaveLength(2);
    expect(result[0].searchKey).toBe('name');
    expect(result[1].searchKey).toBe('age');
  });

  it('finds key in nested object', () => {
    const obj = {
      user: {
        profile: {
          name: 'John',
        },
      },
    };
    const result = objectsPathsWithKeys(obj, ['name']);
    
    expect(result).toHaveLength(1);
    expect(result[0].searchKey).toBe('name');
    expect(result[0].path).toBe('user.profile');
  });

  it('returns correct path for deeply nested objects', () => {
    const obj = {
      level1: {
        level2: {
          level3: {
            target: 'value',
          },
        },
      },
    };
    const result = objectsPathsWithKeys(obj, ['target']);
    
    expect(result).toHaveLength(1);
    expect(result[0].path).toBe('level1.level2.level3');
  });

  it('finds same key in multiple nested objects', () => {
    const obj = {
      user1: { id: 1 },
      user2: { id: 2 },
    };
    const result = objectsPathsWithKeys(obj, ['id']);
    
    expect(result).toHaveLength(2);
    expect(result[0].object.id).toBe(1);
    expect(result[1].object.id).toBe(2);
  });

  it('returns empty array when key not found', () => {
    const obj = { name: 'John', age: 30 };
    const result = objectsPathsWithKeys(obj, ['email']);
    
    expect(result).toEqual([]);
  });

  it('handles arrays in objects', () => {
    const obj = {
      users: [
        { name: 'John' },
        { name: 'Jane' },
      ],
    };
    const result = objectsPathsWithKeys(obj, ['name']);
    
    expect(result).toHaveLength(2);
  });

  it('returns empty array for null or undefined', () => {
    expect(objectsPathsWithKeys(null, ['key'])).toEqual([]);
    expect(objectsPathsWithKeys(undefined, ['key'])).toEqual([]);
  });

  it('handles empty object', () => {
    const result = objectsPathsWithKeys({}, ['name']);
    expect(result).toEqual([]);
  });

  it('handles empty search keys array', () => {
    const obj = { name: 'John' };
    const result = objectsPathsWithKeys(obj, []);
    expect(result).toEqual([]);
  });

  it('does not traverse into DOM elements', () => {
    // This test verifies that DOM elements are not traversed
    const mockElement = { nodeType: 1 };
    const obj = {
      element: mockElement,
      name: 'John',
    };
    
    // Should still find 'name' but not traverse into the element-like object
    const result = objectsPathsWithKeys(obj, ['name']);
    expect(result).toHaveLength(1);
  });

  it('handles complex nested structures', () => {
    const obj = {
      a: {
        b: {
          target: 1,
        },
        c: {
          target: 2,
        },
      },
      d: {
        e: {
          target: 3,
        },
      },
    };
    
    const result = objectsPathsWithKeys(obj, ['target']);
    expect(result).toHaveLength(3);
    expect(result[0].object.target).toBe(1);
    expect(result[1].object.target).toBe(2);
    expect(result[2].object.target).toBe(3);
  });
});
