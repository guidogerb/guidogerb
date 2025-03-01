import { useContext } from 'react';
import { AppContext } from './AppContext';

/** @typedef {import ('design-system-website').AppContextValue} AppContextValue */

/**
 * @returns {AppContextValue}
 */
export function useAppContext() {
  return useContext(AppContext);
}
