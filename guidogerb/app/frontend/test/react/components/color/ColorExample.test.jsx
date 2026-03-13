import React from 'react';
import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { ColorExample } from '../../../../src/react/components/color/ColorExample';

describe('ColorExample', () => {
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
      <ColorExample color1={mockColor1} color2={mockColor2} />
    );
    expect(container).toBeTruthy();
  });

  test('renders normal text example', () => {
    const { getByText } = render(
      <ColorExample color1={mockColor1} color2={mockColor2} />
    );
    expect(getByText('Normal Text')).toBeTruthy();
    expect(getByText('Normal Bold Text')).toBeTruthy();
  });

  test('renders large text example', () => {
    const { getByText } = render(
      <ColorExample color1={mockColor1} color2={mockColor2} />
    );
    expect(getByText('Large Bold Text')).toBeTruthy();
    expect(getByText('Large Text')).toBeTruthy();
  });

  test('renders button element', () => {
    const { container } = render(
      <ColorExample color1={mockColor1} color2={mockColor2} />
    );
    const button = container.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.type).toBe('button');
  });

  test('applies color1 as text color and color2 as background', () => {
    const { container } = render(
      <ColorExample color1={mockColor1} color2={mockColor2} />
    );
    const box = container.querySelector('.color-example__box');
    expect(box?.style.color).toBe('rgb(0, 0, 0)');
    expect(box?.style.background).toBe('rgb(255, 255, 255)');
  });
});
