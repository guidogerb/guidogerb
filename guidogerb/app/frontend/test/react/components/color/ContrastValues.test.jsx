import React from 'react';
import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { ContrastValues } from '../../../../src/react/components/color/ContrastValues';

describe('ContrastValues', () => {
  const mockColor1 = {
    hexColor: '#000000',
    name: 'Black',
  };

  const mockColor2 = {
    hexColor: '#FFFFFF',
    name: 'White',
  };

  test('renders without crashing', () => {
    const { container } = render(
      <ContrastValues color1={mockColor1} color2={mockColor2} />
    );
    expect(container).toBeTruthy();
  });

  test('renders Normal Text contrast box', () => {
    const { getByText } = render(
      <ContrastValues color1={mockColor1} color2={mockColor2} />
    );
    expect(getByText('Normal Text')).toBeTruthy();
  });

  test('renders Large Text contrast box', () => {
    const { getByText } = render(
      <ContrastValues color1={mockColor1} color2={mockColor2} />
    );
    expect(getByText('Large Text')).toBeTruthy();
  });

  test('displays contrast ratio', () => {
    const { container } = render(
      <ContrastValues color1={mockColor1} color2={mockColor2} />
    );
    // Black on white should have high contrast (21:1)
    const contrastText = container.textContent;
    expect(contrastText).toContain(':1');
  });

  test('calculates AAA rating for high contrast colors', () => {
    const { getByText, container } = render(
      <ContrastValues color1={mockColor1} color2={mockColor2} />
    );
    // Black on white should get AAA rating
    const textContent = container.textContent;
    expect(textContent).toContain('AAA');
  });

  test('handles low contrast colors', () => {
    const lowContrast1 = { hexColor: '#888888', name: 'Gray' };
    const lowContrast2 = { hexColor: '#999999', name: 'Light Gray' };
    
    const { container } = render(
      <ContrastValues color1={lowContrast1} color2={lowContrast2} />
    );
    expect(container).toBeTruthy();
  });
});
