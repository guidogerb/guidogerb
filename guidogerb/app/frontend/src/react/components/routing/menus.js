import { menusEnum } from '../../enums/menusEnum';
import { pageUrls } from './pageUrls';

/** @typedef {import('design-system-website').WebsiteMainMenu} WebsiteMainMenu */

/** @type {Record<string, WebsiteMainMenu>} */
export const allMenus = {
  menuMain: {
    id: menusEnum.MAIN_MENU,
    menuItems: [
      {
        id: 'home',
        label: 'Home',
        link: pageUrls.home,
      },
    ],
  },
  menuGuidelinesSecondary: {
    id: menusEnum.GUIDELINES_SECONDARY_MENU,
    menuItems: [],
  },
  menuLibraryComponentsSecondary: {
    id: menusEnum.LIBRARY_COMPONENTS_SECONDARY_MENU,
    menuItems: [],
  },
  menuLibraryPatternsSecondary: {
    id: menusEnum.LIBRARY_PATTERNS_SECONDARY_MENU,
    menuItems: [],
  },
  menuLibrarySecondary: {
    id: menusEnum.LIBRARY_SECONDARY_MENU,
    menuItems: [],
  },
  menuResourcesSecondary: {
    id: menusEnum.RESOURCES_SECONDARY_MENU,
    menuItems: [],
  },
};

// Export individual menus for convenience
export const { 
  menuMain,
  menuGuidelinesSecondary,
  menuLibraryComponentsSecondary,
  menuLibraryPatternsSecondary,
  menuLibrarySecondary,
  menuResourcesSecondary
} = allMenus;
