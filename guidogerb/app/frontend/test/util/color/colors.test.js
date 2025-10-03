import { describe, expect, it } from 'vitest';
import { colors, colorsIndexes } from '../../../src/react/util/color/colors';

describe('colorsIndexes', () => {
  it('should define darkIndex', () => {
    expect(colorsIndexes.darkIndex).toBe(0);
  });

  it('should define primeIndex', () => {
    expect(colorsIndexes.primeIndex).toBe(4);
  });

  it('should define lightIndex', () => {
    expect(colorsIndexes.lightIndex).toBe(17);
  });
});

describe('colors', () => {
  it('should export colors object', () => {
    expect(colors).toBeDefined();
    expect(typeof colors).toBe('object');
  });

  it('should have PURPLE color family', () => {
    expect(colors.PURPLE).toBeDefined();
    expect(colors.PURPLE.title).toBe('Purple');
    expect(Array.isArray(colors.PURPLE.swatches)).toBe(true);
  });

  it('should have 18 swatches in PURPLE', () => {
    expect(colors.PURPLE.swatches.length).toBe(18);
  });

  it('should have correct PURPLE prime color at index 4', () => {
    expect(colors.PURPLE.swatches[colorsIndexes.primeIndex]).toBe('#490f52');
  });

  it('should have LIGHT_PURPLE color family', () => {
    expect(colors.LIGHT_PURPLE).toBeDefined();
    expect(colors.LIGHT_PURPLE.title).toBe('Light Purple');
    expect(Array.isArray(colors.LIGHT_PURPLE.swatches)).toBe(true);
  });

  it('should have color swatches as hex strings', () => {
    const firstSwatch = colors.PURPLE.swatches[0];
    expect(typeof firstSwatch).toBe('string');
    expect(firstSwatch).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it('should have valid hex colors in all PURPLE swatches', () => {
    colors.PURPLE.swatches.forEach((swatch) => {
      expect(swatch).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });

  it('should have multiple color families', () => {
    const colorFamilies = Object.keys(colors);
    expect(colorFamilies.length).toBeGreaterThan(1);
  });

  it('should have each color family with title and swatches', () => {
    Object.values(colors).forEach((colorFamily) => {
      expect(colorFamily).toHaveProperty('title');
      expect(colorFamily).toHaveProperty('swatches');
      expect(typeof colorFamily.title).toBe('string');
      expect(Array.isArray(colorFamily.swatches)).toBe(true);
    });
  });
});
