import React from 'react';
import { render } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { RoutePage } from '../../../../src/react/components/routing/RoutePage';

describe('RoutePage', () => {
  test('renders without crashing', () => {
    const mockPage = {
      pageTitle: 'Test Page',
      id: 'test-page',
      menuTitle: 'Test',
      relativeUrl: '/test'
    };
    
    const { container } = render(
      <BrowserRouter>
        <RoutePage page={mockPage}>
          <div>Test Content</div>
        </RoutePage>
      </BrowserRouter>
    );
    expect(container).toBeTruthy();
  });

  test('renders children content', () => {
    const mockPage = {
      pageTitle: 'Test Page',
      id: 'test-page',
      menuTitle: 'Test',
      relativeUrl: '/test'
    };
    
    const { getByText } = render(
      <BrowserRouter>
        <RoutePage page={mockPage}>
          <div>Test Content</div>
        </RoutePage>
      </BrowserRouter>
    );
    expect(getByText(/Test Content/i)).toBeTruthy();
  });

  test('accepts page prop with required properties', () => {
    const mockPage = {
      pageTitle: 'Another Page',
      id: 'another-page',
      menuTitle: 'Another',
      relativeUrl: '/another'
    };
    
    const { container } = render(
      <BrowserRouter>
        <RoutePage page={mockPage}>
          <p>Content here</p>
        </RoutePage>
      </BrowserRouter>
    );
    expect(container).toBeTruthy();
  });

  test('sets document title with page title', () => {
    const mockPage = {
      pageTitle: 'Custom Title',
      id: 'custom',
      menuTitle: 'Custom',
      relativeUrl: '/custom'
    };
    
    render(
      <BrowserRouter>
        <RoutePage page={mockPage}>
          <div>Content</div>
        </RoutePage>
      </BrowserRouter>
    );
    
    // Document title should be set during layout effect
    expect(document.title).toContain('Custom Title');
  });
});
