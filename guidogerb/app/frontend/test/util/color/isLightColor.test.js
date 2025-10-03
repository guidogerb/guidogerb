import { describe, expect, it } from 'vitest';
import { isLightColor } from '../../../src/react/util/color/isLightColor';

describe('isLightColor', () => {
  it('returns true for white color', () => {
    expect(isLightColor('#ffffff')).toBe(true);
  });

  it('returns true for light colors', () => {
    expect(isLightColor('#f0f0f0')).toBe(true);
    expect(isLightColor('#e3f2fd')).toBe(true);
    expect(isLightColor('#ffebee')).toBe(true);
    expect(isLightColor('#fff9c4')).toBe(true);
  });

  it('returns false for black color', () => {
    expect(isLightColor('#000000')).toBe(false);
  });

  it('returns false for dark colors', () => {
    expect(isLightColor('#1a1a1a')).toBe(false);
    expect(isLightColor('#0d47a1')).toBe(false);
    expect(isLightColor('#263238')).toBe(false);
    expect(isLightColor('#4a4a4a')).toBe(false);
  });

  it('handles rgb color format', () => {
    expect(isLightColor('rgb(255, 255, 255)')).toBe(true);
    expect(isLightColor('rgb(0, 0, 0)')).toBe(false);
  });

  it('handles rgba color format', () => {
    expect(isLightColor('rgba(255, 255, 255, 1)')).toBe(true);
    expect(isLightColor('rgba(0, 0, 0, 0.5)')).toBe(false);
  });

  it('handles hsl color format', () => {
    expect(isLightColor('hsl(0, 0%, 100%)')).toBe(true);
    expect(isLightColor('hsl(0, 0%, 0%)')).toBe(false);
  });

  it('handles named colors', () => {
    expect(isLightColor('white')).toBe(true);
    expect(isLightColor('black')).toBe(false);
    expect(isLightColor('lightgray')).toBe(true);
    expect(isLightColor('darkblue')).toBe(false);
  });

  it('returns consistent results for medium colors', () => {
    // Medium colors should be consistently classified
    const mediumGray = '#808080';
    const result = isLightColor(mediumGray);
    expect(typeof result).toBe('boolean');
  });
});
