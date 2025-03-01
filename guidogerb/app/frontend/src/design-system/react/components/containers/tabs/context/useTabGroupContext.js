import { useContext } from 'react';
import { TabGroupContext } from './TabGroupContext';

/** @typedef { import('design-system').TabGroupContextValue} TabGroupContextType */

/** @returns {TabGroupContextType} */
export function useTabGroupContext() {
  return useContext(TabGroupContext);
}
