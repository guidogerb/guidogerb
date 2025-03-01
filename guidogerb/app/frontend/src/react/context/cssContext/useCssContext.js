import { useContext } from 'react';
import { CssContext } from './CssContext';

/** @typedef {import('design-system-website').CssContextValue} CssContextValue */

/** @returns {CssContextValue} */
export function useCssContext() {
  return useContext(CssContext);
}
