import React from 'react';
import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { ColorContrastBox } from '../../../../src/react/components/color/ColorContrastBox';

describe('ColorContrastBox', () => {
  const defaultProps = {
    color1: '#000000',
    color1IsLight: false,
    color1ShowHex: true,
    color1Title: 'Background',
    color2: '#FFFFFF',
    color2IsLight: true,
    color2ShowHex: true,
    color2Title: 'Foreground',
  };

  test('renders without crashing', () => {
    const { container } = render(<ColorContrastBox {...defaultProps} />);
    expect(container).toBeTruthy();
  });

  test('renders color1 title', () => {
    const { getByText } = render(<ColorContrastBox {...defaultProps} />);
    expect(getByText('Background')).toBeTruthy();
  });

  test('renders color2 title', () => {
    const { getByText } = render(<ColorContrastBox {...defaultProps} />);
    expect(getByText('Foreground')).toBeTruthy();
  });

  test('displays color1 hex when color1ShowHex is true', () => {
    const { getByText } = render(<ColorContrastBox {...defaultProps} />);
    expect(getByText('#000000')).toBeTruthy();
  });

  test('displays color2 hex when color2ShowHex is true', () => {
    const { getByText } = render(<ColorContrastBox {...defaultProps} />);
    expect(getByText('#FFFFFF')).toBeTruthy();
  });

  test('hides color1 hex when color1ShowHex is false', () => {
    const { queryByText } = render(
      <ColorContrastBox {...defaultProps} color1ShowHex={false} />
    );
    expect(queryByText('#000000')).toBeNull();
  });

  test('hides color2 hex when color2ShowHex is false', () => {
    const { queryByText } = render(
      <ColorContrastBox {...defaultProps} color2ShowHex={false} />
    );
    expect(queryByText('#FFFFFF')).toBeNull();
  });

  test('applies color-is-light class when color1IsLight is true', () => {
    const { container } = render(
      <ColorContrastBox {...defaultProps} color1IsLight={true} />
    );
    const background = container.querySelector('.color-contrast-box__background');
    expect(background?.className).toContain('color-is-light');
  });

  test('applies color-is-light class when color2IsLight is true', () => {
    const { container } = render(
      <ColorContrastBox {...defaultProps} color2IsLight={true} />
    );
    const foreground = container.querySelector('.color-contrast-box__foreground');
    expect(foreground?.className).toContain('color-is-light');
  });

  test('applies backgroundColor styles correctly', () => {
    const { container } = render(<ColorContrastBox {...defaultProps} />);
    const background = container.querySelector('.color-contrast-box__background');
    const foreground = container.querySelector('.color-contrast-box__foreground');
    expect(background?.style.backgroundColor).toBe('rgb(0, 0, 0)');
    expect(foreground?.style.backgroundColor).toBe('rgb(255, 255, 255)');
  });

  test('renders hr separator', () => {
    const { container } = render(<ColorContrastBox {...defaultProps} />);
    const hr = container.querySelector('hr');
    expect(hr).toBeTruthy();
  });
});
