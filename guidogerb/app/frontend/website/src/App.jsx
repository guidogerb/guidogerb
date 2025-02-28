import { joinClassNames, useHeaderContext } from 'design-system';
import 'design-system/css/index.scss';
import { useEffect, useRef } from 'react';
import './css/index.scss';
import { ColorPopup } from './react/components/color/ColorPopup';
import { DemoAppStyle } from './react/components/demo/DemoAppStyle';
import { DesignSystemFooterMainContent } from './react/components/header/DesignSystemFooterMainContent';
import { DesignSystemFooterSocialMedia } from './react/components/header/DesignSystemFooterSocialMedia';
import { Routing } from './react/components/routing/Routing';
import { useAppContext } from './react/context/AppContext/useAppContext';
import { useCssContext } from './react/context/cssContext/useCssContext';
import { CSS_CLASS_NAMES } from './react/enums/cssClassNames';
import { CSS_STATE_KEYS } from './react/enums/cssStateKeys';

/**
 * @returns {import('react').JSX.Element} the App!
 */
export function App() {
  const { appState: { isColorPickerShown }, setAppState } = useAppContext();
  const { cssState } = useCssContext();
  const { settings: HeaderSettings, setSettings: setHeaderSettings } = useHeaderContext();
  const isActionItemsAddedRef = useRef(false);

  // add color picker gear action item header icon
  useEffect(
    () => {
      // that action item will setState for showing the color picker
      if (!isActionItemsAddedRef.current) {
        isActionItemsAddedRef.current = true;
        setHeaderSettings((draftSettings) => {
          draftSettings.actionItems = draftSettings.actionItems || [];
          draftSettings.actionItems.push(({
            actionFunction: () => {
              setAppState((draftAppState) => {
                draftAppState.isColorPickerShown = !draftAppState.isColorPickerShown;
              });
            },
            icon: '<span class="ds-icon-before-gear" aria-hidden="true" />',
            showTitle: false,
            title: 'Color Picker',
          }));
          draftSettings.onSearch = (e) => {
            window.location.href = `/search?q=${encodeURI(e)}`;
          };
        });
      }
    },
    [HeaderSettings]
  );

  return (
    <>
      <div
        className={
          joinClassNames([
            'design-system',
            // @ts-expect-error
            cssState?.[CSS_STATE_KEYS.PRIMARY_COLOR_IS_LIGHT] ? CSS_CLASS_NAMES.PRIMARY_COLOR_IS_LIGHT : '',
            // @ts-expect-error
            cssState?.[CSS_STATE_KEYS.SECONDARY_COLOR_IS_LIGHT] ? CSS_CLASS_NAMES.SECONDARY_COLOR_IS_LIGHT : '',
            // @ts-expect-error
            cssState?.[CSS_STATE_KEYS.ACCENT_COLOR_IS_LIGHT] ? CSS_CLASS_NAMES.ACCENT_COLOR_IS_LIGHT : '',
          ])
        }
      >
        <Routing />
      </div>
      <DemoAppStyle />
      {
        isColorPickerShown
          ? <div className="design-system"><ColorPopup onClose={() => setAppState((draftAppState) => { draftAppState.isColorPickerShown = false; })} /></div>
          : null
      }
      <footer aria-label="Design System (main footer)">
        <DesignSystemFooterSocialMedia />
        <DesignSystemFooterMainContent />
        <div id="footer-placeholder" />
      </footer>
    </>
  );
}
