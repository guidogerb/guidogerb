import { joinClassNames } from '../../util/joinClassNames';
import { MenuItemInline } from './items/MenuItemInline';

/** @typedef {import('design-system').WebsiteMainMenu} WebsiteMainMenu */
/** @typedef {import('design-system').WebsiteMainMenuItem} WebsiteMainMenuItem */

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {WebsiteMainMenuItem} [props.currentMenuItem]
 * @param {string} props.id
 * @param {WebsiteMainMenu} props.menu
 * @param {string} [props.titleTagClassName]
 * @param {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'} [props.titleTagName]
 * @returns {import('react').JSX.Element}
 */
export function HorizontalMenu({
  className,
  currentMenuItem,
  id,
  menu,
  titleTagClassName = 'visually-hidden',
  titleTagName: TitleTagName = 'h2',
}) {
  return (
    <nav className={joinClassNames(className, 'horizontal-menu')} aria-labelledby={id}>
      <TitleTagName id={id} className={titleTagClassName}>Main Menu</TitleTagName>
      <ul>
        {menu?.menuItems?.map((menuItem) => (
          <MenuItemInline menuItem={menuItem} key={`horizontal-menu__nav-link__${menuItem.link}-${menuItem.title}}`} currentMenuItem={currentMenuItem} />
        ))}
      </ul>
    </nav>
  );
}
