import { useContext } from 'react';
import { MultiSelectContext } from './MultiSelectContext';

/** @typedef { import('design-system').MultiSelectContext} MultiSelectContextType */

/** @returns {MultiSelectContextType} */
export function useMultiSelectContext() {
  return useContext(MultiSelectContext);
}
