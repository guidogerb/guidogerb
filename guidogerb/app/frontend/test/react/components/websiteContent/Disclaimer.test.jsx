import React from 'react';
import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { Disclaimer } from '../../../../src/react/components/websiteContent/Disclaimer';

describe('Disclaimer', () => {
  test('renders without crashing', () => {
    const { container } = render(<Disclaimer />);
    expect(container).toBeTruthy();
  });

  test('renders Note heading', () => {
    const { getByRole } = render(<Disclaimer />);
    expect(getByRole('heading', { name: /Note/i })).toBeTruthy();
  });

  test('displays disclaimer message', () => {
    const { getByText } = render(<Disclaimer />);
    expect(getByText(/not implemented in the design system/i)).toBeTruthy();
  });

  test('displays contact information', () => {
    const { getByText } = render(<Disclaimer />);
    expect(getByText(/reach out to us/i)).toBeTruthy();
  });

  test('renders email link', () => {
    const { container } = render(<Disclaimer />);
    const emailLink = container.querySelector('a[href^="mailto:"]');
    expect(emailLink).toBeTruthy();
    expect(emailLink?.getAttribute('href')).toContain('ui@guidogerbpublishing.gov');
  });

  test('renders info icon', () => {
    const { container } = render(<Disclaimer />);
    const icon = container.querySelector('.ds-icon-before-info');
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
  });
});
