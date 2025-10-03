import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { CopyButton } from '../../../../src/react/components/copy/CopyButton';

describe('CopyButton', () => {
  test('renders without crashing', () => {
    const copyRef = { current: document.createElement('div') };
    copyRef.current.textContent = 'test content';
    
    const { container } = render(<CopyButton copyRef={copyRef} />);
    expect(container).toBeTruthy();
  });

  test('renders icon button', () => {
    const copyRef = { current: document.createElement('div') };
    
    const { container } = render(<CopyButton copyRef={copyRef} />);
    const button = container.querySelector('button');
    expect(button).toBeTruthy();
  });

  test('displays copy icon', () => {
    const copyRef = { current: document.createElement('div') };
    
    const { container } = render(<CopyButton copyRef={copyRef} />);
    const icon = container.querySelector('.ds-icon-before-copy');
    expect(icon).toBeTruthy();
  });

  test('handles null copyRef gracefully', () => {
    const copyRef = { current: null };
    
    const { container } = render(<CopyButton copyRef={copyRef} />);
    expect(container).toBeTruthy();
  });

  test('calls onCopy callback when provided', () => {
    const copyRef = { current: document.createElement('div') };
    copyRef.current.textContent = 'original text';
    const onCopy = vi.fn((text) => text.toUpperCase());
    
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(() => Promise.resolve()),
      },
    });
    
    const { container } = render(<CopyButton copyRef={copyRef} onCopy={onCopy} />);
    const button = container.querySelector('button');
    
    if (button) {
      fireEvent.click(button);
    }
    
    expect(onCopy).toHaveBeenCalled();
  });
});
