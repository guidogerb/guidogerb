import { useContext } from 'react';
import { RadioButtonGroupContext } from './RadioButtonGroupContext';

/** @typedef { import('design-system').RadioButtonGroupContext} RadioButtonGroupContextType */

/** @returns {RadioButtonGroupContextType} */
export function useRadioButtonGroupContext() {
  return useContext(RadioButtonGroupContext);
}
