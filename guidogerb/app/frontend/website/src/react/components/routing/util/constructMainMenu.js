import { deleteKeysFromObject } from '../../../util/deleteKeysFromObject';
import {
  menuGuidelinesSecondary,
  menuLibraryComponentsSecondary,
  menuLibraryPatternsSecondary,
  menuLibrarySecondary,
  menuMain,
  menuResourcesSecondary,
} from '../menus';
import { pageUrls } from '../pageUrls';
import { actionFunctionForUrl } from './actionFunctionForUrl';

/** @typedef {import('design-system-header').EventAction} EventAction */
/** @typedef {import('design-system-header').MainMenu} MainMenu */
/** @typedef {import('design-system-header').MainMenuItem} MainMenuItem */
/** @typedef {import('design-system-header').MenuItem} MenuItem */

/** @typedef {import('design-system-website').PageUrl} PageUrl */
/** @typedef {import('design-system-website').WebsiteMainMenu} WebsiteMainMenu */
/** @typedef {import('design-system-website').WebsiteMainMenuItem} WebsiteMainMenuItem */

/**
 * @param {WebsiteMainMenuItem[]} websiteMainMenuItems
 * @param {import('react-router-dom').NavigateFunction} navigate
 * @returns {MenuItem[]}
 */
function constructMenuItems(websiteMainMenuItems, navigate) {
  return (
    websiteMainMenuItems.map((websiteMainMenuItem) => ({
      actionFunctionUrl: (
        websiteMainMenuItem.children
          ? undefined
          : (
            {
              actionFunction: actionFunctionForUrl(websiteMainMenuItem.link || pageUrls.home, navigate),
              url: websiteMainMenuItem.link || pageUrls.home,
            }
          )
      ),
      actionMenu: (
        websiteMainMenuItem.children
          ? constructMenuItems(websiteMainMenuItem.children, navigate)
          : undefined
      ),
      isAlternatePath: websiteMainMenuItem.isAlternatePath,
      title: websiteMainMenuItem.title,
    }))
  );
}

/**
 * @param {(MainMenuItem)[]} parentMenus
 * @param {MainMenuItem | MenuItem} draftMenuItem
 * @param {WebsiteMainMenuItem | WebsiteMainMenu | undefined} currentMenuItem
 */
function assignSelectedFromHierarchy(parentMenus, draftMenuItem, currentMenuItem) {
  draftMenuItem.isSelected = (
    draftMenuItem.isSelected
    || (
      // @ts-expect-error menu types are wild...
      currentMenuItem?.link && (
        // @ts-expect-error menu types are wild...
        currentMenuItem?.link === draftMenuItem.actionFunctionUrl?.url
        // @ts-expect-error menu types are wild...
        || currentMenuItem?.link === draftMenuItem?.actionUrl?.url
      )
    )
  );
  // don't set top menu item of the alternate path item (but still set its parents)
  if (draftMenuItem.isSelected && !draftMenuItem.isAlternatePath) {
    parentMenus.forEach((draftParentMenu) => {
      draftParentMenu.isSelected = true;
    });
  }
  if (draftMenuItem.actionMenu) {
    const newParents = [...parentMenus, draftMenuItem];
    draftMenuItem.actionMenu?.forEach((actionMenuItem) => assignSelectedFromHierarchy(newParents, actionMenuItem, currentMenuItem));
  }
}

/**
 * Constructs the main menu with the current menu item highlighted
 * @param {Object} params - Parameters
 * @param {Object} params.currentMenuItem - The current menu item
 * @param {Object} params.allMenus - All menus
 * @param {Function} params.actionFunctionForUrl - Function to create action functions for URLs
 * @returns {Object} The constructed main menu
 */
export function constructMainMenu({ currentMenuItem, allMenus, actionFunctionForUrl }) {
  return {
    id: 'main-menu',
    menuItems: allMenus.menuMain.menuItems.map(item => ({
      ...item,
      selected: item.link === currentMenuItem?.link,
      actionFunctionUrl: {
        actionFunction: () => {},
        skipHandleEvent: true,
        url: item.link,
      }
    }))
  };
}
