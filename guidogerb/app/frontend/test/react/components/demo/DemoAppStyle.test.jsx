import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { DemoAppStyle } from '../../../../src/react/components/demo/DemoAppStyle';
import { CssContextProvider } from '../../../../src/react/context/cssContext/CssContextProvider';

describe('DemoAppStyle', () => {
  const renderDemoAppStyle = () => {
    return render(
      <BrowserRouter>
        <CssContextProvider>
          <DemoAppStyle />
        </CssContextProvider>
      </BrowserRouter>
    );
  };

  it('renders without crashing', () => {
    expect(() => renderDemoAppStyle()).not.toThrow();
  });

  it('renders a style tag', () => {
    const { container } = renderDemoAppStyle();
    
    const styleTag = container.querySelector('style');
    expect(styleTag).toBeTruthy();
  });

  it('style tag contains CSS custom properties', () => {
    const { container } = renderDemoAppStyle();
    
    const styleTag = container.querySelector('style');
    expect(styleTag?.textContent).toContain('.design-system');
  });

  it('generates CSS from cssState', () => {
    const { container } = renderDemoAppStyle();
    
    const styleTag = container.querySelector('style');
    // The style should contain key-value pairs from cssState
    expect(styleTag?.textContent).toBeTruthy();
  });

  it('uses dangerouslySetInnerHTML to inject CSS', () => {
    const { container } = renderDemoAppStyle();
    
    const styleTag = container.querySelector('style');
    expect(styleTag).toBeTruthy();
    // Verify it actually has content (dangerouslySetInnerHTML worked)
    expect(styleTag?.innerHTML.length).toBeGreaterThan(0);
  });
});
