import { useContext } from 'react';
import { DesignSystemContext } from './DesignSystemContext.js';

/** @typedef {import('design-system').DesignSystemContextValue} DesignSystemContextValue */
/** @typedef {import('use-immer').ImmerHook<DesignSystemContextValue>} ImmerHookDesignSystemContext */

/** @returns {ImmerHookDesignSystemContext} */
export function useDesignSystemContext() {
  return useContext(DesignSystemContext);
}
