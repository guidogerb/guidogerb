import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { HomeLanding } from '../../../../src/react/components/websiteContent/HomeLanding';

describe('HomeLanding', () => {
  const renderHomeLanding = () => {
    return render(
      <BrowserRouter>
        <HomeLanding />
      </BrowserRouter>
    );
  };

  it('renders without crashing', () => {
    expect(() => renderHomeLanding()).not.toThrow();
  });

  it('renders the home banner with title', () => {
    const { container } = renderHomeLanding();
    
    const banner = container.querySelector('.home-banner');
    expect(banner).toBeTruthy();
    
    const title = container.querySelector('.home-banner__title');
    expect(title).toBeTruthy();
    expect(title?.textContent).toContain('Guido');
    expect(title?.textContent).toContain('Gerb');
    expect(title?.textContent).toContain('Publishing');
  });

  it('renders the tagline heading', () => {
    renderHomeLanding();
    
    expect(screen.getByRole('heading', { name: /all your publishing needs/i })).toBeTruthy();
  });

  it('has the landing page template class', () => {
    const { container } = renderHomeLanding();
    
    expect(container.querySelector('.landing-page-template')).toBeTruthy();
  });

  it('renders within MainContent component', () => {
    const { container } = renderHomeLanding();
    
    // MainContent should create a main element
    expect(container.querySelector('main')).toBeTruthy();
  });

  it('has content-width wrapper', () => {
    const { container } = renderHomeLanding();
    
    expect(container.querySelector('.content-width')).toBeTruthy();
  });
});
