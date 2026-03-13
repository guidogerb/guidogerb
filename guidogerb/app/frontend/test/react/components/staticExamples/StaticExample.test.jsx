import React from 'react';
import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { StaticExample } from '../../../../src/react/components/staticExamples/StaticExample';

describe('StaticExample', () => {
  test('renders without crashing', () => {
    const { container } = render(
      <StaticExample renderedExample={<div>Test content</div>} />
    );
    expect(container).toBeTruthy();
  });

  test('renders the provided example content', () => {
    const { getByText } = render(
      <StaticExample renderedExample={<div>Example Component</div>} />
    );
    expect(getByText('Example Component')).toBeTruthy();
  });

  test('renders title when provided', () => {
    const { getByText } = render(
      <StaticExample
        title="Example Title"
        renderedExample={<div>Content</div>}
      />
    );
    expect(getByText('Example Title')).toBeTruthy();
  });

  test('does not render title heading when title not provided', () => {
    const { container } = render(
      <StaticExample renderedExample={<div>Content</div>} />
    );
    const heading = container.querySelector('h3');
    expect(heading).toBeNull();
  });

  test('renders quick tips when provided', () => {
    const { getByText } = render(
      <StaticExample
        renderedExample={<div>Content</div>}
        quickTips={<div>Helpful tip</div>}
      />
    );
    expect(getByText('Helpful tip')).toBeTruthy();
  });

  test('does not render quick tips section when not provided', () => {
    const { container } = render(
      <StaticExample renderedExample={<div>Content</div>} />
    );
    const quickTips = container.querySelector('.static-example__quick-tips');
    expect(quickTips).toBeNull();
  });

  test('applies custom className when provided', () => {
    const { container } = render(
      <StaticExample
        className="custom-class"
        renderedExample={<div>Content</div>}
      />
    );
    const wrapper = container.querySelector('.static-example');
    expect(wrapper?.className).toContain('custom-class');
  });

  test('applies id attribute when provided', () => {
    const { container } = render(
      <StaticExample
        id="test-id"
        renderedExample={<div>Content</div>}
      />
    );
    const element = container.querySelector('#test-id');
    expect(element).toBeTruthy();
  });
});
