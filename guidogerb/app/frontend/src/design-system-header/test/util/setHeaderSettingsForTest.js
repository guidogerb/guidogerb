import { getHeaderSettings, setHeaderSettings } from '../../src';
import { settingsKeeper } from '../../src/js/settings/settingsKeeper';

/** @typedef {import('design-system-header').SettingsInput} SettingsInput */

/**
 * sets settings and then puts them back
 * @param {Partial<SettingsInput>} HeaderSettings
 * @param {() => void} fn
 */
export function setHeaderSettingsForTest(HeaderSettings, fn) {
  // store previous settings
  const currentSettings = getHeaderSettings();

  // clear settings
  settingsKeeper.clearSettings();

  // set to passed in settings
  setHeaderSettings(HeaderSettings);

  // run test
  fn();

  // put back to what the settings were before
  setHeaderSettings(currentSettings);
}
