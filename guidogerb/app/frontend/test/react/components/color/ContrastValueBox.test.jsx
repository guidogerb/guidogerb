import React from 'react';
import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { ContrastValueBox } from '../../../../src/react/components/color/ContrastValueBox';
import { COLOR_RATINGS } from '../../../../src/react/components/color/COLOR_RATINGS';

describe('ContrastValueBox', () => {
  test('renders without crashing', () => {
    const { container } = render(
      <ContrastValueBox
        contrastRating={COLOR_RATINGS.AA}
        contrastValue={4.5}
        title="Normal Text"
      />
    );
    expect(container).toBeTruthy();
  });

  test('renders title correctly', () => {
    const { getByText } = render(
      <ContrastValueBox
        contrastRating={COLOR_RATINGS.AAA}
        contrastValue={7.0}
        title="Large Text"
      />
    );
    expect(getByText('Large Text')).toBeTruthy();
  });

  test('renders contrast value with :1 ratio', () => {
    const { getByText } = render(
      <ContrastValueBox
        contrastRating={COLOR_RATINGS.AA}
        contrastValue={4.5}
        title="Test"
      />
    );
    expect(getByText('4.5:1')).toBeTruthy();
  });

  test('displays rating for AA level', () => {
    const { getByText } = render(
      <ContrastValueBox
        contrastRating={COLOR_RATINGS.AA}
        contrastValue={4.5}
        title="Test"
      />
    );
    expect(getByText('AA')).toBeTruthy();
  });

  test('displays rating for AAA level', () => {
    const { getByText } = render(
      <ContrastValueBox
        contrastRating={COLOR_RATINGS.AAA}
        contrastValue={7.0}
        title="Test"
      />
    );
    expect(getByText('AAA')).toBeTruthy();
  });

  test('displays FAIL with error icon for BAD rating', () => {
    const { getByText, container } = render(
      <ContrastValueBox
        contrastRating={COLOR_RATINGS.BAD}
        contrastValue={2.5}
        title="Test"
      />
    );
    expect(getByText('FAIL')).toBeTruthy();
    const icon = container.querySelector('.ds-icon-before-error');
    expect(icon).toBeTruthy();
  });
});
