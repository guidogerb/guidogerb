import { createContext } from 'react';

/** @typedef { import('design-system').ComboBoxOptionGroupContextValue} ComboBoxOptionGroupContextValue */

export const ComboBoxOptionGroupContext = /** @type {typeof createContext<ComboBoxOptionGroupContextValue>} */ (createContext)('');
