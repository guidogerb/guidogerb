import { useImmer } from 'use-immer';
import { ariaLiveTypes } from '../../enums/ariaLiveTypes';
import { DesignSystemContext } from './DesignSystemContext.js';
import { AriaLiveMessages } from './components/AriaLiveMessages';
import { BannersGlobal } from './components/BannersGlobal';

/** @typedef {import('design-system').UtahDesignSystemDefaultSettings} UtahDesignSystemDefaultSettings */
/** @typedef {import('design-system').DesignSystemContextValue} DesignSystemContextValue */

/**
 * provider that wraps the app at the top level
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 * @param {UtahDesignSystemDefaultSettings} [props.defaultSettings]
 * @returns {import('react').JSX.Element}
 */
export function DesignSystemContextProvider({ children, defaultSettings }) {
  const immerHook = /** @type {typeof useImmer<DesignSystemContextValue>} */ (useImmer)(() => ({
    ariaLive: {
      assertiveMessages: [],
      politeMessages: [],
    },
    banners: [],
  }));

  return (
    <DesignSystemContext.Provider value={immerHook}>
      {children}
      <AriaLiveMessages ariaLiveType={ariaLiveTypes.ASSERTIVE} messages={immerHook[0].ariaLive.assertiveMessages} />
      <AriaLiveMessages ariaLiveType={ariaLiveTypes.POLITE} messages={immerHook[0].ariaLive.politeMessages} />
      <BannersGlobal
        banners={immerHook[0].banners}
        bannerDuration={defaultSettings?.bannerDuration}
        defaultClassName={defaultSettings?.defaultClassName}
      />
    </DesignSystemContext.Provider>
  );
}
