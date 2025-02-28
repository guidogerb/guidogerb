import { layoutTemplatesEnum } from '../../enums/layoutTemplatesEnum';
import { menusEnum } from '../../enums/menusEnum';
import { HomeLanding } from '../websiteContent/HomeLanding';
import { pageUrls } from './pageUrls';

/**
 * React Router v6 added the useRoutes() hook which takes a list of objects to treat as routes
 * WE WANT THIS! but it's not quite fully baked yet as it only returns a component and not the
 * full object of the matching page. So this is an attempt to be similar enough to useRoutes()
 * object styling that we can jump on the bandwagon at a later date but keep doing our machoer
 * approach at this time.
 *
 *  interface Page {
 *    content: React.FC,
 *    link: string | (() => string),
 *    menuSecondary: PropTypes.oneOf(menusEnum.SECONDARY_MENU_...),
 *    pageTitle: string | (() => string),
 *    template: PropTypes.oneOf(layoutTemplatesEnum),
 *  }
 *
 * helpful hooks:
 * --- usePageUrl ---
 *  const url = usePageUrl({page});
 *    Example:
 *      const history = useHistory();
 *      const url = usePageUrl({page: pages.home, anchor: 'exampleJunk'});
 *      const onClick = () => history.push(url);
 *
 * --- useGoToPageUrl ---
 *  const gotoUrl = useGoToPageUrl({page});
 *    Example:
 *      const gotoUrl = useUrl({page: pages.home, anchor: 'exampleJunk'});
 *      <button onClick={gotoUrl}>go to url</button>
 *
 * Rules of thumb:
 *  - Use react-router's <NavLink> (external) and <Link> (internal) as much as possible instead of history.push()
 *    This allows opening in a new tab and other common browser features
 *    that don't work when solely `history.push()` is used
 */

/** @typedef {import('design-system-website').Page} Page */

/** @enum {Page} */
export const pages = {
  // === Main top menu pages === //
  home: /** @type {Page} */ ({
    content: HomeLanding,
    link: pageUrls.home,
    pageTitle: 'Home',
    template: layoutTemplatesEnum.LANDING_TEMPLATE,
  }),
};
