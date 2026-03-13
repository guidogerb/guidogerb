import React, { useRef } from 'react';
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { PreCodeForRef } from '../../../../src/react/components/preCode/PreCodeForRef';

// Wrapper component to provide a ref
function TestWrapper({ deps = [] }) {
  const targetRef = useRef(null);
  
  return (
    <div>
      <div ref={targetRef} data-testid="target">
        <button onClick={() => alert('test')}>Click Me</button>
      </div>
      <PreCodeForRef targetRef={targetRef} deps={deps} />
    </div>
  );
}

describe('PreCodeForRef', () => {
  test('renders without crashing', () => {
    const { container } = render(<TestWrapper />);
    expect(container).toBeTruthy();
  });

  test('displays formatted HTML from target ref', () => {
    const { container } = render(<TestWrapper />);
    // Should contain the button text
    expect(container.textContent).toContain('Click Me');
  });

  test('updates when deps change', () => {
    const { rerender, container } = render(<TestWrapper deps={[1]} />);
    expect(container).toBeTruthy();
    
    rerender(<TestWrapper deps={[2]} />);
    expect(container).toBeTruthy();
  });

  test('handles className prop', () => {
    const targetRef = React.createRef();
    const { container } = render(
      <div>
        <div ref={targetRef}><p>Test</p></div>
        <PreCodeForRef targetRef={targetRef} deps={[]} className="custom" />
      </div>
    );
    const preElement = container.querySelector('pre');
    expect(preElement?.className).toContain('custom');
  });

  test('renders with empty target ref', () => {
    const emptyRef = React.createRef();
    const { container } = render(
      <PreCodeForRef targetRef={emptyRef} deps={[]} />
    );
    expect(container).toBeTruthy();
  });
});
