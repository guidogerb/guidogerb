import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Search } from '../../../../src/react/components/websiteContent/Search';

describe('Search', () => {
  let originalLocation;

  beforeEach(() => {
    originalLocation = window.location;
    // Mock window.location
    delete window.location;
    window.location = { ...originalLocation, toLocaleString: () => 'http://localhost:3000/search' };
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  const renderSearch = () => {
    return render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
  };

  it('renders the search page heading', () => {
    renderSearch();
    
    expect(screen.getByRole('heading', { name: /search results/i })).toBeTruthy();
  });

  it('renders the search form', () => {
    renderSearch();
    
    const form = screen.getByRole('search');
    expect(form).toBeTruthy();
  });

  it('renders the search input field', () => {
    const { container } = renderSearch();
    
    const input = container.querySelector('#searchInput');
    expect(input).toBeTruthy();
    expect(input?.getAttribute('type')).toBe('text');
    expect(input?.getAttribute('name')).toBe('q');
  });

  it('renders the search button', () => {
    const { container } = renderSearch();
    
    const button = container.querySelector('.search-modal__button');
    expect(button).toBeTruthy();
    expect(button?.getAttribute('type')).toBe('submit');
  });

  it('updates search input value on change', () => {
    const { container } = renderSearch();
    
    const input = container.querySelector('#searchInput');
    fireEvent.change(input, { target: { value: 'test query' } });
    
    expect(input?.value).toBe('test query');
  });

  it('shows search button when query is not empty', () => {
    const { container } = renderSearch();
    
    const input = container.querySelector('#searchInput');
    fireEvent.change(input, { target: { value: 'test' } });
    
    const buttonWrapper = container.querySelector('.search-modal__button-wrapper');
    expect(buttonWrapper?.className).not.toContain('visually-hidden');
  });

  it('hides search button when query is empty', () => {
    const { container } = renderSearch();
    
    const buttonWrapper = container.querySelector('.search-modal__button-wrapper');
    expect(buttonWrapper?.className).toContain('visually-hidden');
  });

  it('renders Google CSE container', () => {
    const { container } = renderSearch();
    
    const gcseContainer = container.querySelector('.gcse-searchresults-only');
    expect(gcseContainer).toBeTruthy();
  });

  it('renders with proper ARIA attributes', () => {
    const { container } = renderSearch();
    
    const form = container.querySelector('[role="search"]');
    expect(form?.getAttribute('aria-label')).toBe('Sitewide');
  });

  it('has a focusable main container', () => {
    const { container } = renderSearch();
    
    const mainContainer = container.querySelector('.landing-page-template.search-page');
    expect(mainContainer).toBeTruthy();
    expect(mainContainer?.getAttribute('tabIndex')).toBe('0');
  });
});
