import React from 'react';
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ParagraphDocumentation } from '../../../../../../../../src/react/components/websiteContent/library/components/basicAtomic/Paragraph/ParagraphDocumentation';

describe('ParagraphDocumentation', () => {
  test('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <ParagraphDocumentation />
      </BrowserRouter>
    );
    expect(container).toBeTruthy();
  });

  test('renders main heading', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <ParagraphDocumentation />
      </BrowserRouter>
    );
    expect(getByRole('heading', { name: /Basic and Semantic Text/i, level: 1 })).toBeTruthy();
  });

  test('renders Basic Text section', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <ParagraphDocumentation />
      </BrowserRouter>
    );
    expect(getByRole('heading', { name: /Basic Text/i, level: 2 })).toBeTruthy();
  });

  test('renders Semantic Text section', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <ParagraphDocumentation />
      </BrowserRouter>
    );
    expect(getByRole('heading', { name: /Semantic Text/i, level: 2 })).toBeTruthy();
  });

  test('displays information about semantic text', () => {
    const { container } = render(
      <BrowserRouter>
        <ParagraphDocumentation />
      </BrowserRouter>
    );
    // Check if the component contains the text
    expect(container.textContent).toContain('semantic');
  });
});
