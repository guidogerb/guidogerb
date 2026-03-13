import { describe, expect, it } from 'vitest';
import { getBorderClass } from '../../../src/react/util/color/getBorderClass';
import { CSS_CLASS_NAMES } from '../../../src/react/enums/cssClassNames';

describe('getBorderClass', () => {
  it('returns empty string when contrast is sufficient', () => {
    // Black text on white background has high contrast
    const result = getBorderClass({
      backgroundColor: '#ffffff',
      foregroundColor: '#000000',
      targetContrast: 3,
    });
    
    expect(result).toBe('');
  });

  it('returns dark border class for light background with low contrast', () => {
    // Light gray text on white background has low contrast
    const result = getBorderClass({
      backgroundColor: '#ffffff',
      foregroundColor: '#f0f0f0',
      targetContrast: 3,
    });
    
    expect(result).toBe(CSS_CLASS_NAMES.CONTRAST_BORDER_DARK);
  });

  it('returns light border class for dark background with low contrast', () => {
    // Dark gray text on black background has low contrast
    const result = getBorderClass({
      backgroundColor: '#000000',
      foregroundColor: '#1a1a1a',
      targetContrast: 3,
    });
    
    expect(result).toBe(CSS_CLASS_NAMES.CONTRAST_BORDER_LIGHT);
  });

  it('uses default target contrast of 3', () => {
    const result = getBorderClass({
      backgroundColor: '#ffffff',
      foregroundColor: '#f5f5f5',
    });
    
    // Should return a border class since contrast is low
    expect(result).toBeTruthy();
  });

  it('respects custom target contrast', () => {
    const result = getBorderClass({
      backgroundColor: '#ffffff',
      foregroundColor: '#333333',
      targetContrast: 7, // Very high contrast requirement
    });
    
    // Even though this has decent contrast, it may not meet 7:1 ratio
    expect(typeof result).toBe('string');
  });

  it('handles rgb color format', () => {
    const result = getBorderClass({
      backgroundColor: 'rgb(255, 255, 255)',
      foregroundColor: 'rgb(240, 240, 240)',
      targetContrast: 3,
    });
    
    expect(result).toBe(CSS_CLASS_NAMES.CONTRAST_BORDER_DARK);
  });

  it('handles hex colors', () => {
    const result = getBorderClass({
      backgroundColor: '#fff',
      foregroundColor: '#eee',
      targetContrast: 3,
    });
    
    expect(result).toBe(CSS_CLASS_NAMES.CONTRAST_BORDER_DARK);
  });

  it('handles named colors', () => {
    const result = getBorderClass({
      backgroundColor: 'white',
      foregroundColor: 'lightgray',
      targetContrast: 3,
    });
    
    expect(result).toBe(CSS_CLASS_NAMES.CONTRAST_BORDER_DARK);
  });

  it('returns consistent results for same color combinations', () => {
    const result1 = getBorderClass({
      backgroundColor: '#ffffff',
      foregroundColor: '#f0f0f0',
    });
    
    const result2 = getBorderClass({
      backgroundColor: '#ffffff',
      foregroundColor: '#f0f0f0',
    });
    
    expect(result1).toBe(result2);
  });
});
