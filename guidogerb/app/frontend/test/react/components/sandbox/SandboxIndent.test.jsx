import React from 'react';
import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { SandboxIndent } from '../../../../src/react/components/sandbox/SandboxIndent';

describe('SandboxIndent', () => {
  test('renders without crashing', () => {
    const { container } = render(<SandboxIndent indentLevel={0} />);
    expect(container).toBeTruthy();
  });

  test('renders correct number of indents for indentLevel 3', () => {
    const { container } = render(<SandboxIndent indentLevel={3} />);
    const spans = container.querySelectorAll('span');
    expect(spans.length).toBe(3);
  });

  test('renders no indents for indentLevel 0', () => {
    const { container } = render(<SandboxIndent indentLevel={0} />);
    const spans = container.querySelectorAll('span');
    expect(spans.length).toBe(0);
  });

  test('each indent span contains non-breaking spaces', () => {
    const { container } = render(<SandboxIndent indentLevel={2} />);
    const spans = container.querySelectorAll('span');
    spans.forEach(span => {
      expect(span.innerHTML).toContain('&nbsp;');
    });
  });
});
