import React from 'react';
import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { DesignSystemFooterSocialMedia } from '../../../../src/react/components/header/DesignSystemFooterSocialMedia';

describe('DesignSystemFooterSocialMedia', () => {
  test('renders without crashing', () => {
    const { container } = render(<DesignSystemFooterSocialMedia />);
    expect(container).toBeTruthy();
  });

  test('renders Connect with us title', () => {
    const { getByText } = render(<DesignSystemFooterSocialMedia />);
    expect(getByText(/Connect with us/i)).toBeTruthy();
  });

  test('renders email link', () => {
    const { container } = render(<DesignSystemFooterSocialMedia />);
    const emailLink = container.querySelector('a[href^="mailto:"]');
    expect(emailLink).toBeTruthy();
  });

  test('renders Slack link', () => {
    const { container } = render(<DesignSystemFooterSocialMedia />);
    const slackLink = container.querySelector('a[href*="slack.com"]');
    expect(slackLink).toBeTruthy();
  });

  test('renders GitHub link', () => {
    const { container } = render(<DesignSystemFooterSocialMedia />);
    const githubLink = container.querySelector('a[href*="github.com"]');
    expect(githubLink).toBeTruthy();
  });

  test('all external links open in new tab', () => {
    const { container } = render(<DesignSystemFooterSocialMedia />);
    const externalLinks = container.querySelectorAll('a[target="_blank"]');
    expect(externalLinks.length).toBeGreaterThan(0);
    externalLinks.forEach(link => {
      expect(link.getAttribute('rel')).toBe('noreferrer');
    });
  });
});
