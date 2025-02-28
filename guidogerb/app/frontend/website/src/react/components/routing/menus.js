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
};
