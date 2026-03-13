import { describe, test, expect } from 'vitest';
import { PreCodeDefaultProps } from '../../../../src/react/components/preCode/PreCodeDefaultProps';

describe('PreCodeDefaultProps', () => {
  test('exports an object', () => {
    expect(typeof PreCodeDefaultProps).toBe('object');
    expect(PreCodeDefaultProps).toBeTruthy();
  });

  test('has addHorizontalPadding property set to false', () => {
    expect(PreCodeDefaultProps.addHorizontalPadding).toBe(false);
  });

  test('has allowScrollOverflow property set to false', () => {
    expect(PreCodeDefaultProps.allowScrollOverflow).toBe(false);
  });

  test('has className property set to empty string', () => {
    expect(PreCodeDefaultProps.className).toBe('');
  });

  test('has maxHeight property set to null', () => {
    expect(PreCodeDefaultProps.maxHeight).toBe(null);
  });

  test('has propsForPre property set to empty object', () => {
    expect(PreCodeDefaultProps.propsForPre).toEqual({});
  });

  test('has showBackgroundColor property set to false', () => {
    expect(PreCodeDefaultProps.showBackgroundColor).toBe(false);
  });

  test('contains all expected default properties', () => {
    const expectedKeys = [
      'addHorizontalPadding',
      'allowScrollOverflow',
      'className',
      'maxHeight',
      'propsForPre',
      'showBackgroundColor'
    ];
    expect(Object.keys(PreCodeDefaultProps).sort()).toEqual(expectedKeys.sort());
  });
});
