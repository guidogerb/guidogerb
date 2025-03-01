import { createContext } from 'react';

/** @typedef {import('design-system').DesignSystemContextValue} DesignSystemContextValue */
/** @typedef {import('use-immer').ImmerHook<DesignSystemContextValue>} ImmerHookDesignSystemContext */

export const DesignSystemContext = /** @type {typeof createContext<ImmerHookDesignSystemContext>} */ (createContext)([
  {
    ariaLive: {
      assertiveMessages: [],
      politeMessages: [],
    },
    banners: [],
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => { },
]);
