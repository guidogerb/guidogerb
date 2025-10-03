import React from 'react';
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { BlockquoteDocumentation } from '../../../../../../../../src/react/components/websiteContent/library/components/basicAtomic/Blockquote/BlockquoteDocumentation';

describe('BlockquoteDocumentation', () => {
  test('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <BlockquoteDocumentation />
      </BrowserRouter>
    );
    expect(container).toBeTruthy();
  });

  test('renders main heading', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <BlockquoteDocumentation />
      </BrowserRouter>
    );
    expect(getByRole('heading', { name: /Block Quote/i, level: 1 })).toBeTruthy();
  });

  test('renders Examples section', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <BlockquoteDocumentation />
      </BrowserRouter>
    );
    expect(getByRole('heading', { name: /Examples/i, level: 2 })).toBeTruthy();
  });

  test('renders chiclet quote example', () => {
    const { getByText } = render(
      <BrowserRouter>
        <BlockquoteDocumentation />
      </BrowserRouter>
    );
    expect(getByText(/Quotes using a chiclet/i)).toBeTruthy();
  });

  test('renders quotation marks example', () => {
    const { getByText } = render(
      <BrowserRouter>
        <BlockquoteDocumentation />
      </BrowserRouter>
    );
    expect(getByText(/Quotes using quotation marks/i)).toBeTruthy();
  });
});
