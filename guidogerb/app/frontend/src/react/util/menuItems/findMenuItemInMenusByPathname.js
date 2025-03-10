/** @typedef {import('design-system-website').WebsiteMainMenu} WebsiteMainMenu */
/** @typedef {import('design-system-website').WebsiteMainMenuItem} WebsiteMainMenuItem */

/**
 * @param {WebsiteMainMenu | WebsiteMainMenuItem} parent
 * @returns {(WebsiteMainMenu | WebsiteMainMenuItem)[]}
 */
function flattenChildren(parent) {
  return [
    parent,
    // @ts-expect-error oh, but children just might actually exist here
    ...(parent?.children?.map(flattenChildren) || []),
  ];
}

/**
 * Given lists of menuItems, find the a menuItem that matches the current website path.
 * @param {object} props
 * @param {WebsiteMainMenu[]} props.menus menus in which to search (mainMenu, sidePanel, etc) (see menus.js)
 * @param {string} props.pathname string the current pathname on which to match a menuItem
 * @returns {WebsiteMainMenu | WebsiteMainMenuItem | undefined} the matching menu item or `undefined` if not found
 */
export function findMenuItemInMenusByPathname({ menus, pathname }) {
  return (
    /** @type {(WebsiteMainMenuItem)[]} */ (
      (menus || []).map((menu) => (
        (menu?.menuItems || []).map(flattenChildren)
      ))
        .flat(Infinity)
    )
      .find((menuItem) => (
        menuItem.link === pathname
        && !menuItem.isAlternatePath
      ))
  );
}
