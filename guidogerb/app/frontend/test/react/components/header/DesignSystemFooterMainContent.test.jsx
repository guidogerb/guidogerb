import React from 'react';
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { DesignSystemFooterMainContent } from '../../../../src/react/components/header/DesignSystemFooterMainContent';
import { HeaderContextProvider } from '../../../../src/design-system/react/contexts/HeaderContext/HeaderContextProvider';

describe('DesignSystemFooterMainContent', () => {
  test('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <HeaderContextProvider>
          <DesignSystemFooterMainContent />
        </HeaderContextProvider>
      </BrowserRouter>
    );
    expect(container).toBeTruthy();
  });

  test('displays agency information', () => {
    const { container } = render(
      <BrowserRouter>
        <HeaderContextProvider>
          <DesignSystemFooterMainContent />
        </HeaderContextProvider>
      </BrowserRouter>
    );
    expect(container.textContent).toContain('Department of Government Operations');
    expect(container.textContent).toContain('Design System');
  });

  test('displays contact email', () => {
    const { container } = render(
      <BrowserRouter>
        <HeaderContextProvider>
          <DesignSystemFooterMainContent />
        </HeaderContextProvider>
      </BrowserRouter>
    );
    expect(container.textContent).toContain('ui@guidogerbpublishing.gov');
  });

  test('displays address information', () => {
    const { container } = render(
      <BrowserRouter>
        <HeaderContextProvider>
          <DesignSystemFooterMainContent />
        </HeaderContextProvider>
      </BrowserRouter>
    );
    expect(container.textContent).toContain('4315 South 2700 West');
    expect(container.textContent).toContain('Taylorsville');
  });

  test('renders Main Menu section', () => {
    const { container } = render(
      <BrowserRouter>
        <HeaderContextProvider>
          <DesignSystemFooterMainContent />
        </HeaderContextProvider>
      </BrowserRouter>
    );
    const columnTitles = container.querySelectorAll('.footer-agency-information__column-title');
    const hasMainMenu = Array.from(columnTitles).some(el => el.textContent === 'Main Menu');
    expect(hasMainMenu).toBeTruthy();
  });
});
