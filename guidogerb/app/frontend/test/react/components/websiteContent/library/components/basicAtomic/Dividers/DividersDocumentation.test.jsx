import React from 'react';
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { DividersDocumentation } from '../../../../../../../../src/react/components/websiteContent/library/components/basicAtomic/Dividers/DividersDocumentation';

describe('DividersDocumentation', () => {
  test('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <DividersDocumentation />
      </BrowserRouter>
    );
    expect(container).toBeTruthy();
  });

  test('renders main heading', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <DividersDocumentation />
      </BrowserRouter>
    );
    expect(getByRole('heading', { name: /Dividers/i, level: 1 })).toBeTruthy();
  });

  test('renders Examples section', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <DividersDocumentation />
      </BrowserRouter>
    );
    expect(getByRole('heading', { name: /Examples/i, level: 2 })).toBeTruthy();
  });

  test('renders horizontal divider example', () => {
    const { container } = render(
      <BrowserRouter>
        <DividersDocumentation />
      </BrowserRouter>
    );
    const headings = container.querySelectorAll('h3');
    const hasHorizontal = Array.from(headings).some(h => h.textContent.includes('Horizontal Dividers'));
    expect(hasHorizontal).toBeTruthy();
  });

  test('renders vertical divider example', () => {
    const { container } = render(
      <BrowserRouter>
        <DividersDocumentation />
      </BrowserRouter>
    );
    const headings = container.querySelectorAll('h3');
    const hasVertical = Array.from(headings).some(h => h.textContent.includes('Vertical Dividers'));
    expect(hasVertical).toBeTruthy();
  });
});
