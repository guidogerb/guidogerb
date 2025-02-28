import { expect } from 'vitest';
import { loadHeader, setHeaderSettings } from '../../../src';

/** @typedef {import ('design-system-header').Settings} Settings */

/**
 * @param {Settings} settings
 */
export function loadTestHeader(settings) {
  setHeaderSettings(settings);
  loadHeader();
  expect(document.querySelector('.design-system.ds-header')).toBeTruthy();
}
