import React from 'react';
import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { HeadingWithLink } from '../../../../src/react/components/staticExamples/HeadingWithLink';

describe('HeadingWithLink', () => {
  test('renders without crashing', () => {
    const { container } = render(
      <HeadingWithLink
        headingTag="h2"
        headingTitle="Test Heading"
        id="test-id"
        linkUrl="https://example.com"
      />
    );
    expect(container).toBeTruthy();
  });

  test('renders heading with correct title', () => {
    const { getByText } = render(
      <HeadingWithLink
        headingTag="h2"
        headingTitle="My Test Heading"
        id="test-heading"
        linkUrl="https://example.com"
      />
    );
    expect(getByText('My Test Heading')).toBeTruthy();
  });

  test('renders external link with correct text', () => {
    const { getByText } = render(
      <HeadingWithLink
        headingTag="h3"
        headingTitle="Test"
        id="test"
        linkUrl="https://github.com/test"
      />
    );
    expect(getByText('See code on GitHub')).toBeTruthy();
  });

  test('heading has correct id attribute', () => {
    const { container } = render(
      <HeadingWithLink
        headingTag="h2"
        headingTitle="Test"
        id="custom-id"
        linkUrl="https://example.com"
      />
    );
    const heading = container.querySelector('#custom-id');
    expect(heading).toBeTruthy();
  });
});
