import {
  DocumentationTemplate,
  LandingTemplate,
  OnThisPage,
  VerticalMenu,
  useHeaderContext
} from 'design-system';
import { useCallback, useEffect, useRef } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { layoutTemplatesEnum } from '../../enums/layoutTemplatesEnum';
import { menusEnum } from '../../enums/menusEnum';
import { useCurrentMenuItem } from '../../hooks/useCurrentMenuItem';
import { HomeLanding } from '../websiteContent/HomeLanding';
import { Page404 } from '../websiteContent/Page404';
import { RoutePage } from './RoutePage';
import { allMenus } from './menus';
import { pages } from './pages';
import { constructMainMenu } from './util/constructMainMenu';
import { pageUrls } from './pageUrls';
import { actionFunctionForUrl } from './util/actionFunctionForUrl';

/** @typedef {import('design-system').VerticalMenuMenuItemAdditions} VerticalMenuMenuItemAdditions  */
/** @typedef {import('design-system-website').WebsiteMainMenu} WebsiteMainMenu */
/** @typedef {import('design-system-website').WebsiteMainMenuItem} WebsiteMainMenuItem */

export function Routing() {
  const navigate = useNavigate();
  const { setSettings: setHeaderSettings } = useHeaderContext();
  const { currentMenuItem } = useCurrentMenuItem();
  const mainMenuRef = useRef(null);

  useEffect(
    () => {
      if (currentMenuItem?.url) {
        const mainMenu = constructMainMenu({
          currentMenuItem,
          allMenus,
          actionFunctionForUrl,
        });
        mainMenuRef.current = mainMenu;
        setHeaderSettings((draftSettings) => {
          draftSettings.mainMenu = mainMenu;
        });
      }
    },
    [currentMenuItem, setHeaderSettings]
  );

  return (
    <Routes>
      <Route path={pages.home.link} element={<pages.home.content />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
