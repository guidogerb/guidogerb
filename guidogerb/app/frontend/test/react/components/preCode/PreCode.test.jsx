import React from 'react';
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { PreCode } from '../../../../src/react/components/preCode/PreCode';

describe('PreCode', () => {
  test('renders without crashing', () => {
    const { container } = render(<PreCode>const test = 'hello';</PreCode>);
    expect(container).toBeTruthy();
  });

  test('renders children content', () => {
    const { container } = render(<PreCode>const x = 1;</PreCode>);
    expect(container.textContent).toContain('const x = 1');
  });

  test('applies className prop', () => {
    const { container } = render(<PreCode className="custom-class">test</PreCode>);
    const preElement = container.querySelector('pre');
    expect(preElement?.className).toContain('custom-class');
  });

  test('applies showBackgroundColor class', () => {
    const { container } = render(<PreCode showBackgroundColor>test</PreCode>);
    const preElement = container.querySelector('pre');
    expect(preElement?.className).toContain('gray-block');
  });

  test('applies overflow class when allowScrollOverflow is true', () => {
    const { container } = render(<PreCode allowScrollOverflow>test</PreCode>);
    const preElement = container.querySelector('pre');
    expect(preElement?.className).toContain('pre-code--overflow');
  });

  test('applies padding class when addHorizontalPadding is true', () => {
    const { container } = render(<PreCode addHorizontalPadding>test</PreCode>);
    const preElement = container.querySelector('pre');
    expect(preElement?.className).toContain('pre-code--padded');
  });

  test('applies maxHeight style', () => {
    const { container } = render(<PreCode maxHeight="200px">test</PreCode>);
    const preElement = container.querySelector('pre');
    expect(preElement?.style.maxHeight).toBe('200px');
  });

  test('renders copy button', () => {
    const { container } = render(<PreCode>test</PreCode>);
    expect(container.querySelector('.copy-button')).toBeTruthy();
  });

  test('makes scrollable pre focusable with tabIndex', () => {
    const { container } = render(<PreCode allowScrollOverflow>test</PreCode>);
    const preElement = container.querySelector('pre');
    expect(preElement?.getAttribute('tabIndex')).toBe('0');
  });
});
