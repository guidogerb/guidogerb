import { createContext } from 'react';

/** @typedef {import('design-system').TabGroupContextValue} TabGroupContextValue */

export const TabGroupContext = /** @type {typeof createContext<TabGroupContextValue>} */ (createContext)({
  isVertical: false,
  navigateNext: () => { },
  navigatePrevious: () => { },
  registerTab: () => { },
  selectedTabId: '',
  setSelectedTabId: () => { },
  tabGroupId: '',
  unRegisterTab: () => { },
});
