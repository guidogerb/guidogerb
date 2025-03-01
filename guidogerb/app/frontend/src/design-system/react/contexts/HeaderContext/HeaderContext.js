import { getHeaderSettings } from 'design-system-header';
import { createContext } from 'react';

/** @typedef {import('design-system-header').Settings} Settings */

// The global context object that tracks the context's state and provides components like the <HeaderContext.Provider/>
export const HeaderContext = createContext({
  settings: getHeaderSettings(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSettings: /** @type {import('use-immer').Updater<Settings>} */(() => { }),
  settingsRef: /** @type {import('react').RefObject<Settings>} */(/** @type {unknown} */ ({ current: null })),
});
