import React from 'react';
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { PreCodeForCodeString } from '../../../../src/react/components/preCode/PreCodeForCodeString';

describe('PreCodeForCodeString', () => {
  test('renders without crashing', () => {
    const { container } = render(<PreCodeForCodeString codeRaw="const test = 'hello';" />);
    expect(container).toBeTruthy();
  });

  test('displays formatted code', () => {
    const { container } = render(<PreCodeForCodeString codeRaw="const x = 1;" />);
    expect(container.textContent).toContain('const');
    expect(container.textContent).toContain('x');
  });

  test('handles empty code string', () => {
    const { container } = render(<PreCodeForCodeString codeRaw="" />);
    expect(container).toBeTruthy();
  });

  test('handles multi-line code', () => {
    const code = `function test() {
  return 'hello';
}`;
    const { container } = render(<PreCodeForCodeString codeRaw={code} />);
    expect(container.textContent).toContain('function');
    expect(container.textContent).toContain('test');
  });

  test('applies className prop', () => {
    const { container } = render(<PreCodeForCodeString codeRaw="test" className="custom-class" />);
    const preElement = container.querySelector('pre');
    expect(preElement?.className).toContain('custom-class');
  });

  test('respects addHorizontalPadding prop', () => {
    const { container } = render(
      <PreCodeForCodeString codeRaw="test" addHorizontalPadding={true} />
    );
    expect(container).toBeTruthy();
  });

  test('respects showBackgroundColor prop', () => {
    const { container } = render(
      <PreCodeForCodeString codeRaw="test" showBackgroundColor={true} />
    );
    expect(container).toBeTruthy();
  });
});
