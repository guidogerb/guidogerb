import React from 'react';
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Page404 } from '../../../../src/react/components/websiteContent/Page404';

describe('Page404', () => {
  test('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <Page404 />
      </BrowserRouter>
    );
    expect(container).toBeTruthy();
  });

  test('displays Page Not Found heading', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <Page404 />
      </BrowserRouter>
    );
    expect(getByRole('heading', { name: /Page Not Found/i })).toBeTruthy();
  });

  test('displays error message', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Page404 />
      </BrowserRouter>
    );
    expect(getByText(/You have reached a web address url for which there is no page/i)).toBeTruthy();
  });

  test('includes link to home page', () => {
    const { getAllByRole } = render(
      <BrowserRouter>
        <Page404 />
      </BrowserRouter>
    );
    const links = getAllByRole('link');
    const homeLinks = links.filter(link => link.textContent?.includes('home') || link.textContent?.includes('Home'));
    expect(homeLinks.length).toBeGreaterThan(0);
  });

  test('includes link to Getting Started page', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Page404 />
      </BrowserRouter>
    );
    expect(getByText(/Getting Started/i)).toBeTruthy();
  });

  test('renders Home Page button with icon', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Page404 />
      </BrowserRouter>
    );
    const homeButton = getByText(/Home Page/i);
    expect(homeButton).toBeTruthy();
    expect(homeButton.closest('.button--primary-color')).toBeTruthy();
  });

  test('has proper CSS classes for layout', () => {
    const { container } = render(
      <BrowserRouter>
        <Page404 />
      </BrowserRouter>
    );
    expect(container.querySelector('.page-not-found')).toBeTruthy();
    expect(container.querySelector('.landing-page-template')).toBeTruthy();
  });
});
