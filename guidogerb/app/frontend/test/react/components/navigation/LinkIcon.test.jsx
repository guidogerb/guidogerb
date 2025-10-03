import React from 'react';
import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { LinkIcon } from '../../../../src/react/components/navigation/LinkIcon';

describe('LinkIcon', () => {
  test('renders without crashing', () => {
    const { container } = render(<LinkIcon />);
    expect(container).toBeTruthy();
  });

  test('renders with className', () => {
    const { container } = render(<LinkIcon className="custom-class" />);
    const span = container.querySelector('span');
    expect(span).toBeTruthy();
    expect(span?.className).toContain('ds-icon-before-chevron-right');
    expect(span?.className).toContain('custom-class');
  });

  test('has aria-hidden attribute', () => {
    const { container } = render(<LinkIcon />);
    const span = container.querySelector('span');
    expect(span?.getAttribute('aria-hidden')).toBe('true');
  });
});
