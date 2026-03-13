import React from 'react';
import { render } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { SandboxExample } from '../../../../src/react/components/sandbox/SandboxExample';

// Mock components for testing
const MockCodeExample = ({ state, setState }) => <div data-testid="code-example">Code Example</div>;
const MockPropsExample = ({ state, setState }) => <div data-testid="props-example">Props Example</div>;
const MockRenderExample = ({ state, setState, innerRef }) => (
  <div ref={innerRef} data-testid="render-example">Render Example</div>
);

describe('SandboxExample', () => {
  const defaultProps = {
    text: 'Click me',
    isDisabled: false,
  };

  test('renders without crashing', () => {
    const { container } = render(
      <SandboxExample
        CODE_EXAMPLE={MockCodeExample}
        PROPS_EXAMPLE={MockPropsExample}
        RENDER_EXAMPLE={MockRenderExample}
        defaultProps={defaultProps}
      />
    );
    expect(container).toBeTruthy();
  });

  test('renders all three example components', () => {
    const { getByTestId } = render(
      <SandboxExample
        CODE_EXAMPLE={MockCodeExample}
        PROPS_EXAMPLE={MockPropsExample}
        RENDER_EXAMPLE={MockRenderExample}
        defaultProps={defaultProps}
      />
    );
    
    expect(getByTestId('code-example')).toBeTruthy();
    expect(getByTestId('props-example')).toBeTruthy();
    expect(getByTestId('render-example')).toBeTruthy();
  });

  test('applies custom className', () => {
    const { container } = render(
      <SandboxExample
        CODE_EXAMPLE={MockCodeExample}
        PROPS_EXAMPLE={MockPropsExample}
        RENDER_EXAMPLE={MockRenderExample}
        defaultProps={defaultProps}
        className="custom-sandbox"
      />
    );
    expect(container.querySelector('.custom-sandbox')).toBeTruthy();
  });

  test('applies componentClassName to render section', () => {
    const { container } = render(
      <SandboxExample
        CODE_EXAMPLE={MockCodeExample}
        PROPS_EXAMPLE={MockPropsExample}
        RENDER_EXAMPLE={MockRenderExample}
        defaultProps={defaultProps}
        componentClassName="custom-component"
      />
    );
    expect(container.querySelector('.custom-component')).toBeTruthy();
  });

  test('applies propsInputsClassName to props section', () => {
    const { container } = render(
      <SandboxExample
        CODE_EXAMPLE={MockCodeExample}
        PROPS_EXAMPLE={MockPropsExample}
        RENDER_EXAMPLE={MockRenderExample}
        defaultProps={defaultProps}
        propsInputsClassName="custom-props"
      />
    );
    expect(container.querySelector('.custom-props')).toBeTruthy();
  });

  test('initializes with default props', () => {
    const { getByTestId } = render(
      <SandboxExample
        CODE_EXAMPLE={MockCodeExample}
        PROPS_EXAMPLE={MockPropsExample}
        RENDER_EXAMPLE={MockRenderExample}
        defaultProps={defaultProps}
      />
    );
    // Component should render successfully with default props
    expect(getByTestId('render-example')).toBeTruthy();
  });
});
