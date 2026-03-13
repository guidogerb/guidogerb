import React from 'react';
import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { ColorPickerInstructions } from '../../../../src/react/components/color/ColorPickerInstructions';

describe('ColorPickerInstructions', () => {
  test('renders without crashing', () => {
    const { container } = render(<ColorPickerInstructions />);
    expect(container).toBeTruthy();
  });

  test('renders heading', () => {
    const { getByText } = render(<ColorPickerInstructions />);
    expect(getByText('Color Picker Instructions')).toBeTruthy();
  });

  test('renders instruction text', () => {
    const { getByText } = render(<ColorPickerInstructions />);
    expect(getByText(/Use the color picker to customize the website colors/i)).toBeTruthy();
  });
});
