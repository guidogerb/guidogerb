import { useContext } from 'react';
import { HeaderContext } from './HeaderContext';

/** @typedef {import('design-system-header').Settings} Settings */
/** @typedef {import('design-system-header').SettingsInput} SettingsInput */

/**
 * This hook provides the context's data; most everything should just use this hook and nothing else
 * @returns {{ settings: Settings, setSettings: import('use-immer').Updater<Settings>, settingsRef: import('react').RefObject<Settings> }}
 */
export function useHeaderContext() {
  return useContext(HeaderContext);
}
