import React from 'react';
import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { ExampleCodeReactCode } from '../../../../src/react/components/sandbox/ExampleCodeReactCode';

describe('ExampleCodeReactCode', () => {
  test('renders without crashing when isRenderable is true', () => {
    const { container } = render(
      <ExampleCodeReactCode code="const x = 1;" isRenderable={true} />
    );
    expect(container).toBeTruthy();
  });

  test('renders code text when isRenderable is true', () => {
    const { getByText } = render(
      <ExampleCodeReactCode code="function test() {}" isRenderable={true} />
    );
    expect(getByText('function test() {}')).toBeTruthy();
  });

  test('renders null when isRenderable is false', () => {
    const { container } = render(
      <ExampleCodeReactCode code="some code" isRenderable={false} />
    );
    expect(container.textContent).toBe('');
  });

  test('renders with line break when isRenderable is true', () => {
    const { container } = render(
      <ExampleCodeReactCode code="test" isRenderable={true} />
    );
    const br = container.querySelector('br');
    expect(br).toBeTruthy();
  });

  test('handles undefined code gracefully', () => {
    const { container } = render(
      <ExampleCodeReactCode isRenderable={true} />
    );
    expect(container).toBeTruthy();
  });

  test('wraps code in span element', () => {
    const { container } = render(
      <ExampleCodeReactCode code="wrapped code" isRenderable={true} />
    );
    const span = container.querySelector('span');
    expect(span).toBeTruthy();
    expect(span?.textContent).toBe('wrapped code');
  });
});
