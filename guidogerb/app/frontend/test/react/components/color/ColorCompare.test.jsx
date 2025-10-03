import React from 'react';
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ColorCompare } from '../../../../src/react/components/color/ColorCompare';

describe('ColorCompare', () => {
  test('renders without crashing', () => {
    const { container } = render(<ColorCompare color1="#ffffff" color2="#000000" />);
    expect(container).toBeTruthy();
  });

  test('displays contrast ratio', () => {
    const { container } = render(<ColorCompare color1="#ffffff" color2="#000000" />);
    // White vs Black should have highest contrast (21:1)
    expect(container.textContent).toContain('21.00');
    expect(container.textContent).toContain(':1');
  });

  test('renders color swatches', () => {
    const { container } = render(<ColorCompare color1="#ff0000" color2="#00ff00" />);
    const swatches = container.querySelectorAll('.color-compare__swatch');
    expect(swatches.length).toBe(2);
  });

  test('applies correct background colors to swatches', () => {
    const { container } = render(<ColorCompare color1="#ff0000" color2="#00ff00" />);
    const swatches = container.querySelectorAll('.color-compare__swatch');
    expect(swatches[0].style.background).toBe('rgb(255, 0, 0)');
    expect(swatches[1].style.background).toBe('rgb(0, 255, 0)');
  });

  test('calculates contrast for similar colors', () => {
    const { container } = render(<ColorCompare color1="#333333" color2="#444444" />);
    // Similar colors should have low contrast
    const contrastDiv = container.querySelector('.color-compare__contrast');
    expect(contrastDiv?.textContent).toMatch(/\d+\.\d{2}:1/);
  });

  test('handles hex color formats', () => {
    const { container } = render(<ColorCompare color1="fff" color2="000" />);
    expect(container.querySelector('.color-compare__contrast')).toBeTruthy();
  });
});
