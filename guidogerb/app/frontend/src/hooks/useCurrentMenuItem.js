import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { allMenus } from '../react/components/routing/menus';

/**
 * Custom hook to determine the current menu item based on the URL
 * @returns {Object} The current menu item and related information
 */
export function useCurrentMenuItem() {
  const location = useLocation();
  
  const currentMenuItem = useMemo(() => {
    // Find the menu item that matches the current URL
    const menuItems = allMenus.menuMain.menuItems;
    return menuItems.find(item => item.link === location.pathname) || null;
  }, [location.pathname]);

  return { currentMenuItem };
}
