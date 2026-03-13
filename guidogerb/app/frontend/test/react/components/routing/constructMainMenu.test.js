import { describe, expect, test } from 'vitest';
import { pageUrls } from '../../../../src/react/components/routing/pageUrls';
import { constructMainMenu } from '../../../../src/react/components/routing/util/constructMainMenu';
import { allMenus } from '../../../../src/react/components/routing/menus';
import { actionFunctionForUrl } from '../../../../src/react/components/routing/util/actionFunctionForUrl';

describe('constructMainMenu: isAlternatePath', () => {
  test('constructMainMenu-isAlternatePath: not alternate', () => {
    const mainMenu = constructMainMenu({
      // pageUrls.validation exists twice in the menu, under guidelines and under library
      currentMenuItem: { link: pageUrls.home, title: 'Home' },
      allMenus,
      actionFunctionForUrl,
    });
    expect(mainMenu.id).toBe('main-menu');
    expect(mainMenu.menuItems).toBeDefined();
    expect(Array.isArray(mainMenu.menuItems)).toBe(true);
  });

  test('constructMainMenu-isAlternatePath: is alternate', () => {
    const mainMenu = constructMainMenu({
      // pageUrls.validation exists twice in the menu, under guidelines and under library
      currentMenuItem: { link: pageUrls.home, title: 'Home', isAlternatePath: true },
      allMenus,
      actionFunctionForUrl,
    });
    expect(mainMenu.id).toBe('main-menu');
    expect(mainMenu.menuItems).toBeDefined();
    expect(Array.isArray(mainMenu.menuItems)).toBe(true);
  });
});
