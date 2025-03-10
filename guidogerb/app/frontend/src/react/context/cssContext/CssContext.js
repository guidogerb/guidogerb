import { createContext } from 'react';
import { cssContextDefaultColors } from './cssContextDefaultColors';

/** @typedef {import('design-system-website').CssContextValue} CssContextValue */

// The global context object that tracks the context's state and provides components like the <CssContext.Provider/>
export const CssContext = /** @type {typeof createContext<CssContextValue>} */ (createContext)({
  // @ts-expect-error this is the blank default value, so no need to make it perfect
  cssState: cssContextDefaultColors,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCssState: () => { },
});
