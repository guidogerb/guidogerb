import React from 'react';
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ListsDocumentation } from '../../../../../../../src/react/components/websiteContent/library/components/lists/ListsDocumentation';

describe('ListsDocumentation', () => {
  test('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <ListsDocumentation />
      </BrowserRouter>
    );
    expect(container).toBeTruthy();
  });

  test('renders main heading', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <ListsDocumentation />
      </BrowserRouter>
    );
    expect(getByRole('heading', { name: /^Lists$/i, level: 1 })).toBeTruthy();
  });

  test('renders Example section', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <ListsDocumentation />
      </BrowserRouter>
    );
    expect(getByRole('heading', { name: /Example/i, level: 2 })).toBeTruthy();
  });

  test('renders Unordered list example', () => {
    const { container } = render(
      <BrowserRouter>
        <ListsDocumentation />
      </BrowserRouter>
    );
    const headings = container.querySelectorAll('h3');
    const hasUnordered = Array.from(headings).some(h => h.textContent.includes('Unordered'));
    expect(hasUnordered).toBeTruthy();
  });

  test('renders Ordered list example', () => {
    const { container } = render(
      <BrowserRouter>
        <ListsDocumentation />
      </BrowserRouter>
    );
    const headings = container.querySelectorAll('h3');
    const hasOrdered = Array.from(headings).some(h => h.textContent.includes('Ordered'));
    expect(hasOrdered).toBeTruthy();
  });

  test('renders With Icons list example', () => {
    const { container } = render(
      <BrowserRouter>
        <ListsDocumentation />
      </BrowserRouter>
    );
    const headings = container.querySelectorAll('h3');
    const hasWithIcons = Array.from(headings).some(h => h.textContent.includes('With Icons'));
    expect(hasWithIcons).toBeTruthy();
  });
});
