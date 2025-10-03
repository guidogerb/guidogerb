import React from 'react';
import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { ExampleCodeReactProp } from '../../../../src/react/components/sandbox/ExampleCodeReactProp';

describe('ExampleCodeReactProp', () => {
  test('renders without crashing when displayProp is provided', () => {
    const { container } = render(
      <ExampleCodeReactProp displayProp="someProp={value}" indentLevel={1} />
    );
    expect(container).toBeTruthy();
  });

  test('renders the displayProp text', () => {
    const { getByText } = render(
      <ExampleCodeReactProp displayProp='className="test"' indentLevel={0} />
    );
    expect(getByText('className="test"')).toBeTruthy();
  });

  test('renders null when displayProp is null', () => {
    const { container } = render(
      <ExampleCodeReactProp displayProp={null} indentLevel={0} />
    );
    // When displayProp is null, component returns null but container still exists
    expect(container).toBeTruthy();
    expect(container.textContent).toBe('');
  });

  test('renders null when displayProp is undefined', () => {
    const { container } = render(
      <ExampleCodeReactProp indentLevel={0} />
    );
    expect(container.textContent).toBe('');
  });

  test('renders with proper indentation', () => {
    const { container } = render(
      <ExampleCodeReactProp displayProp="testProp" indentLevel={2} />
    );
    // Should have indent spans
    expect(container.querySelector('span')).toBeTruthy();
  });

  test('renders with line break', () => {
    const { container } = render(
      <ExampleCodeReactProp displayProp="prop={value}" indentLevel={0} />
    );
    const br = container.querySelector('br');
    expect(br).toBeTruthy();
  });
});
