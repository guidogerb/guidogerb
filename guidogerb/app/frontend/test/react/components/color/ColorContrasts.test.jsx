import React from 'react';
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ColorContrasts } from '../../../../src/react/components/color/ColorContrasts';
import { CssContextProvider } from '../../../../src/react/context/cssContext/CssContextProvider';

describe('ColorContrasts', () => {
  test('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <CssContextProvider>
          <ColorContrasts />
        </CssContextProvider>
      </BrowserRouter>
    );
    expect(container).toBeTruthy();
  });

  test('renders color contrast comparison interface', () => {
    const { container } = render(
      <BrowserRouter>
        <CssContextProvider>
          <ColorContrasts />
        </CssContextProvider>
      </BrowserRouter>
    );
    // Should have color contrast elements
    expect(container.querySelector('.color-contrast-box')).toBeTruthy();
  });

  test('displays color selection interface', () => {
    const { container } = render(
      <BrowserRouter>
        <CssContextProvider>
          <ColorContrasts />
        </CssContextProvider>
      </BrowserRouter>
    );
    // Should have color selection UI elements
    expect(container.textContent).toContain('Choose a color');
  });

  test('renders contrast values section', () => {
    const { container } = render(
      <BrowserRouter>
        <CssContextProvider>
          <ColorContrasts />
        </CssContextProvider>
      </BrowserRouter>
    );
    // Should show contrast values
    expect(container.textContent).toContain('Normal Text');
  });

  test('provides color contrast information', () => {
    const { container } = render(
      <BrowserRouter>
        <CssContextProvider>
          <ColorContrasts />
        </CssContextProvider>
      </BrowserRouter>
    );
    expect(container.textContent).toContain('contrast');
  });
});
