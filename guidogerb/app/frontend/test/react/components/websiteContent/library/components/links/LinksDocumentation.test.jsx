import React from 'react';
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { LinksDocumentation } from '../../../../../../../src/react/components/websiteContent/library/components/links/LinksDocumentation';

describe('LinksDocumentation', () => {
  test('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <LinksDocumentation />
      </BrowserRouter>
    );
    expect(container).toBeTruthy();
  });

  test('renders main heading', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <LinksDocumentation />
      </BrowserRouter>
    );
    expect(getByRole('heading', { name: /^Links$/i, level: 1 })).toBeTruthy();
  });

  test('renders Examples section', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <LinksDocumentation />
      </BrowserRouter>
    );
    expect(getByRole('heading', { name: /Examples/i, level: 2 })).toBeTruthy();
  });

  test('renders Text Links example', () => {
    const { container } = render(
      <BrowserRouter>
        <LinksDocumentation />
      </BrowserRouter>
    );
    const headings = container.querySelectorAll('h3');
    const hasTextLinks = Array.from(headings).some(h => h.textContent.includes('Text Links'));
    expect(hasTextLinks).toBeTruthy();
  });

  test('renders Image Links example', () => {
    const { container } = render(
      <BrowserRouter>
        <LinksDocumentation />
      </BrowserRouter>
    );
    const headings = container.querySelectorAll('h3');
    const hasImageLinks = Array.from(headings).some(h => h.textContent.includes('Image Links'));
    expect(hasImageLinks).toBeTruthy();
  });
});
